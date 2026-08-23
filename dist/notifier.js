(function(){"use strict";const o="genyo-timer-exit-alert",a="genyo-timer-exit-alert-styles",s="https://app.modernisteb.com.br";chrome.runtime.onMessage.addListener(t=>{t.type==="GENYO_TIMER_SHOW_EXIT_ALERT"&&c(t.payload)});function c(t){d();const r=document.getElementById(o);r&&r.remove();const e=document.createElement("div");e.id=o,e.setAttribute("role","status"),e.innerHTML=`
    <button class="gt-alert-close" type="button" aria-label="Fechar">×</button>
    <div class="gt-alert-title">Hora de bater o ponto!</div>
    <div class="gt-alert-time">Saída prevista: <strong>${l(t.saidaPrevista)}</strong></div>
    <button class="gt-alert-action" type="button">Bater ponto</button>
  `;const n=e.querySelector(".gt-alert-close");n==null||n.addEventListener("click",()=>e.remove());const i=e.querySelector(".gt-alert-action");i==null||i.addEventListener("click",()=>{e.remove(),window.open(s,"_blank")}),document.body.appendChild(e),window.setTimeout(()=>e.remove(),3e4)}function d(){if(document.getElementById(a))return;const t=document.createElement("style");t.id=a,t.textContent=`
    #${o} {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 2147483647;
      box-sizing: border-box;
      width: min(360px, calc(100vw - 32px));
      padding: 16px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      background: #20242c;
      color: #f8fafc;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    }
    #${o} .gt-alert-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: #cbd5e1;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
    }
    #${o} .gt-alert-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
    #${o} .gt-alert-title {
      margin-right: 32px;
      color: #ffffff;
      font-size: 15px;
      font-weight: 700;
    }
    #${o} .gt-alert-time {
      margin-top: 6px;
      color: #dbe3ee;
    }
    #${o} .gt-alert-action {
      margin-top: 14px;
      min-height: 34px;
      padding: 0 14px;
      border: 0;
      border-radius: 6px;
      background: #f59f00;
      color: #141414;
      cursor: pointer;
      font-weight: 700;
    }
    #${o} .gt-alert-action:hover {
      background: #ffb224;
    }
  `,document.head.appendChild(t)}function l(t){return t.replace(/[&<>"']/g,r=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[r])}})();
