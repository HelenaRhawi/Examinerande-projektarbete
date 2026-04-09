# Examinerande-projektarbete (grupp 2)

Ett API för att User ska kunna lägga order och läsa orderhistorik.

## Teknikstack

- Node.js
- Express
- SQLite (better-sqlite3)
- Dotenv (.env)
- UUIDv4

## Installation

```bash
# Klona repot
git clone [https://github.com/HelenaRhawi/Examinerande-projektarbete.git]
cd [Examinerande-projektarbete]

# Installera beroenden
npm install

# Skapa .env (kopiera från .env.example)
cp .env.example .env
# Fyll i dina värden i .env

# Starta servern
node server.js
# eller med nodemon:
nodemon server.js
```

Servern startar på `http://localhost:3000`.

## API-dokumentation

[API Dokumentation](api-docs.md)
[I länken ovan kan man finna alla endpoint med metod, URL, body, svar och felfall.]

## WebSocket-diskussion

[Orderstatus uppdaterar sig i realtid när t.ex. barisat tagit emot ordern, är färdig med den och leverans är på väg. Samtidigt kan användaren följa sin beställning.]

## VG-fråga: Vad händer med orderhistoriken när användaren raderas?

[Orderhistoriken förblir kvar i databasen medans användarId ändras till null/gäst.
Vi kräver att namn och adress anges vid beställning utav både gäst och användare, då vi tror att man som användare kanske vill ha leverans till annan andress än den som finns i ens profil och därför raderas inte namn och adress per automatik.
För att uppfylla GDPR ser vi då att man manuellt gör en rensning i databasen med jämna mellanrum där både gäst och tidigare användare raderas.]

## Gruppmedlemmar

| Namn             | Datum  | Signatur = OK |
| ---------------- | ------ | ------------- |
| Eva Maria Köning | 260406 | OK 😂         |
| Helena Rhawi     | 260406 | OK 🐭         |
| Kirey Perez      | 260406 | OK 🪿         |
| Jonathan Berhane | 260406 | OK 🌮         |
