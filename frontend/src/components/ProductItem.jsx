import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, bestseller }) => {
  const { currency } = useContext(ShopContext);
  const displayImage = Array.isArray(image) ? image[0] : image;

  // Realistic MRP calculation (e.g. 35% higher than selling price)
  const numPrice = Number(price || 0);
  const mrp = Math.round(numPrice * 1.38);
  const discountPercent = Math.round(((mrp - numPrice) / mrp) * 100);

  return (
    <Link
      className="flex flex-col text-gray-700 cursor-pointer group bg-white rounded-xl border border-gray-100 p-2.5 transition-all duration-300 hover:shadow-lg hover:border-gray-200"
      to={`/product/${id}`}
    >
      {/* Image Container with Badges */}
      <div className="relative overflow-hidden rounded-lg bg-gray-50 aspect-square">
        <img
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          src={displayImage}
          alt={name || "Product"}
          loading="lazy"
        />

        {/* Badges on Top */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start pointer-events-none">
          {bestseller && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm uppercase tracking-wide">
              ★ Bestseller
            </span>
          )}
          <span className="bg-emerald-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Rating Floating Snippet */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-[2px] px-1.5 py-0.5 rounded text-[11px] font-medium text-gray-800 flex items-center gap-1 shadow-sm border border-gray-100">
          <span className="text-amber-500 font-bold text-[12px]">★</span>
          <span>4.8</span>
          <span className="text-gray-400 text-[10px]">(120+)</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 pt-2.5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
          AK PREMIUM
        </p>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black transition-colors">
          {name}
        </h3>

        {/* Pricing Row */}
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-base font-bold text-gray-900">
            {currency}&nbsp;
            {numPrice.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
          <span className="text-xs text-gray-400 line-through">
            {currency}&nbsp;{mrp.toLocaleString()}
          </span>
          <span className="text-xs font-semibold text-emerald-600">
            {discountPercent}% off
          </span>
        </div>

        {/* Free Delivery Tag */}
        <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-gray-500">
          <span className="text-emerald-700 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> In Stock
          </span>
          <span className="text-gray-400">Free Delivery</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
