import { Uri } from './Uri';

export type AppTarget = {
   /**
    * URI for AppTarget. The description on the URI must be set. Prefer setting package field instead, if this target is defined for your application.
    */
   targetUri?: Uri;
   /**
    * Package name for AppTarget. For example: com.google.android.gm
    */
   packageName?: string;
};
