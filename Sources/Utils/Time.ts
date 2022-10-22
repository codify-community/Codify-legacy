import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duraction from "dayjs/plugin/duration";

dayjs.extend(duraction);
dayjs.extend(relativeTime);

export default dayjs;
