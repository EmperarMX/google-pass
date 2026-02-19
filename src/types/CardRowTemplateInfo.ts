import { CardRowOneItem } from './CardRowOneItem';
import { CardRowThreeItems } from './CardRowThreeItems';
import { CardRowTwoItems } from './CardRowTwoItems';

export type CardRowTemplateInfo = {
   /**
    * Template for a row containing one item. Exactly one of "oneItem", "twoItems", "threeItems" must be set.
    */
   oneItem?: CardRowOneItem;
   /**
    * Template for a row containing two items. Exactly one of "oneItem", "twoItems", "threeItems" must be set.
    */
   twoItems?: CardRowTwoItems;
   /**
    * Template for a row containing three items. Exactly one of "oneItem", "twoItems", "threeItems" must be set.
    */
   threeItems?: CardRowThreeItems;
};
