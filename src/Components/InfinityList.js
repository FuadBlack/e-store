import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Grid from "./Grid";
import ProductCard from "./ProductCard";
import Button from "./Button";

const InfinityList = (props) => {
  //Load more products
  const [noElement, setNoElement] = useState(6);

  const slice = props.data.slice(0, noElement);

  const loadMore = () => setNoElement(noElement + noElement);

  //Scroll load
  // const listRef = useRef(null);
  // let perLoad = 3;

  // const [data, setData] = useState(props.data.slice(0, perLoad));

  // const [load, setLoad] = useState(true);

  // const [index, setIndex] = useState(0);

  // useEffect(() => {
  //   setData(props.data.slice(0, perLoad));
  //   setIndex(1);
  // }, [props.data]);

  // window.addEventListener("scroll", () => {
  //   if (listRef && listRef.current) {
  //     if (
  //       window.scrollY + window.innerHeight >=
  //       listRef.current.clientHeight + listRef.current.offsetTop + 200
  //     ) {
  //       setLoad(true);
  //     }
  //   }
  // });

  // useEffect(() => {
  //   const getItems = () => {
  //     const pages = Math.floor(props.data.length / perLoad);
  //     const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

  //     if (load && index <= maxIndex) {
  //       const start = perLoad * index;
  //       const end = start + perLoad;

  //       setData(data.concat(props.data.slice(start, end)));
  //       setIndex(index + 1);
  //     }
  //   };
  //   setLoad(false);
  //   getItems();
  // }, [load, index, data, props.data]);

  return (
    <div className="infinityList">
      <Grid col={3} mdCol={2} smCol={1} gap={20}>
        {slice.map((item, index) => (
          <ProductCard
            key={index}
            img01={item.image01}
            img02={item.image02}
            name={item.title}
            price={item.price}
            slug={item.slug}
          />
        ))}
      </Grid>
      <div
        className={`infinityList__button ${
          noElement >= props.data.length ? "active" : ""
        }`}
      >
        <Button size="md" onClick={loadMore}>
          See more
        </Button>
      </div>
    </div>
  );
};

InfinityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default InfinityList;
