import React from "react";
import CategoriesCard from "../Components/Card/CategoriesCard";
import Title from "../Components/Title/Title";
import "../Scss/Main.scss";
import { AdminCategoryContext } from "../context/AdminCategory";

function Category() {
  const { adminCategory } = React.useContext(AdminCategoryContext);
  console.log(adminCategory);
  return (
    <div className="overall__wrapper">
      <div className="container">
        <Title title="CATEGORY" />
        <div className="category__wrapper">
          {adminCategory?.map((item) => (
            <div className="category__content__wrapper">
              <CategoriesCard
                title={item?.title}
                iconClass={item?.iconClass}
                url={item?.url}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
