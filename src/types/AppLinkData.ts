import { AppLinkInfo } from './AppLinkInfo';
import { LocalizedString } from './LocalizedString';
import { MerchantLocation } from './MerchantLocation';
import { ValueAddedModuleData } from './ValueAddedModuleData';

export type AppLinkData = {
   /**
    * Optional information about the partner app link.
    */
   androidAppLinkInfo?: AppLinkInfo;
   /**
    * Optional information about the partner web link.
    */
   webAppLinkInfo?: AppLinkInfo;
   /**
    * Optional display text for the app link button. Character limit is 30.
    */
   displayText?: LocalizedString;
   /**
    * Optional value added module data. Maximum of ten on the class. For a pass only ten will be displayed, prioritizing those from the object.
    */
   valueAddedModuleData?: ValueAddedModuleData[];
   /**
    * Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints.
    */
   merchantLocations?: MerchantLocation[];
};
