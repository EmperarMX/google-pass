import { TemplateItem } from './TemplateItem';

export type CardRowTwoItems = {
   /**
    * The item to be displayed at the start of the row. This item will be aligned to the left.
    */
   startItem?: TemplateItem;
   /**
    * The item to be displayed at the end of the row. This item will be aligned to the right.
    */
   endItem?: TemplateItem;
};
