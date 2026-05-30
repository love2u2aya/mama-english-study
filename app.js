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

    // ボスを一度でもクリアした人にだけ、エンドロール再生ボタンを出す。
    // （未クリアの人にはネタバレになるので表示しない）
    const bossCleared = !!state.completed["lesson-boss"];
    const replay = bossCleared
      ? `<button class="btn btn--blue btn--block replay-credits" id="replayCredits">🎬 エンドロールをもう一度見る</button>`
      : "";

    app.innerHTML = `
      <div class="unit-banner">
        <div class="unit-banner__label">${escapeHtml(UNIT.label)}</div>
        <div class="unit-banner__title">${escapeHtml(UNIT.title)}</div>
      </div>
      <img class="mascot" src="assets/mascot.png" alt="マスコット" />
      <div class="path">
        ${nodes.join("")}
      </div>
      ${replay}
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

    if (bossCleared) {
      document.getElementById("replayCredits").addEventListener("click", () => {
        topbar.hidden = true;
        footer.hidden = true;
        playCredits();
      });
    }
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
          <p>Yokoさん、ぜんぶクリアです。</p>
          <p>たくさん、ふざけました。</p>
          <p>でも、ぜんぶ本当のことでした。</p>
          <p>ゲームばかりの息子も、忙しすぎる娘も、いびきの止まらない夫も。</p>
          <p>大変な毎日を、いつも笑顔にしてきたのは、あなたです。</p>
          <p class="result__signature">これからも、ずっと、笑える家族でいようね。</p>
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
    // ボスクリア時は「つづける」がエンドロールを開始する（ネタバレ防止で予告しない）。
    // エンドロール終了後は自動でホームへ戻る。それ以外は通常どおりホームへ。
    document
      .getElementById("homeBtn")
      .addEventListener("click", isBoss ? playCredits : renderHome);
  }

  // ===========================================================
  // エンドロール（映画風スタッフロール＋思い出モンタージュ＋合成音）
  // ボスをクリアした人だけが見られる、ご褒美の演出。
  // ===========================================================
  function collectMemoryLines() {
    // 走馬灯（モンタージュ）として背景に流す英文を用意する。
    // 全部を順番に出すのではなく、「グッとくる／キャラが立つ」名ぜりふを
    // 優先リストから選び、プレイ済み(クリア済みレッスンに登場)のものだけを
    // シャッフルして見せる。
    const HIGHLIGHTS = [
      // 家族・愛のコア
      "No matter what happens, I will always love you.",
      "You know what? Your snoring is my lullaby.",
      "Even when the kids leave home, I will still have you.",
      "I am happy to marry you",
      "Family love is the strongest magic!",
      "I love all of my family",
      "We did it, all of us together as a family!",
      "Yoko loves Aya very much.",
      "Yoko loves Aya",
      "I love Aya, CPAP mask and all.",
      "Even when Oto plays games all night, Yoko still loves him.",
      "I love my family very much",
      "I love my family",
      // キャラ紹介
      "Yoko is 52, but she still works hard.",
      "Yoko looks like a housewife, but she is actually a company president.",
      "Aya is very handsome.",
      "Aya wears a CPAP mask when he sleeps.",
      "Oto plays games all night",
      "Oto works at McDonald's in Shinjuku.",
      "Mana is busy with basketball, dance, English, and scouts, but she enjoys it.",
      "Mana wants to study abroad",
      "Mana won second place in Japan in an English presentation.",
    ];

    // プレイ済み(クリア済みレッスン)の正解英文の集合を作る
    const unlocked = new Set();
    LESSONS.forEach((lesson) => {
      if (!state.completed[lesson.id]) return;
      lesson.questions.forEach((q) => {
        if (q.type === "arrange" && q.translation) unlocked.add(q.translation);
        else if (q.type === "choice") unlocked.add(q.choices[q.answer]);
      });
    });

    // 優先リストのうち、プレイ済みのものだけを採用
    let picked = HIGHLIGHTS.filter((l) => unlocked.has(l));
    // 名ぜりふが一つも無い(序盤だけクリア)ときは、プレイ済み全体から拾う
    if (picked.length < 6) {
      picked = picked.concat([...unlocked].filter((l) => !picked.includes(l)));
    }
    // シャッフルして順番をランダムに
    for (let i = picked.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [picked[i], picked[j]] = [picked[j], picked[i]];
    }
    return picked;
  }

  function playCredits() {
    const memories = collectMemoryLines();

    // --- 画面構築（フルスクリーンのシアター） ---
    const stage = document.createElement("div");
    stage.className = "credits";
    stage.innerHTML = `
      <div class="credits__vignette"></div>
      <div class="credits__memories" id="creditsMemories"></div>
      <div class="credits__roll" id="creditsRoll">
        <div class="credits__title-card">
          <div class="credits__movie-label">ママえいご プレゼンツ</div>
          <h1 class="credits__movie-title">ある家族の、笑える物語</h1>
        </div>

        <section class="credits__block">
          <div class="credits__role">監督</div>
          <div class="credits__name">あなた</div>
        </section>

        <section class="credits__block">
          <div class="credits__role">出演</div>
          <div class="credits__name">Yoko —— 社長で、主婦で、母</div>
          <div class="credits__name">Aya —— 自慢の夫（いびき担当）</div>
          <div class="credits__name">Oto —— 息子（夜勤：ゲーム）</div>
          <div class="credits__name">Mana —— 娘（多忙、でも笑顔）</div>
        </section>

        <section class="credits__block">
          <div class="credits__role">衣装協力</div>
          <div class="credits__name">ジーンズ（あの日の足組み）</div>
        </section>

        <section class="credits__block">
          <div class="credits__role">医療指導</div>
          <div class="credits__name">CPAPマスク</div>
        </section>

        <section class="credits__block">
          <div class="credits__role">料理</div>
          <div class="credits__name">こっそり、大量の野菜</div>
          <div class="credits__name">（ハンバーグ役：ブロッコリー）</div>
        </section>

        <section class="credits__block">
          <div class="credits__role">特別協賛</div>
          <div class="credits__name">新宿のマクドナルド</div>
          <div class="credits__name">麦チョコ</div>
        </section>

        <section class="credits__block">
          <div class="credits__role">音楽</div>
          <div class="credits__name">フォークソング部（実態はバンド）</div>
        </section>

        <section class="credits__block">
          <div class="credits__role">栄誉</div>
          <div class="credits__name">菊章 / 英語発表 日本2位</div>
        </section>

        <section class="credits__block credits__finale">
          <p>大変な毎日を、いつも笑顔にしてきたのは、あなたです。</p>
          <p class="credits__wish">これからも、ずっと、笑える家族でいようね。</p>
        </section>

        <div class="credits__fin">FIN</div>
      </div>
      <button class="credits__skip" id="creditsSkip">スキップ ✕</button>
    `;
    document.body.appendChild(stage);
    requestAnimationFrame(() => stage.classList.add("credits--on"));

    // --- 思い出モンタージュ（英文が次々フェードイン） ---
    let memTimers = [];
    let memInterval = null;
    if (memories.length) {
      const memBox = stage.querySelector("#creditsMemories");
      // 画面を縦5バンドに分け、直前と同じ/隣のバンドを避けて配置する。
      // これで文字どうしが同じ場所で重なるのを防ぐ。
      const BANDS = [16, 30, 44, 58, 72]; // 各バンドの top(%)
      let mi = 0;
      let lastBand = -10;
      const showMem = () => {
        const span = document.createElement("div");
        span.className = "credits__memory";
        span.textContent = memories[mi % memories.length];
        // 直前のバンドから2つ以上離れた候補からランダムに選ぶ
        let candidates = BANDS.map((_, i) => i).filter(
          (i) => Math.abs(i - lastBand) >= 2
        );
        if (!candidates.length) candidates = BANDS.map((_, i) => i);
        const band = candidates[Math.floor(Math.random() * candidates.length)];
        lastBand = band;
        // バンド内で少しだけ揺らして単調さを消す
        span.style.top = BANDS[band] + (Math.random() * 4 - 2) + "%";
        memBox.appendChild(span);
        // フェードアウト後に除去（CSSのmemory-fade 5.6sに合わせる）
        setTimeout(() => span.remove(), 5600);
        mi++;
      };
      memInterval = setInterval(showMem, 2200);
      memTimers.push(() => clearInterval(memInterval));
      showMem();
    }

    // --- 合成音（荘厳なパッド和音） ---
    const stopAudio = startCreditsMusic();

    // --- 終了処理（スキップ or 最終演出のあと） ---
    const roll = stage.querySelector("#creditsRoll");
    let ended = false;
    let interactiveActive = false; // 最後の問題が出たら自動終了させない
    const end = () => {
      if (ended) return;
      ended = true;
      memTimers.forEach((fn) => fn());
      stopAudio();
      stage.classList.remove("credits--on");
      setTimeout(() => {
        stage.remove();
        renderHome();
      }, 700);
    };
    // ロールが流れ切っても、最後の演出中は終了しない（演出が締めを担う）
    roll.addEventListener("animationend", () => {
      if (!interactiveActive) end();
    });
    stage.querySelector("#creditsSkip").addEventListener("click", end);

    // --- 最後の問題（本人に答えを選ばせるインタラクティブな締め）---
    // ロール終盤でいったん「問題画面」に戻り、たった一つの選択肢
    // 「Family」を本人が選ぶことで、エンドロールの最後の言葉が完成する。
    let rollDur = 82;
    const parsed = parseFloat(getComputedStyle(roll).animationDuration);
    if (!isNaN(parsed) && parsed > 0) rollDur = parsed;
    const finaleAt = Math.max(2, rollDur - 14) * 1000;

    const finaleTimer = setTimeout(() => {
      interactiveActive = true;
      if (memInterval) clearInterval(memInterval);
      // ロールと思い出を消して、暗転の中に問題だけを出す
      stage.classList.add("credits--finale");

      const quiz = document.createElement("div");
      quiz.className = "finale-quiz";
      quiz.innerHTML = `
        <div class="finale-quiz__label">最後の問題</div>
        <div class="finale-quiz__prompt">Yoko が、<br>いちばん大切にしているものは？</div>
        <button class="finale-quiz__choice" id="finaleChoice">Family</button>
      `;
      stage.appendChild(quiz);
      requestAnimationFrame(() => quiz.classList.add("finale-quiz--on"));

      document
        .getElementById("finaleChoice")
        .addEventListener("click", () => playFinaleAnswer(stage, quiz, end), {
          once: true,
        });
    }, finaleAt);
    memTimers.push(() => clearTimeout(finaleTimer));
  }

  // 「Family」を選んだあとの、感動の締めシークエンス。
  function playFinaleAnswer(stage, quiz, end) {
    // 1) 選択肢を「正解」に光らせる
    const choice = quiz.querySelector(".finale-quiz__choice");
    choice.classList.add("finale-quiz__choice--correct");

    // 2) 少し余韻 → 問題を消す → 答えのシークエンスを順に灯す
    const seq = document.createElement("div");
    seq.className = "finale-answer";
    seq.innerHTML = `
      <div class="finale-answer__line finale-answer__main">I love my family.</div>
      <div class="finale-answer__names">
        <span class="finale-answer__name" data-i="0">Aya</span>
        <span class="finale-answer__dot" data-i="0">・</span>
        <span class="finale-answer__name" data-i="1">Oto</span>
        <span class="finale-answer__dot" data-i="1">・</span>
        <span class="finale-answer__name" data-i="2">Mana</span>
      </div>
      <div class="finale-answer__line finale-answer__sub">せかいで いちばん にぎやかな、わたしの宝物。</div>
      <div class="finale-answer__line finale-answer__bye">またあした。</div>
    `;
    stage.appendChild(seq);

    const reveal = (sel, delay) =>
      setTimeout(() => {
        const el = seq.querySelector(sel);
        if (el) el.classList.add("is-on");
      }, delay);
    const revealAll = (sel, delay, step) => {
      seq.querySelectorAll(sel).forEach((el, i) => {
        setTimeout(() => el.classList.add("is-on"), delay + i * step);
      });
    };

    // タイムライン（ミリ秒）
    setTimeout(() => quiz.classList.add("finale-quiz--gone"), 900);
    reveal(".finale-answer__main", 1700); // 「I love my family.」
    revealAll(".finale-answer__name, .finale-answer__dot", 3600, 600); // 名前が一つずつ灯る
    reveal(".finale-answer__sub", 6400); // 「わたしの宝物。」
    reveal(".finale-answer__bye", 8800); // 「またあした。」

    // 余韻のあと、そっと「とじる」を出す（自動では戻さない）
    setTimeout(() => {
      const close = document.createElement("button");
      close.className = "btn btn--green finale-answer__close";
      close.textContent = "とじる";
      close.addEventListener("click", end, { once: true });
      seq.appendChild(close);
      requestAnimationFrame(() => close.classList.add("is-on"));
    }, 10800);
  }

  // Web Audio API で、荘厳なパッド（数音の和音）をその場で合成する。
  // 音源ファイル不要・権利フリー。戻り値を呼ぶと停止する。
  function startCreditsMusic() {
    let ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      return function () {};
    }
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    // ふわっと入ってくる
    master.gain.linearRampToValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 3);

    // 軽いリバーブ代わりのローパス
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 1800;
    lp.connect(master);

    const voices = [];
    function chord(freqs, when, dur) {
      freqs.forEach((f) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = f;
        g.gain.value = 0;
        g.gain.setValueAtTime(0, when);
        g.gain.linearRampToValueAtTime(0.25, when + 1.2);
        g.gain.linearRampToValueAtTime(0.0, when + dur);
        o.connect(g);
        g.connect(lp);
        o.start(when);
        o.stop(when + dur + 0.1);
        voices.push(o);
      });
    }
    // ゆったりした進行（C → G → Am → F）。これをロール終了まで繰り返す。
    const progression = [
      [130.8, 196.0, 261.6, 329.6], // C
      [98.0, 196.0, 246.9, 392.0],  // G
      [110.0, 220.0, 261.6, 329.6], // Am
      [87.3, 174.6, 261.6, 349.2],  // F
    ];
    const bar = 6; // 1コードの長さ(秒)
    const TOTAL = 86; // ロール(82s)を覆う長さ
    const t0 = ctx.currentTime;
    let i = 0;
    let when = t0;
    while (when < t0 + TOTAL) {
      chord(progression[i % progression.length], when, bar);
      when += bar;
      i++;
    }
    // フィナーレ：最後にトニック(C)を長めに重ねて締める
    chord([130.8, 196.0, 261.6, 392.0], t0 + TOTAL, 8);
    // 終わりにかけて全体をフェードアウト
    master.gain.setValueAtTime(0.18, t0 + TOTAL - 6);
    master.gain.linearRampToValueAtTime(0, t0 + TOTAL + 6);

    return function stop() {
      try {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6);
        setTimeout(() => ctx.close(), 800);
      } catch (e) {
        /* noop */
      }
    };
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
