import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@/providers/authProvider";
import { CartItem } from "../../convex/cart/entities/cart.type";
import { toast } from "sonner";

// ! remove prodct
const useRemoveItemFromCart = () => {
  const { user } = useAuth();
  const removeFromCartMutation = useMutation(api.cart.removeFromCart);
  const removeItemFromCart = (item: CartItem) => {
    if (!user) {
      toast.error("Something went wrong, please try again!");
      return;
    }

    if (user) {
      removeFromCartMutation({
        userId: user._id,
        item: {
          productId: item.productId,
          colorCode: item.colorCode,
          size: item.size,
        },
      })
        .then(() => {
          // Optional: Handle success (e.g., show toast notification)
          toast.success("Item removed successfully");
        })
        .catch((error) => {
          // Optional: Handle error
          toast.error("Failed to remove item:", error);
        });
    }
  };

  return { removeItemFromCart };
};

const useGetCartData = () => {
  const { user } = useAuth();

  const cartData = useQuery(api.cart.getCart, { userId: user?._id as string });

  return { cartData };
};

const CartServices = {
  useGetCartData,
  useRemoveItemFromCart,
};

export default CartServices;
