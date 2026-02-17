interface Credentials {
   iss: string;
   private_key: string;
   issuerName: string;
}

export class GoogleWalletLib {
   private credentials: Credentials;
   constructor(credentials: Credentials){
      this.credentials = credentials;
   }

   
}