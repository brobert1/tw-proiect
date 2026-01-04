# TW Proiect

🌐 ****Aplicație Live*:*** [https://confera-x6qwg.ondigitalocean.app/](https://confera-x6qwg.ondigitalocean.app/)

Aplicație full-stack construită cu Node.js, Express, PostgreSQL și Next.js + React, cu suport pentru autentificare, Tailwind CSS și shadcn/ui.

## 📋 Cuprins

- [Cerințe de sistem](#cerințe-de-sistem)
- [Structura proiectului](#structura-proiectului)
- [Configurare Backend (API)](#configurare-backend-api)
- [Configurare Frontend](#configurare-frontend)
- [Rularea aplicației](#rularea-aplicației)

## 🔧 Cerințe de sistem

- **Node.js**: `^22.11.0` sau `^20.x`
- **npm**: `^10.9.0` sau `^10.x`
- **PostgreSQL**: versiune 12 sau mai mare

## 📁 Structura proiectului

```
tw-proiect/
├── api/          # Backend Express + PostgreSQL
│   ├── db/       # Migrări și seeds pentru baza de date
│   ├── routes/   # Rute API
│   └── controllers/  # Controllere API
├── front/        # Frontend Next.js + React
│   ├── components/  # Componente React
│   ├── pages/    # Pagini Next.js
│   ├── hooks/    # Custom hooks
│   └── lib/      # Utilități
└── README.md
```

## 🗄️ Configurare Backend (API)

### Pasul 1: Instalare dependențe

Navighează în directorul `api` și instalează dependențele:

```bash
cd api
npm ci
```

### Pasul 2: Configurare variabile de mediu

Copiază fișierul de exemplu și actualizează-l cu configurațiile tale:

```bash
cp .env.example .env
```

### Pasul 3: Creare bază de date PostgreSQL

Creează o bază de date nouă în PostgreSQL:

```bash
# Conectează-te la PostgreSQL
psql -U postgres

# Creează baza de date
CREATE DATABASE database_name;

# Ieși din PostgreSQL
\q
```

### Pasul 4: Rulare migrări și seeds (opțional)

Rulează migrațiile pentru a crea tabelele în baza de date:

```bash
npx knex migrate:latest
```

Populează baza de date cu date de test (opțional):

```bash
npx knex seed:run
```

### Pasul 5: Pornire server backend

```bash
npm run dev
```

Serverul backend va porni pe portul **9000**: `http://localhost:9000`

## 🎨 Configurare Frontend

### Pasul 1: Instalare dependențe

Navighează în directorul `front` și instalează dependințele:

```bash
cd front
npm ci
```

### Pasul 2: Configurare variabile de mediu

Copiază fișierul de exemplu și actualizează-l dacă este necesar:

```bash
cp .env.example .env
```

### Pasul 3: Pornire server frontend

```bash
npm run dev
```

Serverul frontend va porni pe portul **3000**: `http://localhost:3000`

## 🚀 Rularea aplicației

1. **Terminal 1** - Pornește backend-ul:

   ```bash
   cd api
   npm run dev
   ```
2. **Terminal 2** - Pornește frontend-ul:

   ```bash
   cd front
   npm run dev
   ```
3. Deschide browser-ul la: `http://localhost:3000`
4. Te poți conecta ca (vezi seed-uri):

   - **Organizer** (organizator)
   - **Reviewer** (evaluator)
   - **Author** (autor)
