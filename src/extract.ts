import { DadosDia } from './types';

export function extrairDados(): DadosDia | null {
  const secaoExtrato = encontrarSecaoExtrato();
  if (!secaoExtrato) return null;

  const cards = secaoExtrato.querySelectorAll(':scope > .space-y-4 > div');
  if (cards.length === 0) return null;

  let horaEntrada: string | null = null;
  let horaSaida: string | null = null;
  let inicioPausa: string | null = null;
  let retornoPausa: string | null = null;

  const textoBotaoPrincipal = extrairTextoBotaoPrincipal();

  for (const card of cards) {
    const labelEl = card.querySelector('p');
    if (!labelEl) continue;

    const label = (labelEl.textContent ?? '').trim();
    const horaEl = card.querySelector('.text-lg, .font-mono');
    const hora = horaEl?.textContent?.trim() ?? null;

    if (label === 'Entrada' && hora) {
      horaEntrada = hora;
    } else if (label === 'Saída' && hora) {
      horaSaida = hora;
    } else if (label === 'Início da Pausa' && hora) {
      inicioPausa = hora;
    } else if (label === 'Retorno da Pausa' && hora) {
      retornoPausa = hora;
    }
  }

  let intervalosMin = 0;
  if (inicioPausa && retornoPausa) {
    const inicio = parseHoraEmMinutos(inicioPausa);
    const retorno = parseHoraEmMinutos(retornoPausa);
    intervalosMin = Math.max(0, retorno - inicio);
  }

  let status: DadosDia['status'] = 'desconhecido';
  if (textoBotaoPrincipal) {
    status = textoBotaoPrincipal.includes('Entrada') ? 'Saida' : 'Entrada';
  }

  return {
    horasPrevistas: '00:00',
    horasTrabalhadas: '00:00',
    saldo: '00:00',
    abonos: '00:00',
    intervalos: formatarMinutos(intervalosMin),
    horaEntrada,
    horaSaida,
    status,
  };
}

function encontrarSecaoExtrato(): Element | null {
  const headings = document.querySelectorAll('h3');
  for (const h of headings) {
    if ((h.textContent ?? '').trim().includes('Seu Extrato Hoje')) {
      const container = h.closest('.border');
      if (container) return container;
    }
  }
  return null;
}

function extrairTextoBotaoPrincipal(): string | null {
  const botoes = document.querySelectorAll('button');
  for (const btn of botoes) {
    const texto = (btn.textContent ?? '').trim();
    if (texto === 'Registrar Entrada' || texto === 'Registrar Nova Entrada' || texto === 'Registrar Saída' || texto === 'Registrar Nova Saída') {
      return texto;
    }
  }
  return null;
}

function parseHoraEmMinutos(horaStr: string): number {
  const [h, m] = horaStr.split(':').map(Number);
  return h * 60 + m;
}

function formatarMinutos(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
