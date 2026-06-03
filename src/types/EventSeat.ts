import { LocalizedString } from "./LocalizedString";

export type EventSeat = {
   /**
    * The seat number, such as "1", "2", "3", or any other seat identifier.

   This field is localizable so you may translate words or use different alphabets for the characters in an identifier.
    */
   seat?: LocalizedString;
   /**
    * The row of the seat, such as "1", E", "BB", or "A5".

   This field is localizable so you may translate words or use different alphabets for the characters in an identifier.
    */
   row?: LocalizedString;
   /**
    * The section of the seat, such as "121".

   This field is localizable so you may translate words or use different alphabets for the characters in an identifier.
    */
   section?: LocalizedString;
   /**
    * The gate the ticket holder should enter to get to their seat, such as "A" or "West".

   This field is localizable so you may translate words or use different alphabets for the characters in an identifier.
    */
   gate?: LocalizedString;
};