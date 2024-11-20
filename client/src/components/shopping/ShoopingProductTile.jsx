import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";

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
          {product?.salePrice > 0 ? (
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
              className={`${
                product?.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
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
        <Button
          className="w-full hover:scale-105 transition-all duration-500"
          onClick={() => {
            handleAddToCart(product._id);
            // setOpenCreateProductDialog(true);
            // setCurrentEditedId(product?._id);
            // setFormData(product);
          }}
        >
          Add to Cart
        </Button>
        {/* <Button onClick={() => handleDelete(product?._id)}>Buy Now</Button> */}
      </CardFooter>
    </Card>
  );
};

export default ShoopingProductTile;
