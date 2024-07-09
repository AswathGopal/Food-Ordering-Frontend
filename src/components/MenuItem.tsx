import { MenuItem as MenuItemType} from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { IndianRupee } from "lucide-react";

type Props ={
    menuItem:MenuItemType,
    addToCart: () => void;
}
const MenuItem = ({menuItem,addToCart}:Props) => {
  return (
   <Card className="cursor-pointer" onClick={addToCart}>
        <CardHeader>
            <CardTitle>
                {menuItem.name}
            </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="flex items-center "><IndianRupee size={15} /> {menuItem.price}</span> 
        </CardContent>
   </Card>
  )
}

export default MenuItem