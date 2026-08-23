import {
  JornadaStatus,
  GENYO_TIMER_DAILY_HOURS_KEY,
  DEFAULT_DAILY_HOURS,
} from "./types";

const BAR_ID = "genyo-timer-floating-bar";
const INPUT_ID = "gt-daily-hours-input";

export function criarBar(horasSalvas: string): HTMLElement {
  const existente = document.getElementById(BAR_ID);
  if (existente) return existente;

  const bar = document.createElement("div");
  bar.id = BAR_ID;
  bar.innerHTML = `
    <div class="gt-container">
      <div class="gt-row">
        <div class="gt-input-wrapper">
          <input
            id="${INPUT_ID}"
            class="gt-input"
            type="text"
            maxlength="5"
            placeholder="08:00"
            value="${escapeHtml(horasSalvas)}"
          />
          <span class="gt-input-label">hrs/dia</span>
          <span class="gt-input-info" aria-label="Jornada diária">i</span>
          <span class="gt-input-tooltip">Jornada diária no formato HH:MM</span>
        </div>
        <span class="gt-sep">|</span>
        <span class="gt-label">⏳</span>
        <span class="gt-value" id="gt-tempo-restante">Carregando...</span>
        <span class="gt-sep">|</span>
        <span class="gt-label">⏱</span>
        <span class="gt-value" id="gt-tempo-trabalhado">--</span>
        <span class="gt-sep">|</span>
        <div class="gt-progress-container">
          <div class="gt-progress-bar" id="gt-progress-bar"></div>
        </div>
        <span class="gt-sep">|</span>
        <span class="gt-label">🏁</span>
        <span class="gt-value" id="gt-saida-prevista">--:--</span>
      </div>
    </div>
  `;

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
  style.textContent = `
    #genyo-timer-floating-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999999;
      font-family: 'Open Sans', sans-serif;
      font-size: 13px;
    }
    .gt-container {
      background: rgba(30, 30, 40, 0.92);
      color: #e0e0e0;
      padding: 6px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(6px);
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .gt-row {
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 700px;
      width: 100%;
    }
    .gt-label { font-size: 14px; }
    .gt-value { font-weight: 600; min-width: 110px; }
    .gt-sep { color: rgba(255,255,255,0.2); }
    .gt-progress-container {
      flex: 1;
      height: 6px;
      background: rgba(255,255,255,0.15);
      border-radius: 3px;
      overflow: hidden;
    }
    .gt-progress-bar {
      display: block;
      height: 100%;
      width: 0%;
      background: #4caf50;
      border-radius: 3px;
      transition: width 30s linear;
    }
    .gt-status-working .gt-progress-bar { background: #ff9800; }
    .gt-status-overtime .gt-progress-bar { background: #f44336; }
    .gt-status-done .gt-progress-bar { background: #4caf50; }
    .gt-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      padding: 2px 6px;
    }
    .gt-input {
      width: 42px;
      background: transparent;
      border: none;
      color: #e0e0e0;
      font-family: monospace;
      font-size: 13px;
      font-weight: 600;
      outline: none;
      text-align: center;
      padding: 2px 0;
    }
    .gt-input::placeholder { color: rgba(255,255,255,0.3); }
    .gt-input-label {
      font-size: 10px;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
    }
    .gt-input-info {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      color: rgba(255,255,255,0.4);
      font-size: 9px;
      font-weight: 700;
      font-style: italic;
      font-family: serif;
      cursor: help;
      line-height: 1;
      flex-shrink: 0;
    }
    .gt-input-info:hover {
      background: rgba(255,255,255,0.3);
      color: rgba(255,255,255,0.9);
    }
    .gt-input-tooltip {
      display: none;
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0,0,0,0.85);
      color: #e0e0e0;
      font-size: 11px;
      white-space: nowrap;
      padding: 4px 10px;
      border-radius: 4px;
      pointer-events: none;
      z-index: 10;
    }
    .gt-input-info:hover + .gt-input-tooltip {
      display: block;
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}
