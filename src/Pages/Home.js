import React from "react";
import { Helmet } from "../Components/Helmet";
import { HeroSlider } from "../Components/HeroSlider";
import heroSliderData from "../assets/fake-data/hero-slider";
import { Section, SectionBody, SectionTitle } from "../Components/Section";
import policy from "../assets/fake-data/policy";
import PolicyCard from "../Components/PolicyCard";
import Grid from "../Components/Grid";
import { Link } from "react-router-dom";
import productData from "../assets/fake-data/products";
import ProductCard from "../Components/ProductCard";
import banner from "../assets/images/banner.png";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
SwiperCore.use([Autoplay]);

export const Home = () => {
  return (
    <div>
      <Helmet title="Home">
        {/* hero slider */}
        <HeroSlider
          data={heroSliderData}
          control={true}
          auto={true}
          timeOut={5000}
        />
        {/* end hero slider */}

        {/* policy section */}
        <Section>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {policy.map((item, index) => (
                <Link key={index} to="/policy">
                  <PolicyCard
                    name={item.name}
                    description={item.description}
                    icon={item.icon}
                  />
                </Link>
              ))}
            </Grid>
          </SectionBody>
        </Section>
        {/*  policy section */}

        {/* best seller section */}
        <Section>
          <SectionTitle>Top selling products of the week</SectionTitle>
          <SectionBody>
            <Grid col={5} mdCol={2} smCol={1} gap={25}>
              {productData.getProducts(5).map((item, index) => (
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
          </SectionBody>
        </Section>
        {/* end best seller section */}

        {/* new arrival section */}
        <Section>
          <SectionTitle>new arrivals</SectionTitle>
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
              spaceBetween={50}
              slidesPerView={5}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
          
            >
              {productData.getProducts(8).map((item, index) => (
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
        {/* end new arrival section */}

        {/* banner */}
        <Section>
          <SectionBody>
            <Link to="/catalog">
              <img src={banner} alt="" />
            </Link>
          </SectionBody>
        </Section>
        {/* end banner */}

        {/* popular product section */}
        <Section>
          <SectionTitle>Popular products</SectionTitle>
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
              spaceBetween={50}
              slidesPerView={5}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {productData.getProducts(8).map((item, index) => (
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
        {/* end  popular product section */}
      </Helmet>
    </div>
  );
};
