const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const botaoIniciar = document.querySelector(".app__card-primary-button");
const displayTempo = document.querySelector("#timer");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const iniciarOuPausarBt = document.querySelector("#start-pause span");
const iniciarOuPausarBtIcone = document.querySelector(
  ".app__card-primary-butto-icon",
);
const musicaFocoInput = document.querySelector("#alternar-musica");

const musica = new Audio("./sons/luna-rise-part-one.mp3");
const tempoFinalizado = new Audio("./sons/beep.mp3");
const somIniciar = new Audio("./sons/play.wav");
const somPausar = new Audio("./sons/pause.mp3");
if ("Notification" in window) {
    Notification.requestPermission();
}
musica.loop = true;
const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
let tempoInicial = null;
let duracaoInicial = null;
let timeoutId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = duracaoFoco;
  alterarContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = duracaoDescansoCurto;
  alterarContexto("descanso-curto");
  curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundos = duracaoDescansoLongo;
  alterarContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach((botao) => {
    botao.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `./imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
    default:
      break;
  }
}

function finalizarTimer() {
    tempoDecorridoEmSegundos = 0;
    mostrarTempo();

    tempoFinalizado.play();

    if (Notification.permission === "granted") {
        new Notification("Fokus", {
            body: "Seu período de foco terminou! 🎯"
        });
    }

    alert("Tempo finalizado!");

    const focoAtivo = html.getAttribute("data-contexto") == "foco";

    if (focoAtivo) {
        const evento = new CustomEvent("focoFinalizado");
        document.dispatchEvent(evento);
    }

    zerar();
}

const contagemRegressiva = () => {
  const tempoPassadoEmSegundos = Math.floor((Date.now() - tempoInicial) / 1000);

  tempoDecorridoEmSegundos = duracaoInicial - tempoPassadoEmSegundos;

  if (tempoDecorridoEmSegundos <= 0) {
    finalizarTimer();
    return;
  }

  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    somPausar.play();
    contagemRegressiva();
    zerar();
    return;
  }

  somIniciar.play();

  tempoInicial = Date.now();
  duracaoInicial = tempoDecorridoEmSegundos;

  intervaloId = setInterval(contagemRegressiva, 250);

  timeoutId = setTimeout(() => {
    finalizarTimer();
  }, duracaoInicial * 1000);

  iniciarOuPausarBt.textContent = "Pausar";
  iniciarOuPausarBtIcone.setAttribute("src", "./imagens/pause.png");
}

function zerar() {
    clearInterval(intervaloId);
    clearTimeout(timeoutId);

    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarBtIcone.setAttribute("src", "./imagens/play_arrow.png");

    intervaloId = null;
    timeoutId = null;
    tempoInicial = null;
    duracaoInicial = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit",
  });
  displayTempo.innerHTML = `${tempoFormatado}`;
}

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && intervaloId) {
        contagemRegressiva();
    }
});

mostrarTempo();
