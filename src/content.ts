import { criarBar, atualizarBar } from './bar';
import { extrairDados } from './extract';
import { calcularJornadaStatus } from './schedule';
import { GENYO_TIMER_STORAGE_KEY, GENYO_TIMER_DAILY_HOURS_KEY, DEFAULT_DAILY_HOURS, JornadaStatus } from './types';

let horasDiarias = DEFAULT_DAILY_HOURS;
let observer: MutationObserver | null = null;
let intervaloId: number | null = null;
let tentativas = 0;

function iniciar(): void {
  carregarHorasDiarias().then((salvo) => {
    horasDiarias = salvo ?? DEFAULT_DAILY_HOURS;
    criarBar(horasDiarias);
    iniciarObservacao();
  });
}

function iniciarObservacao(): void {
  observer = new MutationObserver(() => {
    const dados = extrairDados();
    if (dados) {
      observer?.disconnect();
      observer = null;
      iniciarPolling();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });

  retryCycle();
}

function retryCycle(): void {
  const dados = extrairDados();
  if (dados) {
    observer?.disconnect();
    observer = null;
    iniciarPolling();
    return;
  }

  tentativas++;
  if (tentativas < 10) {
    setTimeout(retryCycle, 3_000);
  } else {
    observer?.disconnect();
    observer = null;
    iniciarPolling();
  }
}

function iniciarPolling(): void {
  atualizar();
  intervaloId = window.setInterval(atualizar, 30_000);
}

function atualizar(): void {
  const dados = extrairDados();
  if (dados) {
    const status = calcularJornadaStatus(dados, horasDiarias);
    atualizarBar(status);
    salvarStatus(status);
  } else {
    const el = document.getElementById('gt-tempo-restante');
    if (el) el.textContent = 'Aguardando dados...';
  }
}

async function carregarHorasDiarias(): Promise<string | null> {
  if (!chrome?.storage?.local) return null;
  try {
    const result = await chrome.storage.local.get(GENYO_TIMER_DAILY_HOURS_KEY);
    return result[GENYO_TIMER_DAILY_HOURS_KEY] || null;
  } catch {
    return null;
  }
}

function salvarStatus(status: JornadaStatus): void {
  if (!chrome?.storage?.local) return;
  chrome.storage.local.set({ [GENYO_TIMER_STORAGE_KEY]: status });
}

if (chrome?.storage?.onChanged) {
  chrome.storage.onChanged.addListener((changes) => {
    if (changes[GENYO_TIMER_DAILY_HOURS_KEY]) {
      horasDiarias = changes[GENYO_TIMER_DAILY_HOURS_KEY].newValue ?? DEFAULT_DAILY_HOURS;
      atualizar();
    }
  });
}

if (document.readyState === 'complete') {
  iniciar();
} else {
  window.addEventListener('load', () => iniciar());
}
