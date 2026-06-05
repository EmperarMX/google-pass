import { CardBarcodeSectionDetails } from './event/CardBarcodeSectionDetails';
import { CardTemplateOverride } from './event/CardTemplateOverride';
import { DetailsTemplateOverride } from './event/DetailsTemplateOverride';
import { ListTemplateOverride } from './event/ListTemplateOverride';

export type ClassTemplateInfo = {
   /**
    * Specifies extra information to be displayed above and below the barcode.
    */
   cardBarcodeSectionDetails?: CardBarcodeSectionDetails;
   /**
    * Override for the card view.
    */
   cardTemplateOverride?: CardTemplateOverride;
   /**
    * Override for the details view (beneath the card view).
    */
   detailsTemplateOverride?: DetailsTemplateOverride;
   /**
    * Override for the passes list view.
    */
   listTemplateOverride?: ListTemplateOverride;
};
