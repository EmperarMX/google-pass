export interface Payload<T, X> {
   iss: string;
   aud: string;
   typ: string;
   iat: number;
   origins: string[];
   payload: {
      eventTicketClasses: T[];
      eventTicketObjects: X[];
   };
}