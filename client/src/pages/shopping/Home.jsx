import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner-1.webp";
import banner2 from "../../assets/banner-2.webp";
import banner3 from "../../assets/banner-3.webp";
import nike from "../../assets/nike.jpg";
import levis from "../../assets/levis.png";
import { Button } from "@/components/ui/button";
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  ShirtIcon,
  UmbrellaIcon,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { getAllFilteredProduct } from "@/store/shop-slice/products";
import ShoopingProductTile from "@/components/shopping/ShoopingProductTile";
import Footer from "@/components/common/Footer";
import { useNavigate } from "react-router-dom";
import { getFeatureImages } from "@/store/common/commonSlice";

const categorirsWithIcons = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandWithIcon = [
  { id: "nike", label: "Nike", icon: nike },
  { id: "adidas", label: "Adidas", icon: ShirtIcon },
  { id: "puma", label: "Puma", icon: ShirtIcon },
  { id: "levi", label: "Levi's", icon: levis },
  { id: "zara", label: "Zara", icon: ShirtIcon },
  { id: "h&m", label: "H&M", icon: ShirtIcon },
];

const home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList } = useSelector((state) => state.shop);
  const { featureImageList } = useSelector((state) => state.features);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slides = [banner1, banner2, banner3];

  const handleNavigateToListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");

    const currentFilters = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilters));
    navigate(`/shop/listing`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      getAllFilteredProduct({ filterParams: [], sortParams: "price-lowtohigh" })
    );
  }, []);

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full aspect-video sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] overflow-hidden">
        {featureImageList && featureImageList?.length > 0
          ? featureImageList?.map((slide, index) => (
              <img
                src={slide.image}
                key={index}
                className={`${
                  index === currentSlide ? `opacity-100` : "opacity-0"
                } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            ))
          : null}
        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 border border-gray-300 hover:shadow-lg transition-shadow"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 border border-gray-300 hover:shadow-lg transition-shadow"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {categorirsWithIcons.map((category, index) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(category, "category")
                }
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <category.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{category.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {brandWithIcon.map((brand, index) => (
              <Card
                onClick={() => handleNavigateToListingPage(brand, "brand")}
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* <brand.icon className="w-12 h-12 mb-4 text-primary" /> */}
                  {typeof brand.icon === "string" ? (
                    <img
                      src={brand.icon}
                      alt={brand.label}
                      className="w-12 h-12 mb-4"
                    />
                  ) : (
                    <brand.icon className="w-12 h-12 mb-4 text-primary" />
                  )}
                  <span className="font-bold">{brand.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((product) => (
                  <ShoopingProductTile product={product} />
                ))
              : null}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default home;
