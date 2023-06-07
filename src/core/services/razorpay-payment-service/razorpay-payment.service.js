import { toast } from "react-toastify";

const loadScript = async (url) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};

const handleOrderCheckout = async (selectedAddress, totalPrice) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    toast.error("Razorpay SDK failed to load, please check your connection.");
    return;
  }

  const razorpayOptions = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    amount: totalPrice * 100,
    currency: "INR",
    name: "Cricify",
    description:
      "Cricify: Your All-Star Destination for Cricket Fashion and Gear!",
    image: "../../../assets/cricify-logo.png",
    handler: function (response) {
      toast.success("Payment successful!", response);
    },
    prefill: {
      name: selectedAddress.name,
      contact: selectedAddress.mobile,
      address: selectedAddress,
    },
    notes: {
      address: selectedAddress,
    },
    theme: {
      color: "#f6f9fb",
      background: "#50abf5",
      display_name: "Cricify",
    },
    modal: {
      escape: false,
      backdrop_close: true,
      handle_back: true,
    },
  };

  const razorpayInstance = new window.Razorpay(razorpayOptions);
  razorpayInstance.open();
};

export default handleOrderCheckout;
