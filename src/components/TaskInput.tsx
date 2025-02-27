import { FC, useEffect, useRef, useState } from "react";
import { fromEvent, filter, map } from "rxjs";

interface TaskInputProps {
  onAddTask: (taskName: string) => void;
}

const TaskInput: FC<TaskInputProps> = ({ onAddTask }: TaskInputProps) => {
  const [, setTask] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!inputRef.current) return;

    const subscription = fromEvent<KeyboardEvent>(inputRef.current, "keydown")
      .pipe(
        filter((event) => event.key === "Enter"),
        map((event) => (event.target as HTMLInputElement).value)
      )
      .subscribe((taskName) => {
        onAddTask(taskName);
        setTask("");
        if (inputRef.current) inputRef.current.value = "";
      });

    return () => subscription.unsubscribe();
  }, [onAddTask]);

  return (
    <input
      ref={inputRef}
      placeholder="Enter Task Description"
      className="w-full opacity-90 focus:outline-none bg-gray-300 text-black px-2 py-2"
      type="text"
    />
  );
};

export default TaskInput;
