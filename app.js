/* ===========================================================
   ママえいご (Mama English) — アプリ本体
   依存ライブラリなし。状態は localStorage に保存。
   =========================================================== */

(function () {
  "use strict";

  const STORAGE_KEY = "mama-english-state";
  const MAX_HEARTS = 5;
  const XP_PER_LESSON = 10;

  // ---- 状態の読み込み / 保存 -------------------------------
  const defaultState = {
    streak: 0,
    xp: 0,
    hearts: MAX_HEARTS,
    completed: {}, // { "lesson-1": true }
    lastStudyDate: null, // "YYYY-MM-DD"
    inProgress: null, // 中断中のレッスン: { lessonId, index, mistakes }
  };

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return Object.assign({}, defaultState, JSON.parse(raw));
    } catch (e) {
      /* 壊れていたら初期化 */
    }
    return Object.assign({}, defaultState);
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* localStorage 不可の環境では無視 */
    }
  }

  // ---- DOM 参照 --------------------------------------------
  const app = document.getElementById("app");
  const footer = document.getElementById("footer");
  const streakEl = document.getElementById("streakCount");
  const xpEl = document.getElementById("xpCount");
  const heartEl = document.getElementById("heartCount");
  const topbar = document.getElementById("topbar");

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }

  function syncTopbar() {
    streakEl.textContent = state.streak;
    xpEl.textContent = state.xp;
    heartEl.textContent = state.hearts;
  }

  // ===========================================================
  // ホーム画面（レッスンの道）
  // ===========================================================
  function renderHome() {
    topbar.hidden = false;
    footer.hidden = true;
    footer.className = "footer";
    footer.innerHTML = "";
    syncTopbar();

    const resume = state.inProgress;
    let firstLocked = true; // 最初の未完了レッスンだけ「現在地」として開放
    const nodes = LESSONS.map((lesson, i) => {
      const done = !!state.completed[lesson.id];
      const resuming = resume && resume.lessonId === lesson.id && !done;
      let cls = "node";
      let locked = false;
      if (done) {
        cls += " node--done";
      } else if (firstLocked) {
        firstLocked = false; // ここが現在地
      } else {
        cls += " node--locked";
        locked = true;
      }
      const icon = done ? "&#9733;" : locked ? "&#128274;" : "&#9733;";
      const caption = resuming
        ? `${escapeHtml(lesson.title)}<span class="node__resume">途中から再開</span>`
        : escapeHtml(lesson.title);
      return `
        <div class="node-wrap">
          <button class="${cls}${resuming ? " node--resume" : ""}" ${
        locked ? "disabled" : ""
      } data-lesson="${lesson.id}">
            ${icon}
          </button>
          <div class="node__caption">${caption}</div>
        </div>`;
    });

    app.innerHTML = `
      <div class="unit-banner">
        <div class="unit-banner__label">${escapeHtml(UNIT.label)}</div>
        <div class="unit-banner__title">${escapeHtml(UNIT.title)}</div>
      </div>
      <img class="mascot" src="assets/mascot.png" alt="マスコット" />
      <div class="path">
        ${nodes.join("")}
      </div>
    `;

    app.querySelectorAll(".node[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.disabled) return;
        const id = btn.dataset.lesson;
        // 中断中レッスンをタップしたら続きから、それ以外は最初から。
        const resumeData =
          state.inProgress && state.inProgress.lessonId === id
            ? state.inProgress
            : null;
        startLesson(id, resumeData);
      });
    });
  }

  // ===========================================================
  // レッスン進行
  // ===========================================================
  let session = null;

  function startLesson(lessonId, resume) {
    if (state.hearts <= 0) {
      showNoHeartsModal();
      return;
    }
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return;

    // 中断データから再開する場合は、途中の問番号・ミス数を引き継ぐ。
    let index = 0;
    let mistakes = 0;
    if (resume && resume.lessonId === lessonId) {
      index = Math.min(resume.index || 0, lesson.questions.length - 1);
      mistakes = resume.mistakes || 0;
    }

    session = {
      lesson,
      index,
      mistakes,
      answered: false,
      lastCorrect: false,
    };
    saveProgress(); // どの問題からでも、開始時点を記録しておく
    renderQuestion();
  }

  // 中断中レッスンの進捗を保存（今が何問目か）。
  function saveProgress() {
    if (!session) return;
    state.inProgress = {
      lessonId: session.lesson.id,
      index: session.index,
      mistakes: session.mistakes,
    };
    saveState();
  }

  function clearProgress() {
    state.inProgress = null;
    saveState();
  }

  function renderQuestion() {
    topbar.hidden = true;
    const q = session.lesson.questions[session.index];
    const total = session.lesson.questions.length;
    const progress = Math.round((session.index / total) * 100);

    let body = "";
    if (q.type === "arrange") {
      body = renderArrange(q);
    } else {
      body = renderChoice(q);
    }

    app.innerHTML = `
      <div class="lesson-head">
        <button class="btn-quit" id="quitBtn" title="やめる">&times;</button>
        <div class="progress"><div class="progress__bar" style="width:${progress}%"></div></div>
        <div class="lesson-hearts">
          <img src="assets/heart.png" alt="" />${state.hearts}
        </div>
      </div>
      ${body}
    `;

    document.getElementById("quitBtn").addEventListener("click", () => {
      if (confirm("レッスンをやめてホームに戻りますか？")) renderHome();
    });

    if (q.type === "arrange") wireArrange(q);
    else wireChoice(q);

    setFooterCheck();
  }

  // --- 4択 --------------------------------------------------
  function renderChoice(q) {
    // 表示順はシャッフルする（正解が常に先頭だとバレるため）。
    // data-i には元のインデックスを入れるので採点ロジックはそのまま動く。
    const order = shuffle(q.choices.map((_, i) => i));
    const choices = order
      .map(
        (i) =>
          `<button class="choice" data-i="${i}">${escapeHtml(q.choices[i])}</button>`
      )
      .join("");
    return `
      <div class="prompt-row">
        <img src="assets/mascot-small.png" alt="" />
        <div class="bubble">${escapeHtml(q.prompt)}</div>
      </div>
      <div class="choices">${choices}</div>
    `;
  }

  function wireChoice(q) {
    let selected = null;
    app.querySelectorAll(".choice").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (session.answered) return;
        app.querySelectorAll(".choice").forEach((b) =>
          b.classList.remove("choice--selected")
        );
        btn.classList.add("choice--selected");
        selected = Number(btn.dataset.i);
        enableCheck(true);
      });
    });
    session.getAnswer = () => selected;
    session.evaluate = () => {
      const correct = selected === q.answer;
      app.querySelectorAll(".choice").forEach((b) => {
        const i = Number(b.dataset.i);
        if (i === q.answer) b.classList.add("choice--correct");
        else if (i === selected) b.classList.add("choice--wrong");
      });
      return { correct, solution: q.choices[q.answer] };
    };
  }

  // --- 単語並べ替え -----------------------------------------
  function renderArrange(q) {
    const bank = shuffle(q.sentence.concat(q.distractors));
    session._bank = bank;
    const tiles = bank
      .map(
        (w, i) => `<button class="tile" data-w="${i}">${escapeHtml(w)}</button>`
      )
      .join("");
    return `
      <div class="prompt-row">
        <img src="assets/mascot-small.png" alt="" />
        <div class="bubble">${escapeHtml(q.prompt)}</div>
      </div>
      <div class="answer-area" id="answerArea"></div>
      <div class="word-bank" id="wordBank">${tiles}</div>
    `;
  }

  function wireArrange(q) {
    const answerArea = document.getElementById("answerArea");
    const wordBank = document.getElementById("wordBank");
    const picked = []; // {wIndex, word}

    function refresh() {
      enableCheck(picked.length > 0);
    }

    wordBank.querySelectorAll(".tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        if (session.answered || tile.classList.contains("tile--used")) return;
        tile.classList.add("tile--used");
        const word = session._bank[Number(tile.dataset.w)];
        const slot = document.createElement("button");
        slot.className = "tile";
        slot.textContent = word;
        slot.addEventListener("click", () => {
          if (session.answered) return;
          tile.classList.remove("tile--used");
          slot.remove();
          const idx = picked.findIndex((p) => p.slot === slot);
          if (idx >= 0) picked.splice(idx, 1);
          refresh();
        });
        answerArea.appendChild(slot);
        picked.push({ word, slot });
        refresh();
      });
    });

    session.getAnswer = () => picked.map((p) => p.word);
    session.evaluate = () => {
      const got = picked.map((p) => p.word).join(" ");
      const want = q.sentence.join(" ");
      const correct = got === want;
      return { correct, solution: q.translation };
    };
  }

  // ---- フッター（判定ボタン / 次へ） -----------------------
  function setFooterCheck() {
    footer.hidden = false;
    footer.className = "footer";
    footer.innerHTML = `
      <div class="footer__inner">
        <button class="btn btn--green btn--block" id="checkBtn" disabled>こたえあわせ</button>
      </div>`;
    document.getElementById("checkBtn").addEventListener("click", onCheck);
  }

  function enableCheck(on) {
    const b = document.getElementById("checkBtn");
    if (b) b.disabled = !on;
  }

  function onCheck() {
    if (session.answered) return;
    session.answered = true;
    const result = session.evaluate();
    session.lastCorrect = result.correct;

    if (!result.correct) {
      session.mistakes++;
      state.hearts = Math.max(0, state.hearts - 1);
      saveState();
    }

    footer.className = "footer " + (result.correct ? "footer--correct" : "footer--wrong");
    footer.innerHTML = `
      <div class="footer__inner">
        <div class="feedback ${result.correct ? "feedback--correct" : "feedback--wrong"}">
          ${result.correct ? "せいかい！🎉" : "おしい！"}
          ${result.correct ? "" : `<small>正解: ${escapeHtml(result.solution)}</small>`}
        </div>
        <button class="btn ${result.correct ? "btn--green" : "btn--red"}" id="nextBtn">
          つぎへ
        </button>
      </div>`;
    document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  }

  function nextQuestion() {
    session.answered = false;
    if (state.hearts <= 0) {
      showNoHeartsModal();
      return;
    }
    session.index++;
    if (session.index >= session.lesson.questions.length) {
      finishLesson();
    } else {
      saveProgress(); // 次の問題へ進んだ時点を記録
      renderQuestion();
    }
  }

  // ===========================================================
  // レッスン完了
  // ===========================================================
  function finishLesson() {
    const gainedXp = XP_PER_LESSON;
    state.xp += gainedXp;
    const wasNotDone = !state.completed[session.lesson.id];
    state.completed[session.lesson.id] = true;
    state.inProgress = null; // 完走したので中断データは消す

    // ストリーク更新（1日1回）
    const today = todayStr();
    if (state.lastStudyDate !== today) {
      state.streak += 1;
      state.lastStudyDate = today;
    }
    saveState();

    topbar.hidden = true;
    footer.hidden = true;
    const accuracy = Math.round(
      ((session.lesson.questions.length - session.mistakes) /
        session.lesson.questions.length) *
        100
    );

    // ラスボス（最終ステージ）クリアだけ、特別な締めのメッセージを出す。
    const isBoss = session.lesson.id === "lesson-boss";
    const headline = isBoss ? "クリア、おめでとう。" : "レッスン完了！";
    const epilogue = isBoss
      ? `
        <div class="result__epilogue">
          <p>たくさん、ふざけました。</p>
          <p>でも、ぜんぶ本当のことでした。</p>
          <p>家族がいて、毎日はにぎやかで、ちょっと大変で、</p>
          <p>そして、たまらなく愛おしい。</p>
          <p class="result__signature">— いつもありがとう、Yoko より</p>
        </div>`
      : "";

    app.innerHTML = `
      <div class="result">
        <img src="assets/celebrate.png" alt="おめでとう" />
        <h1>${headline}</h1>
        <div class="result__stats">
          <div class="result__stat">
            <div class="result__stat-head">獲得XP</div>
            <div class="result__stat-body">+${gainedXp}</div>
          </div>
          <div class="result__stat">
            <div class="result__stat-head">正答率</div>
            <div class="result__stat-body">${accuracy}%</div>
          </div>
        </div>
        ${epilogue}
        <button class="btn btn--green btn--block" id="homeBtn">つづける</button>
      </div>`;
    document.getElementById("homeBtn").addEventListener("click", renderHome);
  }

  // ---- ライフ切れ ------------------------------------------
  function showNoHeartsModal() {
    const mask = document.createElement("div");
    mask.className = "modal-mask";
    mask.innerHTML = `
      <div class="modal">
        <img src="assets/heart-empty.png" alt="" />
        <h2>ライフがなくなりました</h2>
        <p>ライフを回復してつづけよう。<br>（今回は練習用にすぐ回復できます）</p>
        <button class="btn btn--green btn--block" id="refillBtn">ライフを回復する</button>
      </div>`;
    document.body.appendChild(mask);
    mask.querySelector("#refillBtn").addEventListener("click", () => {
      state.hearts = MAX_HEARTS;
      saveState();
      mask.remove();
      renderHome();
    });
  }

  // ---- ユーティリティ --------------------------------------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  // ---- 画像フォールバック ----------------------------------
  // CODEX から画像が届くまで（または読み込み失敗時）は絵文字で代替する。
  const EMOJI_FALLBACK = {
    "streak.png": "🔥",
    "xp.png": "⚡",
    "heart.png": "❤️",
    "heart-empty.png": "💔",
    "mascot.png": "🦉",
    "mascot-small.png": "🦉",
    "celebrate.png": "🎉",
  };
  document.addEventListener(
    "error",
    (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement)) return;
      if (img.dataset.fallbackDone) return;
      img.dataset.fallbackDone = "1";
      const file = (img.getAttribute("src") || "").split("/").pop();
      const span = document.createElement("span");
      span.textContent = EMOJI_FALLBACK[file] || "🖼️";
      span.className = img.className;
      span.style.fontSize =
        getComputedStyle(img).width && parseInt(getComputedStyle(img).width)
          ? Math.max(20, parseInt(getComputedStyle(img).width) * 0.8) + "px"
          : "1.4em";
      span.style.lineHeight = "1";
      span.style.display = "inline-block";
      if (img.parentNode) img.parentNode.replaceChild(span, img);
    },
    true
  );

  // ---- 起動 ------------------------------------------------
  renderHome();
})();
