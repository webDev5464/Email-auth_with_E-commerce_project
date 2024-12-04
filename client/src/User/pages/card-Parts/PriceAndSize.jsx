import React from "react";
import { onSelectedSize } from "../../../toolkits/Slices/ProductSlice";
import { useDispatch } from "react-redux";
import PriceFormatter from "./ProceFormater";

const PriceAndSize = ({ details }) => {
  const dispatch = useDispatch();

  const { price, sizes, outOfStock, selectedSize, id } = details;

  return (
    <div className="mb-1 flex justify-between items-center">
      <p
        className="block text-black  text-sm  font-semibold mb-1"
        htmlFor="size"
      >
       {PriceFormatter(price)}
      </p>
      <div className="flex space-x-1 ">
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-1 py-0 text-[8pt] border rounded-sm    ${
              !outOfStock && size === selectedSize
                ? "bg-orange-600 focus:ring-black  focus:outline-none focus:ring-1  text-white"
                : "bg-orange-300 text-black"
            }`}
            onClick={() => {
              dispatch(onSelectedSize({ id, size, outOfStock }));
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceAndSize;
