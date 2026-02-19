import { FieldSelector } from './FieldSelector';
import { FirstRowOption } from './FirstRowOption';

export type ListTemplateOverride = {
   /**
    * Specifies from a predefined set of options or from a reference to the field what will be displayed in the first row. To set this override, set the FirstRowOption.fieldOption to the FieldSelector of your choice.
    */
   firstRowOption?: FirstRowOption;
   /**
    * A reference to the field to be displayed in the second row.

    * This option is only displayed if there are not multiple user objects in a group. If there is a group, the second row will always display a field shared by all objects. To set this override, please set secondRowOption to the FieldSelector of you choice.
    */
   secondRowOption?: FieldSelector;
};
