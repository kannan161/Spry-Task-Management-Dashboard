import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, deleteTask } from "../store/taskSlice";
import type { RootState } from "../store";
import type { Task } from "../store/types";

export const useTasks = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const add = (task: Task) => dispatch(addTask(task));
  const update = (task: Task) => dispatch(updateTask(task));
  const remove = (id: string) => dispatch(deleteTask(id));

  return { tasks, add, update, remove };
};
