import { EventTicketClass, EventTicketObject } from "./lib/event";
import { Payload } from "./types/Payload";
import jwt from 'jsonwebtoken';


export interface Credentials {
   iss: string;
   private_key: string;
   issuerName: string;
   client_email: string;
}

export class GoogleWalletLib {
   private credentials: Credentials;
   
   constructor(credentials: Credentials){
      this.credentials = credentials;
   }
   
   createClassEvent = (eventTicketClass: EventTicketClass) => {
      return {
         ...eventTicketClass
      } as EventTicketClass;
   };
   createObjectEvent = (eventTicketObject: EventTicketObject) => {
      return {
         ...eventTicketObject
      } as EventTicketObject;
   };
   createPayloadEvent = (unixTime: number, origins: string[], eventTicketClass: EventTicketClass, eventTicketObjects: EventTicketObject) => {
      return {
         iss: this.credentials.client_email,
         aud: 'google',
         typ: 'savetowallet',
         iat: unixTime,
         origins: origins,
         payload: {
            eventTicketClasses: [eventTicketClass],
            eventTicketObjects: [eventTicketObjects],
         },
      } as Payload<EventTicketClass, EventTicketObject>;
   };
   generateSaveUrl = <T, X>(payload: Payload<T, X>) => {
      const token = jwt.sign(payload, this.credentials.private_key, { algorithm: 'RS256' });
      return `https://pay.google.com/gp/v/save/${token}`;
   };
}