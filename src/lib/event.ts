interface EventTicketClass {
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

type AppLinkData = {
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

type MerchantLocation = {
   /**
    * The latitude specified as any value in the range of -90.0 through +90.0, both inclusive. Values outside these bounds will be rejected.
    */
   latitude?: number;
   /**
    * The longitude specified in the range -180.0 through +180.0, both inclusive. Values outside these bounds will be rejected.
    */
   longitude?: number;
};

type ValueAddedModuleData = {
   /**
    * Header to be displayed on the module. Character limit is 60 and longer strings will be truncated.
    */
   header?: LocalizedString;
   /**
    * Body to be displayed on the module. Character limit is 50 and longer strings will be truncated.
    */
   body?: LocalizedString;
   /**
    * Image to be displayed on the module. Recommended image ratio is 1:1. Images will be resized to fit this ratio.
    */
   image?: Image;
   /**
    * URI that the module leads to on click. This can be a web link or a deep link as mentioned in https://developer.android.com/training/app-links/deep-linking.
    */
   uri: string;
   /**
    * Constraints that all must be met for the module to be shown.
    */
   viewConstraints?: ModuleViewConstraints;
   /**
    * The index for sorting the modules. Modules with a lower sort index are shown before modules with a higher sort index. If unspecified, the sort index is assumed to be INT_MAX. For two modules with the same index, the sorting behavior is undefined.
    */
   sortIndex?: number;
};

type ModuleViewConstraints = {
   /**
    * The period of time that the module will be displayed to users. Can define both a startTime and endTime. The module is displayed immediately after insertion unless a startTime is set. The module is displayed indefinitely if endTime is not set.
    */
   displayInterval?: TimeInterval;
};

type AppLinkInfo = {
   /**
    * Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage.
    */
   appTarget?: AppTarget;
};

type AppTarget = {
   /**
    * URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application.
    */
   targetUri?: Uri;
   /**
    * Package name for AppTarget. For example: com.google.android.gm
    */
   packageName?: string;
};

enum NotificationSettingsForUpdates {
   NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED = 'NOTIFICATION_SETTINGS_FOR_UPDATES_UNSPECIFIED',
   NOTIFY_ON_UPDATE = 'NOTIFY_ON_UPDATE',
}

enum ViewUnlockRequirement {
   VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED = 'VIEW_UNLOCK_REQUIREMENT_UNSPECIFIED',
   UNLOCK_NOT_REQUIRED = 'UNLOCK_NOT_REQUIRED',
   UNLOCK_REQUIRED_TO_VIEW = 'UNLOCK_REQUIRED_TO_VIEW',
}

type SecurityAnimation = {
   /***
    * Type of animation.
    */
   animationType?: AnimationType;
};

enum AnimationType {
   ANIMATION_UNSPECIFIED = 'ANIMATION_UNSPECIFIED',
   FOIL_SHIMMER = 'FOIL_SHIMMER',
}

type CallbackOptions = {
   url: string;
   updateRequestUrl: string;
};

enum MultipleDevicesAndHoldersAllowedStatus {
   STATUS_UNSPECIFIED = 'STATUS_UNSPECIFIED',
   MULTIPLE_HOLDERS = 'MULTIPLE_HOLDERS',
   ONE_USER_ALL_DEVICES = 'ONE_USER_ALL_DEVICES',
   ONE_USER_ONE_DEVICE = 'ONE_USER_ONE_DEVICE',
}

type TextModuleData = {
   /**
    * The header of the Text Module. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens.
    */
   header?: string;
   /**
    * The body of the Text Module, which is defined as an uninterrupted string. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens.
    */
   body?: string;
   /**
    * Translated strings for the header. Recommended maximum length is 35 characters to ensure full string is displayed on smaller screens.
    */
   localizedHeader?: LocalizedString;
   /**
    * Translated strings for the body. Recommended maximum length is 500 characters to ensure full string is displayed on smaller screens.
    */
   localizedBody?: LocalizedString;
   /**
    * The ID associated with a text module. This field is here to enable ease of management of text modules and referencing them in template overrides. The ID should only include alphanumeric characters, '_', or '-'. It can not include dots, as dots are used to separate fields within FieldReference.fieldPaths in template overrides.
    */
   id?: string;
};

type ImageModuleData = {
   /**
    * A 100% width image.
    */
   mainImage?: Image;
   /**
    * The ID associated with an image module. This field is here to enable ease of management of image modules.
    */
   id?: string;
};

type Review = {
   comments: string;
};

enum ReviewStatus {
   REVIEW_STATUS_UNSPECIFIED = 'REVIEW_STATUS_UNSPECIFIED',
   UNDER_REVIEW = 'UNDER_REVIEW',
   APPROVED = 'APPROVED',
   REJECTED = 'REJECTED',
   DRAFT = 'DRAFT',
}

type Uri = {
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

type Message = {
   /**
    * The message header.
    */
   header?: string;
   /**
    * The message body.
    */
   body?: string;
   /**
    * The period of time that the message will be displayed to users. You can define both a startTime and endTime for each message. A message is displayed immediately after a Wallet Object is inserted unless a startTime is set. The message will appear in a list of messages indefinitely if endTime is not provided.
    */
   displayInterval?: TimeInterval;
   /**
    * The ID associated with a message. This field is here to enable ease of management of messages. Notice ID values could possibly duplicate across multiple messages in the same class/instance, and care must be taken to select a reasonable ID for each message.
    */
   id?: string;
   /**
    * The message type.
    */
   messageType?: MessageType;
   /**
    * Translated strings for the message header.
    */
   localizedHeader?: LocalizedString;
   /**
    * Translated strings for the message body.
    */
   localizedBody?: LocalizedString;
};

enum MessageType {
   MESSAGE_TYPE_UNSPECIFIED = 'MESSAGE_TYPE_UNSPECIFIED',
   TEXT = 'TEXT',
   EXPIRATION_NOTIFICATION = 'EXPIRATION_NOTIFICATION',
}

type TimeInterval = {
   /**
    * Start time of the interval.

   Offset is not required. If an offset is provided and end time is set, end must also include an offset.
    */
   start?: DateTime;
   /**
    * End time of the interval.

   Offset is not required. If an offset is provided and start time is set, start must also include an offset.
    */
   end?: DateTime;
};

type DateTime = {
   /**
    * An ISO 8601 extended format date/time. Offset may or may not be required (refer to the parent field's documentation). Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601).

   For example:
   
   1985-04-12T23:20:50.52Z would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   
   1985-04-12T19:20:50.52-04:00 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the date/time is intended for a physical location in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year.
   
   1985-04-12T19:20:50.52 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information.
   
   Providing an offset makes this an absolute instant in time around the world. The date/time will be adjusted based on the user's time zone. For example, a time of 2018-06-19T18:30:00-04:00 will be 18:30:00 for a user in New York and 15:30:00 for a user in Los Angeles.
   
   Omitting the offset makes this a local date/time, representing several instants in time around the world. The date/time will always be in the user's current time zone. For example, a time of 2018-06-19T18:30:00 will be 18:30:00 for a user in New York and also 18:30:00 for a user in Los Angeles. This is useful when the same local date/time should apply to many physical locations across several time zones.
    */
   date: string;
};

type ClassTemplateInfo = {
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

type ListTemplateOverride = {
   /**
    * Specifies from a predefined set of options or from a reference to the field what will be displayed in the first row. To set this override, set the FirstRowOption.fieldOption to the FieldSelector of your choice.
    */
   firstRowOption?: FirstRowOption;
   /**
    * A reference to the field to be displayed in the second row.

    * This option is only displayed if there are not multiple user objects in a group. If there is a group, the second row will always display a field shared by all objects. To set this override, please set secondRowOption to the FieldSelector of you choice.
    */
   secondRowOption?: FieldSelector;
};

type FirstRowOption = {
   transitOption?: TransitOption;
   /**
    * A reference to the field to be displayed in the first row.
    */
   fieldOption?: FieldSelector;
};

enum TransitOption {
   TRANSIT_OPTION_UNSPECIFIED = 'TRANSIT_OPTION_UNSPECIFIED',
   ORIGIN_AND_DESTINATION_NAMES = 'ORIGIN_AND_DESTINATION_NAMES',
   ORIGIN_AND_DESTINATION_CODES = 'ORIGIN_AND_DESTINATION_CODES',
   ORIGIN_NAME = 'ORIGIN_NAME',
}

type DetailsTemplateOverride = {
   /**
    * Information for the "nth" item displayed in the details list.
    */
   detailsItemInfos?: DetailsItemInfo[];
};

type DetailsItemInfo = {
   /**
    * The item to be displayed in the details list.
    */
   item?: TemplateItem;
};

type CardTemplateOverride = {
   /**
    * Template information for rows in the card view. At most three rows are allowed to be specified.
    */
   cardRowTemplateInfos?: CardRowTemplateInfo[];
};

type CardRowTemplateInfo = {
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

type CardRowOneItem = {
   /**
    * The item to be displayed in the row. This item will be automatically centered.
    */
   item?: TemplateItem;
};

type CardRowThreeItems = {
   /**
    * The item to be displayed at the start of the row. This item will be aligned to the left.
    */
   startItem?: TemplateItem;
   /**
    * The item to be displayed in the middle of the row. This item will be centered between the start and end items.
    */
   middleItem?: TemplateItem;
   /**
    * The item to be displayed at the end of the row. This item will be aligned to the right.
    */
   endItem?: TemplateItem;
};

type CardRowTwoItems = {
   /**
    * The item to be displayed at the start of the row. This item will be aligned to the left.
    */
   startItem?: TemplateItem;
   /**
    * The item to be displayed at the end of the row. This item will be aligned to the right.
    */
   endItem?: TemplateItem;
};

type TemplateItem = {
   /**
    * A reference to a field to display. If both firstValue and secondValue are populated, they will both appear as one item with a slash between them. For example, values A and B would be shown as "A / B".
    */
   firstValue?: FieldSelector;
   /**
    * A reference to a field to display. This may only be populated if the firstValue field is populated.
    */
   secondValue?: FieldSelector;
   /**
    * A predefined item to display. Only one of firstValue or predefinedItem may be set.
    */
   predefinedItem?: PredefinedItem;
};

enum PredefinedItem {
   PREDEFINED_ITEM_UNSPECIFIED = 'PREDEFINED_ITEM_UNSPECIFIED',
   FREQUENT_FLYER_PROGRAM_NAME_AND_NUMBER = 'FREQUENT_FLYER_PROGRAM_NAME_AND_NUMBER',
   FLIGHT_NUMBER_AND_OPERATING_FLIGHT_NUMBER = 'FLIGHT_NUMBER_AND_OPERATING_FLIGHT_NUMBER',
}

type CardBarcodeSectionDetails = {
   /**
    * Optional information to display above the barcode. If secondTopDetail is defined, this will be displayed to the start side of this detail section.
    */
   firstTopDetail?: BarcodeSectionDetail;
   /**
    * Optional information to display below the barcode.
    */
   firstBottomDetail?: BarcodeSectionDetail;
   /**
    * Optional second piece of information to display above the barcode. If firstTopDetail is defined, this will be displayed to the end side of this detail section.
    */
   secondTopDetail?: BarcodeSectionDetail;
};

type BarcodeSectionDetail = {
   /**
    * A reference to an existing text-based or image field to display.
    */
   fieldSelector?: FieldSelector;
};

type FieldSelector = {
   /**
    * If more than one reference is supplied, then the first one that references a non-empty field will be displayed.
    */
   fields?: FieldReference[];
};

type FieldReference = {
   /**
    * Path to the field being referenced, prefixed with "object" or "class" and separated with dots. For example, it may be the string "object.purchaseDetails.purchasePrice".
    */
   fieldPath?: string;
   /**
    * Only valid if the fieldPath references a date field. Chooses how the date field will be formatted and displayed in the UI.
    */
   dateFormat?: DateFormat;
};

enum DateFormat {
   DATE_FORMAT_UNSPECIFIED = 'DATE_FORMAT_UNSPECIFIED',
   DATE_TIME = 'DATE_TIME',
   DATE_ONLY = 'DATE_ONLY',
   TIME_ONLY = 'TIME_ONLY',
   DATE_TIME_YEAR = 'DATE_TIME_YEAR',
   DATE_YEAR = 'DATE_YEAR',
   YEAR_MONTH = 'YEAR_MONTH',
   YEAR_MONTH_DAY = 'YEAR_MONTH_DAY',
}

enum GateLabel {
   GATE_LABEL_UNSPECIFIED = 'GATE_LABEL_UNSPECIFIED',
   GATE = 'GATE',
   DOOR = 'DOOR',
   ENTRANCE = 'ENTRANCE',
}

enum SectionLabel {
   SECTION_LABEL_UNSPECIFIED = 'SECTION_LABEL_UNSPECIFIED',
   SECTION = 'SECTION',
}

enum RowLabel {
   ROW_LABEL_UNSPECIFIED = 'ROW_LABEL_UNSPECIFIED',
   ROW = 'ROW',
}

enum SeatLabel {
   SEAT_LABEL_UNSPECIFIED = 'SEAT_LABEL_UNSPECIFIED',
   SEAT = 'SEAT',
}

enum ConfirmationCodeLabel {
   CONFIRMATION_CODE_LABEL_UNSPECIFIED = 'CONFIRMATION_CODE_LABEL_UNSPECIFIED',
   CONFIRMATION_CODE = 'CONFIRMATION_CODE',
   CONFIRMATION_NUMBER = 'CONFIRMATION_NUMBER',
   RESERVATION_NUMBER = 'RESERVATION_NUMBER',
}

type EventDateTime = {
   /**
    * The date/time when the doors open at the venue.
    * This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601).
    * For example:
    * 1985-04-12T23:20:50.52Z would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
    * 1985-04-12T19:20:50.52-04:00 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving
    * Time (or Summer Time), depending on the time of the year.
    * 1985-04-12T19:20:50.52 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information.
    * The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be 2018-06-05T20:00:00. If the local date/time at the venue is 4 hours before UTC, an offset of -04:00 may be appended.
    */
   doorsOpen?: string;
   /**
    * The date/time when the event starts. If the event spans multiple days, it should be the start date/time on the first day.

    * This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601).
   
    * For example:
   
    * 1985-04-12T23:20:50.52Z would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   
    * 1985-04-12T19:20:50.52-04:00 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year.
   
    * 1985-04-12T19:20:50.52 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information.
   
    * The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be 2018-06-05T20:00:00. If the local date/time at the venue is 4 hours before UTC, an offset of -04:00 may be appended.
    */
   start?: string;
   /**
    * The date/time when the event ends. If the event spans multiple days, it should be the end date/time on the last day.

    * This is an ISO 8601 extended format date/time, with or without an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601).
   
    * For example:
   
    * 1985-04-12T23:20:50.52Z would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
   
    * 1985-04-12T19:20:50.52-04:00 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year.
   
    * 1985-04-12T19:20:50.52 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985 with no offset information.
   
    * The portion of the date/time without the offset is considered the "local date/time". This should be the local date/time at the venue. For example, if the event occurs at the 20th hour of June 5th, 2018 at the venue, the local date/time portion should be 2018-06-05T20:00:00. If the local date/time at the venue is 4 hours before UTC, an offset of -04:00 may be appended.
    */
   end?: string;
   /**
    * The label to use for the doors open value (doorsOpen) on the card detail view. Each available option maps to a set of localized strings, so that translations are shown to the user based on their locale.

    * Both doorsOpenLabel and customDoorsOpenLabel may not be set. If neither is set, the label will default to "Doors Open", localized. If the doors open field is unset, this label will not be used.
    */
   doorsOpenLabel?: DoorsOpenLabelEnum;
   /**
    * A custom label to use for the doors open value (doorsOpen) on the card detail view. This should only be used if the default "Doors Open" label or one of the doorsOpenLabel options is not sufficient.

    * Both doorsOpenLabel and customDoorsOpenLabel may not be set. If neither is set, the label will default to "Doors Open", localized. If the doors open field is unset, this label will not be used.
    */
   customDoorsOpenLabel?: LocalizedString;
};

enum DoorsOpenLabelEnum {
   DOORS_OPEN_LABEL_UNSPECIFIED = 'DOORS_OPEN_LABEL_UNSPECIFIED',
   DOORS_OPEN = 'DOORS_OPEN',
   GATES_OPEN = 'GATES_OPEN',
}

type EventVenue = {
   /**
    * The name of the venue, such as "AT&T Park".
    * This is required.
    */
   name: LocalizedString;
   /**
    * The address of the venue, such as "24 Willie Mays Plaza\nSan Francisco, CA 94107". Address lines are separated
    * by line feed (\n) characters.
    * This is required.
    */
   address: LocalizedString;
};

type Image = {
   /**
    * The URI for the image.
    */
   sourceUri?: ImageUri;
   /**
    * Description of the image used for accessibility.
    */
   contentDescription?: LocalizedString;
};

type ImageUri = {
   /**
    * The location of the image. URIs must have a scheme.
    */
   uri?: string;
};

type LocalizedString = {
   /**
    * Contains the translations for the string.
    */
   translatedValues?: TranslatedString[];
   /**
    * Contains the string to be displayed if no appropriate translation is available.
    */
   defaultValue?: TranslatedString;
};

type TranslatedString = {
   /**
    * Represents the BCP 47 language tag. Example values are "en-US", "en-GB", "de", or "de-AT".
    */
   language?: string;
   /**
    * The UTF-8 encoded translated string.
    */
   value?: string;
};

export const createClassEvent = (eventTicketClss: EventTicketClass) => {};
