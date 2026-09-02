(function(){"use strict";function s(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const c=`#genyo-timer-exit-alert {\r
  position: fixed;\r
  right: 18px;\r
  bottom: 18px;\r
  z-index: 2147483647;\r
  box-sizing: border-box;\r
  width: min(360px, calc(100vw - 32px));\r
  padding: 16px;\r
  border: 1px solid rgba(255, 255, 255, 0.16);\r
  border-radius: 8px;\r
  background: #20242c;\r
  color: #f8fafc;\r
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);\r
  font-family: Arial, Helvetica, sans-serif;\r
  font-size: 14px;\r
  line-height: 1.4;\r
}\r
#genyo-timer-exit-alert .gt-alert-close {\r
  position: absolute;\r
  top: 8px;\r
  right: 8px;\r
  width: 28px;\r
  height: 28px;\r
  border: 0;\r
  border-radius: 6px;\r
  background: transparent;\r
  color: #cbd5e1;\r
  cursor: pointer;\r
  font-size: 22px;\r
  line-height: 1;\r
}\r
#genyo-timer-exit-alert .gt-alert-close:hover {\r
  background: rgba(255, 255, 255, 0.1);\r
  color: #ffffff;\r
}\r
#genyo-timer-exit-alert .gt-alert-title {\r
  margin-right: 32px;\r
  color: #ffffff;\r
  font-size: 15px;\r
  font-weight: 700;\r
}\r
#genyo-timer-exit-alert .gt-alert-time {\r
  margin-top: 6px;\r
  color: #dbe3ee;\r
}\r
#genyo-timer-exit-alert .gt-alert-action {\r
  margin-top: 14px;\r
  min-height: 34px;\r
  padding: 0 14px;\r
  border: 0;\r
  border-radius: 6px;\r
  background: #f59f00;\r
  color: #141414;\r
  cursor: pointer;\r
  font-weight: 700;\r
}\r
#genyo-timer-exit-alert .gt-alert-action:hover {\r
  background: #ffb224;\r
}\r
`,d=`<button class="gt-alert-close" type="button" aria-label="Fechar">×</button>\r
<div class="gt-alert-title">Hora de bater o ponto!</div>\r
<div class="gt-alert-time">Saída prevista: <strong>{{SAIDA_PREVISTA}}</strong></div>\r
<button class="gt-alert-action" type="button">Bater ponto</button>\r
`,i="genyo-timer-exit-alert",a="genyo-timer-exit-alert-styles",p="https://app.modernisteb.com.br";chrome.runtime.onMessage.addListener(t=>{t.type==="GENYO_TIMER_SHOW_EXIT_ALERT"&&g(t.payload)});function g(t){m();const e=document.getElementById(i);e&&e.remove();const l=d.replace("{{SAIDA_PREVISTA}}",s(t.saidaPrevista)),r=document.createElement("div");r.id=i,r.setAttribute("role","status"),r.innerHTML=l;const n=r.querySelector(".gt-alert-close");n==null||n.addEventListener("click",()=>r.remove());const o=r.querySelector(".gt-alert-action");o==null||o.addEventListener("click",()=>{r.remove(),window.open(p,"_blank")}),document.body.appendChild(r),window.setTimeout(()=>r.remove(),3e4)}function m(){if(document.getElementById(a))return;const t=document.createElement("style");t.id=a,t.textContent=c,document.head.appendChild(t)}})();
