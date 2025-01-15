const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");


let drawing = false; // 描画中かどうか
let lineColor = "#000000"; // 初期色
let lineWidth = 2; // 初期線の太さ
let eraserMode = false; // 消しゴムモードかどうか

// マウスイベント
canvas.addEventListener("mousedown", (e) => startDrawing(e.offsetX, e.offsetY));
canvas.addEventListener("mousemove", (e) => draw(e.offsetX, e.offsetY));
canvas.addEventListener("mouseup", endDrawing);
canvas.addEventListener("mouseleave", endDrawing);

// タッチイベント
canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    startDrawing(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
});
canvas.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    draw(touch.clientX - rect.left, touch.clientY - rect.top);
    e.preventDefault();
});
canvas.addEventListener("touchend", endDrawing);

// 描画開始
function startDrawing(x, y) {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// 描画中
function draw(x, y) {
    if (!drawing) return;
    if (eraserMode) {
        // 消しゴムモード
        ctx.globalCompositeOperation = "destination-out"; // 消しゴムモード
        ctx.lineWidth = 20; // 線の太さ
        ctx.lineCap = "round";
        ctx.strokeStyle = "rgba(0,0,0,1)"; // 消しゴムの色
    } else {
        // ペンモード
        ctx.globalCompositeOperation = "source-over"; // 通常モード
        ctx.strokeStyle = lineColor; // ペンの色
        ctx.lineWidth = 1; // 線の太さ
        ctx.lineCap = "round";
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// 描画終了
function endDrawing() {
    drawing = false;
    ctx.closePath();
}

// クリアボタン
document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// 消しゴムボタン
document.getElementById("eraserBtn").addEventListener("click", () => {
    eraserMode = true;
});

// ペンボタン
document.getElementById("penBtn").addEventListener("click", () => {
    eraserMode = false;
});

// 線の色変更
document.getElementById("colorPicker").addEventListener("input", (e) => {
    lineColor = e.target.value;
});

// 線の太さ変更
document.getElementById("lineWidth").addEventListener("input", (e) => {
    lineWidth = e.target.value;
});
function resizeCanvas() {
    const canvas = document.getElementById("drawingCanvas");
    const ctx = canvas.getContext("2d");

    // 現在のキャンバス内容を保存
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCtx.drawImage(canvas, 0, 0);

    // キャンバスの横幅を画面幅に設定
    canvas.width = window.innerWidth * 0.95;

    // 高さを適宜調整（例：横幅の3/4の比率）
    canvas.height = window.innerHeight * 0.75;

    // 保存した内容を再描画
    ctx.drawImage(tempCanvas, 0, 0);
}

// 初期設定でキャンバスサイズを変更
resizeCanvas();

// 画面リサイズ時にもキャンバスを調整
window.addEventListener("resize", resizeCanvas);



