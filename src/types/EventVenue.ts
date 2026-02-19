import { LocalizedString } from './LocalizedString';

export type EventVenue = {
   /**
    * The name of the venue, such as "AT&T Park".
    * This is required.
    */
   name: LocalizedString;
   /**
    * The address of the venue, such as "24 Willie Mays Plaza\nSan Francisco, CA 94107". Address lines are separated
    * by line feed (\n) characters.
    * This is required.
    */
   address: LocalizedString;
};
