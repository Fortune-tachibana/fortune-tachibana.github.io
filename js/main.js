document.addEventListener('DOMContentLoaded', function () {
  // 1. ⭐ ファイルプレビュー共通関数
  function setupPreview(fileInputId, previewImageId) {
    const fileInput = document.getElementById(fileInputId);
    const previewImage = document.getElementById(previewImageId);

    if (fileInput && previewImage) {
      fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            previewImage.src = e.target.result;
            previewImage.style.display = 'block';
          };
          reader.readAsDataURL(file);
        } else {
          previewImage.src = '';
          previewImage.style.display = 'none';
        }
      });
    }
  }

  // 2. 📸 プレビュー設定まとめて実行
  setupPreview('rightPalmPhoto', 'previewRightPalm');
  setupPreview('leftPalmPhoto', 'previewLeftPalm');
  setupPreview('rightBackPhoto', 'previewRightBack');
  setupPreview('leftBackPhoto', 'previewLeftBack');
  setupPreview('facePhoto', 'previewFace');


  const personalityMessages = [
  "<div style='text-align:center; font-weight:bold;'>【明るくて楽観的だけど飽きっぽいところも】</div>周囲を元気にするムードメーカー。いつも前向きで楽天的、細かいことは気にしないタイプです。誰とでもすぐに打ち解けられますが、飽きっぽくてひとつのことを続けるのが苦手。気分屋な面もあり、テンションが高いときとそうでないときの差が激しく、誤解されやすいことも。浮き沈みのある気持ちをうまくコントロールすれば、どんな場面でも愛される存在になれるでしょう。",
 
  "<div style='text-align:center; font-weight:bold;'>【クールで現実的だけど感情表現が苦手】</div>物事を冷静に見つめる、現実派のしっかり者。感情よりも合理性を重視し、無駄を嫌うタイプです。周囲の人からは「しっかりしてるね」と言われることが多いですが、内面ではかなり繊細。自分の感情をうまく表現できないために、誤解されて距離を置かれてしまうことも。もう少し心の内をオープンにすれば、関係性もスムーズになっていくはずです。",
 
  "<div style='text-align:center; font-weight:bold;'>【優しくて協調性があるけれど自分を出せない】</div>相手の気持ちを最優先できる、思いやりの人。平和主義で、人との争いを極端に嫌います。ただ、相手に合わせすぎてしまい、自分の本音を押し殺してしまう場面も多いかも。周りの空気を読む力に長けていますが、自分の意思を表に出す練習をしないと、ストレスが溜まりやすいです。少しずつでいいので「本当はどうしたいか？」を自分に問いかけてみて。",
 
  "<div style='text-align:center; font-weight:bold;'>【頑固で意思が強いけど柔軟性がない】</div>一本気で信念を持った強い人。自分が決めたことは最後までやり抜こうとする意思の強さが魅力ですが、反面、柔軟な対応が苦手。他人の意見を受け入れるのに時間がかかり、自分を変えることを怖れてしまうところがあります。ときには「間違ってもいい」と思うことが、心を軽くし、周囲との関係も良好にしてくれるでしょう。",
 
  "<div style='text-align:center; font-weight:bold;'>【マイペースで独創的だけど孤立しやすい】</div>自分の世界を大切にする、自由な発想の持ち主。人と違う視点で物事を捉えることができ、周囲からは個性的で面白い存在として見られます。ただ、集団行動が苦手で、周囲とリズムが合わず孤立してしまうことも。人と歩幅を合わせるのが下手でも、理解してくれる人は必ずいるので、自分を否定せず自然体でいることを意識してみてください。",
 
  "<div style='text-align:center; font-weight:bold;'>【几帳面で律儀だけど完璧主義すぎる】</div>真面目で責任感が強く、物事を丁寧に進められる人。小さなことにも気を配れる優しさがありますが、理想が高すぎて自分にも他人にも厳しくなりがち。ちょっとしたミスでも強く反省し、自己否定に陥ることもあります。「完璧じゃなくてもいい」と思える余裕を持つことで、周囲との関係も自分の気持ちもラクになります。",
 
  "<div style='text-align:center; font-weight:bold;'>【社交的でサービス精神旺盛だけど無理をしがち】</div>人と接することが得意で、気配り上手な人気者。いつも明るく場を盛り上げようとする姿勢は、周囲の人の心を和ませます。ただ、自分の感情を押し殺してまで場に合わせようとするため、内側にストレスを抱えがち。つい無理をしすぎてしまうので、「今日は頑張らなくていい日」と心に言い聞かせることも大切です。",
 
  "<div style='text-align:center; font-weight:bold;'>【情熱的で前向きだけど空回りしやすい】</div>エネルギッシュで情熱にあふれるタイプ。思いついたらすぐ行動できるフットワークの軽さが魅力ですが、勢いだけで突っ走ってしまうため、結果がうまく出ないことも。落ち着いて状況を整理する時間を作ることで、行動力がより現実的な成果につながるでしょう。思いの強さは、正しい方向に向ければ最強の武器になります。",
 
  "<div style='text-align:center; font-weight:bold;'>【控えめで観察力があるけど自己表現が苦手】</div>一歩引いたところから周囲をよく観察している、繊細で慎重なタイプ。空気を読んで行動する力に長けていて、相手の気持ちを察することも得意です。ただ、自分の気持ちを言葉にするのが苦手で、チャンスを逃してしまうことも。もっと自分の想いや考えを声に出してみると、世界が広がっていきます。",
 
  "<div style='text-align:center; font-weight:bold;'>【正義感が強くて信念があるけど頑なになりやすい】</div>「こうあるべき」という思いを大切にする真っ直ぐな人。間違っていることにはハッキリとNOが言える勇気がありますが、価値観に固執しすぎると視野が狭くなりがちです。自分の信念を持ちながらも、他人の考えも柔軟に受け入れられるようになると、より多くの人に信頼されるようになります。",
 
  "<div style='text-align:center; font-weight:bold;'>【素直で裏表がないけど人に流されやすい】</div>誰にでもまっすぐに接することができる、ピュアな心の持ち主。周囲からも信頼されやすく、裏表のない態度で愛されます。ただ、自分の意見が薄く、周りの空気に流されがちな一面も。強く言われると「NO」と言えないので、自己主張の練習をすると自信につながります。",
 
  "<div style='text-align:center; font-weight:bold;'>【落ち着いていて冷静だけど感情を抑えすぎる】</div>物事に動じず、いつも冷静に状況を判断できるタイプ。周囲が慌てていても、一人だけ冷静で頼りにされる存在です。ただ、感情を表に出すことが少なく、誤解されやすいのが難点。たまには弱さや本音を見せることで、人間関係がより深まっていくはずです。",
 
  "<div style='text-align:center; font-weight:bold;'>【自由で自立しているけど孤独を感じやすい】</div>誰にも縛られず、自分の信じる道を堂々と歩ける人。独立心が強く、人に依存することを嫌いますが、心のどこかで誰かに理解されたいという思いを抱えています。強がりすぎず、素直な気持ちを少しだけでも伝えることで、絆が生まれるでしょう。",
 
  "<div style='text-align:center; font-weight:bold;'>【親切で面倒見がいいけどお節介になりやすい】</div>人を助けることに喜びを感じる、思いやりあふれる性格。困っている人を見ると放っておけず、誰よりも先に手を差し伸べる優しさがあります。ただし、相手の気持ちを考えすぎて、必要以上に介入してしまうことも。相手の自主性も尊重できると、さらに信頼されるでしょう。",
 
  "<div style='text-align:center; font-weight:bold;'>【好奇心旺盛で話題豊富だけど集中力に欠ける】</div>新しいものが大好きで、いつも刺激を求めている人。話題が豊富で話していて飽きない存在ですが、興味が次々に移り変わるため、ひとつのことを極めるのが苦手。熱しやすく冷めやすい性格を活かすには、長く続けられる工夫がカギです。",
 
  "<div style='text-align:center; font-weight:bold;'>【誠実で責任感があるけど自分を追い込みやすい】</div>どんなときも責任を持って行動できる、信頼感のある性格。ルールやマナーを大切にし、人に迷惑をかけることを極端に嫌います。ただ、まじめすぎて自分を追い込んでしまう傾向も。ときには「まあいいか」と力を抜くことで、より良いパフォーマンスが発揮できます。",
 
  "<div style='text-align:center; font-weight:bold;'>【直感力が鋭くて感受性が強いけど気分屋】</div>空気を読む力やインスピレーションが強く、クリエイティブな才能に恵まれた人。感受性が豊かで、他人の感情にも敏感です。その分、気分に左右されやすく、コンディションによって大きく波があることも。感情に引っ張られない工夫をすれば、大きな武器になります。",
 
  "<div style='text-align:center; font-weight:bold;'>【控えめだけど芯が強い頑張り屋】</div>目立たずとも、内に強い信念を秘めたタイプ。人前ではあまり前に出ませんが、実は努力家で負けず嫌い。静かにコツコツ積み上げる力があり、時間をかけて大きな成果を出す人です。自分の価値に自信を持つことで、より大きなチャンスを掴めるでしょう。",
 
  "<div style='text-align:center; font-weight:bold;'>【自分に正直だけどわがままと誤解されがち】</div>感情に素直で、自分を偽らない正直者。言いたいことをしっかり言える反面、自己中心的に見られてしまうことがあります。でも、それは周囲に気を使うよりも「自分の気持ちに嘘をつきたくない」だけ。本音を伝えるときは、少しだけ優しさを添えると誤解されにくくなります。",
 
  "<div style='text-align:center; font-weight:bold;'>【器用でなんでもこなせるけど飽きやすい】 </div>多才で、どんなこともそつなくこなせる器用な人。周囲から頼られることも多く、「なんでもできるね」と言われがちです。ただ、苦労せずにある程度できてしまうため、すぐに飽きてしまうことも。長く続けられる環境づくりが、飛躍のカギになります。",
 ];

 const testimonials = [
  "相談相手が少ない中で占いを通じて、自分の長所・短所を客観的に知ることができました。「そのままの自分でも大丈夫」と思えるようになり、自分の人生をもっと大切にしたいと感じました。（30代女性）",
  "アドバイスを参考にして日常の行動を少し変えてみたところ、自分では気づかなかった小さな変化に前向きに取り組めるようになりました。（40代女性）",
  "これまでの価値観や生き方を見透かされたようで驚きました。当時、片思いしていた相手のことも相談し、結果的に結婚まで進むことができたんです。それ以来、指針として活用しています。（40代男性）",
  "転職で迷っていたとき、時期や向いている職種を具体的に示してもらえたことで、気持ちがスッと軽くなりました。行動に移すきっかけにもなりました。（30代女性）"
];


  // 3. 🌟 占いフォーム送信処理
  const form = document.getElementById('fortune-form');
  const loadingScreen = document.getElementById('loadingScreen');
  const fortuneMessage = document.getElementById('fortuneMessage');
  const fortuneChart = document.getElementById('fortuneChart');
  const luckyItem = document.getElementById('luckyItem');
  const fortuneCard = document.getElementById('fortuneCard');
  const twitterShare = document.getElementById('twitter-share');
  const lineShare = document.getElementById('line-share');

  


  const luckyItems = [
    // アクセサリー
    "シルバーの指輪", "パールのネックレス", "天然石のブレスレット", "星形のピアス", "カラフルなヘアピン",
  
    // ファッション小物
    "赤いスカーフ", "チェック柄の靴下", "レザーの財布", "お気に入りの帽子", "ビンテージのバッグ",
  
    // フード・ドリンク
    "いちごのスムージー", "抹茶ラテ", "チョコレート", "焼きたてのパン", "おにぎり",
  
    // 文房具・アイテム
    "緑色のボールペン", "手書きのノート", "お気に入りのしおり", "星柄のメモ帳", "丸い消しゴム",
  
    // テクノロジー・ガジェット
    "ワイヤレスイヤホン", "スマートウォッチ", "カメラ", "青色のスマホケース", "レトロなキーボード",
  
    // ライフスタイル
    "アロマキャンドル", "観葉植物", "お香", "ホットアイマスク", "バスタブの入浴剤",
  
    // ラッキーアニマル
    "カメの置物", "ネコのマグカップ", "ウサギのキーホルダー", "フクロウの絵", "イルカのアクセサリー",
  
    // ラッキーカラーアイテム
    "黄色のハンカチ", "ピンクのネイル", "水色のポーチ", "緑のマスク", "オレンジ色のペンケース",
  
    // 季節アイテム（春夏秋冬）
    "桜のチャーム", "ひまわりのアクセサリー", "紅葉のイラスト", "雪の結晶のキーホルダー",
  
    // ちょっと変わり種・ユニーク
    "懐かしい漫画", "レトロなゲーム", "木彫りの動物", "パズルのピース", "小さなベル"
  ];
  

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    loadingScreen.style.display = 'flex';

    setTimeout(() => {
      loadingScreen.style.display = 'none';
      const lastName = document.getElementById('lastName').value;
      const firstName = document.getElementById('firstName').value;
      const birthDate = document.getElementById('birthDate').value;
      document.getElementById("personalityMessage").style.display = "block";


      const scores = {
        創造性: Math.floor(Math.random() * 100),
        守護運: Math.floor(Math.random() * 100),
        浄化力: Math.floor(Math.random() * 100),
        魅力度: Math.floor(Math.random() * 100),
        知恵: Math.floor(Math.random() * 100),
        成長運: Math.floor(Math.random() * 100),
        社交力: Math.floor(Math.random() * 100),
      };

      const ctx = fortuneChart.getContext('2d');
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: Object.keys(scores),
          datasets: [{
            label: '運勢グラフ',
            data: Object.values(scores),
            backgroundColor: 'rgba(106,90,205,0.2)',
            borderColor: '#6a5acd',
            borderWidth: 2,
          }]
        },
        options: {
          plugins: { legend: { display: false } }
        }
      });

      let messageText = `姓名「${lastName} ${firstName}」さんの占い結果です！\n\n`;
      for (const [key, value] of Object.entries(scores)) {
        messageText += `${key}：${value}点\n`;
      }
      animateFortuneMessage(messageText.replace(/\n/g, '<br>'));

      luckyItem.innerText = `本日のラッキーアイテム：${luckyItems[Math.floor(Math.random() * luckyItems.length)]}`;
      const seedSource = `${lastName}${firstName}${birthDate}`;
      let seed = 0;
      for (let i = 0; i < seedSource.length; i++) {
        seed += seedSource.charCodeAt(i);
      }
      const personalityIndex = seed % personalityMessages.length;
      document.getElementById("personalityMessage").innerHTML = personalityMessages[personalityIndex];
      
      

      fortuneCard.style.display = 'block';

      const testimonialBox = document.getElementById('testimonialBox');
testimonialBox.innerHTML = '<h3>体験者の声</h3><ul>' +
  testimonials.map(text => `<li class="testimonial-item">🗣 ${text}</li>`).join('') +
  '</ul>';
testimonialBox.style.display = 'block';

      setTimeout(() => fortuneCard.classList.add('flipped'), 100);

      const shareText = encodeURIComponent(
        `姓名占いの結果！\n${lastName} ${firstName} さんの運勢✨\n` +
        `創造性${scores.創造性}点・守護運${scores.守護運}点・浄化力${scores.浄化力}点・魅力度${scores.魅力度}点！\n#姓名占い`
      );
      twitterShare.href = `https://twitter.com/intent/tweet?text=${shareText}`;
      lineShare.href = `https://social-plugins.line.me/lineit/share?url=https://example.com&text=${shareText}`;

      document.getElementById('g-lastName').value = lastName;
      document.getElementById('g-firstName').value = firstName;
      document.getElementById('g-birthDate').value = birthDate;
      document.getElementById('g-deviceInfo').value = navigator.userAgent;
      document.getElementById('googleForm').submit();
    }, 3000);
  });

  // 4. ⭐ 星空アニメーション
  const starCanvas = document.getElementById('starCanvas');
  const ctxStars = starCanvas.getContext('2d');
  let stars = [];
  let meteors = [];

  function initStars() {
    stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.5,
        speed: Math.random() * 0.5 + 0.2,
        alpha: Math.random(),
        flickerSpeed: Math.random() * 0.02 + 0.01
      });
    }
  }

  function drawStars() {
    ctxStars.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (let star of stars) {
      ctxStars.beginPath();
      ctxStars.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctxStars.fillStyle = `rgba(255,255,255,${star.alpha})`;
      ctxStars.fill();
    }
    for (let meteor of meteors) {
      ctxStars.beginPath();
      ctxStars.moveTo(meteor.x, meteor.y);
      ctxStars.lineTo(meteor.x - meteor.speedX * 5, meteor.y - meteor.speedY * 5);
      ctxStars.strokeStyle = `rgba(150, 200, 255, ${meteor.opacity})`;
      ctxStars.lineWidth = meteor.size;
      ctxStars.stroke();
    }
  }

  function moveStars() {
    for (let star of stars) {
      star.y += star.speed;
      if (star.y > window.innerHeight) {
        star.y = 0;
        star.x = Math.random() * window.innerWidth;
      }
      star.alpha += star.flickerSpeed;
      if (star.alpha >= 1 || star.alpha <= 0.3) {
        star.flickerSpeed *= -1;
      }
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
      const meteor = meteors[i];
      meteor.x += meteor.speedX;
      meteor.y += meteor.speedY;
      meteor.opacity -= 0.02;
      if (meteor.opacity <= 0) {
        meteors.splice(i, 1);
      }
    }
  }

  function createMeteor() {
    const startX = Math.random() * window.innerWidth;
    meteors.push({
      x: startX,
      y: 0,
      size: Math.random() * 1 + 0.5,
      speedX: Math.random() * 4 + 15,
      speedY: Math.random() * 4 + 15,
      opacity: 1
    });
    setTimeout(createMeteor, Math.random() * 5000 + 4000);
  }

  function animateStars() {
    drawStars();
    moveStars();
    requestAnimationFrame(animateStars);
  }

  function resizeCanvas() {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);

  resizeCanvas();
  initStars();
  animateStars();
  createMeteor();
});

// 🔮占いメッセージアニメーション
function animateFortuneMessage(htmlText) {
  const fortuneMessage = document.getElementById('fortuneMessage');
  fortuneMessage.innerHTML = '';
  let index = 0;

  function showNextChar() {
    if (index >= htmlText.length) return;

    if (htmlText.substring(index, index + 4) === '<br>') {
      fortuneMessage.innerHTML += '<br>';
      index += 4;
    } else {
      const span = document.createElement('span');
      span.innerHTML = htmlText[index];
      span.style.opacity = 0;
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(10px)';
      fortuneMessage.appendChild(span);

      setTimeout(() => {
        span.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        span.style.opacity = 1;
        span.style.transform = 'translateY(0)';
      }, 10);

      index++;
    }
    setTimeout(showNextChar, 50);
  }

  showNextChar();
}
document.getElementById('saveImageBtn').addEventListener('click', () => {
  const target = document.getElementById('fortuneCard');
  html2canvas(target).then(canvas => {
    const link = document.createElement('a');
    link.download = 'fortune_result.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
const bgm = document.getElementById('bgm');
const toggleBgmBtn = document.getElementById('toggleBgmBtn');

toggleBgmBtn.addEventListener('click', () => {
  if (bgm.paused) {
    bgm.play();
    toggleBgmBtn.textContent = 'BGM オフ';
  } else {
    bgm.pause();
    toggleBgmBtn.textContent = 'BGM オン';
  }
});

// 占い結果表示時に自動再生
function showFortuneResult() {
  // 他の処理...
  bgm.play();
}
const flipSound = document.getElementById('flipSound');

function flipCard() {
  const fortuneCard = document.getElementById('fortuneCard');
  fortuneCard.classList.add('flipped');
  flipSound.play();
}

// 占い結果表示時にカードをめくる
function showFortuneResult() {
  // 他の処理...
  flipCard();
}
function calculateFortuneRank(scores) {
  const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const average = total / Object.values(scores).length;
  let rank = '';

  if (average >= 80) {
    rank = 'S';
  } else if (average >= 60) {
    rank = 'A';
  } else if (average >= 40) {
    rank = 'B';
  } else if (average >= 20) {
    rank = 'C';
  } else {
    rank = 'D';
  }

  document.getElementById('fortuneRank').textContent = `運勢ランク: ${rank}`;
}

// 占い結果表示時にランクを計算
function showFortuneResult() {
  const scores = {
    創造性: 75,
    守護運: 65,
    浄化力: 80,
    魅力度: 70,
    知恵: 60,
    成長運: 85,
    社交力: 90,
  };
  calculateFortuneRank(scores);
  // 他の処理...
}
