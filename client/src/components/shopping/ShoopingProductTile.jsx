import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config/index";

const ShoopingProductTile = ({
  product,
  handleGetProductDetails,
  handleAddToCart,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div onClick={() => handleGetProductDetails(product._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-[220px] object-cover rounded-t-lg"
          />
          {product?.totalStock === 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-400 hover:bg-red-600">
              Out of stock
            </Badge>
          ) : product?.totalStock < 10 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-400 hover:bg-red-600">
              sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-2">{product.title}</h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-md text-muted-foreground">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-md text-muted-foreground">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <span
              className={`text-lg font-semibold ${
                product?.salePrice > 0
                  ? "text-muted-foreground line-through"
                  : "text-primary"
              }`}
            >
              Rs.{product?.price.toFixed(2)}
            </span>
            {product?.salePrice > 0 ? (
              <span className="text-lg font-semibold text-primary">
                Rs.{product?.salePrice.toFixed(2)}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center">
        {product?.totalStock === 0 ? (
          <Button className="w-full opacity-60 cursor-not-allowed">
            Out Of Stock
          </Button>
        ) : (
          <Button
            className="w-full hover:scale-105 transition-all duration-500"
            onClick={() => {
              handleAddToCart(product._id, product?.totalStock);
            }}
          >
            Add to Cart
          </Button>
        )}

        {/* <Button onClick={() => handleDelete(product?._id)}>Buy Now</Button> */}
      </CardFooter>
    </Card>
  );
};

export default ShoopingProductTile;
