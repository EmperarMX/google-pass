import { TimeInterval } from './TimeInterval';

export type ModuleViewConstraints = {
   /**
    * The period of time that the module will be displayed to users. Can define both a startTime and endTime. The module is displayed immediately after insertion unless a startTime is set. The module is displayed indefinitely if endTime is not set.
    */
   displayInterval?: TimeInterval;
};
