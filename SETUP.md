# 🚀 Guia de Setup - FrotaPM

## **O que é FrotaPM?**
Sistema de gestão de manutenção de frotas para a Polícia Militar de Blumenau. Gerencia viaturas, manutenção preventiva, dashboard com KPIs, rastreamento em mapa e relatórios em PDF/CSV.

---

## **Pré-requisitos**

### 1️⃣ Instalar Node.js
Acesse: https://nodejs.org/
- Baixe a versão **LTS** (recomendado)
- Instale normalmente
- Verifique se foi instalado corretamente:

```bash
node -v
npm -v
```

Você deve ver números de versão. Se aparecer erro, reinicie o computador.

---

## **Setup Passo a Passo**

### **Passo 1: Abra o Terminal**
- **Windows**: Clique no ícone do Windows, procure por `PowerShell` ou `CMD`
- **Mac/Linux**: Abra o `Terminal`

### **Passo 2: Navegue até a pasta do projeto**

```bash
cd caminho/para/FrotaPM
```

**Exemplos:**
- Windows: `cd C:\Users\seu_usuario\Documents\FrotaPM`
- Mac: `cd ~/Documents/FrotaPM`
- Linux: `cd ~/FrotaPM`

Verifique que você está no lugar certo digitando:
```bash
dir
```
ou no Mac/Linux:
```bash
ls
```

Você deve ver pasta com `backend`, `frontend`, `README.md`, etc.

---

### **Passo 3: Instale as dependências do Backend**

```bash
cd backend
npm install
```

Isso vai levar alguns minutos. Não feche o terminal enquanto estiver executando.

---

### **Passo 4: Instale as dependências do Frontend**

```bash
cd ../frontend
npm install
```

Mais alguns minutos de espera...

---

## **Iniciando o Sistema**

### **Terminal 1 - Backend (NÃO FECHE DEPOIS!)**

Abra um terminal e execute:

```bash
cd backend
npm run dev
```

Você deve ver algo assim:
```
✅ FrotaPM Backend running on http://localhost:5000
📋 API Documentation: http://localhost:5000/api
```

**Deixe este terminal aberto!**

---

### **Terminal 2 - Frontend (NOVO TERMINAL)**

Abra UM NOVO terminal (não feche o anterior) e execute:

```bash
cd frontend
npm run dev
```

Você deve ver algo assim:
```
VITE v4.1.0  ready in 123 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

---

## **Acessar o Sistema**

Abra seu navegador e vá para:

### **http://localhost:5173**

---

## **Funcionalidades Disponíveis**

Agora você terá acesso a:

✅ **Dashboard** - KPIs e resumo das viaturas  
✅ **Gestão de Viaturas** - Criar, editar, deletar viaturas  
✅ **Histórico de Manutenção** - Registrar e acompanhar manutenções  
✅ **Relatórios** - Baixar em CSV ou visualizar status  
✅ **Mapa** - Rastreamento em tempo real (ative GPS das viaturas)

---

## **Banco de Dados**

O banco de dados é criado automaticamente em:
```
backend/data/frotapm.db
```

Se quiser resetar os dados:
1. Feche o backend
2. Delete a pasta `backend/data/`
3. Reinicie o backend com `npm run dev`

---

## **Troubleshooting**

### ❌ "command not found: node"
- Você não instalou Node.js corretamente
- Acesse https://nodejs.org/ e instale novamente
- Reinicie o computador

### ❌ "EADDRINUSE: address already in use :::5000"
- Já tem algo rodando na porta 5000
- Feche outros terminais ou aplicações
- Ou mude a porta no `backend/server.js` (linha 10)

### ❌ "Cannot find module"
- Você não rodou `npm install` corretamente
- Delete a pasta `node_modules` e `.package-lock.json`
- Execute `npm install` novamente

### ❌ Página em branco no navegador
- Espere 30 segundos para o Vite compilar
- Verifique o console do navegador (F12)
- Certifique-se de que o backend está rodando em outro terminal

---

## **Estrutura do Projeto**

```
FrotaPM/
├── backend/              # API Node.js + Express
│   ├── config/           # Configuração de banco de dados
│   ├── routes/           # Rotas da API
│   ├── server.js         # Servidor principal
│   └── package.json      # Dependências
│
├── frontend/             # Interface React + Vite
│   ├── src/
│   │   ├── pages/        # Dashboard, Viaturas, Manutenção, Relatórios, Mapa
│   │   ├── components/   # Componentes reutilizáveis
│   │   ├── styles/       # CSS dos componentes
│   │   └── main.jsx      # Entrada da aplicação
│   └── package.json      # Dependências
│
└── README.md             # Documentação
```

---

## **Próximos Passos**

1. ✅ Setup completo
2. 📝 Cadastre algumas viaturas
3. 🔧 Registre manutenções
4. 📊 Visualize o dashboard
5. 📍 Ative GPS e veja no mapa

---

## **Suporte**

Se tiver dúvidas, abra uma issue no GitHub ou procure documentação em:
- Backend: `backend/.env.example` (variáveis de ambiente)
- Frontend: `frontend/vite.config.js` (configuração Vite)

---

**Desenvolvido para a Polícia Militar de Blumenau** 🚓
