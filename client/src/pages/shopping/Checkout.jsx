import React, { useState } from "react";
import image from "../../assets/account.jpg";
import Address from "@/components/shopping/Address";
import { useDispatch, useSelector } from "react-redux";
import UserCartContent from "@/components/shopping/Cart-content";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useClerk } from "@clerk/clerk-react";
import { createOrder } from "@/store/shop-slice/orderSlice";
import AddressCard from "@/components/shopping/Address-cart";

const Checkout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { approvalURL } = useSelector((state) => state.order);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const { addressList } = useSelector((state) => state.address);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();
  const { user } = useClerk();

  const cartTotal =
    cartItems && cartItems?.items && cartItems?.items?.length > 0
      ? cartItems?.items?.reduce(
          (sum, currentItem) =>
            sum +
            ((currentItem?.salePrice ?? 0) > 0
              ? currentItem?.salePrice
              : currentItem?.price ?? 0) *
              (currentItem?.quantity ?? 1),
          0
        )
      : 0;

  const handleInitiateRazorpayPayment = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed");

      return;
    }
    if (currentSelectedAddress === null) {
      toast.error("Please select one address to proceed.");

      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        state: currentSelectedAddress?.state,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "razorpay",
      paymentStatus: "pending",
      totalAmount: cartTotal,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    // Call backend API to create a new order
    dispatch(createOrder(orderData)).then((response) => {
      const data = response.payload;

      if (data?.success) {
        // Initialize Razorpay payment
        const { razorpayOrderId, orderId } = data;
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: cartTotal * 100, // Convert to paise
          currency: "INR",
          name: "Vish",
          description: "Order Payment",
          order_id: razorpayOrderId, // Razorpay Order ID
          handler: async (response) => {
            // Send payment capture request to backend
            dispatch(
              capturePayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                orderId,
              })
            ).then((captureResponse) => {
              if (captureResponse.payload?.success) {
                toast.success("Payment successful!");
                // Navigate to success page or show confirmation
                window.location.href = "/shop/payment-success";
              } else {
                toast.error("Payment verification failed!");
                window.location.href = "/shop/payment-failure";
              }
            });
          },
          prefill: {
            name: user?.name,
            username: user?.username,
            contact: user?.number,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.error("Failed to create Razorpay order");
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[350px] w-full overflow-hidden">
        <img
          src={image}
          alt="checkout"
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        <div>
          {cartItems && cartItems?.items && cartItems?.items?.length > 0
            ? cartItems?.items?.map((item, index) => (
                <UserCartContent cartItems={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold text-2xl">Total</span>
              <span className="font-bold">Rs.{cartTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleInitiateRazorpayPayment} className="w-full">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
