import { DadosDia, JornadaStatus } from './types';
import {
  agoraEmMinutos,
  calcularProgresso,
  formatarHora,
  formatMinutes,
  parseHoraEmMinutos,
  parseToMinutes,
} from './time';

const ALERTA_MINIMO_MIN = 5;
const ALERTA_MAXIMO_MIN = 10;

export function calcularJornadaStatus(dados: DadosDia, horasDiarias: string, agora = new Date()): JornadaStatus {
  const atualizadoEm = agora.getTime();
  const dataReferencia = formatarDataLocal(agora);

  if (dados.horaEntrada) {
    const entradaMin = parseHoraEmMinutos(dados.horaEntrada);
    const diariasMin = parseToMinutes(horasDiarias);
    const intervMin = parseToMinutes(dados.intervalos);
    const totalExpedienteMin = diariasMin + intervMin;
    const saidaPrevistaMin = entradaMin + totalExpedienteMin;

    const saidaFinalMin = dados.horaSaida ? parseHoraEmMinutos(dados.horaSaida) : null;
    const referenciaMin = saidaFinalMin ?? minutosDoDia(agora);
    const restanteMin = Math.max(0, saidaPrevistaMin - referenciaMin);
    const trabalhadasMin = Math.max(0, referenciaMin - entradaMin - intervMin);

    if (dados.horaSaida) {
      const deficitMin = Math.max(0, diariasMin - trabalhadasMin);

      return {
        saidaPrevistaMin,
        saidaPrevista: formatarHora(saidaPrevistaMin),
        restanteMin: 0,
        podeAlertar: false,
        atualizadoEm,
        dataReferencia,
        estado: 'done',
        progresso: calcularProgresso(trabalhadasMin, diariasMin),
        textoRestante: deficitMin > 0 ? `Faltam ${formatMinutes(deficitMin)}` : 'Expediente completo!',
        textoTrabalhadas: trabalhadasMin > 0 ? formatMinutes(trabalhadasMin) : '--',
        horasDiarias,
      };
    }

    if (restanteMin > 0) {
      const decorridoMin = Math.max(0, minutosDoDia(agora) - entradaMin);

      return {
        saidaPrevistaMin,
        saidaPrevista: formatarHora(saidaPrevistaMin),
        restanteMin,
        podeAlertar: estaNaJanelaDeAlerta(restanteMin),
        atualizadoEm,
        dataReferencia,
        estado: 'working',
        progresso: calcularProgresso(decorridoMin, totalExpedienteMin),
        textoRestante: `Faltam ${formatMinutes(restanteMin)}`,
        textoTrabalhadas: trabalhadasMin > 0 ? formatMinutes(trabalhadasMin) : '--',
        horasDiarias,
      };
    }

    return {
      saidaPrevistaMin,
      saidaPrevista: formatarHora(saidaPrevistaMin),
      restanteMin: 0,
      podeAlertar: false,
      atualizadoEm,
      dataReferencia,
      estado: 'done',
      progresso: 100,
      textoRestante: 'Expediente completo!',
      textoTrabalhadas: trabalhadasMin > 0 ? formatMinutes(trabalhadasMin) : '--',
      horasDiarias,
    };
  }

  return {
    saidaPrevistaMin: null,
    saidaPrevista: '--:--',
    restanteMin: 0,
    podeAlertar: false,
    atualizadoEm,
    dataReferencia,
    estado: 'done',
    progresso: 0,
    textoRestante: 'Aguardando registros...',
    textoTrabalhadas: '--',
    horasDiarias,
  };
}

export function atualizarRestante(status: JornadaStatus, agora = new Date()): JornadaStatus {
  if (status.saidaPrevistaMin === null || status.dataReferencia !== formatarDataLocal(agora)) {
    return { ...status, restanteMin: 0, podeAlertar: false };
  }

  const restanteMin = Math.max(0, status.saidaPrevistaMin - minutosDoDia(agora));
  return {
    ...status,
    restanteMin,
    podeAlertar: estaNaJanelaDeAlerta(restanteMin),
    estado: restanteMin > 0 ? status.estado : 'done',
  };
}

export function criarChaveAlerta(status: JornadaStatus): string | null {
  if (status.saidaPrevistaMin === null) return null;
  return `${status.dataReferencia}:${status.saidaPrevista}`;
}

function estaNaJanelaDeAlerta(restanteMin: number): boolean {
  return restanteMin >= ALERTA_MINIMO_MIN && restanteMin <= ALERTA_MAXIMO_MIN;
}

function minutosDoDia(date: Date): number {
  return agoraEmMinutos(date);
}

function formatarDataLocal(date: Date): string {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
