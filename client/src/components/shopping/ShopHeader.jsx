import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "../ui/button";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import CustomUser from "../layout/Custom-user";

const MenuItems = () => {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((item) => (
        <Link className="text-sm font-medium" key={item.id} to={item.path}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const { isSignedIn, user } = useUser();

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <Button varient="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User cart</span>
      </Button>
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            Logged in as <span className="text-blue-600">{user.username}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <UserCog className="w-4 h-4 mr-4" />
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
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
  const { isSignedIn, user } = useUser();
  console.log(`user name is ${user.username[0].toUpperCase()}`);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommernce</span>
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
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        {isSignedIn ? (
          <div>
            <HeaderRightContent />
          </div>
        ) : null}
        {/* <div className="flex flex-1 justify-end"> */}
        {/* {isSignedIn ? (
          <UserButton className="text-white bg-blue-700 text-center font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg" />
        ) : (
          <Button
            onClick={() => navigate("/auth/login")}
            className="text-white bg-blue-700 font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
          >
            SingIn
          </Button>
        )} */}
        {/* </div> */}
      </div>
    </header>
  );
};

export default ShopHeader;
