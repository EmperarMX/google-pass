import { NfcConstraint } from "./NfcConstraint";
import { ScreenshotEligibility } from "./ScreenshotEligibility";

export type PassConstraints = {
   /**
    * The screenshot eligibility for the pass.
    */
   screenshotEligibility?: ScreenshotEligibility;
   /**
    * The NFC constraints for the pass.
    */
   nfcConstraint?: NfcConstraint[]
}

