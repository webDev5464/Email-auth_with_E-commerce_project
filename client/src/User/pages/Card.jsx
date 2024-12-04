import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillBagCheckFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { addToCart, addToWatchlist } from "../../toolkits/Slices/ProductSlice";
import ColorSelector from "./card-Parts/ColorSelector ";
import PriceAndSize from "./card-Parts/PriceAndSize";
import Counter from "./card-Parts/Counter";
import { useDispatch } from "react-redux";

const Card = ({ product  }) => {

  const dispatch = useDispatch()
  const {
    id,
    images,
    title,
    description,
    price,
    colors,
    discount,
    sizes,
    selectedColor, // color
    selectedSize, //  size
    liked, //  whatchlist
    outOfStock,
    instock,
    qty, // qty
    rating,
  } = product;


  return (
    <li
      className={`w-full bg-white ${
        outOfStock ? "opacity-50 " : ""
      }  shadow-lg  overflow-hidden transition-all duration-300 hover:shadow-xl`}
    >
      <div className="relative overflow-hidden h-44 pt-2">
        <div
          onClick={() => dispatch(addToWatchlist({ id, outOfStock }))}
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
        <p className="text-block tracking-wide  h-12 mb-1 text-wrap    text-[8pt]">
          {description}
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-red-500">
            {discount}% off
          </span>

          <ColorSelector details={{ id, colors, selectedColor, outOfStock }} />
        </div>

        <PriceAndSize details={{ price, sizes, outOfStock, selectedSize, id }}
        />

        <Counter details={{ outOfStock, id, instock, rating , qty}} />

        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center bg-red-600 text-[7pt] py-1 text-white  rounded-sm hover:bg-red-700 focus:outline-none  transition-colors duration-300">
            <BsFillBagCheckFill className="h-3 w-3" />
          </button>
          <button className="flex items-center text-[8pt] justify-center flex-1 bg-orange-500  py-1 text-white  rounded-sm hover:bg-orange-600 focus:outline-none  transition-colors duration-300">
            <FaShoppingCart onClick={() => dispatch(addToCart(id))
            } className="h-3 w-3" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default Card;
