(function(){"use strict";var _;const H="genyoTimerStatus",g="genyoTimerDailyHours",f="08:00",y="genyo-timer-floating-bar",M="gt-daily-hours-input";function D(t){const e=document.getElementById(y);if(e)return e;const n=document.createElement("div");n.id=y,n.innerHTML=`
    <div class="gt-container">
      <div class="gt-row">
        <div class="gt-input-wrapper">
          <input
            id="${M}"
            class="gt-input"
            type="text"
            maxlength="5"
            placeholder="08:00"
            value="${O(t)}"
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
  `,z();const a=n.querySelector(`#${M}`);return a&&(a.addEventListener("blur",()=>N(a)),a.addEventListener("keydown",r=>{r.key==="Enter"&&a.blur()}),a.addEventListener("input",()=>{a.value.length===2&&!a.value.includes(":")&&(a.value=a.value+":")})),document.body.appendChild(n),n}function L(t){const e=document.getElementById("gt-tempo-restante"),n=document.getElementById("gt-tempo-trabalhado"),a=document.getElementById("gt-progress-bar"),r=document.getElementById("gt-saida-prevista"),o=document.getElementById(y),l=document.getElementById(M);!e||!n||!a||!r||!o||(e.textContent=t.textoRestante,n.textContent=t.textoTrabalhadas,r.textContent=t.estado==="done"&&t.saidaPrevistaMin===null?"✓":t.saidaPrevista,o.className=`gt-status-${t.estado}`,a.style.width=`${t.progresso}%`,l&&l!==document.activeElement&&(l.value=t.horasDiarias))}function N(t){var r;let e=t.value.replace(/[^0-9:]/g,"");const n=/^(\d{1,2}):(\d{2})$/,a=e.match(n);if(!a)t.value=f,e=f;else{const o=parseInt(a[1],10),l=Math.min(parseInt(a[2],10),59);e=`${String(o).padStart(2,"0")}:${String(l).padStart(2,"0")}`,t.value=e}(r=chrome==null?void 0:chrome.storage)!=null&&r.local&&chrome.storage.local.set({[g]:e})}function z(){if(document.getElementById("genyo-timer-styles"))return;const t=document.createElement("style");t.id="genyo-timer-styles",t.textContent=`
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
  `,document.head.appendChild(t)}function O(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function E(){var d;const t=q();if(!t)return null;const e=t.querySelectorAll(":scope > .space-y-4 > div");if(e.length===0)return null;let n=null,a=null,r=null,o=null;const l=Y();for(const x of e){const p=x.querySelector("p");if(!p)continue;const u=(p.textContent??"").trim(),c=x.querySelector(".text-lg, .font-mono"),i=((d=c==null?void 0:c.textContent)==null?void 0:d.trim())??null;u==="Entrada"&&i?n=i:u==="Saída"&&i?a=i:u==="Início da Pausa"&&i?r=i:u==="Retorno da Pausa"&&i&&(o=i)}let h=0;if(r&&o){const x=$(r),p=$(o);h=Math.max(0,p-x)}let b="desconhecido";return l&&(b=l.includes("Entrada")?"Saida":"Entrada"),{horasPrevistas:"00:00",horasTrabalhadas:"00:00",saldo:"00:00",abonos:"00:00",intervalos:F(h),horaEntrada:n,horaSaida:a,status:b}}function q(){const t=document.querySelectorAll("h3");for(const e of t)if((e.textContent??"").trim().includes("Seu Extrato Hoje")){const n=e.closest(".border");if(n)return n}return null}function Y(){const t=document.querySelectorAll("button");for(const e of t){const n=(e.textContent??"").trim();if(n==="Registrar Entrada"||n==="Registrar Nova Entrada"||n==="Registrar Saída"||n==="Registrar Nova Saída")return n}return null}function $(t){const[e,n]=t.split(":").map(Number);return e*60+n}function F(t){const e=Math.floor(t/60),n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function T(t){const e=t.trim();if(!e||e==="-")return 0;const n=e.startsWith("-"),[a,r]=e.replace(/^-/,"").split(":").map(Number),o=a*60+r;return n?-o:o}function m(t){const e=Math.abs(t),n=Math.floor(e/60),a=e%60;return n===0?`${a}min`:a===0?`${n}h`:`${n}h${a}min`}function A(t){const[e,n]=t.split(":").map(Number);return e*60+n}function j(t=new Date){return t.getHours()*60+t.getMinutes()}function S(t){const e=Math.floor(t/60)%24,n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function R(t,e){return e===0?0:Math.min(100,Math.round(t/e*100))}const J=5,U=10;function G(t,e,n=new Date){const a=n.getTime(),r=X(n);if(t.horaEntrada){const o=A(t.horaEntrada),l=T(e),h=T(t.intervalos),b=l+h,d=o+b,p=(t.horaSaida?A(t.horaSaida):null)??k(n),u=Math.max(0,d-p),c=Math.max(0,p-o-h);if(t.horaSaida){const i=Math.max(0,l-c);return{saidaPrevistaMin:d,saidaPrevista:S(d),restanteMin:0,podeAlertar:!1,atualizadoEm:a,dataReferencia:r,estado:"done",progresso:R(c,l),textoRestante:i>0?`Faltam ${m(i)}`:"Expediente completo!",textoTrabalhadas:c>0?m(c):"--",horasDiarias:e}}if(u>0){const i=Math.max(0,k(n)-o);return{saidaPrevistaMin:d,saidaPrevista:S(d),restanteMin:u,podeAlertar:K(u),atualizadoEm:a,dataReferencia:r,estado:"working",progresso:R(i,b),textoRestante:`Faltam ${m(u)}`,textoTrabalhadas:c>0?m(c):"--",horasDiarias:e}}return{saidaPrevistaMin:d,saidaPrevista:S(d),restanteMin:0,podeAlertar:!1,atualizadoEm:a,dataReferencia:r,estado:"done",progresso:100,textoRestante:"Expediente completo!",textoTrabalhadas:c>0?m(c):"--",horasDiarias:e}}return{saidaPrevistaMin:null,saidaPrevista:"--:--",restanteMin:0,podeAlertar:!1,atualizadoEm:a,dataReferencia:r,estado:"done",progresso:0,textoRestante:"Aguardando registros...",textoTrabalhadas:"--",horasDiarias:e}}function K(t){return t>=J&&t<=U}function k(t){return j(t)}function X(t){const e=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),a=String(t.getDate()).padStart(2,"0");return`${e}-${n}-${a}`}let v=f,s=null,P=0;function B(){W().then(t=>{v=t??f,D(v),V()})}function V(){s=new MutationObserver(()=>{E()&&(s==null||s.disconnect(),s=null,w())}),s.observe(document.body,{childList:!0,subtree:!0}),C()}function C(){if(E()){s==null||s.disconnect(),s=null,w();return}P++,P<10?setTimeout(C,3e3):(s==null||s.disconnect(),s=null,w())}function w(){I(),window.setInterval(I,3e4)}function I(){const t=E();if(t){const e=G(t,v);L(e),Q(e)}else{const e=document.getElementById("gt-tempo-restante");e&&(e.textContent="Aguardando dados...")}}async function W(){var t;if(!((t=chrome==null?void 0:chrome.storage)!=null&&t.local))return null;try{return(await chrome.storage.local.get(g))[g]||null}catch{return null}}function Q(t){var e;(e=chrome==null?void 0:chrome.storage)!=null&&e.local&&chrome.storage.local.set({[H]:t})}(_=chrome==null?void 0:chrome.storage)!=null&&_.onChanged&&chrome.storage.onChanged.addListener(t=>{t[g]&&(v=t[g].newValue??f,I())}),document.readyState==="complete"?B():window.addEventListener("load",()=>B())})();
