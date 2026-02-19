import { Image } from './Image';
import { LocalizedString } from './LocalizedString';
import { ModuleViewConstraints } from './ModuleViewConstraints';

export type ValueAddedModuleData = {
   /**
    * Header to be displayed on the module. Character limit is 60 and longer strings will be truncated.
    */
   header?: LocalizedString;
   /**
    * Body to be displayed on the module. Character limit is 50 and longer strings will be truncated.
    */
   body?: LocalizedString;
   /**
    * Image to be displayed on the module. Recommended image ratio is 1:1. Images will be resized to fit this ratio.
    */
   image?: Image;
   /**
    * URI that the module leads to on click. This can be a web link or a deep link as mentioned in https://developer.android.com/training/app-links/deep-linking.
    */
   uri: string;
   /**
    * Constraints that all must be met for the module to be shown.
    */
   viewConstraints?: ModuleViewConstraints;
   /**
    * The index for sorting the modules. Modules with a lower sort index are shown before modules with a higher sort index. If unspecified, the sort index is assumed to be INT_MAX. For two modules with the same index, the sorting behavior is undefined.
    */
   sortIndex?: number;
};
