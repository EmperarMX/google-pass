import { FieldReference } from "./FieldReference";

export type FieldSelector = {
   /**
    * If more than one reference is supplied, then the first one that references a non-empty field will be displayed.
    */
   fields?: FieldReference[];
};
