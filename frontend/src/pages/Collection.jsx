import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (sortType === "low-high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(productsCopy);
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row sm:gap-10">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 my-2 text-xl cursor-pointer"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown"
          />
        </p>
        {/* Category Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label htmlFor="cat-men" className="flex gap-2 cursor-pointer items-center">
              <input
                id="cat-men"
                name="category_men"
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
                checked={category.includes("Men")}
              />
              Men
            </label>
            <label htmlFor="cat-women" className="flex gap-2 cursor-pointer items-center">
              <input
                id="cat-women"
                name="category_women"
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
                checked={category.includes("Women")}
              />
              Women
            </label>
            <label htmlFor="cat-kids" className="flex gap-2 cursor-pointer items-center">
              <input
                id="cat-kids"
                name="category_kids"
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
                checked={category.includes("Kids")}
              />
              Kids
            </label>
          </div>
        </div>
        {/* Sub Category Filters */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <label htmlFor="type-topwear" className="flex gap-2 cursor-pointer items-center">
              <input
                id="type-topwear"
                name="type_topwear"
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
                checked={subCategory.includes("Topwear")}
              />
              Topwear
            </label>
            <label htmlFor="type-bottomwear" className="flex gap-2 cursor-pointer items-center">
              <input
                id="type-bottomwear"
                name="type_bottomwear"
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
                checked={subCategory.includes("Bottomwear")}
              />
              Bottomwear
            </label>
            <label htmlFor="type-winterwear" className="flex gap-2 cursor-pointer items-center">
              <input
                id="type-winterwear"
                name="type_winterwear"
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
                checked={subCategory.includes("Winterwear")}
              />
              Winterwear
            </label>
          </div>
        </div>
        {/* Clear Filters Button */}
        <button
          className={`px-4 py-2 mt-1 text-white bg-black rounded hover:bg-gray-900 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      {/* View Product Items */}
      <div className="flex-1">
        <div className="flex justify-between mb-4 text-base sm:text-2xl">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            id="sort-select"
            name="sort_type"
            aria-label="Sort products"
            onChange={(e) => setSortType(e.target.value)}
            className="px-2 text-sm border-2 border-gray-300 rounded"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
