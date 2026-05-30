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
   =========================================================== */

const UNIT = {
  label: "ユニット 1",
  title: "あいさつと自己紹介",
};

const LESSONS = [
  {
    id: "lesson-1",
    title: "あいさつ",
    questions: [
      {
        type: "choice",
        prompt: "「おはよう」は英語で？",
        choices: ["Good morning", "Good night", "Good afternoon", "Goodbye"],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "“Thank you.” の意味は？",
        choices: ["ごめんなさい", "ありがとう", "こんにちは", "さようなら"],
        answer: 1,
      },
      {
        type: "arrange",
        prompt: "「はじめまして。」を英語にしよう",
        sentence: ["Nice", "to", "meet", "you"],
        distractors: ["see", "and"],
        translation: "Nice to meet you",
      },
      {
        type: "choice",
        prompt: "別れぎわの「またね！」に近いのは？",
        choices: ["See you!", "Sorry!", "Please!", "Welcome!"],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-2",
    title: "自己紹介",
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
        prompt: "“Where are you from?” の意味は？",
        choices: ["お元気ですか？", "ご出身はどちらですか？", "何歳ですか？", "お名前は？"],
        answer: 1,
      },
      {
        type: "arrange",
        prompt: "「私は日本出身です。」を英語にしよう",
        sentence: ["I", "am", "from", "Japan"],
        distractors: ["to", "in"],
        translation: "I am from Japan",
      },
      {
        type: "choice",
        prompt: "“How are you?” への自然な返事は？",
        choices: ["I'm fine, thank you.", "Good morning.", "You're welcome.", "Here you are."],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-3",
    title: "家族のこと",
    questions: [
      {
        type: "choice",
        prompt: "“mother” の意味は？",
        choices: ["父", "母", "姉妹", "兄弟"],
        answer: 1,
      },
      {
        type: "arrange",
        prompt: "「これは私の家族です。」を英語にしよう",
        sentence: ["This", "is", "my", "family"],
        distractors: ["are", "the"],
        translation: "This is my family",
      },
      {
        type: "choice",
        prompt: "「子どもが2人います。」は？",
        choices: [
          "I have two children.",
          "I like two children.",
          "I am two children.",
          "I go two children.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "「彼女は私の娘のマナです。」は？",
        choices: [
          "She is my daughter, Mana.",
          "He is my son, Oto.",
          "She is my mother, Yoko.",
          "He is my father, Aya.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「私は子どもたちが大好きです。」を英語にしよう",
        sentence: ["I", "love", "my", "kids"],
        distractors: ["like", "are"],
        translation: "I love my kids",
      },
    ],
  },
];
