import { FC } from "react";

interface TaskProps {
  taskName: string;
}

const Task: FC<TaskProps> = ({ taskName }) => {
  return <span className="leading-[1.5] pt-2">{taskName}</span>;
};

export default Task;
