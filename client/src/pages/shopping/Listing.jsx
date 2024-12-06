import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config/index";
import { addToCart, getCartItems } from "@/store/shop-slice/cartSlice";
import {
  getAllFilteredProduct,
  getProductDetails,
} from "@/store/shop-slice/products";
import { useUser } from "@clerk/clerk-react";
import { ArrowUpDownIcon } from "lucide-react";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

// Lazy load components
const ProductFilter = lazy(() => import("@/components/shopping/Filter"));
const ProductDetails = lazy(() =>
  import("@/components/shopping/ProductDetails")
);
const ShoopingProductTile = lazy(() =>
  import("@/components/shopping/ShoopingProductTile")
);

const createSearchParamsHelper = (filterParams) => {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramsValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramsValue)}`);
    }
  }

  return queryParams.join("&");
};

const Listing = () => {
  const dispatch = useDispatch();
  const { productList, productDetails } = useSelector((state) => state.shop);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);
  const { user } = useUser();
  const clerkId = user.id;

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOptions) => {
    let copyFilter = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilter = {
        ...copyFilter,
        [getSectionId]: [getCurrentOptions],
      };
    } else {
      const indexOfCurrentOption =
        copyFilter[getSectionId].indexOf(getCurrentOptions);

      if (indexOfCurrentOption === -1)
        copyFilter[getSectionId].push(getCurrentOptions);
      else copyFilter[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilters(copyFilter);
    sessionStorage.setItem("filters", JSON.stringify(copyFilter));
  };

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(getProductDetails(getCurrentProductId));
    // setOpen(true);
  };

  const handleAddToCart = (getCurrentProductId) => {
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
        setOpen(false);
      }
    });
  };

  //storing in session storage to get data on refresh
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  //get filtered products
  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  //fetch list of products
  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        getAllFilteredProduct({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (productDetails !== null) setOpen(true);
  }, [productDetails]);

  console.log("productDetails", productDetails);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <Suspense fallback={<div>Loading Filters...</div>}>
        <ProductFilter filters={filters} handleFilter={handleFilter} />
      </Suspense>
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-bold">All Products</h2>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">
              {productList.length} products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  varient="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Suspense fallback={<div>Loading Products...</div>}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {productList && productList.length > 0
              ? productList.map((productItem, i) => (
                  <ShoopingProductTile
                    key={i}
                    product={productItem}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading Product Details...</div>}>
        <ProductDetails
          open={open}
          setOpen={setOpen}
          productDetails={productDetails}
          handleAddToCart={handleAddToCart}
        />
      </Suspense>
    </div>
  );
};

export default Listing;
