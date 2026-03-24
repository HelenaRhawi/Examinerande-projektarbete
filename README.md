# Examnierande-projekt-arbete

Ett API för att User ska kunna lägga order och läsa orderhistorik.

## Teknikstack

- Node.js
- Express
- SQLite (better-sqlite3)

## Installation

```bash
# Klona repot
git clone [https://github.com/HelenaRhawi/Examnierande-projekt-arbete.git]
cd [Examinerande-projekt-arbete]

# Installera beroenden
npm install

# Skapa .env (kopiera från .env.example)
cp .env.example .env
# Fyll i dina värden i .env

# Starta servern
node server.js
# eller med --watch:
node --watch server.js
```

Servern startar på `http://localhost:3000` (eller den port du angett i `.env`).

## API-dokumentation

[Här lägger ni er API-dokumentation – varje endpoint med metod, URL, body, svar och felfall.
Se guiden "API-dokumentation" för format och exempel.]
| Metod | URL | Beskrivning | Body | Svar | Felfall|
| ------| --------------|--------------------|--------------|-------------|--------|
| GET | /api/products | hämta menyn | nej | 200 | Json|
| GET | /api/products:id | hämta specifik prodkut | nej | 200 | 400 |
| POST | /api/:id | hämta menyn | nej | 200 | Json|
| PUT | /api/order | hämta order | nej | 201 | Json|
| DELETE| /api/products | hämta menyn | nej | 200 | Json|

## WebSocket-diskussion

[Skriv en kort reflektion: Hur skulle WebSockets kunna användas i det här projektet?
T.ex. realtidsuppdateringar av orderstatus, live-notiser till baristan, etc.]

## Gruppmedlemmar

| Namn             | Datum  | Signatur = OK |
| ---------------- | ------ | ------------- |
| Eva Maria Köning | 260324 | OK 😂         |
| Helena Rhawi     | 260324 | OK 🐭         |
| Kirey Perez      | 260324 | OK 🪿         |
| Jonathan Berhane | 260324 | OK 🌮         |
