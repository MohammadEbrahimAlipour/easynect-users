// import React from "react";
// import LoadingState from "./LoadingState";

// const ContentHorizontalItems = ({
//   cat,
//   selectedCategory,
//   setSelectedCategory
// }) => {
//   const handleClick = () => {
//     setSelectedCategory(cat.category);
//   };

//   return (
//     <>
//       {selectedCategory ? (
//         <button
//           className={`border-[1px] border-dark rounded-lg  px-2 py-1 text-xs ${
//             selectedCategory === cat.category
//               ? "bg-dark text-white"
//               : "bg-white"
//           }`}
//           onClick={handleClick}
//         >
//           {cat.category}
//         </button>
//       ) : (
//         <LoadingState />
//       )}
//     </>
//   );
// };

// export default ContentHorizontalItems;
import React from "react";

const ContentHorizontalItems = () => {
  return <div>ContentHorizontalItems</div>;
};

export default ContentHorizontalItems;
