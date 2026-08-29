# Modernist Timer

Extensão Chrome que exibe uma barra flutuante na plataforma [Modernist](https://app.modernisteb.com.br) mostrando o tempo restante da jornada de trabalho.

## Funcionalidades

- **Barra de progresso flutuante** — exibida no rodapé da página do Modernist
- **Tempo restante** — contagem regressiva até o fim do expediente
- **Horas trabalhadas** — total acumulado do dia
- **Previsão de saída** — horário estimado com base na jornada configurada
- **Alerta de saída** — popup automático quando a jornada termina, com botão para bater ponto no Modernist
- **Jornada configurável** — define as horas diárias diretamente na barra

## Como funciona

A extensão possui 3 componentes que se comunicam via `chrome.storage`:

| Componente | Arquivo | Responsabilidade |
|---|---|---|
| Content Script | `core/content.ts` | Faz scraping do DOM do Modernist, calcula a jornada e renderiza a barra |
| Background | `core/background.ts` | Worker de serviço com alarme periódico para disparar alertas |
| Notifier | `components/notifier/notifier.ts` | Exibe popup de notificação na página quando o alarme dispara |

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
├── components/
│   ├── bar/
│   │   ├── bar.ts           # Lógica da barra flutuante
│   │   ├── bar.css          # Estilos da barra
│   │   └── bar.html         # Template HTML da barra
│   └── notifier/
│       ├── notifier.ts      # Popup de notificação de saída
│       ├── notifier.css     # Estilos do popup
│       └── notifier.html    # Template HTML do popup
├── core/
│   ├── background.ts        # Service worker — alarme de alerta
│   ├── content.ts           # Entry point do content script
│   ├── extract.ts           # Scraping do DOM do Modernist
│   ├── schedule.ts          # Cálculo de jornada de trabalho
│   └── time.ts              # Utilitários de data/hora
└── shared/
    ├── types.ts             # Interfaces e constantes
    └── utils.ts             # Funções utilitárias (escapeHtml)
```

## Stack

- **TypeScript** — tipagem estática
- **Vite** — build tool (API Node.js)
- **Chrome Extension Manifest V3** — APIs de extensão

## Licença

MIT
