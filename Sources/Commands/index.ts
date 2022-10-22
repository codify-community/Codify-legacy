import DontAskForAsk from "./Context/DontAskForAsk";
import Status from "./Slash/Information/Status";
import HelloCommand from "./Slash/Information/Hello";
import ChangelogCommand from "./Slash/Moderation/Changelog";
import Google from "./Slash/Utils/Google";

export default [
  new HelloCommand(),
  new ChangelogCommand(),
  new DontAskForAsk(),
  new Status(),
  new Google(),
];
