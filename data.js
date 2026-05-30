/* ===========================================================
   レッスンデータ
   小さく始めるため、まずは1ユニット・3レッスン分。
   問題タイプ:
     - "choice"   : 4択（正しい英文を選ぶ）
     - "arrange"  : 単語を並べ替えて英文をつくる
     - "listen"   : （将来用）今は choice と同じ扱い
   日本語話者が「やさしい日常英会話」を学ぶ想定。
   ※ 出題のテンション：ちょっとふざけた感じ。ボケ選択肢で笑わせつつ、
     正解の英文はちゃんと正しい文法にする。
   ※ ほとんどの問題に、下記4人の誰かを「名前で」登場させること。

   ── 登場人物（固有名詞）の命名ルール ──
   問題に人名を出すときは、性別・年齢に応じて次の名前を使う:
     男性・大人  : Aya
     男性・子ども: Oto
     女性・大人  : Yoko
     女性・子ども: Mana

   ── ヨウコさん一家の設定（問題の世界観） ──
     Yoko : 主人公。52歳。主婦で、パートタイムでも働いている。
            ★問題を解くのは Yoko 本人なので、Yoko のネタは
              一人称（I / my）でも三人称（Yoko / she）でもOK。
              例) 「私は52歳ですがまだ頑張ります」=
                  "I am 52, but I still work hard."
                 「Yokoは52歳ですが、まだ頑張っている」=
                  "Yoko is 52, but she still works hard."
     Aya  : Yoko の夫。とてもハンサムで自慢の夫。
            …が、コレステロールも血圧も高め。睡眠時無呼吸症候群で、
            寝るときは CPAP（シーパップ）のマスクをつける。
     Oto  : 息子。早稲田学院高校の3年生。新宿のマクドナルドでアルバイト。
            夜じゅうゲームをしている。
     Mana : 娘。文京高校の1年生。ダンスとボーイスカウトでいそがしい。
   問題の内容は、この一家の日常をネタにする。
   =========================================================== */

const UNIT = {
  label: "ユニット 1",
  title: "ヨウコさん一家の（ちょっとカオスな）英会話",
};

const LESSONS = [
  {
    id: "lesson-1",
    title: "わたし、ヨウコ52歳",
    questions: [
      {
        type: "choice",
        prompt: "まずは自己紹介から。「Yokoは52歳ですが、まだまだ頑張っています。」の英文は？",
        choices: [
          "Yoko is 52, but she still works hard.",
          "Yoko is 52, but she still sleeps all day.（寝てる）",
          "Yoko is 52 cats old.（猫で数えない）",
          "Yoko is 25... maybe.（さば読みすぎ）",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「私の名前はヨウコです。」を英語にしよう（一人称でどうぞ）",
        sentence: ["My", "name", "is", "Yoko"],
        distractors: ["I", "am"],
        translation: "My name is Yoko",
      },
      {
        type: "arrange",
        prompt: "「私は主婦です。」を英語にしよう（家の最高責任者）",
        sentence: ["I", "am", "a", "housewife"],
        distractors: ["the", "is"],
        translation: "I am a housewife",
      },
      {
        type: "choice",
        prompt: "おまけにパートも。「Yokoはパートでも働いています。」の英文は？",
        choices: [
          "Yoko also works part-time.",
          "Yoko also works as a ninja.（それは内緒）",
          "Yoko also works in space.（出勤が大変）",
          "Yoko never works, only naps.（理想だけど）",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「私は毎日とてもいそがしいです。」を英語にしよう（悲鳴）",
        sentence: ["I", "am", "very", "busy", "every", "day"],
        distractors: ["is", "days"],
        translation: "I am very busy every day",
      },
    ],
  },
  {
    id: "lesson-2",
    title: "わが家の子どもたち",
    questions: [
      {
        type: "choice",
        prompt: "息子オト、ついにバイトデビュー。「Otoは新宿のマクドナルドで働いています。」の英文は？",
        choices: [
          "Oto works at McDonald's in Shinjuku.",
          "Oto lives at McDonald's in Shinjuku.（住むな）",
          "Oto is a hamburger.（食べられちゃう）",
          "Oto eats McDonald's all day.（それは客）",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "オトは受験生。「Otoは早稲田学院高校の3年生です。」の英文は？",
        choices: [
          "Oto is a third-year student at Waseda Gakuin High School.",
          "Oto is a third-year student at McDonald's.（バイト先が学校）",
          "Oto is a first-year baby.（赤ちゃんに逆戻り）",
          "Oto studies hard... on the sofa.（それは昼寝）",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「Otoは夜じゅうゲームをします。」を英語にしよう（勉強は…？）",
        sentence: ["Oto", "plays", "games", "all", "night"],
        distractors: ["play", "day"],
        translation: "Oto plays games all night",
      },
      {
        type: "choice",
        prompt: "娘マナはピカピカの高校1年生。「Manaは文京高校の1年生です。」の英文は？",
        choices: [
          "Mana is a first-year student at Bunkyo High School.",
          "Mana is a first-year student at the dance floor.（住所が違う）",
          "Mana is a high-level boss.（ゲームの話）",
          "Mana is one year old.（さすがに赤ちゃん）",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「Manaはダンスとボーイスカウトでいそがしいです。」を英語にしよう（体力おばけ）",
        sentence: ["Mana", "is", "busy", "with", "dance", "and", "scouts"],
        distractors: ["am", "sleep"],
        translation: "Mana is busy with dance and scouts",
      },
    ],
  },
  {
    id: "lesson-3",
    title: "自慢の夫、ですが…",
    questions: [
      {
        type: "choice",
        prompt: "夫アヤ、まずは良いところから。「Ayaはとてもハンサムです。」の英文は？",
        choices: [
          "Aya is very handsome.",
          "Aya is very handsome... I think.（自信なくすな）",
          "Aya is a refrigerator.（冷蔵庫ではない）",
          "Aya is very expensive.（売り物じゃない）",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "……が、健康診断で先生が固まる。「でもAyaはコレステロールが高いです。」の英文は？",
        choices: [
          "But Aya has high cholesterol.",
          "But Aya has high mountains.（登るな）",
          "But Aya has high scores.（ゲームか）",
          "But Aya is very high.（テンションの話じゃない）",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「Ayaは血圧も高いです。」を英語にしよう（先生のため息が聞こえる）",
        sentence: ["Aya", "also", "has", "high", "blood", "pressure"],
        distractors: ["have", "low"],
        translation: "Aya also has high blood pressure",
      },
      {
        type: "choice",
        prompt: "そして夜。「Ayaは睡眠時無呼吸症候群です。」の英文は？",
        choices: [
          "Aya has sleep apnea.",
          "Aya has sleep pizza.（おいしそうだが違う）",
          "Aya has a sleeping dragon.（退治して）",
          "Aya sleeps like a king.（うらやましいだけ）",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "寝るときのアヤはまるで戦闘機パイロット⁉「Ayaは寝るときCPAPのマスクをつけます。」の英文は？",
        choices: [
          "Aya wears a CPAP mask when he sleeps.",
          "Aya becomes a robot when he sleeps.（変身しない）",
          "Aya wears a superhero mask when he sleeps.（出動するな）",
          "Aya flies a plane when he sleeps.（夢の中で）",
        ],
        answer: 0,
      },
    ],
  },
];
