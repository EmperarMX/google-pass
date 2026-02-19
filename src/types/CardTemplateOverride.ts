import { CardRowTemplateInfo } from './CardRowTemplateInfo';

export type CardTemplateOverride = {
   /**
    * Template information for rows in the card view. At most three rows are allowed to be specified.
    */
   cardRowTemplateInfos?: CardRowTemplateInfo[];
};
