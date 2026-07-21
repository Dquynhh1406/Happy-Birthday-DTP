const input = document.getElementById('command-input');
const terminalBody = document.getElementById('terminal-body');

// 1. Danh sách quà Steam trong tầm giá
const gamesList = [
    "Phasmophobia (Game săn ma cực cuốn)",
    "Hollow Knight (Siêu phẩm khó điên đảo)",
    "Resident Evil 7: Biohazard (Kinh dị đỉnh cao)",
    "Celeste (Thử thách kỹ năng nhảy nền)",
    "Portal 2 (Game giải đố Hack脑)",
    "Subnautica (Sinh tồn lặn biển)",
    "Cuphead (Bắn boss căng thẳng)",
    "Dead Cells (Hành động chặt chém cực đã)"
];

let hasRolled = false;

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim().toLowerCase();
        this.value = '';

        printOutput(`<span class="prompt">user@birthday-pc:~$</span> ${command}`);
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
    switch(cmd) {
        case 'help':
            printOutput(`
Các câu lệnh khả dụng:
  <span class="highlight">help</span>         : Xem danh sách lệnh
  <span class="highlight">cat wish.txt</span> : Đọc thư chúc mừng sinh nhật
  <span class="highlight">sudo get-gift</span>: Random phần quà Steam đặc biệt!
  <span class="highlight">clear</span>        : Dọn dẹp màn hình terminal
            `);
            break;

        case 'cat wish.txt':
            printOutput(`
==================================================
🎂 <b>HAPPY BIRTHDAY TO YOU!</b> 🎂

Chúc ông tuổi mới code không bug, deploy luôn trơn tru!
Cảm ơn vì đã luôn là một người bạn tuyệt vời. 
Hãy nhập lệnh <span class="highlight">'sudo get-gift'</span> để nhận món quà sinh nhật nhé!
==================================================
            `);
            break;

        case 'sudo get-gift':
        case 'roll':
            if (hasRolled) {
                printOutput(`<span class="error">⚠️ Error: Bạn đã nhận quà rồi! Đừng tham thế chứ :D</span>`);
                break;
            }
            
            printOutput(`⏳ Đang kết nối tới Steam Database...`);
            
            let count = 0;
            const interval = setInterval(() => {
                const tempGame = gamesList[Math.floor(Math.random() * gamesList.length)];
                printOutput(`[DEBUG] Executing random... Found: ${tempGame}`);
                terminalBody.scrollTop = terminalBody.scrollHeight;
                count++;

                if (count >= 6) {
                    clearInterval(interval);
                    const finalGame = gamesList[Math.floor(Math.random() * gamesList.length)];
                    
                    printOutput(`
🎉 <b>SUCCESSFULLY REDEEMED!</b> 🎉
--------------------------------------------------
🎁 Món quà sinh nhật của bạn là:
👉 <span class="gift-text">${finalGame}</span>
--------------------------------------------------
<i>(Chụp màn hình này gửi cho tôi để nhận quà qua Steam nha!)</i>
                    `);
                    
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });

                    hasRolled = true;
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            }, 400);
            break;

        case 'clear':
            const outputs = document.querySelectorAll('.output');
            outputs.forEach(out => out.remove());
            break;

        case '':
            break;

        default:
            printOutput(`<span class="error">Command not found: '${cmd}'. Gõ 'help' để xem hướng dẫn.</span>`);
    }
}
