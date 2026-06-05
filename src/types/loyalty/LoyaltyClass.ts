import { AppLinkData } from "../AppLinkData";
import { CallbackOptions } from "../CallbackOptions";
import { ClassTemplateInfo } from "../ClassTemplateInfo";
import { Image } from "../Image";
import { ImageModuleData } from "../ImageModuleData";
import { LinksModuleData } from "../LinksModuleData";
import { LocalizedString } from "../LocalizedString";
import { MerchantLocation } from "../MerchantLocation";
import { Message } from "../Message";
import { MultipleDevicesAndHoldersAllowedStatus } from "../MultipleDevicesAndHoldersAllowedStatus";
import { NotificationSettingsForUpdates } from "../NotificationSettingsForUpdates";
import { Review } from "../Review";
import { ReviewStatus } from "../ReviewStatus";
import { SecurityAnimation } from "../SecurityAnimation";
import { TextModuleData } from "../TextModuleData";
import { Uri } from "../Uri";
import { ValueAddedModuleData } from "../ValueAddedModuleData";
import { ViewUnlockRequirement } from "../ViewUnlockRequirement";
import { DiscoverableProgram } from "./DiscoverableProgram";

export type LoyaltyClass = {
   /**
    * Required. The program name, such as "Adam's Apparel". The app may display an ellipsis after the first 20 characters to ensure full string is displayed on smaller screens.
    */
   programName: string;
   /**
    * Required. The logo of the loyalty program or company. This logo is displayed in both the details and list views of the app.
    */
   programLogo: Image;
   /**
    * The account name label, such as "Member Name." Recommended maximum length is 15 characters to ensure full string is displayed on smaller screens.
    */
   accountNameLabel?: string;
   /**
    * The account ID label, such as "Member ID." Recommended maximum length is 15 characters to ensure full string is displayed on smaller screens.
    */
   accountIdLabel?: string;
   /**
    * The rewards tier label, such as "Rewards Tier." Recommended maximum length is 9 characters to ensure full string is displayed on smaller screens.
    */
   rewardsTierLabel?: string;
   /**
    * The rewards tier, such as "Gold" or "Platinum." Recommended maximum length is 7 characters to ensure full string is displayed on smaller screens.
    */
   rewardsTier?: string;
   /**
    * Translated strings for the programName. The app may display an ellipsis after the first 20 characters to ensure full string is displayed on smaller screens.
    */
   localizedProgramName?: LocalizedString;
   /**
    * Translated strings for the accountNameLabel. Recommended maximum length is 15 characters to ensure full string is displayed on smaller screens.
    */
   localizedAccountNameLabel?: LocalizedString;
   /**
    * Translated strings for the accountIdLabel. Recommended maximum length is 15 characters to ensure full string is displayed on smaller screens.
    */
   localizedAccountIdLabel?: LocalizedString;
   /**
    * Translated strings for the rewardsTierLabel. Recommended maximum length is 9 characters to ensure full string is displayed on smaller screens.
    */
   localizedRewardsTierLabel?: LocalizedString;
   /**
    * Translated strings for the rewardsTier. Recommended maximum length is 7 characters to ensure full string is displayed on smaller screens.
    */
   localizedRewardsTier?: LocalizedString;
   /**
    * The secondary rewards tier label, such as "Rewards Tier."
    */
   secondaryRewardsTierLabel?: string;
   /**
    * Translated strings for the secondaryRewardsTierLabel.
    */
   localizedSecondaryRewardsTierLabel?: LocalizedString;
   /**
    * The secondary rewards tier, such as "Gold" or "Platinum."
    */
   secondaryRewardsTier?: string;
   /**
    * Translated strings for the secondaryRewardsTier.
    */
   localizedSecondaryRewardsTier?: LocalizedString;
   /**
    * Information about how the class may be discovered and instantiated from within the Google Pay app.
    */
   discoverableProgram?: DiscoverableProgram;
   /**
    * Template information about how the class should be displayed. If unset, Google will fallback to a default set of fields to display.
    */
   classTemplateInfo?: ClassTemplateInfo;
   /**
    * Required. The unique identifier for a class. This ID must be unique across all classes from an issuer. This value should follow the format issuer ID.identifier where the former is issued by Google and latter is chosen by you. Your unique identifier should only include alphanumeric characters, '.', '_', or '-'.
    */
   id: string;
   /**
    * Required. The issuer name. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.
    */
   issuerName: string;
   /**
    * An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10.xx
    */
   messages?: Message[];
   /**
    * The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object).
    */
   homepageUri?: Uri;
   /**
    * Required. The status of the class. This field can be set to draft or underReview using the insert, patch, or update API calls. Once the review state is changed from draft it may not be changed back to draft.
    * You should keep this field to draft when the class is under development. A draft class cannot be used to create any object.
    * You should set this field to underReview when you believe the class is ready for use. The platform will automatically set this field to approved and it can be immediately used to create or migrate objects.
    * When updating an already approved class you should keep setting this field to underReview.
    */
   reviewStatus: ReviewStatus;
   /**
    * The review comments set by the platform when a class is marked approved or rejected.
    */
   review?: Review;
   /**
    * Image module data. The maximum number of these fields displayed is 1 from object level and 1 for class object level.
    */
   imageModulesData?: ImageModuleData[];
   /**
    * Text module data. If text module data is also defined on the class, both will be displayed. The maximum number of these fields displayed is 10 from the object and 10 from the class.
    */
   textModulesData?: TextModuleData[];
   /**
    * Links module data. If links module data is also defined on the object, both will be displayed.
    */
   linksModuleData?: LinksModuleData;
   /**
    * Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured.
    * The enableSmartTap and one of object level smartTapRedemptionValue, barcode.value, oraccountId` fields must also be set up correctly in order for a pass to support Smart Tap.
    */
   redemptionIssuers?: string[];
   /**
    * Country code used to display the card's country (when the user is not in that country), as well as to display localized content when content is not available in the user's locale.
    */
   countryCode?: string;
   /**
    * Optional banner image displayed on the front of the card. If none is present, nothing will be displayed. The image will display at 100% width.
    */
   heroImage?: Image;
   /**
    * Identifies whether this class supports Smart Tap. The redemptionIssuers and one of object level smartTapRedemptionLevel, barcode.value, or accountId` fields must also be set up correctly in order for a pass to support Smart Tap.
    */
   enableSmartTap?: boolean;
   /**
    * The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as #ffcc00. You can also use the shorthand version of the RGB triplet which is #rgb, such as #fc0.
    */
   hexBackgroundColor?: string;
   /**
    * Translated strings for the issuerName. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.
    */
   localizedIssuerName?: LocalizedString;
   /**
    * Identifies whether multiple users and devices will save the same object referencing this class.
    */
   multipleDevicesAndHoldersAllowedStatus?: MultipleDevicesAndHoldersAllowedStatus;
   /**
    * Callback options to be used to call the issuer back for every save/delete of an object for this class by the end-user. All objects of this class are eligible for the callback.
    */
   callbackOptions?: CallbackOptions;
   /**
    * Optional information about the security animation. If this is set a security animation will be rendered on pass details.
    */
   securityAnimation?: SecurityAnimation;
   /**
    * View Unlock Requirement options for the loyalty card.
    */
   viewUnlockRequirement?: ViewUnlockRequirement;
   /**
    * The wide logo of the loyalty program or company. When provided, this will be used in place of the program logo in the top left of the card view.
    */
   wideProgramLogo?: Image;
   /**
    * Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered.
    */
   notifyPreference?: NotificationSettingsForUpdates;
   /**
    * Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead.
    */
   appLinkData?: AppLinkData;
   /**
    * Optional value added module data. Maximum of ten on the class. For a pass only ten will be displayed, prioritizing those from the object.
    */
   valueAddedModuleData?: ValueAddedModuleData[];
   /**
    * Merchant locations. There is a maximum of ten on the class. Any additional MerchantLocations added beyond the 10 will be rejected. These locations will trigger a notification when a user enters within a Google-set radius of the point. This field replaces the deprecated LatLongPoints.
    */
   merchantLocations?: MerchantLocation[];
};
