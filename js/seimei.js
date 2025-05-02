document.getElementById("fortune-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  // 入力取得
  const lastName = document.getElementById("lastName").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const birthDate = document.getElementById("birthDate").value;
  const birthTime = document.getElementById("birthTime").value || "00:00";

  // Googleフォーム送信用（device infoも一緒に）
  document.getElementById("g-lastName").value = lastName;
  document.getElementById("g-firstName").value = firstName;
  document.getElementById("g-birthDate").value = birthDate;
  document.getElementById("g-birthTime").value = birthTime;
  document.getElementById("g-deviceInfo").value = navigator.userAgent;
  document.getElementById("googleForm").submit();

  // ローディング表示
  document.getElementById("loadingScreen").style.display = "flex";
  startCrystalAnimation();

  // 3秒待つ
  await new Promise(resolve => setTimeout(resolve, 3000));

  // 占い結果生成
  const userData = `${lastName}-${firstName}-${birthDate}-${birthTime}-${navigator.userAgent}`;
  const seed = hashCode(userData);
  const ratings = generateRatings(seed);
  const message = generateMessage(seed);

  // 表示更新
  document.getElementById("loadingScreen").style.display = "none";
  showChart(ratings);
  document.getElementById("fortuneMessage").innerText = message;
});

// 名前などからシード生成
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// ランダム5項目（1〜5）
function generateRatings(seed) {
  const random = (n) => (Math.floor((Math.sin(seed++) * 10000) % 5) + 1);
  return ["直感力", "対人運", "集中力", "開運力", "未来創造力"].map(() => random(seed));
}

// 結果メッセージ
function generateMessage(seed) {
  const messages = [
    "運命の歯車が回り始めています。",
    "今は心を静めると吉です。",
    "小さな選択が未来を変えるでしょう。",
    "あなたの力が試されるときです。",
    "新しい可能性が広がっています。"
  ];
  return messages[seed % messages.length];
}

// チャート表示
function showChart(data) {
  const ctx = document.getElementById('fortuneChart').getContext('2d');
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['直感力', '対人運', '集中力', '開運力', '未来創造力'],
      datasets: [{
        label: '占い結果',
        data: data,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderColor: '#fff',
        pointBackgroundColor: '#fff'
      }]
    },
    options: {
      scales: {
        r: {
          suggestedMin: 0,
          suggestedMax: 5,
          pointLabels: { color: '#fff' },
          grid: { color: '#aaa' },
          angleLines: { color: '#aaa' }
        }
      }
    }
  });
}

// 水晶球アニメーション
let particles = [];

function startCrystalAnimation() {
  const canvas = document.getElementById("crystalBallCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;

  for (let i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      color: `hsl(${Math.random() * 360}, 100%, 80%)`
    });
  }

  let floatOffset = 0;

  function animate() {
    floatOffset += 0.01;

    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.translate(0, Math.sin(floatOffset) * 5); // ゆらゆら
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    ctx.restore();
    requestAnimationFrame(animate);
  }

  animate();
}
