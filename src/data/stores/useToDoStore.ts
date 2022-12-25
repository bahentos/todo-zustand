import create, { State, StateCreator } from "zustand";
import { generateId } from "../helpers";
import { devtools, persist } from "zustand/middleware";

const myMiddlewares = <T extends State>(f: StateCreator<T>) =>
  devtools(persist(f));

interface Task {
  id: string;
  title: string;
  createdAt: number;
}

interface ToDoStore {
  tasks: Task[];
  createTask: (title: string) => void;
  updateTask: (id: string, title: string) => void;
  removeTask: (id: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
  return "task" in object;
}

const initialState = JSON.parse(window.localStorage.getItem("tasks") || "[]");

const localStorageUpdate =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
    (set, get, api) =>
      config(
        (nextState, ...args) => {
          if (isToDoStore(nextState)) {
            window.localStorage.setItems(
              "tasks",
              JSON.stringify(nextState.tasks)
            );
          }
          set(nextState, ...args);
        },
        get,
        api
      );

export const useToDoStore = create<ToDoStore>()(
  localStorageUpdate(
    myMiddlewares((set, get) => ({
      tasks: [],
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
          tasks: tasks.map((task: Task) => ({
            ...task,
            title: task.id === id ? title : task.title,
          })),
        });
      },
      removeTask: (id: string) => {
        const { tasks } = get();
        set({
          tasks: tasks.filter((task: Task) => task.id !== id),
        });
      },
    }))
  )
);
