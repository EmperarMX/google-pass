export type RotatingBarcodeValues = {
   /**
    * Required. The date/time the first barcode is valid from. Barcodes will be rotated through using periodMillis defined on the object's RotatingBarcodeValueInfo.
    * This is an ISO 8601 extended format date/time, with an offset. Time may be specified up to nanosecond precision. Offsets may be specified with seconds precision (even though offset seconds is not part of ISO 8601).
    * For example:
    * 1985-04-12T23:20:50.52Z would be 20 minutes and 50.52 seconds after the 23rd hour of April 12th, 1985 in UTC.
    * 1985-04-12T19:20:50.52-04:00 would be 20 minutes and 50.52 seconds after the 19th hour of April 12th, 1985, 4 hours before UTC (same instant in time as the above example). If the event were in New York, this would be the equivalent of Eastern Daylight Time (EDT). Remember that offset varies in regions that observe Daylight Saving Time (or Summer Time), depending on the time of the year.
    */
   startDateTime: string;
   /**
    * Required. The values to encode in the barcode. At least one value is required.
    */
   values: string[];
   /**
    * Required. The amount of time each barcode is valid for. (string (int64 format))
    */
   periodMillis: string;
}