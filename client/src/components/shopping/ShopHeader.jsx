import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
// import { shoppingViewHeaderMenuItems } from "@/config";
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

// const MenuItems = () => {
//   return (
//     <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
//       {shoppingViewHeaderMenuItems.map((item) => (
//         <Link className="text-sm font-medium" key={item.id} to={item.path}>
//           {item.label}
//         </Link>
//       ))}
//     </nav>
//   );
// };

const MenuItems = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // Separate the items for "Categories" and others
  const mainMenuItems = shoppingViewHeaderMenuItems.filter(
    (item) => item.id === "home" || item.id === "search"
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
          className="text-lg font-medium cursor-pointer relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[3px] before:bg-gradient-to-r from-purple-500 via-pink-500 to-red-500   before:transition-all before:duration-500 hover:before:w-full"
          key={item.id}
          // to={item.path}
        >
          {item.label}
        </Label>
      ))}

      {/* Dropdown Menu for Categories */}
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger
          asChild
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="text-lg font-medium">Categories</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {/* <DropdownMenuLabel>Categories</DropdownMenuLabel> */}
          <DropdownMenuSeparator />

          {/* Render Category Items */}
          <DropdownMenuGroup>
            {categoryItems.map((item) => (
              <DropdownMenuItem asChild key={item.id}>
                <Label
                  onClick={() => handleNavigate(item)} // Call handleNavigate
                  //  to={item.path}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span>{item.label}</span>
                </Label>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

const HeaderRightContent = () => {
  const { isSignedIn, user } = useUser();
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const dispatch = useDispatch();
  const clerkId = user?.id;

  useEffect(() => {
    dispatch(getCartItems(clerkId));
  }, [dispatch]);

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          varient="outline"
          size="icon"
        >
          <ShoppingCart className="w-6 h-6" />
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
          <HousePlug className="h-6 w-6" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Ecommernce
          </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button varient="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        {/* {isSignedIn ? ( */}
        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
        {/* // ) : null} */}
      </div>
    </header>
  );
};

export default ShopHeader;
