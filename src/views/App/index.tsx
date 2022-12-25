import React from "react";
import { useToDoStore } from "../../data/stores/useToDoStore";
import InputPlus from "../components/InputPlus";
import InputTask from "../components/inputTask";
import s from "./index.module.scss";

export const App: React.FC = () => {
  const [tasks, createTask, removeTask, updateTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.removeTask,
    state.updateTask,
  ]);

  console.log(tasks);

  const onAdd = (title: string): void => {
    if (title) {
      createTask(title);
    }
  };

  return (
    <article className={s.article}>
      <h1 className={s.articleTitle}>To Do App</h1>
      <section className={s.articleSections}>
        <InputPlus onAdd={onAdd} />
      </section>
      <section className={s.articleSections}>
        {!tasks.length && (
          <p className={s.articleText}>There is no one task.</p>
        )}
        {tasks.map((task) => (
          <InputTask
            id={task.id}
            key={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
          />
        ))}
      </section>
    </article>
  );
};
