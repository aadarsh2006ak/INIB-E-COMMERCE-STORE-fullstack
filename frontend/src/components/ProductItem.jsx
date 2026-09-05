import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const displayImage = Array.isArray(image) ? image[0] : image;

  return (
    <Link className="text-gray-700 cursor-pointer group" to={`/product/${id}`}>
      <div className="overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
        <img
          className="transition-transform duration-300 ease-in-out group-hover:scale-105 w-full h-56 sm:h-64 object-cover object-top"
          src={displayImage}
          alt={name || "Product"}
          loading="lazy"
        />
      </div>
      <p className="pt-3 pb-1 text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black">
        {name}
      </p>
      <p className="text-sm font-semibold text-gray-900">
        {currency}&nbsp;
        {Number(price || 0).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </Link>
  );
};

export default ProductItem;

