import { State } from '../State';
import { DiscoverableProgramMerchantSigninInfo } from './DiscoverableProgramMerchantSigninInfo';
import { DiscoverableProgramMerchantSignupInfo } from './DiscoverableProgramMerchantSignupInfo';

export type DiscoverableProgram = {
   /**
    * Information about the ability to signup and add a valuable for this program through a merchant site. Used when MERCHANT_HOSTED_SIGNUP is enabled.
    */
   merchantSignupInfo?: DiscoverableProgramMerchantSignupInfo;
   /**
    * nformation about the ability to signin and add a valuable for this program through a merchant site. Used when MERCHANT_HOSTED_SIGNIN is enabled.
    */
   merchantSigninInfo?: DiscoverableProgramMerchantSigninInfo;
   /**
    * Visibility state of the discoverable program.
    */
   state?: State;
};
