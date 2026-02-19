import { CardBarcodeSectionDetails } from './CardBarcodeSectionDetails';
import { CardTemplateOverride } from './CardTemplateOverride';
import { DetailsTemplateOverride } from './DetailsTemplateOverride';
import { ListTemplateOverride } from './ListTemplateOverride';

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
