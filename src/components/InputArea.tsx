import { useEffect, type ChangeEvent, type FC } from "react";
import classes from "./BodyArea.module.scss";
import useTasks from "../hooks/useTasks";

interface InputAreaProps {
  setTodoList: Function;
}

const InputArea: FC<InputAreaProps> = ({ setTodoList = () => {} }) => {
  const { input, setInput, addTask, getAllTodos } = useTasks({
    setTodoList,
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  return (
    <div className={classes.bodyArea__top}>
      <input type="text" value={input} maxLength={140} onChange={handleInput} />
      <button onClick={addTask}>Add task</button>
    </div>
  );
};

export default InputArea;
