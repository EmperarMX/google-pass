import { DoorsOpenLabelEnum } from './DoorsOpenLabelEnum';
import { LocalizedString } from './LocalizedString';

export type EventDateTime = {
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
