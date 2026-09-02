import { JornadaStatus, ShowExitAlertMessage } from "../../shared/types";
import { escapeHtml } from "../../shared/utils";
import notifierStyles from "./notifier.css?raw";
import notifierHtml from "./notifier.html?raw";

const POPUP_ID = "genyo-timer-exit-alert";
const STYLE_ID = "genyo-timer-exit-alert-styles";

const MODERNIST_URL = "https://app.modernisteb.com.br";

chrome.runtime.onMessage.addListener((message: ShowExitAlertMessage) => {
  if (message.type !== "GENYO_TIMER_SHOW_EXIT_ALERT") return;
  mostrarPopup(message.payload);
});

function mostrarPopup(status: JornadaStatus): void {
  injectStyles();

  const existente = document.getElementById(POPUP_ID);
  if (existente) existente.remove();

  const html = notifierHtml.replace(
    "{{SAIDA_PREVISTA}}",
    escapeHtml(status.saidaPrevista),
  );

  const popup = document.createElement("div");
  popup.id = POPUP_ID;
  popup.setAttribute("role", "status");
  popup.innerHTML = html;

  const closeBtn = popup.querySelector(".gt-alert-close");
  closeBtn?.addEventListener("click", () => popup.remove());

  const actionBtn = popup.querySelector(".gt-alert-action");
  actionBtn?.addEventListener("click", () => {
    popup.remove();
    window.open(MODERNIST_URL, "_blank");
  });

  document.body.appendChild(popup);
  window.setTimeout(() => popup.remove(), 30_000);
}

function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = notifierStyles;
  document.head.appendChild(style);
}
