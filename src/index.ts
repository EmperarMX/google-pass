import { EventTicketClass, EventTicketObject } from './lib/event';
import { AddMessageRequest } from './types/AddMessageRequest';
import { Payload } from './types/Payload';
import jwt from 'jsonwebtoken';

const GOOGLE_TOKEN_URL  = 'https://oauth2.googleapis.com/token';
const GOOGLE_AUTH_SCOPE = 'https://www.googleapis.com/auth/wallet_object.issuer';
const WALLET_API_BASE   = 'https://walletobjects.googleapis.com/walletobjects/v1';

export interface Credentials {
   iss: string;
   private_key: string;
   issuerName: string;
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
         const result = await response.json() as { access_token: string };
         return result.access_token;
      } catch (error) {
         throw error;
      }
   }

   async createClassEvent(eventTicketClass: EventTicketClass): Promise<EventTicketClass>{
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/eventTicketClass`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventTicketClass),
         })
         const result = await response.json();
         return result as EventTicketClass;
      } catch (error) {
         throw error;
      }
   };
   
   async getClassEvent(issuerId: string, identifier: string){
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/eventTicketClass/${resourceId}`, {
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
         })
         const result = await response.json();
         return result as EventTicketClass;
      } catch (error) {
         throw error;
      }
   };

   async patchClassEvent(issuerId: string, identifier: string, eventTicketClass: EventTicketClass): Promise<EventTicketClass>{
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/eventTicketClass/${resourceId}`, {
            method: 'PATCH',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventTicketClass),
         })
         const result = await response.json();
         return result as EventTicketClass;
      } catch (error) {
         throw error;
      }
   }

   async createObjectEvent(eventTicketObject: EventTicketObject): Promise<EventTicketObject>{
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/eventTicketObject`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventTicketObject),
         })
         const result = await response.json();
         return result as EventTicketObject;
      } catch (error) {
         throw error;
      }
   };

   async pushNotification(issuerId: string, identifier: string, addMessageRequest: AddMessageRequest): Promise<AddMessageRequest>{
      const resourceId = encodeURIComponent(`${issuerId}.${identifier}`);
      try {
         const token = await this.generateTokenAuth();
         const response = await fetch(`${WALLET_API_BASE}/eventTicketObject/${resourceId}/addMessage`, {
            method: 'POST',
            headers: {
               Authorization: `Bearer ${token}`,
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(addMessageRequest),
         })
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

   generateSaveUrl = <P>(payload: Payload<P>): string => {
      const token = jwt.sign(payload, this.credentials.private_key, {
         algorithm: 'RS256',
      });
      return `https://pay.google.com/gp/v/save/${token}`;
   };
}
