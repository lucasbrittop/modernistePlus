import {
  JornadaStatus,
  GENYO_TIMER_DAILY_HOURS_KEY,
  DEFAULT_DAILY_HOURS,
} from "../../shared/types";
import { escapeHtml } from "../../shared/utils";
import barStyles from "./bar.css?raw";
import barHtml from "./bar.html?raw";

const BAR_ID = "genyo-timer-floating-bar";
const INPUT_ID = "gt-daily-hours-input";

export function criarBar(horasSalvas: string): HTMLElement {
  const existente = document.getElementById(BAR_ID);
  if (existente) return existente;

  const html = barHtml
    .replace("{{INPUT_ID}}", INPUT_ID)
    .replace("{{HORAS_SALVAS}}", escapeHtml(horasSalvas));

  const bar = document.createElement("div");
  bar.id = BAR_ID;
  bar.innerHTML = html;

  injectStyles();

  const input = bar.querySelector(`#${INPUT_ID}`) as HTMLInputElement;
  if (input) {
    input.addEventListener("blur", () => salvarHorasInput(input));
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") input.blur();
    });
    input.addEventListener("input", () => {
      if (input.value.length === 2 && !input.value.includes(":")) {
        input.value = input.value + ":";
      }
    });
  }

  document.body.appendChild(bar);
  return bar;
}

export function atualizarBar(status: JornadaStatus): void {
  const tempoRestante = document.getElementById("gt-tempo-restante");
  const tempoTrabalhado = document.getElementById("gt-tempo-trabalhado");
  const progressBar = document.getElementById("gt-progress-bar");
  const saidaPrevista = document.getElementById("gt-saida-prevista");
  const bar = document.getElementById(BAR_ID);
  const input = document.getElementById(INPUT_ID) as HTMLInputElement;

  if (
    !tempoRestante ||
    !tempoTrabalhado ||
    !progressBar ||
    !saidaPrevista ||
    !bar
  )
    return;

  tempoRestante.textContent = status.textoRestante;
  tempoTrabalhado.textContent = status.textoTrabalhadas;
  saidaPrevista.textContent =
    status.estado === "done" && status.saidaPrevistaMin === null
      ? "✓"
      : status.saidaPrevista;
  bar.className = `gt-status-${status.estado}`;
  progressBar.style.width = `${status.progresso}%`;

  if (input && input !== document.activeElement) {
    input.value = status.horasDiarias;
  }
}

function salvarHorasInput(input: HTMLInputElement): void {
  let valor = input.value.replace(/[^0-9:]/g, "");

  const regex = /^(\d{1,2}):(\d{2})$/;
  const match = valor.match(regex);
  if (!match) {
    input.value = DEFAULT_DAILY_HOURS;
    valor = DEFAULT_DAILY_HOURS;
  } else {
    const h = parseInt(match[1], 10);
    const m = Math.min(parseInt(match[2], 10), 59);
    valor = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    input.value = valor;
  }

  if (chrome?.storage?.local) {
    chrome.storage.local.set({ [GENYO_TIMER_DAILY_HOURS_KEY]: valor });
  }
}

function injectStyles(): void {
  if (document.getElementById("genyo-timer-styles")) return;

  const style = document.createElement("style");
  style.id = "genyo-timer-styles";
  style.textContent = barStyles;
  document.head.appendChild(style);
}
