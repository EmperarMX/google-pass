import { BarcodeRenderEncoding } from "./event/BarcodeRenderEncoding";
import { BarcodeType } from "./event/BarcodeType";
import { LocalizedString } from "./LocalizedString";
import { RotatingBarcodeValues } from "./event/RotatingBarcodeValues";
import { TotpDetails } from "./event/TotpDetails";

export type RotatingBarcode = {
   /**
    * The type of this barcode.
    */
   type?: BarcodeType;
   /**
    * The render encoding for the barcode. When specified, barcode is rendered in the given encoding. Otherwise best known encoding is chosen by Google.
    */
   renderEncoding?: BarcodeRenderEncoding;
   /**
    * String encoded barcode value. This string supports the following substitutions: * {totp_value_n}: Replaced with the TOTP value (see TotpDetails.parameters). * {totp_timestamp_millis}: Replaced with the timestamp (millis since epoch) at which the barcode was generated. * {totp_timestamp_seconds}: Replaced with the timestamp (seconds since epoch) at which the barcode was generated.
    */
   valuePattern?: string;
   /**
    * Details used to evaluate the {totp_value_n} substitutions.
    */
   totpDetails?: TotpDetails;
   /**
    * An optional text that will override the default text that shows under the barcode. This field is intended for a human readable equivalent of the barcode value, used when the barcode cannot be scanned.
    */
   alternateText?: string;
   /**
    * Optional text that will be shown when the barcode is hidden behind a click action. This happens in cases where a pass has Smart Tap enabled. If not specified, a default is chosen by Google.
    */
   showCodeText?: LocalizedString;
   /**
    * Input only. NOTE: This feature is only available for the transit vertical. Optional set of initial rotating barcode values. This allows a small subset of barcodes to be included with the object. Further rotating barcode values must be uploaded with the UploadRotatingBarcodeValues endpoint.
    */
   initialRotatingBarcodeValues?: RotatingBarcodeValues;
}