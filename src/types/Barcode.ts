import { BarcodeRenderEncoding } from "./event/BarcodeRenderEncoding";
import { BarcodeType } from "./event/BarcodeType";
import { LocalizedString } from "./LocalizedString";

export type Barcode = {
   /**
    * The type of barcode.
    */
   type?: BarcodeType;
   /**
    * The render encoding for the barcode. When specified, barcode is rendered in the given encoding. Otherwise best known encoding is chosen by Google.
    */
   renderEncoding?: BarcodeRenderEncoding;
   /**
    * The value encoded in the barcode.
    */
   value?: string;
   /**
    * An optional text that will override the default text that shows under the barcode. This field is intended for a human readable equivalent of the barcode value, used when the barcode cannot be scanned.
    */
   alternateText?: string;
   /**
    * Optional text that will be shown when the barcode is hidden behind a click action. This happens in cases where a pass has Smart Tap enabled. If not specified, a default is chosen by Google.
    */
   showCodeText?: LocalizedString;
}