/* ===========================================================
   レッスンデータ
   問題タイプ:
     - "choice"   : 4択（正しい英文を選ぶ）
     - "arrange"  : 単語を並べ替えて英文をつくる
     - "listen"   : （将来用）今は choice と同じ扱い
   日本語話者（ママ＝Yoko）向けの、やさしい日常英会話。

   ── トーンの方針 ──
     ・ユニット名／レッスン名は “ふつうの英語教材” に見えるよう真面目に。
     ・中身（prompt と選択肢）はちょっとふざけた感じ。ボケはハズレ選択肢に。
     ・選択肢に日本語の注釈はつけない。ボケ回答は堂々と英文だけで。
     ・正解の英文はちゃんと正しい文法にする。
     ・ほとんどの問題に、下記4人の誰かを「名前で」登場させる。
     ・名前は英字表記で統一：Yoko / Aya / Oto / Mana。

   ── 登場人物（命名ルール） ──
     女性・大人  : Yoko （葉子）
     男性・大人  : Aya  （夫）
     男性・子ども: Oto（響＝息子）
     女性・子ども: Mana   （愛＝娘）

   ── ヨウコさん一家・設定メモ ──
     Yoko : 主人公。54歳（7月に55歳。四捨五入で60歳と言い張る）。OtoとManaの母。
            主婦に見えるが実は会社の社長。パートもしている。Aya を愛している。
            茶色の髪で肩くらいの長さ。背中が痛い。夫と出会ったときはジーンズで
            足を組んでいた。こっそり麦チョコやチョコアイスを食べる（ダイエットは明日から）。
            全身脱毛している。フォークソング部の保護者会の部長。
     Aya  : 夫。とてもハンサムで自慢の夫。コレステロール・血圧が高い。
            睡眠時無呼吸症候群で寝るとき CPAP マスク。毛が濃い。老眼鏡デビュー。
            Yoko と夫婦で全身に置き針をしている。
     Oto: 息子。17歳。早稲田学院高校3年生。新宿のマクドナルドでバイト。
            学校のフォークソング部（実態はバンド：ギター・ベース・歌）。
            元ギター→今はベース。元理系→今は文系。父Ayaと同じで毛が濃い。
            得意料理は卵スープと茹でブロッコリー。夜じゅうゲーム。
            TOEFL-ITP/TOEIC-IP を申し込む話。バンドの演奏予定が中止に。
            ちょっと反抗期。
     Mana   : 娘。15歳。文京高校1年生。勉強より運動が得意。元バスケ部
            （背番号5・白いユニフォーム・シュート役）。ダンスを習う。
            英語を習い、留学を目指す。塾に通う。アクロバットもやる。
            ボーイスカウト（ベンチャースカウト／杉並第5団・東京連盟）で
            菊章を受章。英語発表で日本2位。忙しいけど忙しさを楽しむタイプ。
            幼い頃はおかしな格好で寝ていた。広島までバスで行けると思っていた（天然）。
     家族 : 4人家族。会話と笑いを大切にする。料理にはこっそり大量の野菜。
            ハンバーグは肉ではなく野菜でできている。結婚記念日は4月15日。
            クリスマスイブはシェーキーズで家族ディナー。
   =========================================================== */

const UNIT = {
  label: "ユニット 1",
  title: "日常英会話 ベーシック",
};

const LESSONS = [
  {
    id: "lesson-0",
    title: "はじめに",
    questions: [
      {
        type: "choice",
        prompt: "ようこそ！まずはこのアプリの説明から。「これは英語のフォニックス学習アプリです。」の英文は？",
        choices: [
          "This is an English phonics app.",
          "This is a cooking app for broccoli.",
          "This is a sleeping app for tired dads.",
          "This is a secret game for ninjas.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "そして一番大事なこと。「ご安心を、このアプリは無料です！」の英文は？",
        choices: [
          "Don't worry, this app is free!",
          "This app costs one million yen.",
          "This app costs your whole salary.",
          "This app is free... just kidding, it's still free.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "準備OK！「さあ、Yokoの家族と英語を学びましょう。」の英文は？",
        choices: [
          "Let's learn English with Yoko's family.",
          "Let's learn English with a sleeping dragon.",
          "Let's eat hamburgers with Yoko's family.",
          "Let's run away from English forever.",
        ],
        answer: 0,
      },
    ],
  },
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
        prompt: "「Yokoは54歳ですが、まだまだ頑張っています。」の英文は？",
        choices: [
          "Yoko is 54, but she still works hard.",
          "Yoko is 54, but she still sleeps all day.",
          "Yoko is 54 cats old.",
          "Yoko is 25... maybe.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "7月で一つ年をとる。「Yokoは7月に55歳になります。」の英文は？",
        choices: [
          "Yoko turns 55 in July.",
          "Yoko turns into a dragon in July.",
          "Yoko turns 15 in July.",
          "Yoko turns left in July.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "強気の四捨五入。「四捨五入すれば、Yokoは60歳です。」の英文は？",
        choices: [
          "Rounded up, Yoko is 60.",
          "Rounded up, Yoko is 100.",
          "Rounded up, Yoko is still 25.",
          "Rounded up, Yoko is a teenager.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "お年頃のお悩み。「Yokoは背中が痛いです。」の英文は？",
        choices: [
          "Yoko has a sore back.",
          "Yoko has a sore dragon.",
          "Yoko has a spare back.",
          "Yoko has a back made of broccoli.",
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
        prompt: "実はすごい人。「Yokoは主婦に見えますが、実は会社の社長です。」の英文は？",
        choices: [
          "Yoko looks like a housewife, but she is actually a company president.",
          "Yoko looks like a housewife, and she is actually a housewife.",
          "Yoko looks like a company president, but she is actually a cat.",
          "Yoko is actually a secret ninja president.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "髪型の話。「Yokoは茶色で肩くらいの髪です。」の英文は？",
        choices: [
          "Yoko has brown, shoulder-length hair.",
          "Yoko has brown, floor-length hair.",
          "Yoko has green, spiky hair.",
          "Yoko has no hair, only a hat.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "なれそめ。「Ayaと出会ったとき、Yokoはジーンズで足を組んでいました。」の英文は？",
        choices: [
          "When she met Aya, Yoko was wearing jeans with her legs crossed.",
          "When she met Aya, Yoko was wearing a spacesuit.",
          "When she met Aya, Yoko was upside down.",
          "When she met Aya, Yoko was eating broccoli.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "ダイエット中…のはず。「Yokoはこっそり麦チョコを食べています。」の英文は？",
        choices: [
          "Yoko secretly eats chocolate puffs.",
          "Yoko proudly eats a whole cake.",
          "Yoko secretly eats her own diet plan.",
          "Yoko never eats, she only dreams of snacks.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "美意識は高い。「Yokoは全身脱毛をしています。」の英文は？",
        choices: [
          "Yoko gets full-body hair removal.",
          "Yoko gets a full-body massage.",
          "Yoko removes the whole house.",
          "Yoko grows a full beard.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "ダイエットは明日から。「Yokoは今日もチョコアイスを食べました。」の英文は？",
        choices: [
          "Yoko ate chocolate ice cream again today.",
          "Yoko ate a chocolate dragon again today.",
          "Yoko ate only broccoli again today.",
          "Yoko ate her diet plan again today.",
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
        type: "choice",
        prompt: "まずは人数。「私たちは4人家族です。」の英文は？",
        choices: [
          "We are a family of four.",
          "We are a family of forty.",
          "We are a family of dragons.",
          "We are a family of one, plus three ninjas.",
        ],
        answer: 0,
      },
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
          "Yoko loves Aya only on payday.",
          "Yoko loves Aya like a hamburger.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "記念日。「私たちの結婚記念日は4月15日です。」の英文は？",
        choices: [
          "Our wedding anniversary is April 15th.",
          "Our wedding anniversary is every day, sadly.",
          "Our wedding anniversary is never.",
          "Our wedding anniversary is at McDonald's.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "わが家のモットー。「私たちの家族は会話と笑いを大切にしています。」の英文は？",
        choices: [
          "Our family loves talking and laughing.",
          "Our family loves shouting and crying.",
          "Our family loves sleeping and snoring.",
          "Our family loves nothing, only broccoli.",
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
    title: "息子のこと",
    questions: [
      {
        type: "choice",
        prompt: "息子Oto。「Otoは17歳の高校生です。」の英文は？",
        choices: [
          "Oto is a 17-year-old high school student.",
          "Oto is a 71-year-old high school student.",
          "Oto is a 17-year-old baby.",
          "Oto is a 17-year-old hamburger.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "受験生。「Otoは早稲田学院高校の3年生です。」の英文は？",
        choices: [
          "Oto is a third-year student at Waseda Gakuin High School.",
          "Oto is a third-year student at McDonald's.",
          "Oto is a first-year baby.",
          "Oto studies hard... on the sofa.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "バイトデビュー。「Otoは新宿のマクドナルドで働いています。」の英文は？",
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
        prompt: "部活。「Otoは学校のフォークソング部に入っています。」の英文は？",
        choices: [
          "Oto is in the folk song club at school.",
          "Oto is in the napping club at school.",
          "Oto is in the broccoli club at school.",
          "Oto is in no club, only games.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "実態は…？「フォークソング部という名前ですが、実はバンドのようなものです。」の英文は？",
        choices: [
          "It is called a folk song club, but it is really more like a band.",
          "It is called a folk song club, and they only fold socks.",
          "It is called a band, but it is really a cooking club.",
          "It is called a club, but nobody ever comes.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "担当は何でも。「Otoはギターとベースを弾いて、歌も歌います。」の英文は？",
        choices: [
          "Oto plays the guitar and the bass, and he also sings.",
          "Oto plays the guitar and the bass while sleeping.",
          "Oto plays nothing, but he sings in the shower.",
          "Oto plays the broccoli and the egg soup.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "音楽遍歴。「Otoは昔ギタリストでしたが、今はベースを弾きます。」の英文は？",
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
        prompt: "進路も大転換。「Otoは元は理系でしたが、今は文系です。」の英文は？",
        choices: [
          "Oto used to study science, but now he is a humanities student.",
          "Oto used to study science, but now he studies sleeping.",
          "Oto used to be a humanities student, but now he studies snacks.",
          "Oto studies nothing, only games.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "試験の話。「OtoはTOEFL-ITPとTOEIC-IPに申し込みます。」の英文は？",
        choices: [
          "Oto is signing up for the TOEFL-ITP and the TOEIC-IP.",
          "Oto is signing up for a nap.",
          "Oto is signing up for a hamburger contest.",
          "Oto is signing up to study science... someday.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "残念なお知らせ。「Otoのバンドの演奏予定は中止になりました。」の英文は？",
        choices: [
          "Oto's band performance was canceled.",
          "Oto's band performance was on the moon.",
          "Oto's band performance lasted ten years.",
          "Oto's band performance was actually a nap.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "お年頃。「Otoは少し反抗期です。」の英文は？",
        choices: [
          "Oto is going through a rebellious phase.",
          "Oto is going through a refrigerator.",
          "Oto is going through a hamburger phase.",
          "Oto is going through the ceiling.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「Otoは夜じゅうゲームをします。」を英語にしよう",
        sentence: ["Oto", "plays", "games", "all", "night"],
        distractors: ["play", "day"],
        translation: "Oto plays games all night",
      },
      {
        type: "arrange",
        prompt: "「Otoは父のAyaと同じで毛が濃いです。」を英語にしよう",
        sentence: ["Oto", "has", "thick", "hair", "like", "Aya"],
        distractors: ["have", "thin"],
        translation: "Oto has thick hair like Aya",
      },
      {
        type: "choice",
        prompt: "料理レパートリー。「Otoの得意料理は卵スープと茹でたブロッコリーです。」の英文は？",
        choices: [
          "Oto's specialty dishes are egg soup and boiled broccoli.",
          "Oto's specialty dish is a five-course French dinner.",
          "Oto's specialty dish is ordering McDonald's.",
          "Oto can only boil water, on a good day.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-4",
    title: "娘のこと",
    questions: [
      {
        type: "choice",
        prompt: "娘Mana。「Manaは15歳の高校生です。」の英文は？",
        choices: [
          "Mana is a 15-year-old high school student.",
          "Mana is a 51-year-old high school student.",
          "Mana is a 15-year-old grandma.",
          "Mana is a 15-year-old hamburger.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "ピカピカの1年生。「Manaは文京高校の1年生です。」の英文は？",
        choices: [
          "Mana is a first-year student at Bunkyo High School.",
          "Mana is a first-year student at the dance floor.",
          "Mana is a high-level boss.",
          "Mana is one year old.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "運動神経バツグン。「Manaは勉強より体を動かすことが得意です。」の英文は？",
        choices: [
          "Mana is better at sports than at studying.",
          "Mana is better at studying than at sports.",
          "Mana is better at sports than at breathing.",
          "Mana is the best at doing nothing.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "元バスケ部。「Manaは昔バスケットボールをしていました。」の英文は？",
        choices: [
          "Mana used to play basketball.",
          "Mana used to eat basketballs.",
          "Mana used to sleep during basketball.",
          "Mana used to be a basketball.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "コートの主役。「Manaは背番号5の白いユニフォームで、シュート役でした。」の英文は？",
        choices: [
          "Mana wore number 5 and a white uniform, and she was the shooter.",
          "Mana wore number 500 and a rainbow uniform.",
          "Mana wore number 5, but she was the team mascot.",
          "Mana wore pajamas and shot at nothing.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "習いごと。「Manaはダンスを習っています。」の英文は？",
        choices: [
          "Mana takes dance lessons.",
          "Mana takes nap lessons.",
          "Mana takes hamburger lessons.",
          "Mana gives lessons to her parents.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "「Manaは留学したいと思っています。」を英語にしよう",
        sentence: ["Mana", "wants", "to", "study", "abroad"],
        distractors: ["want", "home"],
        translation: "Mana wants to study abroad",
      },
      {
        type: "arrange",
        prompt: "「Manaは英語を習っています。」を英語にしよう",
        sentence: ["Mana", "is", "learning", "English"],
        distractors: ["am", "learn"],
        translation: "Mana is learning English",
      },
      {
        type: "choice",
        prompt: "勉強も。「Manaは塾に通っています。」の英文は？",
        choices: [
          "Mana goes to a cram school.",
          "Mana goes to a hamburger school.",
          "Mana goes to a sleeping school.",
          "Mana goes to school only in her dreams.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "まさかの特技。「Manaはアクロバットもやります。」の英文は？",
        choices: [
          "Mana also does acrobatics.",
          "Mana also does nothing.",
          "Mana also does the laundry, upside down.",
          "Mana also does magic, but it never works.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "スカウト活動。「Manaはボーイスカウトでベンチャースカウトをしています。」の英文は？",
        choices: [
          "Mana is a Venture Scout in the Boy Scouts.",
          "Mana is a sleeping scout in the nap club.",
          "Mana is a hamburger scout at McDonald's.",
          "Mana is a scout, but only on the sofa.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "栄誉。「Manaはボーイスカウトで菊章をとりました。」の英文は？",
        choices: [
          "Mana won the Chrysanthemum Award in scouting.",
          "Mana won the Hamburger Award in scouting.",
          "Mana won the Sleeping Award in scouting.",
          "Mana won nothing, but she had fun.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "英語もすごい。「Manaは英語の発表で日本2位になりました。」の英文は？",
        choices: [
          "Mana won second place in Japan in an English presentation.",
          "Mana won second place in Japan in a sleeping contest.",
          "Mana won second place in Japan in eating broccoli.",
          "Mana won last place, but she still smiled.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "超多忙。「Manaはバスケ、ダンス、英語、スカウトで忙しいですが、それを楽しんでいます。」の英文は？",
        choices: [
          "Mana is busy with basketball, dance, English, and scouts, but she enjoys it.",
          "Mana is busy doing absolutely nothing, and she hates it.",
          "Mana is busy sleeping, and she enjoys it a lot.",
          "Mana is busy eating hamburgers, but she is sad.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "幼少期。「Manaは幼い頃、おかしな格好で寝ていました。」の英文は？",
        choices: [
          "When she was little, Mana slept in strange positions.",
          "When she was little, Mana slept for ten years.",
          "When she was little, Mana slept on the ceiling.",
          "When she was little, Mana slept at McDonald's.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "かわいい勘違い。「Manaは広島までバスで行けると思っていました。」の英文は？",
        choices: [
          "Mana thought she could get to Hiroshima by bus.",
          "Mana thought she could get to Hiroshima by dragon.",
          "Mana thought Hiroshima was inside the fridge.",
          "Mana thought the bus could fly to the moon.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-5",
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
        prompt: "「Ayaは血圧も高いです。」を英語にしよう",
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
        prompt: "寝るAyaはまるで戦闘機パイロット⁉「Ayaは寝るときCPAPのマスクをつけます。」の英文は？",
        choices: [
          "Aya wears a CPAP mask when he sleeps.",
          "Aya becomes a robot when he sleeps.",
          "Aya wears a superhero mask when he sleeps.",
          "Aya flies a plane when he sleeps.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "ついにこの日が…。「Ayaは老眼鏡デビューしました。」の英文は？",
        choices: [
          "Aya just got his first pair of reading glasses.",
          "Aya just got his first pair of roller skates.",
          "Aya just got his first dragon.",
          "Aya can suddenly see the future now.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "夫婦で健康ケア。「AyaとYokoは、二人とも全身に置き針をしています。」の英文は？",
        choices: [
          "Aya and Yoko both wear press needles all over their bodies.",
          "Aya and Yoko both wear superhero capes all over their bodies.",
          "Aya and Yoko both wear broccoli all over their bodies.",
          "Aya and Yoko both turn into pincushions at night.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-6",
    title: "わが家の食卓",
    questions: [
      {
        type: "choice",
        prompt: "わが家の秘密。「Yokoの料理にはこっそり大量の野菜が入っています。」の英文は？",
        choices: [
          "Yoko's cooking secretly has a lot of vegetables.",
          "Yoko's cooking secretly has a lot of glitter.",
          "Yoko's cooking secretly has nothing in it.",
          "Yoko's cooking is secretly ordered from McDonald's.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "衝撃の事実。「うちのハンバーグは肉ではなく野菜でできています。」の英文は？",
        choices: [
          "Our hamburgers are made of vegetables, not meat.",
          "Our hamburgers are made of meat, not hamburgers.",
          "Our hamburgers are made of dreams.",
          "Our hamburgers are actually broccoli wearing a hat.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "クリスマスイブの思い出。「クリスマスイブに、家族でシェーキーズで夕食を食べました。」の英文は？",
        choices: [
          "On Christmas Eve, the family had dinner at Shakey's.",
          "On Christmas Eve, the family had dinner on the roof.",
          "On Christmas Eve, the family ate only broccoli.",
          "On Christmas Eve, the family slept through dinner.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "ママの肩書きもう一つ。「Yokoはフォークソング部の保護者会の部長です。」の英文は？",
        choices: [
          "Yoko is the head of the folk song club's parents' association.",
          "Yoko is the head chef of the broccoli factory.",
          "Yoko is the head of a secret ninja club.",
          "Yoko is the head, but nobody listens.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-7",
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
          "When Oto plays games, Yoko becomes the final boss.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "忙しい娘へ。「Manaはとても忙しいですが、Yokoは彼女を誇りに思っています。」の英文は？",
        choices: [
          "Mana is very busy, but Yoko is proud of her.",
          "Mana is very busy, so Yoko hides the broccoli.",
          "Mana is very busy, so Yoko takes a nap for her.",
          "Mana is very busy being a hamburger.",
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
  {
    id: "lesson-8",
    title: "総まとめテスト",
    questions: [
      {
        type: "choice",
        prompt: "（復習）「私は社長で主婦。忙しいけど、夫がいるから頑張れる。」の英文は？",
        choices: [
          "I am a president and a housewife. I can do it all because of my husband.",
          "I am a president and a ninja. Please keep it a secret.",
          "I am a housewife and a part-time dragon trainer.",
          "I am very busy, so I will take a nap right now.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（復習）「息子は夜じゅうゲームをする。それでも、夫を愛している。」の英文は？",
        choices: [
          "Oto plays games all night, but I still love my husband.",
          "Oto plays games all night, so I sell him to a dragon.",
          "Oto plays games all night, and I join him until sunrise.",
          "Oto plays games all night, but the broccoli is fine.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（復習）「娘はダンスにスカウトに大忙し。だから私は、夫と一緒にいたい。」の英文は？",
        choices: [
          "Mana is busy with dance and scouts, so I want to be with my husband.",
          "Mana is busy with dance and scouts, so I take a nap for her.",
          "Mana is busy with dance and scouts, so I hide in the fridge.",
          "Mana is busy with dance and scouts, and so is the dragon.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（復習）「娘は英語の発表で日本2位。夫と一緒にお祝いしたい。」の英文は？",
        choices: [
          "Mana came second in Japan in English. I want to celebrate with my husband.",
          "Mana came second in Japan in sleeping. We are very proud.",
          "Mana came second in Japan in eating broccoli.",
          "Mana came first in the universe, obviously.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（復習）「夫はCPAPのマスクをつけて眠る。そんな夫が、素敵。」の英文は？",
        choices: [
          "My husband sleeps with a CPAP mask. My husband is wonderful.",
          "My husband sleeps with a CPAP mask. My husband is a robot.",
          "My husband sleeps with a pizza. My husband is hungry.",
          "My husband sleeps standing up, like a horse.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（復習）「夫はコレステロールが高い。それでも、夫と出会えてよかった。」の英文は？",
        choices: [
          "My husband has high cholesterol, but I'm glad I met him.",
          "My husband has high cholesterol, so he became a dragon.",
          "My husband has high mountains, and I am very tired.",
          "My husband has high scores in every game.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（復習）「夫は老眼鏡デビュー。歳をとっても、夫と一緒にいたい。」の英文は？",
        choices: [
          "My husband got his first reading glasses. I want to grow old with him.",
          "My husband got his first reading glasses, so now he can see the future.",
          "My husband got his first dragon. It was on sale.",
          "My husband got roller skates, and fell immediately.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（復習）「うちのハンバーグは、実は野菜。でも夫は笑って食べる。だから愛している。」の英文は？",
        choices: [
          "Our hamburgers are secretly vegetables, but my husband eats them with a smile. So I love him.",
          "Our hamburgers are secretly vegetables, and nobody must ever find out.",
          "Our hamburgers are secretly dragons.",
          "Our hamburgers are secretly hamburgers, surprisingly.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（復習）「息子は受験生でバイトもしている。心配だけど、夫がいれば大丈夫。」の英文は？",
        choices: [
          "Oto is a busy student with a part-time job, but with my husband, I am not worried.",
          "Oto is a busy student, so I hide all of his video games.",
          "Oto is a busy hamburger at McDonald's.",
          "Oto is a busy dragon, sadly.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "（最後の総まとめ）「いろんなことがあったけど、夫と出会えて、本当によかった。」の英文は？",
        choices: [
          "A lot has happened, but I am really glad I met my husband.",
          "A lot has happened, but I am really glad I have broccoli.",
          "A lot has happened, and it was all the dragon's fault.",
          "A lot has happened. I have no idea what, though.",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "lesson-boss",
    title: "最終ステージ",
    questions: [
      {
        type: "choice",
        prompt: "⚔️ 最終決戦!伝説のドラゴンが現れた!まずは名乗りを。「私はYoko、この家の社長だ!」の英文は？",
        choices: [
          "I am Yoko, the president of this household!",
          "I am Yoko, just a tired housewife.",
          "I am Yoko, and I would like to leave now.",
          "I am a ninja. Please ignore me.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "🐉 ドラゴンが炎を吐いた!Yokoの反撃は?「Ayaの高コレステロールよ、敵を倒せ!」の英文は？",
        choices: [
          "Aya's high cholesterol, defeat the enemy!",
          "Aya's high cholesterol, please calm down!",
          "Aya, run away and take a nap!",
          "Broccoli, do something, please!",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "💨 ドラゴンが眠った!Yokoの一手は?「私の夫のCPAPマスクを使え!」の英文は？",
        choices: [
          "Use my husband's CPAP mask!",
          "Use my husband's video games!",
          "Use my husband's cholesterol again!",
          "Use the broccoli hamburger of doom!",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "🥦 必殺技!「秘密の野菜ハンバーグを発射せよ!」を英語にしよう",
        sentence: ["Fire", "the", "secret", "vegetable", "hamburger"],
        distractors: ["meat", "sleep"],
        translation: "Fire the secret vegetable hamburger",
      },
      {
        type: "choice",
        prompt: "👧 ピンチ!でもManaが菊章の力で参戦!「Manaよ、アクロバットで攻撃せよ!」の英文は？",
        choices: [
          "Mana, attack with your acrobatics!",
          "Mana, attack with your homework!",
          "Mana, please take a nap now!",
          "Mana, sell the dragon to McDonald's!",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "🎸 そしてOtoがベースを手に登場!「Otoよ、ベースのソロでとどめを刺せ!」の英文は？",
        choices: [
          "Oto, finish it with a bass solo!",
          "Oto, finish it with a nap solo!",
          "Oto, please stop playing games for one second!",
          "Oto, order the dragon a Happy Meal!",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "✨ ドラゴンが弱った!最後の弱点を突く呪文は?「家族の愛が、最強の魔法だ!」の英文は？",
        choices: [
          "Family love is the strongest magic!",
          "Broccoli is the strongest magic!",
          "Sleeping is the strongest magic!",
          "A coupon is the strongest magic!",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "🐲💥 とどめの一撃!「私は家族みんなを愛している!」を英語にしよう",
        sentence: ["I", "love", "all", "of", "my", "family"],
        distractors: ["hate", "dragon"],
        translation: "I love all of my family",
      },
      {
        type: "choice",
        prompt: "🎉 ドラゴン討伐!勝利の雄叫び!「私たちはやった、家族みんなで!」の英文は？",
        choices: [
          "We did it, all of us together as a family!",
          "We did it, mostly thanks to broccoli!",
          "We did it, but Aya slept through it!",
          "We did it... wait, what did we do?",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "そして戦いが終わり、静かな夜。Ayaのいびきと、CPAPの音だけが聞こえる。Yokoは小さくつぶやく。「ねえ、知ってる?あなたのいびきが、私の子守唄なの。」の英文は？",
        choices: [
          "You know what? Your snoring is my lullaby.",
          "You know what? Your snoring keeps me awake.",
          "You know what? Please be quiet, dear.",
          "You know what? I want a divorce from your CPAP.",
        ],
        answer: 0,
      },
      {
        type: "choice",
        prompt: "子どもたちはもう大きい。いつか、この家を出ていく。それでも――。「子どもたちが巣立っても、私にはあなたがいる。」の英文は？",
        choices: [
          "Even when the kids leave home, I will still have you.",
          "Even when the kids leave home, I will still have broccoli.",
          "Even when the kids leave home, I will finally sleep.",
          "Even when the kids leave home, I will become a ninja.",
        ],
        answer: 0,
      },
      {
        type: "arrange",
        prompt: "30年分の「ありがとう」をこめて。「あなたと結婚できて幸せです。」を英語にしよう",
        sentence: ["I", "am", "happy", "to", "marry", "you"],
        distractors: ["sad", "broccoli"],
        translation: "I am happy to marry you",
      },
      {
        type: "choice",
        prompt: "最後の問題です。これだけは、ふざけずに。「何があっても、ずっとあなたを愛しています。」の英文は？",
        choices: [
          "No matter what happens, I will always love you.",
          "No matter what happens, I will always love broccoli.",
          "No matter what happens, please fix your cholesterol.",
          "No matter what happens, I am still a ninja.",
        ],
        answer: 0,
      },
    ],
  },
];
