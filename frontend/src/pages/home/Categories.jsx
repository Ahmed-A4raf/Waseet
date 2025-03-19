import React from "react";
import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";
import category5 from "../../assets/category-5.jpg";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    { name: "Handicrafts", path: "handicrafts", image: category1 },
    { name: "Food", path: "food", image: category2 },
    { name: "Clothing", path: "clothing", image: category3 },
    { name: "Automobiles", path: "automobiles", image: category4 },
    { name: "Electronics", path: "electronics", image: category5 },
  ];
  return (
    <>
      <div className="product__grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/categories/${category.path}`}
            className="categories__card bg-white dark:bg-zinc-900 p-4 rounded-md hover:scale-105 transition-all duration-300"
          >
            <div className="relative rounded-full mx-auto w-24 h-24">
              <div className="absolute inset-0 border-8 rounded-full border-white dark:border-zinc-800 animate-pulse"></div>
              <img
                src={category.image}
                alt={category.name}
                className="object-cover rounded-full w-24 h-24"
              />
            </div>

            <h4 className="text-center mt-2">{category.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Categories;
