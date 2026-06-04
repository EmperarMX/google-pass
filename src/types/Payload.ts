export interface Payload<P> {
   iss: string;
   aud: string;
   typ: string;
   iat: number;
   origins: string[];
   payload: P;
}