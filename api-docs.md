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
    "title": "Bryggkaffe",
    "desc": "Bryggd på månadens bönor.",
    "price": 39
  },
  {
    "title": "Caffè Doppio",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "title": "Cappuccino",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "title": "Latte Macchiato",
    "desc": "Bryggd på månadens bönor.",
    "price": 49
  },
  {
    "title": "Kaffe Latte",
    "desc": "Bryggd på månadens bönor.",
    "price": 54
  },
  {
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
    "name": "luna",
    "email": "luna@example.com",
    "address": "123 Luna St, Luna City, Luna",
    "createdAt": "2026-04-06T09:47:32.687Z"
  },
  {
    "name": "maria",
    "email": "maria@example.com",
    "address": "123 Maria St, Maria City, Maria",
    "createdAt": "2026-04-06T09:47:32.687Z"
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
  "name": "Lotta",
  "email": "lotta@example.com",
  "address": "123 Main St, Anytown, USA"
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
  "name": "John Doe",
  "email": "john.doe@example.com",
  "address": "Banangatan 2, 123456, Stockholm"
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
[
  {
    "name": "John Doe",
    "address": "banangatan, Nyköping",
    "ETA": 8
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
    "userId": "54f2ed8d-d6ec-4f3c-ace2-5b41f79e8f34",
    "name": "John Doe",
    "address": "banangatan, Nyköping",
  "items": [
    { "menuId": 3.0, "quantity": 5 },
    { "menuId": 6.0, "quantity": 4 }
  ],
  "campaignId":"4df3b4b3-709e-4aff-864b-b36afce95286"
}

Med rabattkod!
```

**Body:**
Skapa en ny order som gäst.

```json
 {
    "name": "Karin",
    "address": "Körgatan 2, Nyköping",
  "items": [
    { "menuId": 3.0, "quantity": 5 },
    { "menuId": 6.0, "quantity": 4 }
  ]
}
Utan rabattkod
```

**Svar:** `201 Created`
Användare:

```json
{
  "orderId": "894e150e-2c44-4461-8b92-60c973767655",
  "name": "John Doe",
  "address": "banangatan, Nyköping",
  "items": [
    {
      "name": "Cappuccino",
      "quantity": "5 unit.",
      "price": "49 SEK per unit."
    },
    {
      "name": "Cortado",
      "quantity": "4 unit.",
      "price": "39 SEK per unit."
    }
  ],
  "eta": "11 minutes",
  "discount": "25%",
  "totalPrice": "300.75 SEK"
}
```

Gäst:

```json
{
  "orderId": "a6b7c577-4e14-41d8-ac2d-a543c6c43b31",
  "name": "Karin",
  "address": "Körgatan 2, Nyköping",
  "items": [
    {
      "name": "Cappuccino",
      "quantity": "5 unit.",
      "price": "49 SEK per unit."
    },
    {
      "name": "Cortado",
      "quantity": "4 unit.",
      "price": "39 SEK per unit."
    }
  ],
  "eta": "11 minutes",
  "totalPrice": "401 SEK"
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
