import dayjs from "dayjs";
import { FC } from "react";

interface TaskProps {
  taskName: string;
  duedate: string;
}

const Task: FC<TaskProps> = ({ taskName, duedate }) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dayjs(duedate).startOf("day").toDate());

  return (
    <div className="flex flex-col">
      <span className="leading-[1.5] font-medium pt-2">{taskName}</span>
      <span className="text-sm text-gray-600"> {formattedDate} </span>
    </div>
  );
};

export default Task;
