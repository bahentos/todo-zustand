import create from "zustand";
import { generateId } from "../helpers";

interface Tasks {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Tasks[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
  tasks: [
    {
      id: "asdfasdf1234lkjdsfasdf",
      title: "Дефолтная задача",
      createdAt: 1234123412,
    },
    {
      id: "assdf1234lkjd23423sfasdf",
      title: "Дефолтная задача №2",
      createdAt: 1234145678,
    },
  ],
  createTask: (title: string) => {
    const { tasks } = get();
    const newTask = {
      id: generateId(),
      title,
      createdAt: Date.now(),
    };
    set({
      tasks: [newTask, ...tasks],
    });
  },
  updateTask: (id: string, title: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? title : task.title,
      })),
    });
  },
  removeTask: (id: string) => {
    const { tasks } = get();
    set({
      tasks: tasks.filter((task) => task.id !== id),
    });
  },
}));
