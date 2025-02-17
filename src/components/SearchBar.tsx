import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";



const formSchema = z.object({
    searchQuery:z.string({
        required_error:"Restaurant name is required"
    }),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
    onSubmit:(formData:SearchForm) => void;
    placeHolder: string;
    onReset?: ()=> void;
    searchQuery?:string;
}



const SearchBar = ({onSubmit,onReset,placeHolder,searchQuery}:Props) => {

    const form = useForm<SearchForm>({
        resolver :zodResolver(formSchema),
        defaultValues:{
            searchQuery,
        },
    })

    useEffect(()=>{
        form.reset({searchQuery});
    },[form,searchQuery])

    const handleReset =()=>{
        form.reset({
            searchQuery:"",
        }) 

        if(onReset){
            onReset();
        }
    };

  return (
    <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${form.formState.errors.searchQuery && "border-red-500"}`}>
               <Search 
               strokeWidth ={2.5}
               size={30}
               className="ml-1 text-orange-00 hidden md:block"
               />
                <FormField
          control={form.control}
          name="searchQuery"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  {...field}
                  className="border-none shadow-none text-xl focus-visible:ring-0"
                  placeholder={placeHolder}
                />
              </FormControl>
            </FormItem>
          )}
        />
           <Button  onClick={handleReset} type="button" className="rounded-full" variant = "outline">
            reset
           </Button>
           <Button type="submit" className="rounded-full bg-orange-500">Search</Button>
         </form>
    </Form>
  )
}

export default SearchBar