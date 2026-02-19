import { TranslatedString } from './TranslatedString';

export type LocalizedString = {
   /**
    * Contains the translations for the string.
    */
   translatedValues?: TranslatedString[];
   /**
    * Contains the string to be displayed if no appropriate translation is available.
    */
   defaultValue?: TranslatedString;
};
