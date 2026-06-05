import { ImageUri } from './event/ImageUri';
import { LocalizedString } from './LocalizedString';

export type Image = {
   /**
    * The URI for the image.
    */
   sourceUri?: ImageUri;
   /**
    * Description of the image used for accessibility.
    */
   contentDescription?: LocalizedString;
};
