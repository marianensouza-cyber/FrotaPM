# FrotaPM - Sistema de Gestão de Manutenção de Frotas

## 📋 Descrição

FrotaPM é um sistema desenvolvido para a Polícia Militar de Blumenau que gerencia a manutenção preventiva de viaturas, substituindo o modelo reativo (apenas quando falham) por um sistema planejado e organizado.

## ✨ Principais Funcionalidades

- 🚗 **Cadastro de Viaturas** - Gerenciar veículos da frota
- 🔧 **Planos de Manutenção Preventiva** - Cronogramas automáticos
- 📊 **Histórico de Manutenção** - Rastreabilidade completa
- 📈 **Dashboard com KPIs** - Disponibilidade, status das manutenções
- 📍 **Rastreamento em Tempo Real** - Localização das viaturas no mapa
- 📥 **Relatórios Baixáveis** - Exportar em PDF e CSV
- ✏️ **Edição Funcional** - Botões de edição que realmente funcionam

## 🚀 Como Começar

### Pré-requisitos
- Node.js 16+
- PostgreSQL (ou SQLite para desenvolvimento)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/marianensouza-cyber/FrotaPM.git
cd FrotaPM

# Instale as dependências do backend
cd backend
npm install

# Instale as dependências do frontend
cd ../frontend
npm install
```

### Desenvolvimento

```bash
# Terminal 1 - Backend (porta 5000)
cd backend
npm run dev

# Terminal 2 - Frontend (porta 5173)
cd frontend
npm run dev
```

## 📁 Estrutura do Projeto

```
FrotaPM/
├── backend/          # API Node.js + Express
├── frontend/         # React + Vite
├── docs/            # Documentação
└── README.md
```

## 📝 Licença

MIT