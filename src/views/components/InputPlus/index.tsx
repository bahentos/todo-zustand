import React, { useCallback, useState } from "react";
import s from "./index.module.scss";

interface ImputPlusProps {
  onAdd: (title: string) => void;
}

const InputPlus: React.FC<ImputPlusProps> = ({ onAdd }) => {
  const [value, setValue] = useState("");

  const addTask = useCallback((): void => {
    onAdd(value);
    setValue("");
  }, [value]);

  return (
    <div className={s.inputPlus}>
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        placeholder="Type here..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            {
              addTask();
            }
          }
        }}
        className={s.inputPlusValue}
      />
      <button
        onClick={(): void => addTask()}
        className={s.inputPlusButton}
        aria-label="Add"
      />{" "}
    </div>
  );
};

export default InputPlus;
