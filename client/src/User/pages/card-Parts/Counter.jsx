import React from "react";
import { MdExposurePlus1 } from "react-icons/md";
import { TbExposureMinus1 } from "react-icons/tb";
import RenderStars from "./RetingStars";
import { decreaseQty, increaseQty } from "../../../toolkits/Slices/ProductSlice";
import { useDispatch } from "react-redux";

const Counter = ({ details }) => {
  const dispatch = useDispatch();

  const { outOfStock, id, qty, instock, rating } = details;


  return (
    <div className="flex justify-between pb-1 items-center">
      <div className="flex items-center w-[50%] justify-around">
        <span
          onClick={() => dispatch(decreaseQty({ id, outOfStock }))}
          className="  rounded-sm text-red-600 px-2 py-1 hover:scale-125 transition duration-200"
        >
          <TbExposureMinus1 className=" text-sm" />
        </span>
        <span className="text-base text-center font-semibold">{qty}</span>
        <button
          onClick={() => dispatch(increaseQty({ id, instock, outOfStock }))}
          className="   rounded-sm text-green-600 hover:scale-125 px-2 py-1 transition duration-200"
        >
          <MdExposurePlus1 className=" text-sm" />
        </button>
      </div>
      <div className="flex items-center justify-center space-x-1">
        <RenderStars rating={rating} />
      </div>
    </div>
  );
};

export default Counter;
