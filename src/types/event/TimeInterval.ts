import { DateTime } from './DateTime';

export type TimeInterval = {
   /**
    * Start time of the interval.

   Offset is not required. If an offset is provided and end time is set, end must also include an offset.
    */
   start?: DateTime;
   /**
    * End time of the interval.

   Offset is not required. If an offset is provided and start time is set, start must also include an offset.
    */
   end?: DateTime;
};
