// import { useState } from "react";
// import { Route, Routes } from "react-router-dom";
// import AuthLayout from "./components/auth/AuthLayout";
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import AdminLayout from "./components/admin/AdminLayout";
// import Dashboard from "./pages/admin/Dashboard";
// import Order from "./pages/admin/Order";
// import Feature from "./pages/admin/Feature";
// import Products from "./pages/admin/products";
// import ShoppingLayout from "./components/shopping/ShoppingLayout";
// import NotFound from "./pages/NotFound";
// import Account from "./pages/shopping/Account";
// import Checkout from "./pages/shopping/Checkout";
// import Home from "./pages/shopping/Home";
// import Listing from "./pages/shopping/Listing";
// import Checkauth from "./components/common/Check-auth";
// import Unauth from "./pages/Unauth";
// import Header from "./components/common/Header";
// import { useUser } from "@clerk/clerk-react";

// function App() {
//   const { isSignedIn, user } = useUser();
//   console.log(user);

//   const isAuthenticated = isSignedIn;
//   const usr = user;
//   // {
//   //   name: "pravit",
//   //   role: "user",
//   // };
//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//       {/* commion component */}
//       <Header />

//       <Routes>
//         <Route
//           path="/auth"
//           element={
//             <Checkauth isAuthenticated={isAuthenticated} user={usr}>
//               <AuthLayout />
//             </Checkauth>
//           }
//         >
//           <Route path="login" element={<Login />} />
//           <Route path="signin" element={<Register />} />
//         </Route>

//         <Route
//           path="/admin"
//           element={
//             <Checkauth isAuthenticated={isAuthenticated} user={usr}>
//               <AdminLayout />
//             </Checkauth>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="products" element={<Products />} />
//           <Route path="orders" element={<Order />} />
//           <Route path="features" element={<Feature />} />
//         </Route>

//         <Route
//           path="/shop"
//           element={
//             <Checkauth isAuthenticated={isAuthenticated} user={usr}>
//               <ShoppingLayout />
//             </Checkauth>
//           }
//         >
//           <Route path="home" element={<Home />} />
//           <Route path="account" element={<Account />} />
//           <Route path="checkout" element={<Checkout />} />
//           <Route path="listing" element={<Listing />} />
//         </Route>
//         <Route path="*" element={<NotFound />} />
//         <Route path="unauth-page" element={<Unauth />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import Header from "./components/common/Header";
import Checkauth from "./components/common/Check-auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRole } from "./store/auth-slice/auth";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "./components/ui/skeleton";

// Lazy load your components
const AuthLayout = lazy(() => import("./components/auth/AuthLayout"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const Order = lazy(() => import("./pages/admin/Order"));
const Feature = lazy(() => import("./pages/admin/Feature"));
const Products = lazy(() => import("./pages/admin/products"));
const ShoppingLayout = lazy(() =>
  import("./components/shopping/ShoppingLayout")
);
const NotFound = lazy(() => import("./pages/NotFound"));
const Account = lazy(() => import("./pages/shopping/Account"));
const Checkout = lazy(() => import("./pages/shopping/Checkout"));
const Home = lazy(() => import("./pages/shopping/Home"));
const Listing = lazy(() => import("./pages/shopping/Listing"));
const About = lazy(() => import("./pages/About"));
const Unauth = lazy(() => import("./pages/Unauth"));

function App() {
  // const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { isSignedIn, isLoaded, user } = useUser();
  const [loading, setLoading] = useState(true); // Global loading state
  const [role, setRole] = useState(null); // Store the fetched role here
  const { getToken } = useAuth();

  // console.log(user);

  const fetchUserRole = async () => {
    if (isSignedIn && user) {
      try {
        const token = await getToken();
        const { data } = await axios.get(
          "http://localhost:4000/api/auth/role",
          {
            headers: { token },
          }
        );
        setRole(data.role); // Set role based on response
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false); // Set loading to false once role is fetched
      }
    } else {
      setLoading(false); // No need to fetch if not signed in
    }
  };

  useEffect(() => {
    if (isLoaded) {
      fetchUserRole();
    }
  }, [isLoaded, isSignedIn, user]);

  const isAuthenticated = isSignedIn;
  const usr = {
    user: user,
    role: role,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-[800px] h-[800px] bg-gray-300" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Common component */}
      <ToastContainer position="bottom-right" />
      {/* <Header /> */}

      {/* Suspense to handle lazy loading */}
      <Suspense
        fallback={
          <div>
            <Skeleton className="w-[800px] h-[800px] bg-black" />
          </div>
        }
      >
        <Routes>
          <Route
            path="/auth"
            element={
              <Checkauth isAuthenticated={isAuthenticated} user={usr}>
                <AuthLayout />
              </Checkauth>
            }
          >
            <Route path="login" element={<Login />} />
            <Route path="signin" element={<Register />} />
          </Route>

          <Route
            path="/admin"
            element={
              <Checkauth isAuthenticated={isAuthenticated} user={usr}>
                <AdminLayout />
              </Checkauth>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Order />} />
            <Route path="features" element={<Feature />} />
          </Route>

          <Route
            path="/shop"
            element={
              <Checkauth isAuthenticated={isAuthenticated} user={usr}>
                <ShoppingLayout />
              </Checkauth>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="account" element={<Account />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="listing" element={<Listing />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="unauth-page" element={<Unauth />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
