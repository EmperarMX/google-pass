import { LocalizedString } from './LocalizedString';

export type Uri = {
   /**
    * The location of a web page, image, or other resource. URIs in the LinksModuleData module can have different prefixes indicating the type of URI (a link to a web page, a link to a map, a telephone number, or an email address). URIs must have a scheme.
    */
   uri?: string;
   /**
    * The URI's title appearing in the app as text. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.

   Note that in some contexts this text is not used, such as when description is part of an image.
    */
   description?: string;
   /**
    * Translated strings for the description. Recommended maximum is 20 characters to ensure full string is displayed on smaller screens.
    */
   localizedDescription?: LocalizedString;
   /**
    * The ID associated with a uri. This field is here to enable ease of management of uris.
    */
   id?: string;
};
