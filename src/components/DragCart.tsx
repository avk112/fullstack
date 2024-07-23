import { useState, type FC, RefObject } from "react";
import classes from "./DragCart.module.scss";
import { useSelector } from "react-redux";

interface DragCartProps {
  myRef: RefObject<HTMLDivElement>;
}

const DragCart: FC<DragCartProps> = ({ myRef }) => {
  const isActiveDrag = useSelector(
    (state: any) => state.activeDrag.isActiveDrag
  );
  const [isHoveredDragBucket, setIsHoveredDragBucket] =
    useState<boolean>(false);

  const handleDrugBucketHover = (hover: boolean = true) => {
    setIsHoveredDragBucket(hover);
  };

  return (
    <div
      ref={myRef}
      className={`${classes.dragCart} ${
        isActiveDrag ? classes.dragCartVisible : undefined
      } ${isHoveredDragBucket ? classes.dragCartHovered : undefined} .refDrag`}
      onDragEnter={() => handleDrugBucketHover()}
      onDragLeave={() => handleDrugBucketHover(false)}
    >
      Drag here to separate task
    </div>
  );
};

export default DragCart;
