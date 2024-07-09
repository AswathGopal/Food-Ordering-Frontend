import { useGetMyUser } from "@/api/MyUserApi";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserProfileForm, { UserFormData } from "@/forms/user-profile-form/UserProfileForm"
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";

  

  type Props ={
    onCheckout:(userFormData:UserFormData) => void;
    disabled: boolean;
    isLoading:boolean;
  }

const CheckoutButton = ({onCheckout,disabled,isLoading}:Props) => {
     const {isAuthenticated,isLoading:isAuthLoading, loginWithRedirect} = useAuth0();

     const {pathname} = useLocation();
     console.log(pathname);
     const {currentUser,isLoading:isGetUserLoading} = useGetMyUser();

     const onLogin = async() =>{
      await loginWithRedirect({
        appState:{
          returnTo:pathname,
        },
      });
     };
     if (!isAuthenticated) {
      return (
        <Button onClick={onLogin} className="bg-orange-500 flex-1">
          Log in to check out
        </Button>
      );
    }
     if(isAuthLoading || !currentUser || isLoading){
      return <LoadingButton/>;
     }
  return (
        <Dialog>
         <DialogTrigger asChild>
          <Button disabled ={disabled} className="bg-orange-500 flex-1">Go to checkout</Button>
         </DialogTrigger>
         <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
          <UserProfileForm 
           currentUser={currentUser}
           onSave={onCheckout}
           isLoading={isGetUserLoading}
           title ="Confirm Delivery Details"
           buttontext ="Continue to payment"/>
         </DialogContent>
        </Dialog>
  )
}

export default CheckoutButton