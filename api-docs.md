# Mr Bean API – Dokumentation

REST API för att hantera orderhistorik.
Bas-URL: `http://localhost:3000`

---

## GET/api/menu

Hämtar hela menyn.

**Svar:** `200 OK`

```json
[
  {
    "id": "1.0",
    "title": "Bryggkaffe",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  },
  {
    "id": "2.0",
    "title": "Caffè Doppio",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "id": "3.0",
    "title": "Cappuccino",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "id": "4.0",
    "title": "Latte Macchiato",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "id": "5.0",
    "title": "Kaffe Latte",
    "desc": "Bryggd på månadens bönor.",
    "price": 54
  },
  {
    "id": "6.0",
    "title": "Cortado",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  }
]
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```

---

## GET /api/users

Hämtar alla användarna.

**Svar:** `200 OK`

```json
[
  {
    "id": "06433d5c-130f-4f1f-8ad6-cfb04a34d369",
    "name": "luna",
    "email": "luna@example.com",
    "address": "123 Luna St, Luna City, Luna",
    "createdAt": "2026-04-02T09:38:23.901Z"
  },
  {
    "id": "29249968-4ce2-4b05-a7af-66505b1309d0",
    "name": "maria",
    "email": "maria@example.com",
    "address": "123 Maria St, Maria City, Maria",
    "createdAt": "2026-04-02T09:38:23.901Z"
  }
]
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```

---

## POST /api/user

Skapar en ny användare.

**Body:**

```json
{
  "name": "Lotta",
  "email": "lotta@example.com",
  "address": "123 Main St, Anytown, USA"
}
```

Alla fält är obligatoriska.

**Svar:** `201 Created`

```json
{
  "id": "90aed62a-91ca-4c45-9275-df48f0fc2712",
  "name": "Lotta",
  "email": "lotta@example.com",
  "address": "123 Main St, Anytown, USA",
  "createdAt": "2026-04-02T09:40:11.672Z"
}
```

**Fel:** `400 Bad Request`

```json
{
Error: "Name, e-mail and address must have valid strings"
Error: "Name, e-mail and address is manditory!"
Error: "Invalid e-mail!"
}
```

**Fel:** `409 Conflict`

```json
{
  "Error": "This e-mail is already being used!"
}
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```

---

## PUT /api/users/:id

Uppdaterar en specifiks användares data.

**Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "address": "Banangatan 2, 123456, Stockholm"
}
```

**Svar:** `200 OK`

```json
{
  "id": "29249968-4ce2-4b05-a7af-66505b1309d0",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "address": "Banangatan 2, 123456, Stockholm",
  "createdAt": "2026-04-02T09:38:23.901Z"
}
```

**Fel:** `400 Bad request`

```json
{
Error: "Name, e-mail and address is manditory!"
Error: "Name, e-mail and address must have valid strings!"
Error: "Invalid E-mail"
Error: "This e-mail is already being used!"
}
```

**Fel:** `404 Not found`

```json
{
  "Error": "User not found"
}
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```

---

## DELETE /api/users/:id

Tar bort användare med ett specifikt id.

**Svar:** `204 No Content` (tom body)

**Fel:** `400 Bad Request`

```json
{
  "Error": "Invalid ID-format"
}
```

**Fel:** `404 Not Found`

```json
{
  "Error": "users could not be found"
}
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```

---

## GET /api/orders

Hämtar alla lagda ordrar.

**Svar:** `200 OK`

```json
 {
        "id": "04f09af5-f91b-4988-8041-e0a611c58ece",
        "userId": "90aed62a-91ca-4c45-9275-df48f0fc2712",
        "ETA": 11,
        "createdAt": "2026-04-02T11:16:04.079Z"
    },
    {
        "id": "8a8076ab-7999-47a8-a6e7-995e635d2ded",
        "userId": "29249968-4ce2-4b05-a7af-66505b1309d0",
        "ETA": 9,
        "createdAt": "2026-04-02T11:17:52.062Z"
    },
    {
        "id": "7ad025d1-a90a-4523-916d-6aa830e67ceb",
        "userId": "06433d5c-130f-4f1f-8ad6-cfb04a34d369",
        "ETA": 14,
        "createdAt": "2026-04-02T11:18:25.560Z"
    }
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```

---

## GET /api/orders/status/:id

Hämtar aktuell status på specifik order-id.

**Svar:** `200 OK`

```json
{
  "ETA": "9 minutes left"
}
```

**Fel:** `404 Not Found`

```json
{
  "Error": "orders could not be found"
}
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```

---

## GET /api/orders/user/:id/order

Hämta en användares orderhistorik.

**Svar:** `200 OK`

```json
{
  "id": "04f09af5-f91b-4988-8041-e0a611c58ece",
  "createdAt": "2026-04-02T11:16:04.079Z",
  "userOrder": [
    {
      "name": "Bryggkaffe",
      "quantity": "2 unit",
      "price": "39 SEK per unit."
    },
    {
      "name": "Cappuccino",
      "quantity": "1 unit",
      "price": "49 SEK per unit."
    }
  ],
  "totalPrice": "127 SEK"
}
```

**Fel:** `400 Bad request`

```json
{
  "Error": "Invalid ID-format"
}
```

**Fel:** `404 Not Found`

```json
{
  "Error": "orders could not be found"
}
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```

---

## POST /api/orders

Skapar en ny order för en användare.

**Body:**
Användare:

```json
{
  "userId": "29249968-4ce2-4b05-a7af-66505b1309d0",
  "items": [
    { "menuId": "5", "quantity": 2 },
    { "menuId": "3", "quantity": 1 }
  ]
}
```

**Body:**
Skapa en ny order som gäst.

```json
{
  "userId": "",
  "items": [
    { "menuId": "3", "quantity": 2 },
    { "menuId": "1", "quantity": 1 }
  ]
}
```

**Svar:** `201 Created`
Användare:

```json
{
  "orderId": "264b43a1-7ec0-405e-9560-193251bc67dc",
  "name": "John Doe",
  "address": "Banangatan 2, 123456, Stockholm",
  "items": [
    {
      "name": "Kaffe Latte",
      "quantity": "2 unit.",
      "price": "54 SEK per unit."
    },
    {
      "name": "Cappuccino",
      "quantity": "1 unit.",
      "price": "49 SEK per unit."
    }
  ],
  "eta": "6 minutes",
  "totalPrice": "157 SEK"
}
```

Gäst:

```json
{
  "orderId": "726d0c3f-f8a3-416f-8359-08d7e0730279",
  "name": null,
  "address": null,
  "items": [
    {
      "name": "Cappuccino",
      "quantity": "2 unit.",
      "price": "49 SEK per unit."
    },
    {
      "name": "Bryggkaffe",
      "quantity": "1 unit.",
      "price": "39 SEK per unit."
    }
  ],
  "eta": "11 minutes",
  "totalPrice": "137 SEK"
}
```

**Fel:** `400 Bad request`

```json
{
  "Error": "Invalid ID-format",
  "Error": "Order must contain items",
  "Error": "Missing menu Id",
  "Error": "Invalid quantity item"
}
```

**Fel:** `404 Not Found`

```json
{
  "Error": "orders could not be found",
  "Error": "product do not exist"
}
```

**Fel:** `500  Internel Server Error`

```json
{
  "Error": "Server error!"
}
```
