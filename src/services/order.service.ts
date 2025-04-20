import { ShippingOption } from "@/sections/Checkout/_stores/useCheckout.store";
import { CartItem } from "../../convex/cart/entities/cart.type";
import { Checkout_Address } from "@/sections/Checkout/_stores/useCheckout_Address.store";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@/providers/authProvider";
import { toast } from "sonner";

interface createOrderProps {
  cartItems: CartItem[];
  selectedShipping: ShippingOption;
  addressData: Checkout_Address;
  subtotal: number;
  total: number;
}

const useCreateOrder = () => {
  const { user } = useAuth();
  const createOrderMutation = useMutation(api.order.createOrder);

  const createOrder = async ({
    cartItems,
    selectedShipping,
    addressData,
    subtotal,
    total,
  }: createOrderProps) => {
    if (!user) {
      toast.error("Please login to create an order!");
      return null;
    }

    try {
      // Convert cart items to the format expected by the mutation
      const products = cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        size: item.size,
        colorCode: item.colorCode,
      }));

      // Map shipping option to the format expected by the mutation
      const shippingModel = {
        type: selectedShipping.name,
        price: selectedShipping.price,
      };

      // Map address data to the format expected by the mutation
      const addressModel = {
        firstName: addressData.firstName,
        lastName: addressData.lastName,
        address: addressData.address,
        apartment: addressData.apartment || undefined,
        city: addressData.city,
        country: addressData.country,
        zipcode: addressData.zipcode,
        note: addressData.optional || undefined,
      };

      // Call the Convex mutation to create the order
      const orderId = await createOrderMutation({
        subtotal,
        total,
        addressModel,
        shippingModel,
        products,
        paymentStatus: "PENDING", // Initial status before payment confirmation,
        userId: user._id,
      });

      return orderId;
    } catch (error) {
      throw error;
    }
  };

  return { createOrder };
};

const OrderServices = {
  useCreateOrder,
};

export default OrderServices;
