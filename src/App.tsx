import { useEffect, useRef, useState } from 'react'
import './App.css'
import { addTask, deleteTask, getTasks, toggleTaskCompletion } from './taskService';
import { filter, fromEvent, map } from 'rxjs';

export type Task = {
  id: number;
  task_name: string;
  status: boolean;
  due_date: string; // ISO string format for timestamps
};


function App() {

  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);


  // Load all the tasks when component mounts
  useEffect(() => {

    fetchTasks();

  }, []);


  useEffect(() => {
    if (!inputRef.current) return;

    const subscription = fromEvent(inputRef.current, 'keydown').pipe(
      filter((event: any) => event.key === 'Enter'), // Only process Enter key  
      map((event: any) => event.target.value)
    ).subscribe(async (taskName) => {
      await handleAddTask(taskName);
      fetchTasks(); // Refresh tasks after adding
      setTask(taskName);
      if (inputRef.current) inputRef.current.value = '';
    });

    return () => subscription.unsubscribe(); // Cleanup subscription on unmount
  }, [task]);

  async function fetchTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error: any) {
      console.log('Error fetching tasks:', error.message);
    }
  }

  async function handleAddTask(taskName: string) {
    if(!taskName.trim()) return;

    try {
      await addTask(taskName);      
    } catch (error: any) {
      console.error('Error adding task:', error.message);
    }

  }

  async function handleDeleteTask(id: number) {
    try {
      await deleteTask(id);
      fetchTasks(); // Refresh tasks after deletion
    } catch (error: any) {
      console.error('Error deleting task:', error.message);
    }
  }

  async function handleToggleCompletion(id: number, completed: boolean) {
    try {
      await toggleTaskCompletion(id, !completed);
      fetchTasks(); // Refresh tasks after updating
    } catch (error: any) {
      console.error('Error updating task:', error.message);
    }
  }



  return (
    <>
      <input 
        ref={inputRef}
        placeholder='Enter Task Description'
        className='w-full opacity-90 focus:outline-none bg-gray-300  text-black px-2 py-2' 
        type='text'         
      />

      <hr />


      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task.id} className="text-gray-300 text-left p-2 mt-2 rounded">
            {task.task_name}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
