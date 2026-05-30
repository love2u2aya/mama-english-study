/* ===========================================================
   レッスンデータ
   問題タイプ:
     - "choice"   : 4択（正しい英文を選ぶ）
     - "arrange"  : 単語を並べ替えて英文をつくる
     - "listen"   : （将来用）今は choice と同じ扱い
   日本語話者が「やさしい日常英会話」を学ぶ想定。

   ── トーンの方針 ──
     ・ユニット名／レッスン名は “ふつうの英語教材” に見えるよう真面目に。
       （例：自己紹介／家族の紹介／健康について…）
     ・中身（prompt と選択肢）はちょっとふざけた感じ。
       ボケはハズレ選択肢に仕込み、正解の英文はちゃんと正しい文法にする。
     ・ほとんどの問題に、下記4人の誰かを「名前で」登場させる。

   ── 登場人物（固有名詞）の命名ルール ──
     男性・大人  : Aya
     男性・子ども: Oto
     女性・大人  : Yoko
     女性・子ども: Mana

   ── ヨウコさん一家の設定（問題の世界観） ──
     Yoko : 主人公。52歳。主婦で、パートでも働いている。Aya を愛している。
            ★問題を解くのは Yoko 本人なので、一人称(I/my)でも三人称(Yoko/she)でもOK。
     Aya  : Yoko の夫。とてもハンサムで自慢の夫。
            …が、コレステロールも血圧も高め。睡眠時無呼吸症候群で、
            寝るときは CPAP（シーパップ）のマスクをつける。
     Oto  : 息子。早稲田学院高校の3年生。新宿のマクドナルドでアルバイト。
            夜じゅうゲーム。元ギタリストだが今はベース。元文系だが今は理系。
     Mana : 娘。文京高校の1年生。ダンスとボーイスカウトでいそがしい。
   =========================================================== */

const UNIT = {
  label: "ユニット 1",
  title: "日常英会話 ベーシック",
};

const LESSONS = [
  {
    id: "lesson-1",
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
        prompt: "「Yokoは52歳ですが、まだまだ頑張っています。」の英文は？",
        choices: [
          "Yoko is 52, but she still works hard.",
          "Yoko is 52, but she still sleeps all day.",
          "Yoko is 52 cats old.",
          "Yoko is 25... maybe.",
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
        prompt: "「Yokoはパートでも働いています。」の英文は？",
        choices: [
          "Yoko also works part-time.",
          "Yoko also works as a ninja.",
          "Yoko also works in space.",
          "Yoko never works, only naps.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「私は毎日とてもいそがしいです。」を英語にしよう",
        sentence: ["I", "am", "very", "busy", "every", "day"],
        distractors: ["is", "days"],
        translation: "I am very busy every day",
      },
    ],
  },
  {
    id: "lesson-2",
    title: "家族の紹介",
    questions: [
      {
        type: "arrange",
        prompt: "「Ayaは私の夫です。」を英語にしよう",
        sentence: ["Aya", "is", "my", "husband"],
        distractors: ["are", "her"],
        translation: "Aya is my husband",
      },
      {
        type: "choice",
        prompt: "「Otoは私の息子です。」の英文は？",
        choices: [
          "Oto is my son.",
          "Oto is my boss.",
          "Oto is my sun.",
          "Oto is my sofa.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "「Manaは私の娘です。」の英文は？",
        choices: [
          "Mana is my daughter.",
          "Mana is my water.",
          "Mana is my doctor.",
          "Mana is my manager.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "夫婦円満。「YokoはAyaをとても愛しています。」の英文は？",
        choices: [
          "Yoko loves Aya very much.",
          "Yoko loves Aya's CPAP machine.",
          "Yoko loves Aya... on payday.",
          "Yoko loves Aya like a hamburger.",
        ],
        answer: 0,
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
  {
    id: "lesson-3",
    title: "子どもたちのこと",
    questions: [
      {
        type: "choice",
        prompt: "息子オト、バイトデビュー。「Otoは新宿のマクドナルドで働いています。」の英文は？",
        choices: [
          "Oto works at McDonald's in Shinjuku.",
          "Oto lives at McDonald's in Shinjuku.",
          "Oto is a hamburger.",
          "Oto eats McDonald's all day.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "オトは受験生。「Otoは早稲田学院高校の3年生です。」の英文は？",
        choices: [
          "Oto is a third-year student at Waseda Gakuin High School.",
          "Oto is a third-year student at McDonald's.",
          "Oto is a first-year baby.",
          "Oto studies hard... on the sofa.",
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
        prompt: "オトの音楽遍歴。「Otoは昔ギタリストでしたが、今はベースを弾きます。」の英文は？",
        choices: [
          "Oto used to play the guitar, but now he plays the bass.",
          "Oto used to play the guitar, but now he plays the recorder.",
          "Oto used to play the guitar, but now he plays games.",
          "Oto plays the guitar, the bass, and the drums at once.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "進路も大転換。「Otoは元は文系でしたが、今は理系です。」の英文は？",
        choices: [
          "Oto used to be a humanities student, but now he studies science.",
          "Oto used to be a humanities student, but now he studies sleeping.",
          "Oto used to study science, but now he studies snacks.",
          "Oto studies nothing, only games.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "娘マナは高校1年生。「Manaは文京高校の1年生です。」の英文は？",
        choices: [
          "Mana is a first-year student at Bunkyo High School.",
          "Mana is a first-year student at the dance floor.",
          "Mana is a high-level boss.",
          "Mana is one year old.",
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
    id: "lesson-4",
    title: "健康について",
    questions: [
      {
        type: "choice",
        prompt: "まずは自慢から。「Ayaはとてもハンサムです。」の英文は？",
        choices: [
          "Aya is very handsome.",
          "Aya is very handsome... I think.",
          "Aya is a refrigerator.",
          "Aya is very expensive.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "健康診断で先生が固まる。「でもAyaはコレステロールが高いです。」の英文は？",
        choices: [
          "But Aya has high cholesterol.",
          "But Aya has high mountains.",
          "But Aya has high scores.",
          "But Aya is very high.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「Ayaは血圧も高いです。」を英語にしよう（先生のため息）",
        sentence: ["Aya", "also", "has", "high", "blood", "pressure"],
        distractors: ["have", "low"],
        translation: "Aya also has high blood pressure",
      },
      {
        type: "choice",
        prompt: "そして夜。「Ayaは睡眠時無呼吸症候群です。」の英文は？",
        choices: [
          "Aya has sleep apnea.",
          "Aya has sleep pizza.",
          "Aya has a sleeping dragon.",
          "Aya sleeps like a king.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "寝るアヤはまるで戦闘機パイロット⁉「Ayaは寝るときCPAPのマスクをつけます。」の英文は？",
        choices: [
          "Aya wears a CPAP mask when he sleeps.",
          "Aya becomes a robot when he sleeps.",
          "Aya wears a superhero mask when he sleeps.",
          "Aya flies a plane when he sleeps.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-5",
    title: "気持ちを伝えよう",
    questions: [
      {
        type: "arrange",
        prompt: "「YokoはAyaを愛しています。」を英語にしよう",
        sentence: ["Yoko", "loves", "Aya"],
        distractors: ["love", "me"],
        translation: "Yoko loves Aya",
      },
      {
        type: "choice",
        prompt: "CPAPごと愛す。「私はCPAPマスクごとAyaを愛しています。」の英文は？",
        choices: [
          "I love Aya, CPAP mask and all.",
          "I love Aya only without the mask.",
          "I love Aya's high cholesterol.",
          "I love Aya like a hamburger.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "夜じゅうゲームでも…。「Otoが夜じゅうゲームをしても、Yokoは彼を愛しています。」の英文は？",
        choices: [
          "Even when Oto plays games all night, Yoko still loves him.",
          "When Oto plays games all night, Yoko sells him.",
          "When Oto plays games all night, Yoko joins him.",
          "When Oto plays games, Yoko becomes a boss.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「私は家族がとても大好きです。」を英語にしよう",
        sentence: ["I", "love", "my", "family", "very", "much"],
        distractors: ["are", "to"],
        translation: "I love my family very much",
      },
      {
        type: "choice",
        prompt: "しめくくり。「いろいろあるけど、Yokoは幸せです。」の英文は？",
        choices: [
          "There is a lot going on, but Yoko is happy.",
          "There is a lot going on, so Yoko is hungry.",
          "There is a lot going on, so Yoko runs away.",
          "There is a lot going on, but Yoko is a ninja.",
        ],
        answer: 0,
      },
    ],
  },
];
