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

const gameState = {
  authenticated: false,
  windowOpened: false,
  diaryOpened: false,
  giftsFound: 0
};

const PASSWORD = "0530";

let hintTimer;

/* =========================================================
   LOGIN
========================================================= */

function enterRoom() {
  const enteredPassword = passwordInput.value.trim();

  console.log("輸入的密碼：", enteredPassword);

  if (enteredPassword === PASSWORD) {

    gameState.authenticated = true;

    loginMessage.textContent = "ACCESS GRANTED";
    loginMessage.style.color = "#d9c49f";

    /*
      第一階段：
      等待 ACCESS GRANTED 出現
    */

    setTimeout(() => {

      /*
        第二階段：
        登入畫面淡出
      */

      loginScreen.classList.add("hidden");

      /*
        第三階段：
        顯示房間
      */

      room.classList.remove("hidden");

      /*
        確保房間一開始還是關著窗簾
      */

      room.classList.remove("window-open");

      /*
        等待房間淡入
      */

      setTimeout(() => {

        /*
          第四階段：
          窗簾開始打開
        */

        room.classList.add("window-open");

        gameState.windowOpened = true;

      }, 900);

    }, 900);

  } else {

    loginMessage.textContent = "ACCESS DENIED";

    loginMessage.style.color = "#b98f7f";

    passwordInput.value = "";

    passwordInput.focus();
  }
}

enterButton.addEventListener("click", enterRoom);

passwordInput.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    enterRoom();
  }

});

/* =========================================================
   HINT
========================================================= */

function showHint(message) {

  roomHint.textContent = message;

  roomHint.classList.add("show");

  clearTimeout(hintTimer);

  hintTimer = setTimeout(() => {

    roomHint.classList.remove("show");

  }, 2800);
}

/* =========================================================
   WINDOW
========================================================= */

windowObject.addEventListener("click", () => {

  if (!gameState.authenticated) {
    return;
  }

  if (gameState.windowOpened) {

    showHint("窗外的陽光已經進來了。");

    return;
  }

  gameState.windowOpened = true;

  room.classList.add("window-open");

  showHint("窗簾慢慢向兩側退開。");

});

/* =========================================================
   DIARY
========================================================= */

diary.addEventListener("click", () => {

  gameState.diaryOpened = true;

  diaryModal.classList.remove("hidden");

});

/* =========================================================
   CLOSE DIARY
========================================================= */

closeDiary.addEventListener("click", () => {

  diaryModal.classList.add("hidden");

});

diaryModal.addEventListener("click", (event) => {

  if (event.target === diaryModal) {

    diaryModal.classList.add("hidden");

  }

});

/* =========================================================
   CLOCK
========================================================= */

document.getElementById("clock").addEventListener("click", () => {

  showHint("指針安靜地走著。");

});

/* =========================================================
   DRAWER
========================================================= */

document.getElementById("drawer").addEventListener("click", () => {

  showHint("抽屜現在還打不開。");

});

/* =========================================================
   WARDROBE
========================================================= */

document.getElementById("wardrobe").addEventListener("click", () => {

  showHint("衣櫃裡掛著一件黑白襯衫。");

});

/* =========================================================
   PHOTO
========================================================= */

document.getElementById("photo-frame").addEventListener("click", () => {

  showHint("照片還沒有被喚醒。");

});

/* =========================================================
   DOG
========================================================= */

document.getElementById("dog-toy").addEventListener("click", () => {

  showHint("小狗玩偶安靜地看著你。");

});

/* =========================================================
   SPEAKER
========================================================= */

document.getElementById("speaker").addEventListener("click", () => {

  showHint("音響沒有播放任何聲音。");

});

/* =========================================================
   START
========================================================= */

console.log("Birthday Adventure initialized.");
