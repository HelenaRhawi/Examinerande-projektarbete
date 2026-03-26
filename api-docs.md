# Airbean API – Dokumentation

REST API för att hantera orderhistorik.
Bas-URL: `http://localhost:3000`

---

## GET /api/order

Hämtar alla order.

**Svar:** `200 OK`

```json
[
  { "id": 1, "title": "Interstellar", "year": 2014, "genre": "Sci-Fi" },
  { "id": 2, "title": "The Dark Knight", "year": 2008, "genre": "Action" }
]
```

---

## GET /api/movies/:id

Hämtar en specifik film.

**Svar:** `200 OK`

```json
{ "id": 1, "title": "Interstellar", "year": 2014, "genre": "Sci-Fi" }
```

**Fel:** `404 Not Found`

```json
{ "fel": "Filmen hittades inte" }
```

---

## POST /api/user

Skapar en ny användare.

**Body:**

```json
{
  "title": "Dune",
  "year": 2021,
  "genre": "Sci-Fi"
}
```

Alla fält är obligatoriska.

**Svar:** `201 Created`

```json
{ "id": 3, "title": "Dune", "year": 2021, "genre": "Sci-Fi" }
```

**Fel:** `400 Bad Request`

```json
{ "fel": "title, year och genre är obligatoriska" }
```

---

## PUT /api/movies/:id

Uppdaterar en befintlig film.

**Body:**

```json
{
  "title": "Interstellar",
  "year": 2014,
  "genre": "Drama"
}
```

**Svar:** `200 OK` med det uppdaterade objektet.

**Fel:** `404 Not Found` | `400 Bad Request`

---

## DELETE /api/movies/:id

Tar bort en film.

**Svar:** `204 No Content` (tom body)

**Fel:** `404 Not Found`

```json
{ "fel": "Filmen hittades inte" }
```
