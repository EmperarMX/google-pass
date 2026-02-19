import { AppLinkData } from './AppLinkData';
import { CallbackOptions } from './CallbackOptions';
import { ClassTemplateInfo } from './ClassTemplateInfo';
import { ConfirmationCodeLabel } from './ConfirmationCodeLabel';
import { EventDateTime } from './EventDateTime';
import { EventVenue } from './EventVenue';
import { GateLabel } from './GateLabel';
import { Image } from './Image';
import { ImageModuleData } from './ImageModuleData';
import { LocalizedString } from './LocalizedString';
import { Message } from './Message';
import { MultipleDevicesAndHoldersAllowedStatus } from './MultipleDevicesAndHoldersAllowedStatus';
import { NotificationSettingsForUpdates } from './NotificationSettingsForUpdates';
import { Review } from './Review';
import { ReviewStatus } from './ReviewStatus';
import { RowLabel } from './RowLabel';
import { SeatLabel } from './SeatLabel';
import { SectionLabel } from './SectionLabel';
import { SecurityAnimation } from './SecurityAnimation';
import { TextModuleData } from './TextModuleData';
import { Uri } from './Uri';
import { ViewUnlockRequirement } from './ViewUnlockRequirement';

export interface EventTicketClass {
   /**
    * Required. The name of the event, such as "LA Dodgers at SF Giants".
    */
   eventName: LocalizedString;
   /**
    * The ID of the event. This ID should be unique for every event in an account. It is used to group tickets
    * together if the user has saved multiple tickets for the same event. It can be at most 64 characters.
    * If provided, the grouping will be stable. Be wary of unintentional collision to avoid grouping tickets that
    * should not be grouped. If you use only one class per event, you can simply set this to the classId (with or
    * without the issuer ID portion).
    * If not provided, the platform will attempt to use other data to group tickets (potentially unstable).
    */
   eventId?: string;
   /**
    * The logo image of the ticket. This image is displayed in the card detail view of the app.
    */
   logo?: Image;
   /**
    * Event venue details.
    */
   venue?: EventVenue;
   /**
    * The date & time information of the event.
    */
   dateTime?: EventDateTime;
   /**
    * The label to use for the confirmation code value (eventTicketObject.reservationInfo.confirmationCode) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale.

   Both confirmationCodeLabel and customConfirmationCodeLabel may not be set. If neither is set, the label will default to "Confirmation Code", localized. If the confirmation code field is unset, this label will not be used.
    */
   confirmationCodeLabel?: ConfirmationCodeLabel;
   /**
    * A custom label to use for the confirmation code value (eventTicketObject.reservationInfo.confirmationCode) on the card detail view. This should only be used if the default "Confirmation Code" label or one of the confirmationCodeLabel options is not sufficient.

    * Both confirmationCodeLabel and customConfirmationCodeLabel may not be set. If neither is set, the label will default to "Confirmation Code", localized. If the confirmation code field is unset, this label will not be used.
    */
   customConfirmationCodeLabel?: LocalizedString;
   /**
    * The label to use for the seat value (eventTicketObject.seatInfo.seat) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale.

    * Both seatLabel and customSeatLabel may not be set. If neither is set, the label will default to "Seat", localized. If the seat field is unset, this label will not be used.
    */
   seatLabel?: SeatLabel;
   /**
    * A custom label to use for the seat value (eventTicketObject.seatInfo.seat) on the card detail view. This should only be used if the default "Seat" label or one of the seatLabel options is not sufficient.

    * Both seatLabel and customSeatLabel may not be set. If neither is set, the label will default to "Seat", localized. If the seat field is unset, this label will not be used.
    */
   customSeatLabel?: LocalizedString;
   /**
    * The label to use for the row value (eventTicketObject.seatInfo.row) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale.

    * Both rowLabel and customRowLabel may not be set. If neither is set, the label will default to "Row", localized. If the row field is unset, this label will not be used.
    */
   rowLabel?: RowLabel;
   /**
    * A custom label to use for the row value (eventTicketObject.seatInfo.row) on the card detail view. This should only be used if the default "Row" label or one of the rowLabel options is not sufficient.

    * Both rowLabel and customRowLabel may not be set. If neither is set, the label will default to "Row", localized. If the row field is unset, this label will not be used.
    */
   customRowLabel?: LocalizedString;
   /**
    * The label to use for the section value (eventTicketObject.seatInfo.section) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale.

    * Both sectionLabel and customSectionLabel may not be set. If neither is set, the label will default to "Section", localized. If the section field is unset, this label will not be used.
    */
   sectionLabel?: SectionLabel;
   /**
    * A custom label to use for the section value (eventTicketObject.seatInfo.section) on the card detail view. This should only be used if the default "Section" label or one of the sectionLabel options is not sufficient.

    * Both sectionLabel and customSectionLabel may not be set. If neither is set, the label will default to "Section", localized. If the section field is unset, this label will not be used.
    */
   customSectionLabel?: LocalizedString;
   /**
    * The label to use for the gate value (eventTicketObject.seatInfo.gate) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale.

    * Both gateLabel and customGateLabel may not be set. If neither is set, the label will default to "Gate", localized. If the gate field is unset, this label will not be used.
    */
   gateLabel?: GateLabel;
   /**
    * A custom label to use for the gate value (eventTicketObject.seatInfo.gate) on the card detail view. This should only be used if the default "Gate" label or one of the gateLabel options is not sufficient.

    * Both gateLabel and customGateLabel may not be set. If neither is set, the label will default to "Gate", localized. If the gate field is unset, this label will not be used.
    */
   customGateLabel?: LocalizedString;
   /**
    * The fine print, terms, or conditions of the ticket.
    */
   finePrint?: LocalizedString;
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
    * An array of messages displayed in the app. All users of this object will receive its associated messages. The maximum number of these fields is 10.
    */
   messages?: Message[];
   /**
    * The URI of your application's home page. Populating the URI in this field results in the exact same behavior as populating an URI in linksModuleData (when an object is rendered, a link to the homepage is shown in what would usually be thought of as the linksModuleData section of the object).
    */
   homepageUri?: Uri;
   /**
    * Required. The status of the class. This field can be set to draft or underReview using the insert, patch, or update API calls. Once the review state is changed from draft it may not be changed back to draft.

   You should keep this field to draft when the class is under development. A draft class cannot be used to create any object.
   
   You should set this field to underReview when you believe the class is ready for use. The platform will automatically set this field to approved and it can be immediately used to create or migrate objects.
   
   When updating an already approved class you should keep setting this field to underReview.
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
    * string (int64 format)
    * Identifies which redemption issuers can redeem the pass over Smart Tap. Redemption issuers are identified by their issuer ID. Redemption issuers must have at least one Smart Tap key configured.

   The enableSmartTap and object level smartTapRedemptionLevel fields must also be set up correctly in order for a pass to support Smart Tap.
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
    * Identifies whether this class supports Smart Tap. The redemptionIssuers and object level smartTapRedemptionLevel fields must also be set up correctly in order for a pass to support Smart Tap.
    */
   enableSmartTap?: boolean;
   /**
    * The background color for the card. If not set the dominant color of the hero image is used, and if no hero image is set, the dominant color of the logo is used. The format is #rrggbb where rrggbb is a hex RGB triplet, such as #ffcc00. You can also use the shorthand version of the RGB triplet which is #rgb, such as #fc0.
    */
   hexBackgroundColor?: string;
   /**
    * Translated strings for the issuerName. Recommended maximum length is 20 characters to ensure full string is displayed on smaller screens.
    */
   localizedIssuerName?: string;
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
    * View Unlock Requirement options for the event ticket.
    */
   viewUnlockRequirement?: ViewUnlockRequirement;
   /**
    * The wide logo of the ticket. When provided, this will be used in place of the logo in the top left of the card view.
    */
   wideLogo?: Image;
   /**
    * Whether or not field updates to this class should trigger notifications. When set to NOTIFY, we will attempt to trigger a field update notification to users. These notifications will only be sent to users if the field is part of an allowlist. If not specified, no notification will be triggered. This setting is ephemeral and needs to be set with each PATCH or UPDATE request, otherwise a notification will not be triggered.
    */
   notifyPreference?: NotificationSettingsForUpdates;
   /**
    * Optional app or website link that will be displayed as a button on the front of the pass. If AppLinkData is provided for the corresponding object that will be used instead.
    */
   appLinkData?: AppLinkData;
}
