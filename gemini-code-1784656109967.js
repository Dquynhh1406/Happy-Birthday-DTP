const input = document.getElementById('command-input');
const terminalBody = document.getElementById('terminal-body');

const gamesList = [
    "Phasmophobia (Game săn ma cực cuốn)",
    "Hollow Knight (Siêu phẩm chặt chém thử thách)",
    "Resident Evil 7: Biohazard (Kinh dị đỉnh cao)",
    "Celeste (Game nhảy nền siêu khó)",
    "Portal 2 (Game giải đố hack não)",
    "Subnautica (Sinh tồn khám phá đại dương)",
    "Cuphead (Bắn boss phong cách hoạt hình cổ điển)",
    "Dead Cells (Hành động chặt chém cực đã)"
];

let hasRolled = false;

const giftBoxASCII = `
       🎁 🎁 🎁 🎁 🎁 🎁 🎁
      ┌───────────────────┐
      │  ┌─────────────┐  │
      │  │  SECRET GIFT│  │
      │  └─────────────┘  │
      └───────────────────┘
`;

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim();
        this.value = '';

        printOutput(`<span class="prompt">phu_tlos@lilac-space:~$</span> ${command}`);
        processCommand(command);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

function printOutput(text) {
    const div = document.createElement('div');
    div.className = 'output';
    div.innerHTML = text;
    terminalBody.insertBefore(div, input.parentElement);
}

function processCommand(cmd) {
    switch(cmd.toLowerCase()) {
        case '!lilac help':
            printOutput(`
🌿 <span class="lilac-name">Lilac:</span> Đây là danh sách các mật mã dành cho anh Phú:
----------------------------------------------------------------------
  <span class="cmd-text">!lilac wish</span>   : Nhận lời chúc mừng sinh nhật từ Diễm Quỳnh 💌
  <span class="cmd-text">!lilac secret</span> : Khám phá điều bí mật đang ẩn giấu... 🔮
  <span class="cmd-text">!lilac random</span> : Mở hộp quà bí mật ngẫu nhiên từ Diễm Quỳnh! 🎁
  <span class="cmd-text">clear</span>         : Dọn dẹp màn hình terminal
----------------------------------------------------------------------
            `);
            break;

        case '!lilac wish':
            printOutput(`
🌿 <span class="lilac-name">Lilac:</span> Đã tìm thấy 1 bức thư từ <span class="highlight-name">Diễm Quỳnh</span> gửi cho anh Phú!
<div class="wish-box">
🎂 <b>CHÚC MỪNG SINH NHẬT TUỔI 20 DƯƠNG THIÊN PHÚ (TLOS)!</b> 🎂

Chúc ông tuổi 20 luôn rực rỡ, code mượt mà không bao giờ gặp bug, 
mọi dự án và dự định sắp tới đều thành công rực rỡ! 
Cảm ơn ông vì đã luôn là một người bạn tuyệt vời. 
Tuổi mới thật nhiều niềm vui và luôn giữ vững năng lượng tích cực nhé! ✨🌱
</div>
👉 <i>Gõ tiếp <span class="cmd-text">'!lilac secret'</span> để xem tiếp bất ngờ từ Quỳnh nhé!</i>
            `);
            break;

        case '!lilac secret':
            printOutput(`
🌿 <span class="lilac-name">Lilac:</span> Hửm? Anh đang tò mò về bất ngờ tiếp theo đúng không?...
<div class="secret-box">
Thật ra sinh nhật 20 tuổi đâu chỉ có lời chúc suông đúng không nào? 
Diễm Quỳnh đã chuẩn bị sẵn một bất ngờ nho nhỏ ẩn giấu ngay trong hệ thống này.

Một chút giải trí dành riêng cho anh sau những giờ chạy deadline và code căng thẳng...
Nhưng món quà cụ thể là gì thì đến cả Lilac cũng chưa biết đâu!
</div>
👉 <i>Hãy gõ ngay <span class="cmd-text">'!lilac random'</span> để Lilac kích hoạt hộp quà mở ra bí mật nhé! 🎁</i>
            `);
            break;

        case '!lilac random':
            if (hasRolled) {
                printOutput(`🌿 <span class="lilac-name">Lilac:</span> <span class="error">⚠️ Cảnh báo: Món quà bí mật đã được mở rồi! Anh Phú chụp màn hình gửi Quỳnh chưa đó? 😉</span>`);
                break;
            }

            printOutput(`🌿 <span class="lilac-name">Lilac:</span> Đang tải Hộp quà bí mật...`);
            printOutput(`<pre style="color: #ffb703;">${giftBoxASCII}</pre>`);

            let count = 0;
            const interval = setInterval(() => {
                const tempGame = gamesList[Math.floor(Math.random() * gamesList.length)];
                printOutput(`[LILAC SYSTEM] Unboxing item... 🎲 <span style="color: #90e0ef;">${tempGame}</span>`);
                terminalBody.scrollTop = terminalBody.scrollHeight;
                count++;

                if (count >= 6) {
                    clearInterval(interval);
                    const finalGame = gamesList[Math.floor(Math.random() * gamesList.length)];

                    printOutput(`
✨ <b>Ô HÓA RA ĐÂY CHÍNH LÀ QUÀ SINH NHẬT!</b> ✨
----------------------------------------------------------------------
🎁 Món quà Steam ngẫu nhiên mà Quỳnh gửi tặng anh Phú là:
<div class="gift-result">🎮 GAME: ${finalGame} 🎮</div>
📸 <b>HƯỚNG DẪN NHẬN QUÀ:</b>
<i>Anh Phú hãy <b>CHỤP MÀNH HÌNH</b> này lại và gửi ngay cho <b>Diễm Quỳnh</b> 
để nhận Key/Gift Game qua Steam nhé! 🚀</i>
----------------------------------------------------------------------
                    `);

                    confetti({
                        particleCount: 120,
                        spread: 80,
                        origin: { y: 0.6 }
                    });

                    hasRolled = true;
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            }, 450);
            break;

        case 'clear':
            const outputs = document.querySelectorAll('.output');
            outputs.forEach(out => out.remove());
            break;

        case '':
            break;

        default:
            printOutput(`🌿 <span class="lilac-name">Lilac:</span> Lệnh không hợp lệ rùi! Gõ <span class="cmd-text">'!lilac help'</span> để xem hướng dẫn nha.`);
    }
}