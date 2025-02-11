import dayjs from "dayjs";
import { FC } from "react";

interface TaskProps {
  taskName: string;
  duedate: string;
}

const TaskName: FC<TaskProps> = ({ taskName, duedate }) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dayjs(duedate).startOf("day").toDate());

  return (
    <div className="flex flex-col grow">
      <span className="leading-[1.5] font-medium pt-2 text-left">
        {taskName}
      </span>
      <span className="text-sm text-gray-600 text-left"> {formattedDate} </span>
    </div>
  );
};

export default TaskName;
