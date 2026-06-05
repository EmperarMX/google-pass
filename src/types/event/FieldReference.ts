import { DateFormat } from './DateFormat';

export type FieldReference = {
   /**
    * Path to the field being referenced, prefixed with "object" or "class" and separated with dots. For example, it may be the string "object.purchaseDetails.purchasePrice".
    */
   fieldPath?: string;
   /**
    * Only valid if the fieldPath references a date field. Chooses how the date field will be formatted and displayed in the UI.
    */
   dateFormat?: DateFormat;
};
