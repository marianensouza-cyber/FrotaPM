# FrotaPM - Guia de Instalação

## Pré-requisitos
- Node.js 16+ (https://nodejs.org/)
- Git (https://git-scm.com/)

## Passo 1: Clonar o repositório

```bash
git clone https://github.com/marianensouza-cyber/FrotaPM.git
cd FrotaPM
```

## Passo 2: Instalar dependências do Backend

```bash
cd backend
npm install
```

## Passo 3: Configurar variáveis de ambiente

Crie um arquivo `.env` na pasta `backend`:

```
PORT=5000
NODE_ENV=development
DB_TYPE=sqlite
DB_FILE=./data/frotapm.db
FRONTEND_URL=http://localhost:5173
```

## Passo 4: Iniciar o Backend

```bash
npm run dev
```

Você deve ver: `✅ FrotaPM Backend running on http://localhost:5000`

## Passo 5: Instalar dependências do Frontend

Em outro terminal:

```bash
cd frontend
npm install
```

## Passo 6: Iniciar o Frontend

```bash
npm run dev
```

Você deve ver: `VITE v4.x.x ready in xxx ms`

## Passo 7: Acessar a aplicação

Abra o navegador e vá para: http://localhost:5173

## Deployment (Produção)

### Backend (Railway ou Render)

1. Faça push para GitHub
2. Conecte o repositório no Railway/Render
3. Configure variáveis de ambiente
4. Deploy automático

### Frontend (Vercel)

1. Vá para https://vercel.com
2. Importar projeto do GitHub
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy automático

## Troubleshooting

### Erro: "Module not found"
```bash
# Limpe node_modules e reinstale
rm -rf node_modules
npm install
```

### Erro: "Port already in use"
```bash
# Backend usa porta 5000
# Frontend usa porta 5173
# Se já estiverem em uso, altere em vite.config.js e server.js
```

### Database não foi criado
```bash
# Verifique se a pasta 'data' existe no backend
mkdir -p backend/data
```
