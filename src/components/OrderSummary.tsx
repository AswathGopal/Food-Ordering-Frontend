import { Restaurant } from "@/types"
import { CartItem } from "../pages/DetailPage";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  IndianRupee, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";


type Props={
    restaurant:Restaurant;
    cartItems:CartItem[];
    removeFromCart:(cartItem:CartItem) => void;
};

const OrderSummary = ({restaurant,cartItems,removeFromCart}:Props) => {

  const getTotalCost = () =>{
    const total = cartItems.reduce((total,cartItem) => total + cartItem.price * cartItem.quantity,0);

    const totalwithdelivery = total + restaurant.deliveryPrice;
    return totalwithdelivery;
  }
  return (
    <>
    <CardHeader >
    <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span className="flex items-center"> <IndianRupee size={22}/>{getTotalCost()}</span>
        </CardTitle>
    </CardHeader>
    <CardContent className="flex flex-col gap-5">
      {cartItems.map((item)=>(
        <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">{item.quantity}</Badge>
              {item.name}
            </span>
            <div className="flex">
            <span className="">
              <Trash 
              className="cursor-pointer"
              color="red"
              size={20}
              onClick={()=> removeFromCart(item)} />
            </span>
            <span className="flex items-center ml-2">
              <IndianRupee size={15} />{item.price * item.quantity}
            </span>
            </div>
        </div>
      ))}
      <Separator />
      <div className="flex justify-between">
        <span>Delivery</span>
        <span className="flex items-center"><IndianRupee size={15} />{restaurant.deliveryPrice}</span>
      </div>
      <Separator/>
    </CardContent>
    </>
  )
}

export default OrderSummary