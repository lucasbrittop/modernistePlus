(function(){"use strict";var _;const S="genyoTimerStatus",g="genyoTimerDailyHours",f="08:00";function D(t){return t.replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n])}const L=`#genyo-timer-floating-bar {\r
  position: fixed;\r
  bottom: 0;\r
  left: 0;\r
  right: 0;\r
  z-index: 999999;\r
  font-family: 'Open Sans', sans-serif;\r
  font-size: 13px;\r
}\r
.gt-container {\r
  background: rgba(30, 30, 40, 0.92);\r
  color: #e0e0e0;\r
  padding: 6px 16px;\r
  display: flex;\r
  justify-content: center;\r
  align-items: center;\r
  backdrop-filter: blur(6px);\r
  border-top: 1px solid rgba(255,255,255,0.1);\r
}\r
.gt-row {\r
  display: flex;\r
  align-items: center;\r
  gap: 10px;\r
  max-width: 700px;\r
  width: 100%;\r
}\r
.gt-label { font-size: 14px; }\r
.gt-value { font-weight: 600; min-width: 110px; }\r
.gt-sep { color: rgba(255,255,255,0.2); }\r
.gt-progress-container {\r
  flex: 1;\r
  height: 6px;\r
  background: rgba(255,255,255,0.15);\r
  border-radius: 3px;\r
  overflow: hidden;\r
}\r
.gt-progress-bar {\r
  display: block;\r
  height: 100%;\r
  width: 0%;\r
  background: #4caf50;\r
  border-radius: 3px;\r
  transition: width 30s linear;\r
}\r
.gt-status-working .gt-progress-bar { background: #ff9800; }\r
.gt-status-overtime .gt-progress-bar { background: #f44336; }\r
.gt-status-done .gt-progress-bar { background: #4caf50; }\r
.gt-input-wrapper {\r
  position: relative;\r
  display: flex;\r
  align-items: center;\r
  gap: 4px;\r
  background: rgba(255,255,255,0.1);\r
  border-radius: 4px;\r
  padding: 2px 6px;\r
}\r
.gt-input {\r
  width: 42px;\r
  background: transparent;\r
  border: none;\r
  color: #e0e0e0;\r
  font-family: monospace;\r
  font-size: 13px;\r
  font-weight: 600;\r
  outline: none;\r
  text-align: center;\r
  padding: 2px 0;\r
}\r
.gt-input::placeholder { color: rgba(255,255,255,0.3); }\r
.gt-input-label {\r
  font-size: 10px;\r
  color: rgba(255,255,255,0.5);\r
  text-transform: uppercase;\r
}\r
.gt-input-info {\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  width: 14px;\r
  height: 14px;\r
  border-radius: 50%;\r
  background: rgba(255,255,255,0.15);\r
  color: rgba(255,255,255,0.4);\r
  font-size: 9px;\r
  font-weight: 700;\r
  font-style: italic;\r
  font-family: serif;\r
  cursor: help;\r
  line-height: 1;\r
  flex-shrink: 0;\r
}\r
.gt-input-info:hover {\r
  background: rgba(255,255,255,0.3);\r
  color: rgba(255,255,255,0.9);\r
}\r
.gt-input-tooltip {\r
  display: none;\r
  position: absolute;\r
  bottom: calc(100% + 8px);\r
  left: 50%;\r
  transform: translateX(-50%);\r
  background: rgba(0,0,0,0.85);\r
  color: #e0e0e0;\r
  font-size: 11px;\r
  white-space: nowrap;\r
  padding: 4px 10px;\r
  border-radius: 4px;\r
  pointer-events: none;\r
  z-index: 10;\r
}\r
.gt-input-info:hover + .gt-input-tooltip {\r
  display: block;\r
}\r
`,z=`<div class="gt-container">\r
  <div class="gt-row">\r
    <div class="gt-input-wrapper">\r
      <input\r
        id="{{INPUT_ID}}"\r
        class="gt-input"\r
        type="text"\r
        maxlength="5"\r
        placeholder="08:00"\r
        value="{{HORAS_SALVAS}}"\r
      />\r
      <span class="gt-input-label">hrs/dia</span>\r
      <span class="gt-input-info" aria-label="Jornada diária">i</span>\r
      <span class="gt-input-tooltip">Jornada diária no formato HH:MM</span>\r
    </div>\r
    <span class="gt-sep">|</span>\r
    <span class="gt-label">⏳</span>\r
    <span class="gt-value" id="gt-tempo-restante">Carregando...</span>\r
    <span class="gt-sep">|</span>\r
    <span class="gt-label">⏱</span>\r
    <span class="gt-value" id="gt-tempo-trabalhado">--</span>\r
    <span class="gt-sep">|</span>\r
    <div class="gt-progress-container">\r
      <div class="gt-progress-bar" id="gt-progress-bar"></div>\r
    </div>\r
    <span class="gt-sep">|</span>\r
    <span class="gt-label">🏁</span>\r
    <span class="gt-value" id="gt-saida-prevista">--:--</span>\r
  </div>\r
</div>\r
`,M="genyo-timer-floating-bar",E="gt-daily-hours-input";function N(t){const n=document.getElementById(M);if(n)return n;const r=z.replace("{{INPUT_ID}}",E).replace("{{HORAS_SALVAS}}",D(t)),e=document.createElement("div");e.id=M,e.innerHTML=r,q();const a=e.querySelector(`#${E}`);return a&&(a.addEventListener("blur",()=>O(a)),a.addEventListener("keydown",o=>{o.key==="Enter"&&a.blur()}),a.addEventListener("input",()=>{a.value.length===2&&!a.value.includes(":")&&(a.value=a.value+":")})),document.body.appendChild(e),e}function A(t){const n=document.getElementById("gt-tempo-restante"),r=document.getElementById("gt-tempo-trabalhado"),e=document.getElementById("gt-progress-bar"),a=document.getElementById("gt-saida-prevista"),o=document.getElementById(M),l=document.getElementById(E);!n||!r||!e||!a||!o||(n.textContent=t.textoRestante,r.textContent=t.textoTrabalhadas,a.textContent=t.estado==="done"&&t.saidaPrevistaMin===null?"✓":t.saidaPrevista,o.className=`gt-status-${t.estado}`,e.style.width=`${t.progresso}%`,l&&l!==document.activeElement&&(l.value=t.horasDiarias))}function O(t){var a;let n=t.value.replace(/[^0-9:]/g,"");const r=/^(\d{1,2}):(\d{2})$/,e=n.match(r);if(!e)t.value=f,n=f;else{const o=parseInt(e[1],10),l=Math.min(parseInt(e[2],10),59);n=`${String(o).padStart(2,"0")}:${String(l).padStart(2,"0")}`,t.value=n}(a=chrome==null?void 0:chrome.storage)!=null&&a.local&&chrome.storage.local.set({[g]:n})}function q(){if(document.getElementById("genyo-timer-styles"))return;const t=document.createElement("style");t.id="genyo-timer-styles",t.textContent=L,document.head.appendChild(t)}function R(t){const n=t.trim();if(!n||n==="-")return 0;const r=n.startsWith("-"),[e,a]=n.replace(/^-/,"").split(":").map(Number),o=e*60+a;return r?-o:o}function m(t){const n=Math.abs(t),r=Math.floor(n/60),e=n%60;return r===0?`${e}min`:e===0?`${r}h`:`${r}h${e}min`}function v(t){const[n,r]=t.split(":").map(Number);return n*60+r}function Y(t=new Date){return t.getHours()*60+t.getMinutes()}function w(t){const n=Math.floor(t/60)%24,r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function k(t,n){return n===0?0:Math.min(100,Math.round(t/n*100))}function I(){var d;const t=F();if(!t)return null;const n=t.querySelectorAll(":scope > .space-y-4 > div");if(n.length===0)return null;let r=null,e=null,a=null,o=null;const l=U();for(const x of n){const p=x.querySelector("p");if(!p)continue;const u=(p.textContent??"").trim(),c=x.querySelector(".text-lg, .font-mono"),i=((d=c==null?void 0:c.textContent)==null?void 0:d.trim())??null;u==="Entrada"&&i?r=i:u==="Saída"&&i?e=i:u==="Início da Pausa"&&i?a=i:u==="Retorno da Pausa"&&i&&(o=i)}let h=0;if(a&&o){const x=v(a),p=v(o);h=Math.max(0,p-x)}let b="desconhecido";return l&&(b=l.includes("Entrada")?"Saida":"Entrada"),{horasPrevistas:"00:00",horasTrabalhadas:"00:00",saldo:"00:00",abonos:"00:00",intervalos:j(h),horaEntrada:r,horaSaida:e,status:b}}function F(){const t=document.querySelectorAll("h3");for(const n of t)if((n.textContent??"").trim().includes("Seu Extrato Hoje")){const r=n.closest(".border");if(r)return r}return null}function U(){const t=document.querySelectorAll("button");for(const n of t){const r=(n.textContent??"").trim();if(r==="Registrar Entrada"||r==="Registrar Nova Entrada"||r==="Registrar Saída"||r==="Registrar Nova Saída")return r}return null}function j(t){const n=Math.floor(t/60),r=t%60;return`${String(n).padStart(2,"0")}:${String(r).padStart(2,"0")}`}function G(t,n,r=new Date){const e=r.getTime(),a=J(r);if(t.horaEntrada){const o=v(t.horaEntrada),l=R(n),h=R(t.intervalos),b=l+h,d=o+b,p=(t.horaSaida?v(t.horaSaida):null)??$(r),u=Math.max(0,d-p),c=Math.max(0,p-o-h);if(t.horaSaida){const i=Math.max(0,l-c);return{saidaPrevistaMin:d,saidaPrevista:w(d),restanteMin:0,podeAlertar:!1,atualizadoEm:e,dataReferencia:a,estado:"done",progresso:k(c,l),textoRestante:i>0?`Faltam ${m(i)}`:"Expediente completo!",textoTrabalhadas:c>0?m(c):"--",horasDiarias:n}}if(u>0){const i=Math.max(0,$(r)-o);return{saidaPrevistaMin:d,saidaPrevista:w(d),restanteMin:u,podeAlertar:!1,atualizadoEm:e,dataReferencia:a,estado:"working",progresso:k(i,b),textoRestante:`Faltam ${m(u)}`,textoTrabalhadas:c>0?m(c):"--",horasDiarias:n}}return{saidaPrevistaMin:d,saidaPrevista:w(d),restanteMin:0,podeAlertar:!0,atualizadoEm:e,dataReferencia:a,estado:"overtime",progresso:100,textoRestante:"Hora de bater o ponto!",textoTrabalhadas:c>0?m(c):"--",horasDiarias:n}}return{saidaPrevistaMin:null,saidaPrevista:"--:--",restanteMin:0,podeAlertar:!1,atualizadoEm:e,dataReferencia:a,estado:"done",progresso:0,textoRestante:"Aguardando registros...",textoTrabalhadas:"--",horasDiarias:n}}function $(t){return Y(t)}function J(t){const n=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),e=String(t.getDate()).padStart(2,"0");return`${n}-${r}-${e}`}let y=f,s=null,H=0;function B(){Promise.all([K(),X()]).then(([t,n])=>{y=t??f,N(y),n&&A(n),V()})}function V(){s=new MutationObserver(()=>{I()&&(s==null||s.disconnect(),s=null,P())}),s.observe(document.body,{childList:!0,subtree:!0}),C()}function C(){if(I()){s==null||s.disconnect(),s=null,P();return}H++,H<10?setTimeout(C,3e3):(s==null||s.disconnect(),s=null,P())}function P(){T(),window.setInterval(T,3e4)}function T(){const t=I();if(t){const n=G(t,y);A(n),W(n)}else{const n=document.getElementById("gt-tempo-restante");n&&(n.textContent="Aguardando dados...")}}async function K(){var t;if(!((t=chrome==null?void 0:chrome.storage)!=null&&t.local))return null;try{return(await chrome.storage.local.get(g))[g]||null}catch{return null}}function W(t){var n;(n=chrome==null?void 0:chrome.storage)!=null&&n.local&&chrome.storage.local.set({[S]:t})}async function X(){var t;if(!((t=chrome==null?void 0:chrome.storage)!=null&&t.local))return null;try{const r=(await chrome.storage.local.get(S))[S];return r&&typeof r=="object"&&typeof r.saidaPrevista=="string"&&typeof r.restanteMin=="number"?r:null}catch{return null}}(_=chrome==null?void 0:chrome.storage)!=null&&_.onChanged&&chrome.storage.onChanged.addListener(t=>{t[g]&&(y=t[g].newValue??f,T())}),document.readyState==="complete"?B():window.addEventListener("load",()=>B())})();
