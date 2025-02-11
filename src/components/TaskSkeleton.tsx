import { Skeleton } from "@mui/material";
import { FC } from "react";

interface TaskSkeletonParam {
  count: number;
}

const TaskSkeleton: FC<TaskSkeletonParam> = ({ count = 3 }) => {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          <Skeleton animation="wave" variant="rectangular" height={20} />
          <Skeleton
            className="my-2"
            animation="pulse"
            variant="rectangular"
            height={5}
          />
          <Skeleton
            className="my-2"
            animation="pulse"
            variant="rectangular"
            height={5}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskSkeleton;
