import React, { useState, type FC, ChangeEvent } from "react";
import useTasks from "../hooks/useTasks";
import classes from "./ItemSection.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { turnOff, turnOn } from "../redux/activeDragSlice";
import { ICoords } from "../types";
import { inputOff, inputOn } from "../redux/activeInputSlice";

interface ItemSectionProps {
  text: string;
  taskId: number;
  setTodoList: Function;
  coords: ICoords;
}

const ItemSection: FC<ItemSectionProps> = ({
  taskId = 0,
  text = "",
  setTodoList = () => {},
  coords,
}) => {
  const dispatch = useDispatch();
  const isActiveInput = useSelector(
    (state: any) => state.activeInput.isActiveInput
  );

  const [isVisibleInput, setIsVisibleInput] = useState<boolean>(false);
  const [isTextBlock, setIsTextBlock] = useState<boolean>(true);
  const {
    input,
    setInput,
    addTask,
    updateTask,
    deleteTask,
    changeParentTask,
    changeOrderTask,
  } = useTasks({
    setTodoList,
    taskId,
  });
  const [isVisibleDragBucket, setIsVisibleDragBucket] =
    useState<boolean>(false);

  const handleAddTaskVisibility = (visible: boolean = true) => {
    if (visible && !isActiveInput) {
      dispatch(inputOn());
      return setIsVisibleInput(visible);
    }
    if (!visible && isActiveInput) {
      dispatch(inputOff());
      return setIsVisibleInput(visible);
    }
  };

  const handleTextBlock = (showInput: boolean = true) => {
    if (!isVisibleInput) {
      if (showInput && !isActiveInput) {
        setInput(text);
        setIsTextBlock(false);
        dispatch(inputOn());
      }
      if (!showInput && isActiveInput) {
        setInput("");
        setIsTextBlock(true);
        dispatch(inputOff());
      }
    }
  };

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  const handleAddTask = async () => {
    await addTask();
    setIsVisibleInput(false);
    dispatch(inputOff());
  };

  const handleUpdateTask = async () => {
    await updateTask();
    handleTextBlock(false);
  };

  const handleDrugBucketVisibility = (hover: boolean = true) => {
    setIsVisibleDragBucket(hover);
  };

  const handleDragStart = () => {
    dispatch(turnOn());
  };

  const handleDragEnd = (e: any) => {
    dispatch(turnOff());
    const currentCoordY = e.pageY;
    const currentCoordX = e.pageX;
    if (
      currentCoordY > coords.dragCart.coordTop &&
      currentCoordY < coords.dragCart.coordBottom &&
      currentCoordX > coords.dragCart.coordLeft &&
      currentCoordX < coords.dragCart.coordRight
    ) {
      return changeParentTask(null);
    }

    for (let item of coords.tasks) {
      if (
        currentCoordY > item.coordTop &&
        currentCoordY < item.coordBottom &&
        currentCoordX > item.coordLeft &&
        currentCoordX < item.coordRight
      ) {
        return changeParentTask(item.taskId);
      }
    }
  };

  const handleOrder = (isUp: boolean = true) => {
    changeOrderTask(isUp);
  };

  return (
    <div
      className={classes.taskItem}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={() => handleDrugBucketVisibility()}
      onDragLeave={() => handleDrugBucketVisibility(false)}
    >
      {isTextBlock ? (
        <div className={classes.taskItem__mainSection}>
          <div
            className={`${classes.taskItem__mainSection__dragBucket} ${
              isVisibleDragBucket
                ? classes.taskItem__mainSection__dragBucketVisible
                : undefined
            }`}
          >
            Drag here to append as a child
          </div>
          <div className={classes.taskItem__mainSection__order}>
            <button
              onClick={() => handleOrder()}
              title="Up order"
              disabled={isActiveInput}
            >
              +
            </button>
            <button
              onClick={() => handleOrder(false)}
              title="Down order"
              disabled={isActiveInput}
            >
              -
            </button>
          </div>
          <div
            id={taskId.toString()}
            className={`${classes.taskItem__mainSection__text} ${
              isVisibleDragBucket
                ? classes.taskItem__mainSection__textHidden
                : undefined
            } refClass`}
            onClick={() => handleTextBlock()}
            draggable={!isActiveInput}
          >
            {text}
          </div>
          <div className={classes.taskItem__mainSection__btnsBlock}>
            <button
              disabled={isVisibleInput || isActiveInput}
              onClick={deleteTask}
              title="Delete task"
            >
              -
            </button>
            <button
              disabled={isVisibleInput || isActiveInput}
              onClick={() => handleAddTaskVisibility()}
              title="Add subtask"
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.taskItem__mainSection}>
          <textarea value={input} onChange={handleInput} />
          <div className={classes.taskItem__mainSection__btnsUpdateBlock}>
            <button onClick={() => handleTextBlock(false)}>Cancel</button>
            <button onClick={handleUpdateTask}>Update</button>
          </div>
        </div>
      )}

      {isVisibleInput && (
        <div className={classes.taskItem__addSection}>
          <textarea value={input} onChange={handleInput} />
          <button onClick={() => handleAddTaskVisibility(false)}>Cancel</button>
          <button onClick={handleAddTask}>Send</button>
        </div>
      )}
    </div>
  );
};

export default React.memo(ItemSection);
