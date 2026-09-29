const loginScreen = document.getElementById("login-screen");
const room = document.getElementById("room");

const passwordInput = document.getElementById("password");
const enterButton = document.getElementById("enter-button");
const loginMessage = document.getElementById("login-message");

const windowObject = document.getElementById("window");

const diary = document.getElementById("diary");
const diaryModal = document.getElementById("diary-modal");
const closeDiary = document.getElementById("close-diary");

const roomHint = document.getElementById("room-hint");

// ========================================
// 遊戲狀態
// ========================================

const gameState = {
  authenticated: false,
  windowOpened: false,
  diaryOpened: false,
  giftsFound: 0
};

// ========================================
// 身分確認
// ========================================

const PASSWORD = "0530";

function enterRoom() {
  const enteredPassword = passwordInput.value.trim();

  console.log("輸入的密碼：", enteredPassword);

  if (enteredPassword === PASSWORD) {
    gameState.authenticated = true;

    loginMessage.textContent = "ACCESS GRANTED";
    loginMessage.style.color = "#b9c6ad";

    setTimeout(() => {
      loginScreen.classList.add("hidden");
      room.classList.remove("hidden");

      showHint("房間很安靜。");
    }, 900);

  } else {
    loginMessage.textContent = "ACCESS DENIED";
    loginMessage.style.color = "#a98b82";

    passwordInput.value = "";
  }
}

enterButton.addEventListener("click", enterRoom);

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    enterRoom();
  }
});

// ========================================
// 房間提示
// ========================================

let hintTimer;

function showHint(message) {
  roomHint.textContent = message;

  roomHint.classList.add("show");

  clearTimeout(hintTimer);

  hintTimer = setTimeout(() => {
    roomHint.classList.remove("show");
  }, 2800);
}

// ========================================
// 窗戶
// ========================================

windowObject.addEventListener("click", () => {
  if (gameState.windowOpened) {
    showHint("陽光已經進來了。");
    return;
  }

  gameState.windowOpened = true;

  room.classList.add("window-open");

  showHint("窗簾慢慢向兩側退開。");
});

// ========================================
// 日記本
// ========================================

diary.addEventListener("click", () => {
  gameState.diaryOpened = true;

  diaryModal.classList.remove("hidden");
});

closeDiary.addEventListener("click", () => {
  diaryModal.classList.add("hidden");
});

// 點擊背景也可以關閉日記

diaryModal.addEventListener("click", (event) => {
  if (event.target === diaryModal) {
    diaryModal.classList.add("hidden");
  }
});

// ========================================
// 其他物件
// 第一版先只有提示
// ========================================

document
  .getElementById("clock")
  .addEventListener("click", () => {
    showHint("指針安靜地走著。");
  });

document
  .getElementById("drawer")
  .addEventListener("click", () => {
    showHint("抽屜現在還打不開。");
  });

document
  .getElementById("wardrobe")
  .addEventListener("click", () => {
    showHint("衣櫃裡藏著一件黑白襯衫。");
  });

document
  .getElementById("photo-frame")
  .addEventListener("click", () => {
    showHint("照片還沒有被喚醒。");
  });

document
  .getElementById("dog-toy")
  .addEventListener("click", () => {
    showHint("小狗玩偶安靜地看著你。");
  });

document
  .getElementById("speaker")
  .addEventListener("click", () => {
    showHint("音響沒有播放任何聲音。");
  });

// ========================================
// 初始提示
// ========================================

console.log("Birthday Adventure initialized.");
