import { TotpAlgorithm } from "./TotpAlgorithm";
import { TotpParameters } from "./TotpParameters";

export type TotpDetails = {
   /**
    * The time interval used for the TOTP value generation, in milliseconds.
    */
   periodMillis?: string;
   /**
    * The TOTP algorithm used to generate the OTP.
    */
   algorithm?: TotpAlgorithm;
   /**
    * The TOTP parameters for each of the {totp_value_*} substitutions. The TotpParameters at index n is used for the {totp_value_n} substitution.
    */
   parameters?:  TotpParameters[];
}
