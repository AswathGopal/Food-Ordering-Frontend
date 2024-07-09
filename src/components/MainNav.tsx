import { Link } from "react-router-dom";
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import UserNameMenu from "./UserNameMenu";

const MainNav = () => {
  
  const {loginWithRedirect,isAuthenticated} = useAuth0();
  return (
    <span className="flex space-x-2 items-center">
      {
        isAuthenticated? 
        (<>
           <Link to='/order-status' className="font-bold hover:text-orange-500">Order Status</Link>
           <UserNameMenu/>
           </>
        ):
        ( <Button onClick={async()=> await loginWithRedirect()} className="font-bold bg-orange-500 hover:text-orange-500 hover:bg-white">LogIn</Button>)
      }
    </span>
  
  )
}

export default MainNav