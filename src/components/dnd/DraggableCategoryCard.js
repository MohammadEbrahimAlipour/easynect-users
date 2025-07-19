import React from "react";
import { useDrag, useDrop } from "react-dnd";
import CategoryCard from "../card/catit/Category";

const ItemType = "CATEGORY_CARD";

export default function DraggableCategoryCard({
  item,
  index,
  moveCard,
  onEdit,
  onClose,
  onClick
}) {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveCard(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div  ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <CategoryCard
        id={item.id}
        title={item.title}
        onEdit={() => onEdit(item.id)}
        onClose={() => onClose(item.id)}
        image={item.icon || item.banner}
        onClick={onClick}
      />
    </div>
  );
}
