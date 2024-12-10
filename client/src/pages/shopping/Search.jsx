import ProductDetails from "@/components/shopping/ProductDetails";
import ShoopingProductTile from "@/components/shopping/ShoopingProductTile";
import { Input } from "@/components/ui/input";
import { addToCart, getCartItems } from "@/store/shop-slice/cartSlice";
import { getProductDetails } from "@/store/shop-slice/products";
import {
  resetSearchResults,
  searchProducts,
} from "@/store/shop-slice/searchSlice";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Search = () => {
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.search);
  const { productDetails } = useSelector((state) => state.shop);
  const { cartItems } = useSelector((state) => state.shopCart);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { user } = useUser();
  const clerkId = user.id;

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    let getAllCartItems = cartItems.items || [];
    if (getAllCartItems.length) {
      const indexOfCurrentItem = getAllCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getAllCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Cannot add more than available stock`);
          setOpen(false);
          return;
        }
      }
    }

    dispatch(
      addToCart({
        clerkId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCartItems(clerkId));
        toast.success("Product successfully added to cart...");
        // setOpen(false);
      }
    });
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(getProductDetails(getCurrentProductId));
    // setOpen(true);
  };

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(searchProducts(keyword)).then((data) =>
          console.log("data", data)
        );
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(e) => setKeyword(e.target.value)}
            className="py-6"
            placeholder="Search products"
          />
        </div>
      </div>
      {!searchResults?.length ? (
        <h1 className="text-4xl font-extrabold">No Results Found!</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item, key) => (
          <ShoopingProductTile
            key={key}
            product={item}
            handleAddToCart={handleAddToCart}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Search;
