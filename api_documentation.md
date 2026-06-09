# 🌌 VANIX OTT Streaming Platform — API Documentation

This document describes the core REST API endpoints available on the **VANIX API Service**. All endpoints return standard JSON responses and are prefixed with `/api/v1`.

---

## 🔒 Security & Authentication Headers
Most client endpoints require a JSON Web Token (JWT) in the authorization header:
```text
Authorization: Bearer <access_token>
```
For profile-specific interactions, pass the active profile ID header:
```text
x-profile-id: <profile_uuid>
```

---

## 🔑 1. Authentication Module (`/auth`)

### Send OTP
*   **Method / Route**: `POST /auth/send-otp`
*   **Body (Zod validation)**:
    ```json
    {
      "phone": "+919876543210", // optional if email is passed
      "email": "user@example.com", // optional if phone is passed
      "type": "sms" // "sms" | "email"
    }
    ```
*   **Response**: `200 OK`
    ```json
    {
      "success": true,
      "message": "OTP sent successfully"
    }
    ```

### Verify OTP
*   **Method / Route**: `POST /auth/verify-otp`
*   **Body**:
    ```json
    {
      "phone": "+919876543210",
      "otp": "123456",
      "deviceName": "OnePlus 11",
      "deviceType": "MOBILE", // MOBILE | TABLET | WEB | TV | DESKTOP
      "deviceId": "unique-device-uuid"
    }
    ```
*   **Response**: `200 OK`
    ```json
    {
      "success": true,
      "data": {
        "user": { "id": "user-uuid", "email": "user@example.com", "isActive": true },
        "tokens": { "accessToken": "jwt-token", "refreshToken": "jwt-refresh" }
      }
    }
    ```

---

## 🎬 2. Content & Catalog Module (`/content`)

### Get Featured Content (Banners)
*   **Method / Route**: `GET /content/featured`
*   **Headers**: Optional authentication
*   **Response**: `200 OK`
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "banner-uuid",
          "title": "CYBERPUNK NIGHTS",
          "posterUrl": "https://...",
          "isFeatured": true
        }
      ]
    }
    ```

### Search Catalog
*   **Method / Route**: `GET /content/search`
*   **Query Params**: `q` (query search), `page`, `limit`
*   **Response**: `200 OK` (leveraging Meilisearch indexing)

---

## ⚡ 3. Video Player & Streaming Module (`/streaming`)

### Fetch Playback Manifest
*   **Method / Route**: `GET /streaming/:contentId/manifest`
*   **Query Params**: `type` ("movie" | "episode")
*   **Response**: `200 OK`
    ```json
    {
      "success": true,
      "data": {
        "streamUrl": "https://cdn.vanix.com/media/manifest.m3u8",
        "type": "hls" // hls | dash
      }
    }
    ```

### Sync Watch Progress
*   **Method / Route**: `POST /streaming/:contentId/progress`
*   **Body**:
    ```json
    {
      "progressSeconds": 320,
      "totalSeconds": 1800,
      "type": "episode",
      "profileId": "profile-uuid"
    }
    ```
*   **Response**: `200 OK`

---

## 💳 4. Billing & Subscriptions Module (`/payments`)

### Create Subscription Order
*   **Method / Route**: `POST /payments/orders`
*   **Body**:
    ```json
    {
      "planId": "premium-plan-uuid",
      "couponCode": "VANIX50" // optional
    }
    ```
*   **Response**: `201 Created`
    ```json
    {
      "success": true,
      "data": {
        "orderId": "razorpay-order-id",
        "amount": 14900, // in paise (₹149)
        "currency": "INR"
      }
    }
    ```

### Verify Payment Webhook
*   **Method / Route**: `POST /payments/webhook`
*   **Headers**: `x-razorpay-signature`
*   **Response**: `200 OK`

---

## 👤 5. Profile Management Module (`/profiles`)

### Create User Profile
*   **Method / Route**: `POST /profiles`
*   **Body**:
    ```json
    {
      "name": "Sarah",
      "isKids": false,
      "pin": "1234" // optional
    }
    ```
*   **Response**: `201 Created`

### Verify PIN
*   **Method / Route**: `POST /profiles/:id/verify-pin`
*   **Body**: `{ "pin": "1234" }`
*   **Response**: `200 OK` (returns `{ "verified": true }`)

---

## 📊 6. Analytics & Event Ingestion (`/analytics`)

### Log Client Event
*   **Method / Route**: `POST /analytics/log`
*   **Body**:
    ```json
    {
      "eventName": "PLAY_VIDEO",
      "eventData": {
        "contentId": "movie-uuid",
        "bitrate": "1080p",
        "bufferCount": 1
      }
    }
    ```
*   **Response**: `200 OK`
