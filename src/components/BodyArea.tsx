import { useState, type FC, useEffect, useRef } from "react";
import classes from "./BodyArea.module.scss";
import ItemSection from "./ItemSection";
import InputArea from "./InputArea";
import DragCart from "./DragCart";
import { ICoords, IDragCart } from "../types";

interface BodyAreaProps {}

const BodyArea: FC<BodyAreaProps> = () => {
  class DragCartItem implements IDragCart {
    coordTop: number;
    coordBottom: number;
    coordLeft: number;
    coordRight: number;
    constructor(coordTop = 0, coordBottom = 0, coordLeft = 0, coordRight = 0) {
      this.coordTop = coordTop;
      this.coordBottom = coordBottom;
      this.coordLeft = coordLeft;
      this.coordRight = coordRight;
    }
  }

  const [todoList, setTodoList] = useState<any>([]);
  const [coords, setCoords] = useState<ICoords>({
    dragCart: new DragCartItem(),
    tasks: [],
  });
  const myRef = useRef<HTMLDivElement>(null);

  const getTodoBlock = (items: any[]) => {
    return items.map((unit: any, index: number) => {
      return (
        <li key={unit.id} className={classes.bodyArea__mainList__item}>
          <div className={classes.bodyArea__mainList__item__section}>
            <ItemSection
              taskId={unit.id}
              text={unit.text}
              setTodoList={setTodoList}
              coords={coords}
            />

            {unit.children && unit.children.length > 0 && (
              <ul
                className={classes.bodyArea__mainList__item__section__subList}
              >
                {getTodoBlock(unit.children)}
              </ul>
            )}
          </div>
        </li>
      );
    });
  };

  useEffect(() => {
    const dragCartCoords = new DragCartItem();
    if (myRef.current) {
      const dragCartRect = myRef.current.getBoundingClientRect();
      dragCartCoords.coordTop = dragCartRect.top;
      dragCartCoords.coordBottom = dragCartRect.top + dragCartRect.height;
      dragCartCoords.coordLeft = dragCartRect.left;
      dragCartCoords.coordRight = dragCartRect.left + dragCartRect.width;
    }

    const refElements = document.getElementsByClassName("refClass");
    const refArray = Array.from(refElements);
    const newCoords = refArray.map((item) => {
      const taskId = +item.id;
      const rect = item.getBoundingClientRect();
      return {
        taskId: taskId,
        coordTop: rect.top,
        coordBottom: rect.top + rect.height,
        coordLeft: rect.left,
        coordRight: rect.left + rect.width,
      };
    });
    setCoords({ dragCart: dragCartCoords, tasks: newCoords });
  }, [todoList]);

  return (
    <div className={classes.bodyArea}>
      <InputArea setTodoList={setTodoList} />
      <DragCart myRef={myRef} />
      <ul className={classes.bodyArea__mainList}>{getTodoBlock(todoList)}</ul>
    </div>
  );
};

export default BodyArea;
