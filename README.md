# FrotaPM - Gestão de Manutenção de Frotas

## 📋 Descrição

FrotaPM é um sistema desenvolvido para a Polícia Militar de Blumenau que gerencia a manutenção preventiva de viaturas, substituindo o modelo reativo (apenas quando falham) por um sistema planejado e organizado.

## ✨ Principais Funcionalidades

- 🚗 **Cadastro de Viaturas** - Gerenciar veículos da frota
- 🔧 **Histórico de Manutenção** - Rastreabilidade completa
- 📊 **Dashboard com KPIs** - Disponibilidade, status das manutenções em tempo real
- 🗺️ **Rastreamento em Tempo Real** - Localização das viaturas no mapa
- 📥 **Relatórios Baixáveis** - Exportar em PDF e CSV
- ✏️ **Edição Funcional** - Botões de edição que realmente funcionam
- 📊 **Análise de Custos** - Visualizar gastos com manutenção

## 🚀 Como Rodar Agora

### Passo 1: Clone o repositório

```bash
git clone https://github.com/marianensouza-cyber/FrotaPM.git
cd FrotaPM
git checkout develop
```

### Passo 2: Instale e rode o Backend

```bash
cd backend
npm install
npm run dev
```

### Passo 3: Em outro terminal, instale e rode o Frontend

```bash
cd frontend
npm install
npm run dev
```

### Passo 4: Abra no navegador

```
http://localhost:5173
```

## 🎉 Pronto! O aplicativo já está funcionando!

### O que você pode fazer:

1. **🚗 Viaturas** - Adicionar, editar e deletar viaturas
2. **🔧 Manutenção** - Registrar histórico de manutenções
3. **📊 Dashboard** - Ver KPIs em tempo real
4. **🗺️ Mapa** - Rastrear viaturas no mapa
5. **📥 Relatórios** - Baixar relatórios em CSV

## 📁 Estrutura do Projeto

```
FrotaPM/
├── backend/
│  ├── server.js
│  ├── package.json
│  ├── .env
│  ├── config/database.js
│  └── routes/
├── frontend/
│  ├── src/
│  ├── package.json
│  └── vite.config.js
├── docs/
└── README.md
```

## 🛠️ Tecnologias Usadas

- **Backend**: Node.js + Express
- **Frontend**: React + Vite
- **Database**: SQLite (zero-config)
- **Mapa**: Leaflet + OpenStreetMap (100% gratuito)
- **Estilos**: CSS puro

## 📝 Licença

MIT
