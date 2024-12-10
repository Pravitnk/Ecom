import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import Checkauth from "./components/common/Check-auth";
import { useDispatch } from "react-redux";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton } from "./components/ui/skeleton";
import { serverURL } from "./config/config";

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
const PaymentSuccess = lazy(() => import("./pages/shopping/PaymentSuccess"));
const PaymentReturn = lazy(() => import("./pages/shopping/PaymentReturn"));
const Search = lazy(() => import("./pages/shopping/Search"));

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
        const { data } = await axios.get(`${serverURL}/api/auth/role`, {
          headers: { token },
        });
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
            <Route path="search" element={<Search />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="payment-return" element={<PaymentReturn />} />
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
