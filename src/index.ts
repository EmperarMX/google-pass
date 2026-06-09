import { EventTicketClass, EventTicketObject } from './lib/event';
import { AddMessageRequest } from './types/event/AddMessageRequest';
import { LoyaltyClass, LoyaltyObject } from './lib/loyalty';
import { Payload } from './types/event/Payload';
import jwt from 'jsonwebtoken';

const GOOGLE_TOKEN_URL  = 'https://oauth2.googleapis.com/token';
const GOOGLE_AUTH_SCOPE = 'https://www.googleapis.com/auth/wallet_object.issuer';
const WALLET_API_BASE   = 'https://walletobjects.googleapis.com/walletobjects/v1';

export interface Credentials {
   iss: string;
   issuerName: string;
   private_key: string;
   client_email: string;
}

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

   async createClassEvent(
      eventTicketClass: EventTicketClass
   ): Promise<EventTicketClass> {
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/eventTicketClass`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventTicketClass),
         });
         const result = await response.json();
         return result as EventTicketClass;
      } catch (error) {
         throw error;
      }
   }

   async createClassLoyalty(loyaltyClass: LoyaltyClass): Promise<LoyaltyClass> {
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/loyaltyClass`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(loyaltyClass),
         });
         const result = await response.json();
         return result as LoyaltyClass;
      } catch (error) {
         throw error;
      }
   }

   async getClassEvent(
      issuerId: string,
      identifier: string
   ): Promise<EventTicketClass> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/eventTicketClass/${resourceId}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            }
         );
         const result = await response.json();
         return result as EventTicketClass;
      } catch (error) {
         throw error;
      }
   }

   async getClassLoyalty(
      issuerId: string,
      identifier: string
   ): Promise<LoyaltyClass> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/loyaltyClass/${resourceId}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            }
         );
         const result = await response.json();
         return result as LoyaltyClass;
      } catch (error) {
         throw error;
      }
   }

   async patchClassEvent(
      issuerId: string,
      identifier: string,
      eventTicketClass: EventTicketClass
   ): Promise<EventTicketClass> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/eventTicketClass/${resourceId}`,
            {
               method: 'PATCH',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(eventTicketClass),
            }
         );
         const result = await response.json();
         return result as EventTicketClass;
      } catch (error) {
         throw error;
      }
   }

   async patchClassLoyalty(
      issuerId: string,
      identifier: string,
      loyaltyClass: LoyaltyClass
   ): Promise<LoyaltyClass> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/loyaltyClass/${resourceId}`,
            {
               method: 'PATCH',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(loyaltyClass),
            }
         );
         const result = await response.json();
         return result as LoyaltyClass;
      } catch (error) {
         throw error;
      }
   }

   async createObjectEvent(
      eventTicketObject: EventTicketObject
   ): Promise<EventTicketObject> {
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/eventTicketObject`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventTicketObject),
         });
         const result = await response.json();
         return result as EventTicketObject;
      } catch (error) {
         throw error;
      }
   }

   async createObjectLoyalty(
      loyaltyObject: LoyaltyObject
   ): Promise<LoyaltyObject> {
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/loyaltyObject`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(loyaltyObject),
         });
         const result = await response.json();
         return result as LoyaltyObject;
      } catch (error) {
         throw error;
      }
   }

   async getObjectEvent(
      issuerId: string,
      identifier: string
   ): Promise<EventTicketObject> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/eventTicketObject/${resourceId}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            }
         );
         const result = await response.json();
         return result as EventTicketObject;
      } catch (error) {
         throw error;
      }
   }

   async getObjectLoyalty(
      issuerId: string,
      identifier: string
   ): Promise<LoyaltyObject> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/loyaltyObject/${resourceId}`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
            }
         );
         const result = await response.json();
         return result as LoyaltyObject;
      } catch (error) {
         throw error;
      }
   }

   async patchObjectEvent(
      issuerId: string,
      identifier: string,
      eventTicketObject: EventTicketObject
   ): Promise<EventTicketObject> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/eventTicketObject/${resourceId}`,
            {
               method: 'PATCH',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(eventTicketObject),
            }
         );
         const result = await response.json();
         return result as EventTicketObject;
      } catch (error) {
         throw error;
      }
   }

   async patchObjectLoyalty(
      issuerId: string,
      identifier: string,
      loyaltyObject: LoyaltyObject
   ): Promise<LoyaltyObject> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/loyaltyObject/${resourceId}`,
            {
               method: 'PATCH',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(loyaltyObject),
            }
         );
         const result = await response.json();
         return result as LoyaltyObject;
      } catch (error) {
         throw error;
      }
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
   ): Promise<AddMessageRequest> {
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(
            `${WALLET_API_BASE}/${type}/${resourceId}/addMessage`,
            {
               method: 'POST',
               headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(addMessageRequest),
            }
         );
         const result = await response.json();
         return result as AddMessageRequest;
      } catch (error) {
         throw error;
      }
   }

   createPayloadEvent = (
      unixTime: number,
      origins: string[],
      eventTicketClass: EventTicketClass,
      eventTicketObjects: EventTicketObject
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
            eventTicketClasses: [eventTicketClass],
            eventTicketObjects: [eventTicketObjects],
         },
      };
   };

   createPayloadLoyalty = (
      unixTime: number,
      origins: string[],
      loyaltyClass: LoyaltyClass,
      loyaltyObjects: LoyaltyObject
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
            loyaltyClasses: [loyaltyClass],
            loyaltyObjects: [loyaltyObjects],
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
