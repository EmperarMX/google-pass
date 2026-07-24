import { EventTicketClass, EventTicketObject } from './lib/event';
import { AddMessageRequest } from './types/event/AddMessageRequest';
import { LoyaltyClass, LoyaltyObject } from './lib/loyalty';
import { Payload } from './types/event/Payload';
import jwt from 'jsonwebtoken';

export * from './lib/event';
export * from './lib/loyalty';
export * from './types/event/AddMessageRequest';
export * from './types/event/Payload';

const GOOGLE_TOKEN_URL  = 'https://oauth2.googleapis.com/token';
const GOOGLE_AUTH_SCOPE = 'https://www.googleapis.com/auth/wallet_object.issuer';
const WALLET_API_BASE   = 'https://walletobjects.googleapis.com/walletobjects/v1';

export interface Credentials {
   iss: string;
   issuerName: string;
   private_key: string;
   client_email: string;
}

export interface GoogleWalletErrorDetail {
   message?: string;
   domain?: string;
   reason?: string;
   [key: string]: any;
}

export interface GoogleWalletError {
   code?: number;
   message?: string;
   status?: string;
   errors?: GoogleWalletErrorDetail[];
   [key: string]: any;
}

export interface GoogleWalletErrorResponse {
   error: GoogleWalletError;
}

export type GoogleWalletResponse<T> =
   | { error: false; data: T; message?: string }
   | { error: true; data: GoogleWalletErrorResponse; message: string };

export class GoogleWalletLib {
   private credentials: Credentials;

   constructor(credentials: Credentials) {
      this.credentials = credentials;
   }

   private async generateTokenAuth() {
      const now = Math.floor(Date.now() / 1000);
      const assertion = jwt.sign(
         {
            iss: this.credentials.client_email,
            scope: GOOGLE_AUTH_SCOPE,
            aud: GOOGLE_TOKEN_URL,
            iat: now,
            exp: now + 3600,
         },
         this.credentials.private_key,
         { algorithm: 'RS256' }
      );
      try {
         const response = await fetch(GOOGLE_TOKEN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
               grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
               assertion,
            }),
         });
         const result = (await response.json()) as { access_token: string };
         return result.access_token;
      } catch (error) {
         throw error;
      }
   }

   private async handleRequest<T>(
      url: string,
      options: RequestInit,
      fallbackErrorMsg: string
   ): Promise<GoogleWalletResponse<T>> {
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(url, {
            ...options,
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
               ...(options.headers || {}),
            },
         });
         const result = (await response.json()) as any;
         if (!response.ok || (result && result.error)) {
            return {
               error: true,
               data: (result && result.error ? result : { error: { message: fallbackErrorMsg } }) as GoogleWalletErrorResponse,
               message: result?.error?.message || fallbackErrorMsg,
            };
         }
         return {
            error: false,
            data: result as T,
         };
      } catch (error: any) {
         return {
            error: true,
            data: { error: { message: error?.message || fallbackErrorMsg } },
            message: error?.message || fallbackErrorMsg,
         };
      }
   }

   async createClassEvent(
      eventTicketClass: EventTicketClass
   ): Promise<GoogleWalletResponse<EventTicketClass>> {
      return this.handleRequest<EventTicketClass>(
         `${WALLET_API_BASE}/eventTicketClass`,
         {
            method: 'POST',
            body: JSON.stringify(eventTicketClass),
         },
         'Error creating event ticket class'
      );
   }

   async createClassLoyalty(
      loyaltyClass: LoyaltyClass
   ): Promise<GoogleWalletResponse<LoyaltyClass>> {
      return this.handleRequest<LoyaltyClass>(
         `${WALLET_API_BASE}/loyaltyClass`,
         {
            method: 'POST',
            body: JSON.stringify(loyaltyClass),
         },
         'Error creating loyalty class'
      );
   }

   async getClassEvent(
      issuerId: string,
      identifier: string
   ): Promise<GoogleWalletResponse<EventTicketClass>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<EventTicketClass>(
         `${WALLET_API_BASE}/eventTicketClass/${resourceId}`,
         { method: 'GET' },
         'Error getting event ticket class'
      );
   }

   async getClassLoyalty(
      issuerId: string,
      identifier: string
   ): Promise<GoogleWalletResponse<LoyaltyClass>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<LoyaltyClass>(
         `${WALLET_API_BASE}/loyaltyClass/${resourceId}`,
         { method: 'GET' },
         'Error getting loyalty class'
      );
   }

   async patchClassEvent(
      issuerId: string,
      identifier: string,
      eventTicketClass: EventTicketClass
   ): Promise<GoogleWalletResponse<EventTicketClass>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<EventTicketClass>(
         `${WALLET_API_BASE}/eventTicketClass/${resourceId}`,
         {
            method: 'PATCH',
            body: JSON.stringify(eventTicketClass),
         },
         'Error patching event ticket class'
      );
   }

   async patchClassLoyalty(
      issuerId: string,
      identifier: string,
      loyaltyClass: LoyaltyClass
   ): Promise<GoogleWalletResponse<LoyaltyClass>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<LoyaltyClass>(
         `${WALLET_API_BASE}/loyaltyClass/${resourceId}`,
         {
            method: 'PATCH',
            body: JSON.stringify(loyaltyClass),
         },
         'Error patching loyalty class'
      );
   }

   async createObjectEvent(
      eventTicketObject: EventTicketObject
   ): Promise<GoogleWalletResponse<EventTicketObject>> {
      return this.handleRequest<EventTicketObject>(
         `${WALLET_API_BASE}/eventTicketObject`,
         {
            method: 'POST',
            body: JSON.stringify(eventTicketObject),
         },
         'Error creating event ticket object'
      );
   }

   async createObjectLoyalty(
      loyaltyObject: LoyaltyObject
   ): Promise<GoogleWalletResponse<LoyaltyObject>> {
      return this.handleRequest<LoyaltyObject>(
         `${WALLET_API_BASE}/loyaltyObject`,
         {
            method: 'POST',
            body: JSON.stringify(loyaltyObject),
         },
         'Error creating loyalty object'
      );
   }

   async getObjectEvent(
      issuerId: string,
      identifier: string
   ): Promise<GoogleWalletResponse<EventTicketObject>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<EventTicketObject>(
         `${WALLET_API_BASE}/eventTicketObject/${resourceId}`,
         { method: 'GET' },
         'Error getting event ticket object'
      );
   }

   async getObjectLoyalty(
      issuerId: string,
      identifier: string
   ): Promise<GoogleWalletResponse<LoyaltyObject>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<LoyaltyObject>(
         `${WALLET_API_BASE}/loyaltyObject/${resourceId}`,
         { method: 'GET' },
         'Error getting loyalty object'
      );
   }

   async patchObjectEvent(
      issuerId: string,
      identifier: string,
      eventTicketObject: EventTicketObject
   ): Promise<GoogleWalletResponse<EventTicketObject>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<EventTicketObject>(
         `${WALLET_API_BASE}/eventTicketObject/${resourceId}`,
         {
            method: 'PATCH',
            body: JSON.stringify(eventTicketObject),
         },
         'Error patching event ticket object'
      );
   }

   async patchObjectLoyalty(
      issuerId: string,
      identifier: string,
      loyaltyObject: LoyaltyObject
   ): Promise<GoogleWalletResponse<LoyaltyObject>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<LoyaltyObject>(
         `${WALLET_API_BASE}/loyaltyObject/${resourceId}`,
         {
            method: 'PATCH',
            body: JSON.stringify(loyaltyObject),
         },
         'Error patching loyalty object'
      );
   }

   async pushNotification(
      issuerId: string,
      identifier: string,
      type:
         | 'loyaltyClass'
         | 'loyaltyObject'
         | 'eventTicketClass'
         | 'eventTicketObject',
      addMessageRequest: AddMessageRequest
   ): Promise<GoogleWalletResponse<AddMessageRequest>> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      return this.handleRequest<AddMessageRequest>(
         `${WALLET_API_BASE}/${type}/${resourceId}/addMessage`,
         {
            method: 'POST',
            body: JSON.stringify(addMessageRequest),
         },
         'Error sending push notification'
      );
   }

   createPayloadEvent = (
      unixTime: number,
      origins: string[],
      eventTicketClass: EventTicketClass | EventTicketClass[],
      eventTicketObjects: EventTicketObject | EventTicketObject[]
   ): Payload<{
      eventTicketClasses: EventTicketClass[];
      eventTicketObjects: EventTicketObject[];
   }> => {
      return {
         iss: this.credentials.client_email,
         aud: 'google',
         typ: 'savetowallet',
         iat: unixTime,
         origins,
         payload: {
            eventTicketClasses: Array.isArray(eventTicketClass)
               ? eventTicketClass
               : [eventTicketClass],
            eventTicketObjects: Array.isArray(eventTicketObjects)
               ? eventTicketObjects
               : [eventTicketObjects],
         },
      };
   };

   createPayloadLoyalty = (
      unixTime: number,
      origins: string[],
      loyaltyClass: LoyaltyClass | LoyaltyClass[],
      loyaltyObjects: LoyaltyObject | LoyaltyObject[]
   ): Payload<{
      loyaltyClasses: LoyaltyClass[];
      loyaltyObjects: LoyaltyObject[];
   }> => {
      return {
         iss: this.credentials.client_email,
         aud: 'google',
         typ: 'savetowallet',
         iat: unixTime,
         origins,
         payload: {
            loyaltyClasses: Array.isArray(loyaltyClass)
               ? loyaltyClass
               : [loyaltyClass],
            loyaltyObjects: Array.isArray(loyaltyObjects)
               ? loyaltyObjects
               : [loyaltyObjects],
         },
      };
   };

   generateSaveUrl = <P>(payload: Payload<P>): string => {
      const token = jwt.sign(payload, this.credentials.private_key, {
         algorithm: 'RS256',
      });
      return `https://pay.google.com/gp/v/save/${token}`;
   };
}
