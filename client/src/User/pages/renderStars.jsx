import React from "react";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";

const renderStars = (rating) => {


  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - Math.ceil(rating);
  const stars = [];

  
  for (let i = 0; i < fullStars; i++) {
    stars.push(<IoIosStar key={i} className="h-3 w-3 text-yellow-500" />);
  }
  if (halfStar) {
    stars.push(
      <IoIosStarHalf key={fullStars} className="h-3 w-3 text-yellow-500 " />
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <IoIosStarOutline
        key={fullStars + i + 1}
        className="h-3 w-3 text-yellow-600"
      />
    );
  }
  return stars;
};

export default renderStars;
