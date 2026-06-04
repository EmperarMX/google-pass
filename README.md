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
- [API Reference](#api-reference)
  - [GoogleWalletLib](#googlewallet-lib)
  - [createClassEvent](#createclassevent)
  - [createObjectEvent](#createobjectevent)
  - [createPayloadEvent](#createpayloadevent)
  - [generateSaveUrl](#generatesaveurl)
- [Technical Notes](#technical-notes)
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
        unique barcode, validity period, etc.
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
| Recommended for   | Low-sensitivity passes           | Event tickets, transit, high-value access      |

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

const wallet = new GoogleWalletLib({
  iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
  client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
  private_key: process.env.GOOGLE_PRIVATE_KEY!,
  issuerName: 'Acme Events',
});

// Step 1 — Define the event class (shared template)
const eventClass = wallet.createClassEvent({
  id: `${ISSUER_ID}.festival_2026`,
  issuerName: 'Acme Events',
  reviewStatus: 'UNDER_REVIEW',
  hexBackgroundColor: '#1a1a2e',
  eventName: {
    defaultValue: { language: 'en-US', value: 'Annual Developer Summit 2026' },
  },
  venue: {
    name: { defaultValue: { language: 'en-US', value: 'Convention Center' } },
    address: { defaultValue: { language: 'en-US', value: '123 Main St, San Francisco, CA' } },
  },
  dateTime: {
    start: '2026-09-15T09:00:00-07:00',
    doorsOpen: '2026-09-15T08:00:00-07:00',
    doorsOpenLabel: 'DOORS_OPEN',
  },
  logo: {
    sourceUri: { uri: 'https://cdn.example.com/logo.png' },
    contentDescription: { defaultValue: { language: 'en-US', value: 'Acme Logo' } },
  },
  heroImage: {
    sourceUri: { uri: 'https://cdn.example.com/banner.jpg' },
    contentDescription: { defaultValue: { language: 'en-US', value: 'Event Banner' } },
  },
  securityAnimation: {
    animationType: 'FOIL_SHIMMER',
  },
});

// Step 2 — Define the individual pass object
const eventObject = wallet.createObjectEvent({
  id: `${ISSUER_ID}.ticket_001`,
  classId: eventClass.id,
  state: 'ACTIVE',
  ticketHolderName: 'Jane Doe',
  ticketNumber: 'VIP-001',
  ticketType: {
    defaultValue: { language: 'en-US', value: 'VIP Access' },
  },
  seatInfo: {
    seat: { defaultValue: { language: 'en-US', value: '14' } },
    row: { defaultValue: { language: 'en-US', value: 'B' } },
    section: { defaultValue: { language: 'en-US', value: 'Main Hall' } },
    gate: { defaultValue: { language: 'en-US', value: 'South Entrance' } },
  },
  rotatingBarcode: {
    type: 'QR_CODE',
    alternateText: 'VIP-001',
    valuePattern: 'TICKET-VIP-001-{totp_value_0}',
    totpDetails: {
      periodMillis: '30000',
      algorithm: 'TOTP_SHA1',
      parameters: [
        {
          key: '3132333435363738393031323334353637383930',
          valueLength: 6,
        },
      ],
    },
  },
});

// Step 3 — Build the payload and generate the save URL
const unixTime = Math.floor(Date.now() / 1000);

const payload = wallet.createPayloadEvent(
  unixTime,
  ['https://www.example.com'],
  eventClass,
  eventObject
);

const saveUrl = wallet.generateSaveUrl(payload);
// → https://pay.google.com/gp/v/save/<signed_jwt>
```

---

## API Reference

### `GoogleWalletLib`

```typescript
new GoogleWalletLib(credentials: Credentials): GoogleWalletLib
```

Creates a new instance of the library. All methods on the instance use the provided credentials to sign JWTs.

---

### `createClassEvent`

```typescript
wallet.createClassEvent(eventTicketClass: EventTicketClass): EventTicketClass
```

Constructs and returns an `EventTicketClass` object. This represents the shared template for all tickets of a given event.

**Required fields:**

| Field          | Type           | Description                                                       |
| -------------- | -------------- | ----------------------------------------------------------------- |
| `id`           | `string`       | Unique class identifier. Format: `{issuerID}.{your_identifier}`   |
| `issuerName`   | `string`       | Issuer display name. Recommended maximum: 20 characters           |
| `reviewStatus` | `ReviewStatus` | `'UNDER_REVIEW'` for production, `'DRAFT'` during development     |
| `eventName`    | `LocalizedString` | Localized name of the event                                    |

**Notable optional fields:**

| Field               | Type                | Description                                                      |
| ------------------- | ------------------- | ---------------------------------------------------------------- |
| `venue`             | `EventVenue`        | Venue name and address                                           |
| `dateTime`          | `EventDateTime`     | Event start, doors open, and end times                           |
| `logo`              | `Image`             | Logo displayed in the top-left of the pass card                  |
| `heroImage`         | `Image`             | Full-width banner image at the top of the pass                   |
| `hexBackgroundColor`| `string`            | Background color in `#rrggbb` or `#rgb` format                   |
| `securityAnimation` | `SecurityAnimation` | Enables the `FOIL_SHIMMER` animated border                       |
| `finePrint`         | `LocalizedString`   | Terms and conditions text                                        |
| `textModulesData`   | `TextModuleData[]`  | Additional text blocks visible on the pass detail view (max 10)  |

**`reviewStatus` values:**

| Value           | When to use                                                                            |
| --------------- | -------------------------------------------------------------------------------------- |
| `'DRAFT'`       | During development. A draft class cannot be used to create pass objects.               |
| `'UNDER_REVIEW'`| When the class is ready for production. Google approves it automatically.              |

---

### `createObjectEvent`

```typescript
wallet.createObjectEvent(eventTicketObject: EventTicketObject): EventTicketObject
```

Constructs and returns an `EventTicketObject` — the individual pass assigned to a specific user.

**Required fields:**

| Field     | Type     | Description                                                          |
| --------- | -------- | -------------------------------------------------------------------- |
| `id`      | `string` | Unique object identifier. Format: `{issuerID}.{your_identifier}`     |
| `classId` | `string` | The `id` of the parent class this object belongs to                  |
| `state`   | `State`  | Pass state: `'ACTIVE'`, `'INACTIVE'`, or `'EXPIRED'`                 |

**Notable optional fields:**

| Field               | Type              | Description                                                             |
| ------------------- | ----------------- | ----------------------------------------------------------------------- |
| `ticketHolderName`  | `string`          | Name of the pass holder                                                 |
| `ticketNumber`      | `string`          | Unique ticket identifier within your system                             |
| `ticketType`        | `LocalizedString` | Ticket category: "VIP", "General Admission", etc.                       |
| `seatInfo`          | `EventSeat`       | Seat, row, section, and gate information                                |
| `rotatingBarcode`   | `RotatingBarcode` | TOTP-based dynamic QR code. Do not combine with `barcode`.              |
| `barcode`           | `Barcode`         | Static barcode. Do not combine with `rotatingBarcode`.                  |
| `validTimeInterval` | `TimeInterval`    | Time window during which the pass is considered valid                   |
| `hexBackgroundColor`| `string`          | Overrides the class-level background color for this specific object     |
| `textModulesData`   | `TextModuleData[]`| Additional informational text shown in the pass detail view             |

---

### `createPayloadEvent`

```typescript
wallet.createPayloadEvent(
  unixTime: number,
  origins: string[],
  eventClass: EventTicketClass,
  eventObject: EventTicketObject
): Payload
```

Assembles the JWT payload containing the class and object definitions.

| Parameter     | Type                | Description                                                                       |
| ------------- | ------------------- | --------------------------------------------------------------------------------- |
| `unixTime`    | `number`            | Token issuance time in **seconds** — use `Math.floor(Date.now() / 1000)`          |
| `origins`     | `string[]`          | Authorized domains allowed to trigger the save flow (e.g. `['https://example.com']`) |
| `eventClass`  | `EventTicketClass`  | The class returned by `createClassEvent`                                          |
| `eventObject` | `EventTicketObject` | The object returned by `createObjectEvent`                                        |

---

### `generateSaveUrl`

```typescript
wallet.generateSaveUrl(payload: Payload): string
```

Signs the payload using the service account private key with the `RS256` algorithm and returns the Google Wallet save URL.

```typescript
const saveUrl = wallet.generateSaveUrl(payload);
// → "https://pay.google.com/gp/v/save/<signed_jwt>"
```

This URL can be used directly in an `<a href>` element or passed to the official Google Wallet button SDK.

---

## Technical Notes

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
- Loyalty cards
- Offers and coupons
- Gift cards
- Transit passes
- Boarding passes

---

## License

[ISC](./LICENSE)
