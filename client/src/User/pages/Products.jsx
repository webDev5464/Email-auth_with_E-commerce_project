import React, { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { MdExposurePlus1 } from "react-icons/md";
import { TbExposureMinus1 } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import {
  AddToWatchlist,
  DecreseQty,
  IncreseQty,
  SelectedColor,
  SelectedSize,
} from "../../toolkits/Slices/ProductSlice";
import { GetProducts } from "../../toolkits/Thunks/ProductThunk";
import renderStars from "./renderStars";

const Products = () => {
  const { products } = useSelector((state) => state.productStore);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProducts());
  }, []);

  return (
    <section className="my-4 select-none w-full bg-white h-full">
      {products && products.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1 ">
          {products.map((product) => {
            const {
              id,
              images,
              title,
              description,
              price,
              colors,
              discount,
              sizes,
              setColor, // color
              selectedSize, //  size
              liked, //  whatchlist
              outOfStock,
              instock,
              newqty, // qty
              rating,
            } = product;

            return (
              <li
                key={id}
                className={`w-full bg-white ${
                  outOfStock ? "opacity-50 " : ""
                }  shadow-lg  overflow-hidden transition-all duration-300 hover:shadow-xl`}
              >
                <div className="relative overflow-hidden h-44 pt-2">
                  <div
                    onClick={() => dispatch(AddToWatchlist({ id , outOfStock}))}
                    className={`absolute right-2 cursor-pointer top-3 z-10  ${
                      liked ? "text-red-500" : "text-red-300"
                    }`}
                  >
                    <FaHeart className={`h-5 w-5 `} />
                  </div>

                  {outOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center text-xs bg-white bg-opacity-50 text-red-500 z-10">
                      Out of Stock
                    </div>
                  )}
                  <img
                    src={images[0]}
                    // src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                    alt={`${title} image`}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-2">
                  <h2 className="text-sm font-bold select-text text-black">{title}</h2>
                  <p className="text-gray-700  h-12 mb-1 text-justify text-[8pt]">
                    {description}
                  </p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-red-500">
                      {discount}% off
                    </span>
                    <div className="flex space-x-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          className={`w-3 h-3 rounded-full focus:outline-none focus:ring-1 focus:ring-offset-2 ${
                         !outOfStock &&   color == setColor
                              ? "ring-2  border border-black ring-offset-2 scale-105 ring-black"
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            dispatch(
                              SelectedColor({ id, color, outOfStock })
                            )
                          }
                          aria-label={`Select ${color} color`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="mb-1 flex justify-between items-center">
                    <p
                      className="block text-black  text-sm  font-semibold mb-1"
                      htmlFor="size"
                    >
                      {price}
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
                            dispatch(SelectedSize({ id, size, outOfStock }));
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pb-1 items-center">
                    <div className="flex items-center w-[50%] justify-around">
                      <span
                        onClick={() => dispatch(DecreseQty({ id ,outOfStock}))}
                        className="  rounded-sm text-red-600 px-2 py-1 hover:scale-125 transition duration-200"
                      >
                        <TbExposureMinus1 className=" text-sm" />
                      </span>
                      <span className="text-base text-center font-semibold">
                        {newqty}
                      </span>
                      <button
                        onClick={() => dispatch(IncreseQty({ id, instock , outOfStock}))}
                        className="   rounded-sm text-green-600 hover:scale-125 px-2 py-1 transition duration-200"
                      >
                        <MdExposurePlus1 className=" text-sm" />
                      </button>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      {renderStars(rating)}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 flex items-center justify-center bg-red-600 text-[7pt] py-1 text-white  rounded-sm hover:bg-red-700 focus:outline-none  transition-colors duration-300">
                      <BsFillBagCheckFill className="h-3 w-3" />
                    </button>
                    <button className="flex items-center text-[8pt] justify-center flex-1 bg-orange-500  py-1 text-white  rounded-sm hover:bg-orange-600 focus:outline-none  transition-colors duration-300">
                      <FaShoppingCart className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No products found</div>
      )}
    </section>
  );
};

export default Products;
