# google-pass

A TypeScript library for generating and signing Google Wallet passes. Provides a typed interface for building JWT payloads compatible with the Google Wallet API, along with utilities to generate the "Add to Google Wallet" save URL.

[![npm version](https://img.shields.io/badge/npm-1.0.0-blue)](https://www.npmjs.com/package/google-pass)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-green.svg)](https://opensource.org/licenses/ISC)

---

## Table of Contents

- [Installation](#installation)
- [Authentication](#authentication)
- [Core Concepts](#core-concepts)
  - [Class vs Object](#class-vs-object)
  - [Static vs Rotating Barcodes](#static-vs-rotating-barcodes)
  - [Security Animation](#security-animation)
- [Usage](#usage)
  - [Event Tickets](#event-tickets)
  - [Loyalty Cards](#loyalty-cards)
- [API Reference](#api-reference)
- [Technical Notes](#technical-notes)
  - [Handling Existing Passes (409 Conflicts)](#handling-existing-passes-409-conflicts)
- [Roadmap](#roadmap)

---

## Installation

```bash
npm install google-pass
```

When using workspaces or a monorepo, reference the package directly in your `package.json`:

```json
{
  "dependencies": {
    "google-pass": "workspace:*"
  }
}
```

---

## Authentication

The library requires credentials from a **Google Cloud Service Account** with access to the Google Wallet API. You can download the service account key file from the Google Cloud Console under **IAM & Admin > Service Accounts**.

```typescript
import { GoogleWalletLib } from 'google-pass';

const wallet = new GoogleWalletLib({
  iss: 'your-service-account@your-project.iam.gserviceaccount.com',
  client_email: 'your-service-account@your-project.iam.gserviceaccount.com',
  private_key: '-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n',
  issuerName: 'Your Company Name',
});
```

| Field          | Type     | Description                                               |
| -------------- | -------- | --------------------------------------------------------- |
| `iss`          | `string` | The service account `client_email`, used as the JWT issuer |
| `client_email` | `string` | Same as `iss`, included in the JWT payload                |
| `private_key`  | `string` | RSA private key from the service account JSON file        |
| `issuerName`   | `string` | Display name shown as the issuer on the pass              |

> **Security:** Never expose `private_key` on the client side. All token generation must happen server-side (Node.js, Edge Functions, etc.).

---

## Core Concepts

### Class vs Object

The Google Wallet API uses a two-layer model that applies to all pass types:

```
Class
  Defines the shared template: branding, venue or merchant details,
  date/time, background colors, logos, and security settings.
  All passes of the same event or campaign share a single class.

  └── Object
        Represents the individual pass assigned to a user.
        Contains user-specific data: holder name, seat, ticket number,
        unique barcode, validity period, points, etc.
```

Updating a **class** propagates changes to all associated objects. Updating an **object** affects only that specific pass.

---

### Static vs Rotating Barcodes

Two barcode modes are available on pass objects:

| Property          | `barcode`                        | `rotatingBarcode`                              |
| ----------------- | -------------------------------- | ---------------------------------------------- |
| Value             | Fixed — always the same          | Changes every N seconds using TOTP             |
| Security          | Low — vulnerable to screenshots  | High — captured codes expire quickly           |
| Anti-fraud        | No                               | Yes — server-side secret key required          |
| Implementation    | Simple                           | Requires TOTP key configuration                |
| Recommended for   | Loyalty cards, low-sensitivity passes | Event tickets, transit, high-value access |

> **Important:** `barcode` and `rotatingBarcode` cannot be used simultaneously on the same object. Google will reject the pass or render duplicate barcode elements.

**Rotating barcode TOTP key requirements:**

The `key` field must be exactly **40 hexadecimal characters** (20 bytes in Base16 encoding).

```typescript
rotatingBarcode: {
  type: 'QR_CODE',
  alternateText: 'TICKET-VIP-001',
  valuePattern: 'TICKET-VIP-001-{totp_value_0}',
  totpDetails: {
    periodMillis: '30000', // Code regenerates every 30 seconds
    algorithm: 'TOTP_SHA1',
    parameters: [
      {
        key: '3132333435363738393031323334353637383930', // Exactly 40 hex chars
        valueLength: 6,
      },
    ],
  },
},
```

---

### Security Animation

Configured at the **class level**, `securityAnimation` enables an animated rainbow border on the pass inside the native Google Wallet app.

```typescript
securityAnimation: {
  animationType: 'FOIL_SHIMMER',
}
```

The `FOIL_SHIMMER` effect renders only in the **native Google Wallet app** on iOS and Android. It does not appear in web previews or the Google Pay & Wallet Console emulator.

---

## Usage

### Event Tickets

The following example demonstrates the complete flow to create and deliver an event ticket.

```typescript
import { GoogleWalletLib } from 'google-pass';

const ISSUER_ID = '1234567890123456789'; // Your Issuer ID from Google Pay & Wallet Console

const wallet = new GoogleWalletLib({ /* credentials */ });

const eventClass = {
  id: `${ISSUER_ID}.festival_2026`,
  issuerName: 'Acme Events',
  reviewStatus: 'UNDER_REVIEW',
  hexBackgroundColor: '#1a1a2e',
  eventName: { defaultValue: { language: 'en-US', value: 'Annual Developer Summit 2026' } }
};

const eventObject = {
  id: `${ISSUER_ID}.ticket_001`,
  classId: eventClass.id,
  state: 'ACTIVE',
  ticketHolderName: 'Jane Doe',
  barcode: { type: 'QR_CODE', value: 'TICKET-001' }
};

// 1. Create Class (Handle if it already exists)
let cResult: any = await wallet.createClassEvent(eventClass);
if (cResult.error) cResult = await wallet.patchClassEvent(ISSUER_ID, 'festival_2026', eventClass);

// 2. Create Object (Handle if it already exists)
let oResult: any = await wallet.createObjectEvent(eventObject);
if (oResult.error) oResult = await wallet.patchObjectEvent(ISSUER_ID, 'ticket_001', eventObject);

// 3. Build the payload and generate the save URL
const payload = wallet.createPayloadEvent(Math.floor(Date.now() / 1000), ['https://www.example.com'], eventClass, eventObject);
const saveUrl = wallet.generateSaveUrl(payload);
// → https://pay.google.com/gp/v/save/<signed_jwt>
```

### Loyalty Cards

Loyalty cards are ideal for representing store programs, coffee clubs, and badge collections. 

```typescript
const loyaltyClass = {
  id: `${ISSUER_ID}.coffee_club`,
  issuerName: 'Acme Cafe',
  reviewStatus: 'UNDER_REVIEW',
  programName: 'Coffee Lovers',
  hexBackgroundColor: '#6F4E37',
  programLogo: { sourceUri: { uri: 'https://example.com/logo.png' } }
};

const loyaltyObject = {
  id: `${ISSUER_ID}.loyalty_001`,
  classId: loyaltyClass.id,
  state: 'ACTIVE',
  accountName: 'Jane Doe',
  accountId: 'C-98765',
  loyaltyPoints: {
     label: 'Visits',
     balance: { string: '8 / 10' }
  },
  barcode: { type: 'QR_CODE', value: 'C-98765' }
};

let cResult: any = await wallet.createClassLoyalty(loyaltyClass);
if (cResult.error) cResult = await wallet.patchClassLoyalty(ISSUER_ID, 'coffee_club', loyaltyClass);

let oResult: any = await wallet.createObjectLoyalty(loyaltyObject);
if (oResult.error) oResult = await wallet.patchObjectLoyalty(ISSUER_ID, 'loyalty_001', loyaltyObject);

const payload = wallet.createPayloadLoyalty(Math.floor(Date.now() / 1000), ['https://www.example.com'], loyaltyClass, loyaltyObject);
const saveUrl = wallet.generateSaveUrl(payload);
```

---

## API Reference

### Core Methods

| Method | Description |
| --- | --- |
| `createClassEvent(class: EventTicketClass)` | Creates a new Event Class |
| `createObjectEvent(object: EventTicketObject)` | Creates a new Event Object |
| `getClassEvent(issuerId, identifier)` | Retrieves an existing Event Class |
| `getObjectEvent(issuerId, identifier)` | Retrieves an existing Event Object |
| `patchClassEvent(issuerId, identifier, class)` | Updates an existing Event Class |
| `patchObjectEvent(issuerId, identifier, object)`| Updates an existing Event Object |
| `createPayloadEvent(...)` | Builds the JWT payload for Event |

*All the methods above exist similarly for **Loyalty Cards** (e.g., `createClassLoyalty`, `createObjectLoyalty`, `patchObjectLoyalty`).*

### Push Notifications
You can trigger push notifications when updating a pass by using the `pushNotification` method:

```typescript
await wallet.pushNotification(ISSUER_ID, 'ticket_001', 'eventTicketObject', {
  message: { body: 'Your seat has been upgraded!', id: `msg_${Date.now()}`, messageType: 'TEXT' }
});
```
Valid targets for the `type` property are: `'loyaltyClass' | 'loyaltyObject' | 'eventTicketClass' | 'eventTicketObject'`.

---

## Technical Notes

### Handling Existing Passes (409 Conflicts)

When calling `createClassEvent` or `createObjectEvent` (or their Loyalty equivalents), if the ID already exists in your issuer account, the Google Wallet API returns an HTTP 409 Conflict. 

By design, this library **does not throw a JavaScript error** when the `fetch` API call receives a 400-level HTTP response; instead, it returns the error JSON block generated by Google. 

To handle this smoothly, you must check for `.error` on the result and fallback to patching:

```typescript
let classResult: any = await wallet.createClassLoyalty(myLoyaltyClass);
if (classResult.error) {
  // Already exists, update it instead
  classResult = await wallet.patchClassLoyalty(ISSUER_ID, 'my_identifier', myLoyaltyClass);
}
```

### `iat` must be in seconds

The JWT `iat` (issued at) field must be expressed in **seconds**, not milliseconds.

```typescript
// Incorrect — causes JWT signature errors
const unixTime = Date.now(); // 1748982876543 (milliseconds)

// Correct
const unixTime = Math.floor(Date.now() / 1000); // 1748982876 (seconds)
```

### Image URLs must be publicly accessible

The `logo.sourceUri.uri` and `heroImage.sourceUri.uri` fields must point to resources that are publicly reachable on the internet. If the URL returns a `404` or requires authentication, Google Wallet will reject the pass with a generic error.

### ID format requirements

Class and object IDs must follow the format `{issuerID}.{your_identifier}`. Only alphanumeric characters, `.`, `_`, and `-` are allowed.

```typescript
// Valid
id: `${ISSUER_ID}.festival_2026`
id: `${ISSUER_ID}.ticket-vip-00123`

// Invalid (spaces and slashes not allowed)
id: `${ISSUER_ID}.festival 2026`
id: `${ISSUER_ID}.ticket/vip/00123`
```

### `reviewStatus` on existing classes

When updating an already-approved class, always set `reviewStatus: 'UNDER_REVIEW'`. The status cannot be reverted from `UNDER_REVIEW` back to `DRAFT`.

---

## Roadmap

The following pass types are planned for future releases:

- Generic passes
- Offers and coupons
- Gift cards
- Transit passes
- Boarding passes

---

## License

[ISC](./LICENSE)

