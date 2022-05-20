import React, { useEffect } from "react";
import { Helmet } from "../Components/Helmet";
import { products } from "../assets/fake-data/products";
import { Section, SectionBody, SectionTitle } from "../Components/Section";
import Grid from "../Components/Grid";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { ProductView } from "../Components/ProductView";
SwiperCore.use([Autoplay]);

export const Product = () => {
  //Make useParams with slug
  const slugPro = useParams();
  const proPage = products.filter((e) => e.slug === slugPro.slug);

  const product = proPage[0];

  //Related products
  const relatedProducts = products.filter(
    (e) => e.categorySlug === product.categorySlug
  );

  //Scroll to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [product]);

  return (
    <div style={{ marginTop: "100px" }}>
      <Helmet title={product.title}>
        <Section>
          <SectionBody>
            <ProductView product={product} />
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>Related Products</SectionTitle>
          <SectionBody>
            <Swiper
              breakpoints={{
                // when window width is >= 640px
                320: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                991: {
                  slidesPerView: 4,
                },
                // when window width is >= 768px
                1200: {
                  slidesPerView: 5,
                },
              }}
              spaceBetween={40}
              slidesPerView={5}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              effect="creative"
            >
              {relatedProducts.map((item, index) => (
                <SwiperSlide key={index}>
                  <ProductCard
                    img01={item.image01}
                    img02={item.image02}
                    name={item.title}
                    price={item.price}
                    slug={item.slug}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </SectionBody>
        </Section>
      </Helmet>
    </div>
  );
};
