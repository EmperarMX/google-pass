import { AppTarget } from './AppTarget';

export type AppLinkInfo = {
   /**
    * Target to follow when opening the app link on clients. It will be used by partners to open their app or webpage.
    */
   appTarget?: AppTarget;
};
