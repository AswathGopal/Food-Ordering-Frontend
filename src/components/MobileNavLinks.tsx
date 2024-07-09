import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';


const MobileNavLinks = () => {
    const {logout} = useAuth0();
  return (
    <>
    <Link to='/order-status' className='flex  bg-white items-center font-bold hover:text-orange-500'>Order Status</Link>
    <Link to='/manage-restaurant' className='flex  bg-white items-center font-bold hover:text-orange-500'>My Restaurent</Link>
    <Link to='/user-profile' className='flex  bg-white items-center font-bold hover:text-orange-500'>user Profile</Link>
    <Button  onClick={()=> logout()} className='flex flex-1 font-bold px-2 text-center hover:bg-orange-500'>Log Out</Button>
    </>
  )
}

export default MobileNavLinks