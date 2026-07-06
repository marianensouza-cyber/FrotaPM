# Guia de Instalação - FrotaPM

## Pré-requisitos

- **Node.js 16+** (https://nodejs.org/)
- **Git** (https://git-scm.com/)
- **Terminal/CMD**

## 🚀 Forma Rápida (Recomendado)

### Windows

1. Clone o repositório:
```bash
git clone https://github.com/marianensouza-cyber/FrotaPM.git
cd FrotaPM
git checkout develop
```

2. Execute o script:
```bash
start.bat
```

3. Pronto! Duas janelas de terminal abrirão automaticamente

### macOS/Linux

1. Clone o repositório:
```bash
git clone https://github.com/marianensouza-cyber/FrotaPM.git
cd FrotaPM
git checkout develop
```

2. Dê permissão e execute:
```bash
chmod +x start.sh
./start.sh
```

3. Pronto! O app estará rodando

---

## Manual (Forma Lenta)

### Terminal 1 - Backend

```bash
cd backend
npm install
npm run dev
```

Você deve ver:
```
✅ FrotaPM Backend running on http://localhost:5000
📦 Connected to SQLite: ./data/frotapm.db
✅ Database tables created successfully
```

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

Você deve ver:
```
VITE v4.x.x ready in xxx ms
✅ Local: http://localhost:5173/
```

### Abra o navegador

```
http://localhost:5173
```

---

## 📁 Estrutura

```
FrotaPM/
├── backend/                 # API Node.js
│  ├── server.js
│  ├── routes/               # Endpoints
│  ├── config/
│  ├── data/                 # Banco SQLite
│  └── package.json
├── frontend/               # React + Vite
│  ├── src/
│  │  ├── pages/
│  │  ├── components/
│  │  └── styles/
│  └── package.json
├── start.sh                # Script Linux/macOS
├── start.bat               # Script Windows
├── README.md
└── docs/
```

---

## Troubleshooting

### Erro: "Port already in use"

```bash
# Matar processo na porta 5000
lsof -ti:5000 | xargs kill -9

# Matar processo na porta 5173
lsof -ti:5173 | xargs kill -9
```

### Erro: "npm: command not found"

Instale Node.js: https://nodejs.org/

### Erro: "Cannot find module"

```bash
cd backend
rm -rf node_modules
npm install
```

### Database está vazio

```bash
mkdir -p backend/data
```

---

## 🎉 Primeira Execução

Depois que o app abrir:

1. Clique em **"Viaturas"**
2. Clique em **"➕ Adicionar Viatura"**
3. Preencha:
   - Placa: `PM-0001`
   - Modelo: `Fiat Toro`
   - Ano: `2023`
   - Km: `0`
4. Clique em **"Salvar"**
5. Explore o Dashboard!

---

## 🛠️ Stack Tecnológico

| Camada | Tecnologia |
|--------|------------|
| Backend | Node.js + Express |
| Frontend | React 18 + Vite |
| Database | SQLite 3 |
| Mapa | Leaflet + OpenStreetMap |
| Estilos | CSS3 Puro |
| API | REST + JSON |

---

## 🙋 Suporte

Tem dúvidas?

- Abra uma **Issue** no repositório
- Verifique a **API.md** para endpoints
- Consulte o **README.md** principal

Bom uso! 🚗
