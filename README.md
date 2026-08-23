# Modernist Timer

Extensão Chrome que exibe uma barra flutuante na plataforma [Modernist](https://app.modernisteb.com.br) mostrando o tempo restante da jornada de trabalho.

## Funcionalidades

- **Barra de progresso flutuante** — exibida no rodapé da página do Modernist
- **Tempo restante** — contagem regressiva até o fim do expediente
- **Horas trabalhadas** — total acumulado do dia
- **Previsão de saída** — horário estimado com base na jornada configurada
- **Alerta de saída** — popup automático 5~10 minutos antes do fim da jornada
- **Jornada configurável** — define as horas diárias diretamente na barra

## Como funciona

A extensão possui 3 componentes que se comunicam via `chrome.storage`:

| Componente | Arquivo | Responsabilidade |
|---|---|---|
| Content Script | `content.ts` | Faz scraping do DOM do Modernist, calcula a jornada e renderiza a barra |
| Background | `background.ts` | Worker de serviço com alarme periódico para disparar alertas |
| Notifier | `notifier.ts` | Exibe popup de notificação na página quando o alarme dispara |

## Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
npm install
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Build com watch para desenvolvimento |
| `npm run build` | Build de produção |
| `npm run icons` | Regenera os ícones PNG |

### Carregar no Chrome

1. Execute `npm run build`
2. Acesse `chrome://extensions`
3. Ative o **Modo desenvolvedor**
4. Clique em **Carregar extensão sem compactar**
5. Selecione a pasta `dist/`

## Estrutura do projeto

```
src/
├── background.ts    # Service worker — alarme de alerta
├── bar.ts           # Criação e atualização da barra flutuante
├── content.ts       # Entry point do content script
├── extract.ts       # Scraping do DOM do Modernist
├── notifier.ts      # Popup de notificação de saída
├── schedule.ts      # Cálculo de jornada de trabalho
├── time.ts          # Utilitários de data/hora
└── types.ts         # Interfaces e constantes compartilhadas
```

## Stack

- **TypeScript** — tipagem estática
- **Vite** — build tool (API Node.js)
- **Chrome Extension Manifest V3** — APIs de extensão

## Licença

MIT
