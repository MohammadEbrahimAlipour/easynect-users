import React from "react";
import { useDrag, useDrop } from "react-dnd";
import CategoryCard from "../card/catit/Category";

export default function DraggableCategoryCard({
  item,
  index,
  moveCard,
  onEdit,
  onClose,
  onClick,
  onToggleHighlight, // اضافه شد
  disabled, showHighlight
}) {
  const ref = React.useRef(null);
  const [, drop] = useDrop({
    accept: "CATEGORY_CARD",
    hover(draggedItem) {
      if (draggedItem.index === index) return;
      moveCard(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "CATEGORY_CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <CategoryCard
        id={item.id}
        title={item.title}
        image={item.icon || item.banner}
        isHighlight={item.is_highlighted} // ✅
        onEdit={() => onEdit(item.id)}
        onClose={() => onClose(item.id)}
        onToggleHighlight={() => onToggleHighlight(item.id)} // ✅
        onClick={onClick}
        disabled={disabled}
        showHighlight={showHighlight}
      />
    </div>
  );
}
