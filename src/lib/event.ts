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
}

type ClassTemplateInfo = {
   /**
    * Specifies extra information to be displayed above and below the barcode.
    */
   cardBarcodeSectionDetails?: CardBarcodeSectionDetails;
   cardTemplateOverride?: 
};

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
