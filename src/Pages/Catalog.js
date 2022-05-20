import React, { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "../Components/Helmet";
import productData from "../assets/fake-data/products";
import category from "../assets/fake-data/category";
import CheckBox from "../Components/CheckBox";
import colors from "../assets/fake-data/product-colors";
import size from "../assets/fake-data/product-size";
import Button from "../Components/Button";
import InfinityList from "../Components/InfinityList";
import { useLocation } from "react-router-dom";

export const Catalog = () => {
  let initFilter;

  const [filter, setFilter] = useState(
    (initFilter = {
      category: [],
      color: [],
      size: [],
    })
  );

  const productList = productData.getAllProducts();

  const [products, setProducts] = useState(productList);

  const filterSelect = (type, checked, item) => {
    if (checked) {
      switch (type) {
        case "CATEGORY":
          setFilter({
            ...filter,
            category: [...filter.category, item.categorySlug],
          });
          break;
        case "COLOR":
          setFilter({
            ...filter,
            color: [...filter.color, item.color],
          });
          break;
        case "SIZE":
          setFilter({
            ...filter,
            size: [...filter.size, item.size],
          });
          break;
        default:
      }
    } else {
      switch (type) {
        case "CATEGORY":
          const newCategory = filter.category.filter(
            (e) => e !== item.categorySlug
          );
          setFilter({ ...filter, category: newCategory });
          break;
        case "COLOR":
          const newColor = filter.color.filter((e) => e !== item.color);
          setFilter({ ...filter, color: newColor });
          break;
        case "SIZE":
          const newSize = filter.size.filter((e) => e !== item.size);
          setFilter({ ...filter, size: newSize });
          break;
        default:
      }
    }
  };

  const clearFilter = () => setFilter(initFilter);

  const updateProducts = useCallback(() => {
    let temp = productList;
    if (filter.category.length > 0) {
      temp = temp.filter((e) => filter.category.includes(e.categorySlug));
    }
    if (filter.color.length > 0) {
      temp = temp.filter((e) => {
        const check = e.colors.find((color) => filter.color.includes(color));
        return check !== undefined;
      });
    }
    if (filter.size.length > 0) {
      temp = temp.filter((e) => {
        const check = e.size.find((size) => filter.size.includes(size));
        return check !== undefined;
      });
    }
    setProducts(temp);
  }, [filter, setProducts]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  const [showFilter, setShowFilter] = useState(false);

  //load page with opacity
  const location = useLocation();
  const catalogRef = useRef(null);

  // useEffect(() => {
  //   if (location.pathname === "/catalog") {
  //     catalogRef.current.classList.add("visible");
  //   }
  // }, []);

  return (
    <div>
      <Helmet title="Catalog">
        <div
          className={`catalog ${
            location.pathname === "/catalog" ? "visible" : ""
          }`}
          ref={catalogRef}
        >
          <div className={`catalog__filter ${showFilter ? "active" : ""}`}>
            <div
              className="catalog__filter__close"
              onClick={() => setShowFilter(false)}
            >
              <i className="fa-solid fa-arrow-left"></i>{" "}
            </div>
            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">
                Product catalog
              </div>
              <div className="catalog__filter__widget__content">
                {category.map((item, index) => (
                  <div
                    className="catalog__filter__widget__content__item"
                    key={index}
                  >
                    <CheckBox
                      label={item.display}
                      onChange={(input) =>
                        filterSelect("CATEGORY", input.checked, item)
                      }
                      checked={filter.category.includes(item.categorySlug)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">Colors</div>
              <div className="catalog__filter__widget__content">
                {colors.map((item, index) => (
                  <div
                    className="catalog__filter__widget__content__item"
                    key={index}
                  >
                    <CheckBox
                      label={item.display}
                      onChange={(input) =>
                        filterSelect("COLOR", input.checked, item)
                      }
                      checked={filter.color.includes(item.color)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__title">Sizes</div>
              <div className="catalog__filter__widget__content">
                {size.map((item, index) => (
                  <div
                    className="catalog__filter__widget__content__item"
                    key={index}
                  >
                    <CheckBox
                      label={item.display}
                      onChange={(input) =>
                        filterSelect("SIZE", input.checked, item)
                      }
                      checked={filter.size.includes(item.size)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="catalog__filter__widget">
              <div className="catalog__filter__widget__content">
                <Button size="md" onClick={clearFilter}>
                  Clear filter
                </Button>
              </div>
            </div>
          </div>
          <div className="catalog__filter__toggle">
            <Button size="sm" onClick={() => setShowFilter(true)}>
              Filter
            </Button>
          </div>
          <div className="catalog__content">
            <InfinityList data={products} />
          </div>
        </div>
      </Helmet>
    </div>
  );
};
