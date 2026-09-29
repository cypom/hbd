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

const PASSWORD = "0530";

const gameState = {
  authenticated: false,
  windowOpened: false,
  diaryOpened: false,
  giftsFound: 0
};

let hintTimer;


/* =========================================================
   CREATE FULL SCREEN CURTAIN
========================================================= */

function createSceneTransition() {

  const transition = document.createElement("div");

  transition.className = "scene-transition";

  transition.innerHTML = `
    <div class="scene-curtain left"></div>
    <div class="scene-curtain right"></div>
  `;

  document.body.appendChild(transition);

  return transition;
}


/* =========================================================
   CREATE DUST
========================================================= */

function createDust() {

  for (let i = 0; i < 18; i++) {

    const dust = document.createElement("div");

    dust.className = "scene-dust";

    dust.style.left =
      `${30 + Math.random() * 45}%`;

    dust.style.top =
      `${35 + Math.random() * 45}%`;

    dust.style.animationDelay =
      `${Math.random() * 4}s`;

    dust.style.animationDuration =
      `${4 + Math.random() * 4}s`;

    document.body.appendChild(dust);
  }
}


/* =========================================================
   MAIN OPENING SEQUENCE
========================================================= */

function startRoomOpening() {

  gameState.authenticated = true;

  loginMessage.textContent = "ACCESS GRANTED";

  loginMessage.style.color = "#d9c49f";


  /*
    1.
    ACCESS GRANTED 停留
  */

  setTimeout(() => {

    /*
      2.
      建立全螢幕窗簾
    */

    const transition = createSceneTransition();


    /*
      3.
      登入畫面淡出
    */

    loginScreen.classList.add("hidden");


    /*
      4.
      房間出現
      但是非常暗
    */

    room.classList.remove("hidden");

    requestAnimationFrame(() => {

      room.classList.add("scene-visible");

    });


    /*
      5.
      稍微等待
      讓玩家先看到暗房間
    */

    setTimeout(() => {

      /*
        6.
        窗簾開始打開
      */

      transition.classList.add("opening");


      /*
        7.
        房間逐漸變亮
      */

      setTimeout(() => {

        room.classList.add("scene-bright");

        createDust();

      }, 1000);


      /*
        8.
        光線爆發
      */

      setTimeout(() => {

        transition.classList.add("light-burst");

      }, 1900);


      /*
        9.
        完成轉場
      */

      setTimeout(() => {

        transition.classList.add("finished");

        gameState.windowOpened = true;

        showHint("陽光進來了。");

        setTimeout(() => {

          transition.remove();

        }, 1000);

      }, 3000);

    }, 1200);

  }, 1000);
}


/* =========================================================
   LOGIN
========================================================= */

function enterRoom() {

  const enteredPassword =
    passwordInput.value.trim();

  console.log(
    "輸入的密碼：",
    enteredPassword
  );


  if (enteredPassword === PASSWORD) {

    startRoomOpening();

  } else {

    loginMessage.textContent =
      "ACCESS DENIED";

    loginMessage.style.color =
      "#b98f7f";

    passwordInput.value = "";

    passwordInput.focus();

  }
}


enterButton.addEventListener(
  "click",
  enterRoom
);


passwordInput.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Enter") {

      enterRoom();

    }

  }
);


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

windowObject.addEventListener(
  "click",
  () => {

    if (!gameState.authenticated) {
      return;
    }

    showHint(
      "陽光已經進來了。"
    );

  }
);


/* =========================================================
   DIARY
========================================================= */

diary.addEventListener(
  "click",
  () => {

    gameState.diaryOpened = true;

    diaryModal.classList.remove(
      "hidden"
    );

  }
);


/* =========================================================
   CLOSE DIARY
========================================================= */

closeDiary.addEventListener(
  "click",
  () => {

    diaryModal.classList.add(
      "hidden"
    );

  }
);


diaryModal.addEventListener(
  "click",
  (event) => {

    if (event.target === diaryModal) {

      diaryModal.classList.add(
        "hidden"
      );

    }

  }
);


/* =========================================================
   CLOCK
========================================================= */

document
  .getElementById("clock")
  .addEventListener(
    "click",
    () => {

      showHint(
        "指針安靜地走著。"
      );

    }
  );


/* =========================================================
   DRAWER
========================================================= */

document
  .getElementById("drawer")
  .addEventListener(
    "click",
    () => {

      showHint(
        "抽屜現在還打不開。"
      );

    }
  );


/* =========================================================
   WARDROBE
========================================================= */

document
  .getElementById("wardrobe")
  .addEventListener(
    "click",
    () => {

      showHint(
        "衣櫃裡掛著一件黑白襯衫。"
      );

    }
  );


/* =========================================================
   PHOTO
========================================================= */

document
  .getElementById("photo-frame")
  .addEventListener(
    "click",
    () => {

      showHint(
        "照片還沒有被喚醒。"
      );

    }
  );


/* =========================================================
   DOG
========================================================= */

document
  .getElementById("dog-toy")
  .addEventListener(
    "click",
    () => {

      showHint(
        "小狗玩偶安靜地看著你。"
      );

    }
  );


/* =========================================================
   SPEAKER
========================================================= */

document
  .getElementById("speaker")
  .addEventListener(
    "click",
    () => {

      showHint(
        "音響沒有播放任何聲音。"
      );

    }
  );


console.log(
  "Birthday Adventure initialized."
);
