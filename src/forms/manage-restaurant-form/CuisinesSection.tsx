import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cuisineList } from "@/config/cuisine-config";
import { useFormContext } from "react-hook-form"
import CuisineCheckbox from "./CuisineCheckbox";


const CuisinesSection = () => {
    const {control} = useFormContext();
  return (
       <div className="space-y-2">
          <div >
            <h2 className="text-2xl font-bold">Cuisines</h2>
            <FormDescription>
                select the cuisines for your restaurant
            </FormDescription>
      </div>
      <FormField 
       control={control}
       name="cuisines"
        render ={({field})=>{
        return <FormItem>
                <div className="grid md:grid-cols-5 gap-1">
                    {cuisineList.map((cuisineItem) => (
                        <CuisineCheckbox cuisine={cuisineItem} field={field} />
                    ))}
                </div>
                <FormMessage />
            </FormItem>;
       }}
       />
       </div>         
  )
}

export default CuisinesSection