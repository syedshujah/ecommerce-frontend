import { toast } from "react-toastify";

let toastCountMap = {};

export const showAddToCartToast = (product) => {
  const count = (toastCountMap[product.id] || 0) + 1;
  toastCountMap[product.id] = count;

  toast.success(`${product.title} added to cart (${count})`, {
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
