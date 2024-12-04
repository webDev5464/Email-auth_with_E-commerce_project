import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Watchlist = () => {
  const { watchlist } = useSelector((state) => state.productStore);

  return (
    <section className="my-4 select-none w-full bg-white h-full">
      {watchlist && watchlist.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1">
          {watchlist.map((product) => (
            <li key={product.id}>
              <Card product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center min-h-screen text-center">
        <p className="text-lg font-medium text-gray-500">No products found</p>
      </div>
      )}
    </section>
  );
};

export default Watchlist;
