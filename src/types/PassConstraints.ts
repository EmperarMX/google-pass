import { NfcConstraint } from "./event/NfcConstraint";
import { ScreenshotEligibility } from "./event/ScreenshotEligibility";

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

