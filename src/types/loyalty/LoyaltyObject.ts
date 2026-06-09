import { AppLinkData } from '../AppLinkData';
import { Barcode } from '../Barcode';
import { GroupingInfo } from '../GroupingInfo';
import { Image } from '../Image';
import { ImageModuleData } from '../ImageModuleData';
import { LinksModuleData } from '../LinksModuleData';
import { MerchantLocation } from '../MerchantLocation';
import { Message } from '../Message';
import { NotificationSettingsForUpdates } from '../NotificationSettingsForUpdates';
import { PassConstraints } from '../PassConstraints';
import { RotatingBarcode } from '../RotatingBarcode';
import { SaveRestrictions } from '../SaveRestrictions';
import { State } from '../State';
import { TextModuleData } from '../TextModuleData';
import { TimeInterval } from '../TimeInterval';
import { ValueAddedModuleData } from '../ValueAddedModuleData';
import { LoyaltyClass } from './LoyaltyClass';
import { LoyaltyPoints } from './LoyaltyPoints';

export type LoyaltyObject = {
   /**
    * A copy of the inherited fields of the parent class. These fields are retrieved during a GET.
    */
   classReference?: LoyaltyClass;
   /**
    * The loyalty account holder name, such as "John Smith." Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.
    */
   accountName?: string;
   /**
    * The loyalty account identifier. Recommended maximum length is 20 characters.
    */
   accountId?: string;
   /**
    * The loyalty reward points label, balance, and type.
    */
   loyaltyPoints?: LoyaltyPoints;
   /**
    * A list of offer objects linked to this loyalty card. The offer objects must already exist.
    * Offer object IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you.
    */
   linkedOfferIds?: string[];
   /**
    * The secondary loyalty reward points label, balance, and type. Shown in addition to the primary loyalty points.
    */
   secondaryLoyaltyPoints?: LoyaltyPoints;
   /**
    * Required. The unique identifier for an object. This ID must be unique across all objects from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. The unique identifier should only include alphanumeric characters, '.', '_', or '-'.
    */
   id: string;
   /**
    * Required. The class associated with this object. The class must be of the same type as this object, must already exist, and must be approved.
    * Class IDs should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you.
    */
   classId: string;
   /**
    * Required. The state of the object. This field is used to determine how an object is displayed in the app. For example, an inactive object is moved to the "Expired passes" section.
    */
   state: State;
   /**
    * The barcode type and value.
    */
   barcode?: Barcode;
   /**
    * An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10.
    */
   messages?: Message[];
   /**
    * The time period this object will be active and object can be used. An object's state will be changed to expired when this time period has passed.
    */
   validTimeInterval?: TimeInterval;
   /**
    * Indicates if the object has users. This field is set by the platform.
    */
   hasUsers?: boolean;
   /**
    * The value that will be transmitted to a Smart Tap certified terminal over NFC for this object. The class level fields enableSmartTap and redemptionIssuers must also be set up correctly in order for the pass to support Smart Tap. Only ASCII characters are supported.
    * If this value is not set but the class level fields enableSmartTap and redemptionIssuers are set up correctly, the barcode.value or the accountId fields are used as fallback if present.
    */
   smartTapRedemptionValue?: string;
   /**
    * Whether this object is currently linked to a single device. This field is set by the platform when a user saves the object, linking it to their device. Intended for use by select partners. Contact support for additional information.
    */
   hasLinkedDevice?: boolean;
   /**
    * Indicates if notifications should explicitly be suppressed. If this field is set to true, regardless of the messages field, expiration notifications to the user will be suppressed. By default, this field is set to false.
    * Currently, this can only be set for offers.
    */
   disableExpirationNotification?: boolean;
   /**
    * Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level.
    */
   imageModulesData?: ImageModuleData[];
   /**
    * Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class.
    */
   textModulesData?: TextModuleData[];
   /**
    * Links module data. If links module data is also defined on the class, both will be displayed.
    */
   linksModuleData?: LinksModuleData;
   /**
    * Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding class only object AppLinkData will be displayed.
    */
   appLinkData?: AppLinkData;
   /**
    * The rotating barcode type and value.
    */
   rotatingBarcode?: RotatingBarcode;
   /**
    * Optional banner image displayed on the front of the card. If none is present, hero image of the class, if present, will be displayed. If hero image of the class is also not present, nothing will be displayed.
    */
   heroImage?: Image;
   /**
    * Information that controls how passes are grouped together.
    */
   groupingInfo?: GroupingInfo;
   /**
    * Pass constraints for the object. Includes limiting NFC and screenshot behaviors.
    */
   passConstraints?: PassConstraints;
   /**
    * Restrictions on the object that needs to be verified before the user tries to save the pass. Note that this restrictions will only be applied during save time. If the restrictions changed after a user saves the pass, the new restrictions will not be applied to an already saved pass.
    */
   saveRestrictions?: SaveRestrictions;
   /**
    * linkedObjectIds are a list of other objects such as event ticket, loyalty, offer, generic, giftcard, transit and boarding pass that should be automatically attached to this loyalty object. If a user had saved this loyalty card, then these linkedObjectIds would be automatically pushed to the user's wallet (unless they turned off the setting to receive such linked passes).
    * Make sure that objects present in linkedObjectIds are already inserted - if not, calls would fail. Once linked, the linked objects cannot be unlinked. You cannot link objects belonging to another issuer. There is a limit to the number of objects that can be linked to a single object. After the limit is reached, new linked objects in the call will be ignored silently.
    * Object IDs should follow the format issuer ID.identifier where the former is issued by Google and the latter is chosen by you.
    */
   linkedObjectIds?: string[];
   /**
    * Whether or not field updates to this object should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If set to DO_NOT_NOTIFY or NOTIFICATION_SETTINGS_UNSPECIFIED, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered.
    */
   notifyPreference?: NotificationSettingsForUpdates;
   /**
    * Optional value added module data. Maximum of ten on the object.
    */
   valueAddedModuleData?: ValueAddedModuleData[];
   /**
    * Merchant locations. There is a maximum of ten on the object. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints.
    */
   merchantLocations?: MerchantLocation[];
};
