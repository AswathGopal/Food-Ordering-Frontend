import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CheckoutSessionRequestType={
    cartItems:{
       menuItemId:string;
       name:string;
       quantity:string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
      };
      restaurantId: string;    
}
 
export const useGetMyOrders =()=>{
    const {getAccessTokenSilently} = useAuth0();

    const getMyOrdersRequest = async():Promise<Order[]>=>{
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/orders`,{
            headers:{
                Authorization:`Bearer ${accessToken}`,
            },
        });

        if(!response.ok){
            throw new Error("Failed to get hotel");
        }
        return response.json();
    };

    const {data:orders,isLoading} = useQuery(
        "fetchOrders",getMyOrdersRequest,
        // {
        //     refetchInterval:5000,
        // }
    );

    return {orders, isLoading};
};

export const useCreateCheckoutSession =()=>{
    const {getAccessTokenSilently} = useAuth0();

    const createCheckoutSessionRequest = async(
        checkoutSessionRequestData:CheckoutSessionRequestType
    ) =>{
        const accessToken = await getAccessTokenSilently();
        const response =await fetch(`${API_BASE_URL}/api/orders/checkout/create-checkout-session`,{
            method:"POST",
            headers:{
                Authorization:`Bearer ${accessToken}`,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(checkoutSessionRequestData),
        });

        if(!response.ok){
            throw new Error("Unable to create a checkout Session");
        }

        return response.json();
    };

    const {
        mutateAsync:createCheckoutSession,
        isLoading,
        error,
        reset
     } = useMutation(createCheckoutSessionRequest);

     if(error){
        toast.error(error.toString())
        reset();
     }

     return {createCheckoutSession, isLoading}
}