import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";


type Props ={
    order:Order;
 }

const OrderStatusHeader = ({order}:Props) => {
    const getExpectedDelivery =()=>{
        const created = new Date(order.createdAt);
        created.setMinutes(created.getMinutes() + order.restaurant.estimatedDeliveryTime);

        const hours = created.getHours();
        const minutes = created.getMinutes();
       
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;

    }

    const getOrderStatusInfo =()=>{
        return (ORDER_STATUS.find((o)=> o.value === order.status) || ORDER_STATUS[0])
    }
  return (
    <div className="space-y-10">
    <h1 className="text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row justify-between">
        <span>Order Status:{getOrderStatusInfo().label}</span>
        <span>Expected by:{getExpectedDelivery()}</span>
    </h1>
    <Progress className="animate-pulse" value={getOrderStatusInfo().progressValue} />
    </div>
  )
}

export default OrderStatusHeader