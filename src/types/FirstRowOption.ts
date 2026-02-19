import { FieldSelector } from './FieldSelector';
import { TransitOption } from './TransitOption';

export type FirstRowOption = {
   transitOption?: TransitOption;
   /**
    * A reference to the field to be displayed in the first row.
    */
   fieldOption?: FieldSelector;
};
