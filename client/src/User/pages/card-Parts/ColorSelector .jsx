import { useDispatch } from "react-redux";
import { onSelectColor } from "../../../toolkits/Slices/ProductSlice";

const ColorSelector = ({ details }) => {

  const dispatch = useDispatch()
  const { id, colors, selectedColor , outOfStock } = details;

  return (
    <div className="flex space-x-2">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-3 h-3 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 ${
           !outOfStock && color === selectedColor  ? "ring-2  border duration-300 border-black ring-black ring-offset-2 scale-105 " : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => dispatch(onSelectColor({id, color, outOfStock}))}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
