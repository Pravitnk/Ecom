import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HousePlug, Menu, Search, ShoppingCart } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import CustomUser from "../layout/Custom-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserCartWrapper from "./Cart-wrapper";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "@/store/shop-slice/cartSlice";
import { Label } from "../ui/label";
import { shoppingViewHeaderMenuItems } from "@/config/index";
import logo from "../../assets/logo1.png";
import { Input } from "../ui/input";
import {
  resetSearchResults,
  searchProducts,
  setSearchKeyword,
} from "@/store/shop-slice/searchSlice";

const MenuItems = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // Separate the items for "Categories" and others
  const mainMenuItems = shoppingViewHeaderMenuItems.filter(
    (item) => item.id === "home"
    //  || item.id === "search"
  );
  const categoryItems = shoppingViewHeaderMenuItems.filter(
    (item) => !["home", "search"].includes(item.id)
  );

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex gap-6">
      {/* Render Main Menu Items */}
      {mainMenuItems.map((item) => (
        <Label
          onClick={() => handleNavigate(item)}
          className="hidden lg:inline-block text-lg font-medium cursor-pointer relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[3px] before:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500   before:transition-all before:duration-500 hover:before:w-full"
          key={item.id}
          // to={item.path}
        >
          {item.label}
        </Label>
      ))}

      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <div
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <DropdownMenuTrigger asChild>
            <button className="text-lg font-medium">Categories</button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {categoryItems.map((item) => (
                <DropdownMenuItem asChild key={item.id}>
                  <Label
                    onClick={() => handleNavigate(item)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span>{item.label}</span>
                  </Label>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </nav>
  );
};

const HeaderRightContent = () => {
  const { isSignedIn, user } = useUser();
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clerkId = user?.id;
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   dispatch(setSearchKeyword(value)); // Update global state
  //   if (value.trim() !== "") navigate("/shop/search"); // Redirect to Search component
  // };

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(searchProducts(keyword)).then((data) => {
          console.log("data", data);
          if (data?.payload?.success) {
            dispatch(searchParams(keyword));
          }
        });
      }, 800);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);

  // useEffect(() => {
  //   if (keyword && keyword.trim().length > 3) {
  //     const delayDebounce = setTimeout(() => {
  //       setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
  //       dispatch(searchProducts(keyword)).then((data) => {
  //         console.log("data", data);
  //         if (data?.payload?.success) {
  //           dispatch(searchParams(keyword));
  //         }
  //       });
  //     }, 800);

  //     return () => clearTimeout(delayDebounce); // Cleanup debounce timer
  //   }
  // }, [keyword]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setKeyword(value); // Update local state
    dispatch(setSearchKeyword(value)); // Update global state
  };

  useEffect(() => {
    if (!keyword.trim()) {
      setSearchParams(); // Clears the query parameter
      dispatch(resetSearchResults()); // Resets the search results in Redux
    }
  }, [keyword]);

  useEffect(() => {
    dispatch(getCartItems(clerkId));
  }, [dispatch]);

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <div className="w-2/3">
        <Input
          value={keyword}
          name="keyword"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="search product"
          onClick={() => {
            navigate("/shop/search");
            onChange = { handleInputChange }; // Update keyword and navigate
          }}
        />
      </div>
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          varient="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-8px] right-[-8px] text-white rounded-full font-bold w-5 bg-red-500">
            {cartItems?.items?.length || null}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems.items && cartItems.items.length > 0 ? cartItems.items : []
          }
        />
      </Sheet>

      {isSignedIn ? (
        <CustomUser
          size={30}
          className="w-10 h-10 bg-blue-700 text-center font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
        />
      ) : (
        <Button
          onClick={() => navigate("/auth/login")}
          className="text-white bg-blue-700 font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
        >
          SingIn
        </Button>
      )}
    </div>
  );
};

const ShopHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <img className="h-7 w-7" src={logo} alt="logo" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            ADD ONE ART
          </span>
        </Link>
        <div className="lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
        <Sheet>
          {/* <MenuItems /> */}

          <SheetTrigger asChild>
            <Button varient="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-full max-w-xs">
            {/* <MenuItems /> */}
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        {/* <div className="hidden lg:block">
          <MenuItems />
        </div>
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div> */}
      </div>
    </header>
  );
};

export default ShopHeader;
