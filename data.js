/* ===========================================================
   レッスンデータ
   小さく始めるため、まずは1ユニット・3レッスン分。
   問題タイプ:
     - "choice"   : 4択（意味を選ぶ／正しい英文を選ぶ）
     - "arrange"  : 単語を並べ替えて英文をつくる
     - "listen"   : （将来用）今は choice と同じ扱い
   日本語話者が「やさしい日常英会話」を学ぶ想定。
   ※ 出題のテンション：ちょっとふざけた感じ。ボケ選択肢で笑わせつつ、
     正解の英文はちゃんと正しい文法にする。

   ── 登場人物（固有名詞）の命名ルール ──
   問題に人名を出すときは、性別・年齢に応じて次の名前を使う:
     男性・大人  : Aya
     男性・子ども: Oto
     女性・大人  : Yoko
     女性・子ども: Mana

   ── ヨウコさん一家の設定（問題の世界観） ──
     Yoko : 主人公。52歳。主婦で、パートタイムでも働いている。
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
        type: "arrange",
        prompt: "「私の名前はヨウコです。」を英語にしよう（まずは平和に）",
        sentence: ["My", "name", "is", "Yoko"],
        distractors: ["I", "am"],
        translation: "My name is Yoko",
      },
      {
        type: "choice",
        prompt: "ヨウコ、堂々の52歳。「私は52歳です。」の正しい英文は？",
        choices: [
          "I am 52 years old.",
          "I am 52 years young.",
          "I am 25 years old.（さば読みすぎ）",
          "I am 52 cats old.（猫で数えない）",
        ],
        answer: 0,
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
        prompt: "おまけにパートも。「私はパートでも働いています。」の英文は？",
        choices: [
          "I also work part-time.",
          "I also work as a ninja.（それは内緒）",
          "I also work in space.（出勤が大変）",
          "I no work, only sleep.（理想だけど）",
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
        prompt: "息子オト、ついにバイトデビュー。「息子は新宿のマクドナルドで働いています。」の英文は？",
        choices: [
          "My son works at McDonald's in Shinjuku.",
          "My son lives at McDonald's in Shinjuku.（住むな）",
          "My son is a hamburger.（食べられちゃう）",
          "My son eats McDonald's all day.（それは客）",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "オトは受験生。「息子は早稲田学院高校の3年生です。」の英文は？",
        choices: [
          "My son is a third-year student at Waseda Gakuin High School.",
          "My son is a third-year student at McDonald's.（バイト先が学校）",
          "My son is a first-year baby.（赤ちゃんに逆戻り）",
          "My son studies at home... on the sofa.（それは昼寝）",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「息子は夜じゅうゲームをします。」を英語にしよう（勉強は…？）",
        sentence: ["My", "son", "plays", "games", "all", "night"],
        distractors: ["play", "day"],
        translation: "My son plays games all night",
      },
      {
        type: "choice",
        prompt: "娘マナはピカピカの高校1年生。「娘は文京高校の1年生です。」の英文は？",
        choices: [
          "My daughter is a first-year student at Bunkyo High School.",
          "My daughter is a first-year student at the dance floor.（住所が違う）",
          "My daughter is a high-level boss.（ゲームの話）",
          "My daughter is one year old.（さすがに赤ちゃん）",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「彼女はダンスとボーイスカウトでいそがしいです。」を英語にしよう（体力おばけ）",
        sentence: ["She", "is", "busy", "with", "dance", "and", "scouts"],
        distractors: ["am", "sleep"],
        translation: "She is busy with dance and scouts",
      },
    ],
  },
  {
    id: "lesson-3",
    title: "自慢の夫、ですが…",
    questions: [
      {
        type: "choice",
        prompt: "夫アヤ、まずは良いところから。「夫はとてもハンサムです。」の英文は？",
        choices: [
          "My husband is very handsome.",
          "My husband is very handsome... I think.（自信なくすな）",
          "My husband is a refrigerator.（冷蔵庫ではない）",
          "My husband is very expensive.（売り物じゃない）",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "……が、健康診断で先生が固まる。「でも彼はコレステロールが高いです。」の英文は？",
        choices: [
          "But he has high cholesterol.",
          "But he has high mountains.（登るな）",
          "But he has high scores.（ゲームか）",
          "But he is very high.（テンションの話じゃない）",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「彼は血圧も高いです。」を英語にしよう（先生のため息が聞こえる）",
        sentence: ["He", "also", "has", "high", "blood", "pressure"],
        distractors: ["have", "low"],
        translation: "He also has high blood pressure",
      },
      {
        type: "choice",
        prompt: "そして夜。「彼は睡眠時無呼吸症候群です。」の英文は？",
        choices: [
          "He has sleep apnea.",
          "He has sleep pizza.（おいしそうだが違う）",
          "He has a sleeping dragon.（退治して）",
          "He sleeps like a king.（うらやましいだけ）",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "寝るときの夫はまるで戦闘機パイロット⁉「彼は寝るときCPAPのマスクをつけます。」の英文は？",
        choices: [
          "He wears a CPAP mask when he sleeps.",
          "He becomes a robot when he sleeps.（変身しない）",
          "He wears a superhero mask when he sleeps.（出動するな）",
          "He flies a plane when he sleeps.（夢の中で）",
        ],
        answer: 0,
      },
    ],
  },
];
