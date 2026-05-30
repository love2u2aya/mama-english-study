/* ===========================================================
   レッスンデータ
   小さく始めるため、まずは1ユニット・3レッスン分。
   問題タイプ:
     - "choice"   : 4択（意味を選ぶ）
     - "arrange"  : 単語を並べ替えて英文をつくる
     - "listen"   : （将来用）今は choice と同じ扱い
   日本語話者が「やさしい日常英会話」を学ぶ想定。

   ── 登場人物（固有名詞）の命名ルール ──
   問題に人名を出すときは、性別・年齢に応じて次の名前を使う:
     男性・大人  : Aya
     男性・子ども: Oto
     女性・大人  : Yoko
     女性・子ども: Mana
   新しい問題を追加するときも、この4人のキャストから選ぶこと。

   ── ヨウコさん一家の設定（問題の世界観） ──
     Yoko : 主人公。52歳。主婦で、パートタイムでも働いている。
     Aya  : Yoko の夫。かっこよくて、とても素敵な夫。よく手伝ってくれる。
     Oto  : 息子。毎日ゲームばかりしている。
     Mana : 娘。女子高生(JK)。ダンスとボーイスカウトで毎日いそがしい。
   問題の内容は、この一家の日常を題材にする。
   =========================================================== */

const UNIT = {
  label: "ユニット 1",
  title: "ヨウコさん一家のまいにち英会話",
};

const LESSONS = [
  {
    id: "lesson-1",
    title: "わたしのこと",
    questions: [
      {
        type: "arrange",
        prompt: "「私の名前はヨウコです。」を英語にしよう",
        sentence: ["My", "name", "is", "Yoko"],
        distractors: ["I", "am"],
        translation: "My name is Yoko",
      },
      {
        type: "choice",
        prompt: "「私は52歳です。」の正しい英文は？（ヨウコは52歳）",
        choices: [
          "I am 52 years old.",
          "I am 25 years old.",
          "I have 52 years.",
          "I am old 52 years.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「私は主婦です。」を英語にしよう",
        sentence: ["I", "am", "a", "housewife"],
        distractors: ["the", "is"],
        translation: "I am a housewife",
      },
      {
        type: "choice",
        prompt: "“I work part-time.” の意味は？",
        choices: [
          "私はパートで働いています。",
          "私は働いていません。",
          "私は社長です。",
          "私は学生です。",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「毎日いそがしいです。」を英語にしよう",
        sentence: ["I", "am", "busy", "every", "day"],
        distractors: ["is", "days"],
        translation: "I am busy every day",
      },
    ],
  },
  {
    id: "lesson-2",
    title: "わたしの家族",
    questions: [
      {
        type: "choice",
        prompt: "「夫はとても素敵です。」の正しい英文は？",
        choices: [
          "My husband is wonderful.",
          "My husband is hungry.",
          "My husband is a cat.",
          "My husband is Monday.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「夫はかっこいいです。」を英語にしよう（夫=Aya）",
        sentence: ["My", "husband", "is", "cool"],
        distractors: ["she", "nice"],
        translation: "My husband is cool",
      },
      {
        type: "choice",
        prompt: "「息子はいつもゲームをしています。」の英文は？（息子=Oto）",
        choices: [
          "My son always plays video games.",
          "My son always reads books.",
          "My son always cooks dinner.",
          "My son always cleans the house.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「私の息子はゲームが大好きです。」を英語にしよう",
        sentence: ["My", "son", "loves", "video", "games"],
        distractors: ["like", "is"],
        translation: "My son loves video games",
      },
      {
        type: "choice",
        prompt: "「娘は女子高生です。」の英文は？（娘=Mana）",
        choices: [
          "My daughter is a high school student.",
          "My daughter is a teacher.",
          "My daughter is a baby.",
          "My daughter is a doctor.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-3",
    title: "いそがしい毎日",
    questions: [
      {
        type: "choice",
        prompt: "「娘はダンスでいそがしいです。」の英文は？",
        choices: [
          "My daughter is busy with dance.",
          "My daughter is busy with sleep.",
          "My daughter is busy with nothing.",
          "My daughter is busy with lunch.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「彼女はダンスが得意です。」を英語にしよう（彼女=Mana）",
        sentence: ["She", "is", "good", "at", "dancing"],
        distractors: ["am", "the"],
        translation: "She is good at dancing",
      },
      {
        type: "choice",
        prompt: "「娘はボーイスカウトにも入っています。」の英文は？",
        choices: [
          "She is also in the Boy Scouts.",
          "She is also in the kitchen.",
          "She is also in bed.",
          "She is also in the car.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「夫はいつも私を手伝ってくれます。」を英語にしよう",
        sentence: ["My", "husband", "always", "helps", "me"],
        distractors: ["help", "she"],
        translation: "My husband always helps me",
      },
      {
        type: "arrange",
        prompt: "「私は家族が大好きです。」を英語にしよう",
        sentence: ["I", "love", "my", "family"],
        distractors: ["like", "are"],
        translation: "I love my family",
      },
    ],
  },
];
