import Link from 'next/link'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth,signOut} from '../utils/firebaseconfig'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import {FiMonitor,FiUser} from 'react-icons/fi'
function NavbarLoginComponent(){
    return(
        <div className={"flex gap-2"}>
            <label for="login-modal" className={"btn btn-sm md:btn-md btn-ghost rounded-md modal-button"}>Login</label>
            <label for="register-modal" className={"btn btn-sm md:btn-md bg-primary border-none rounded-md text-white"}>Signup</label>
        </div>
    )
}
function NavbarUserComponent(){
    return (
        <div className={"dropdown dropdown-hover"}>
            <label tabIndex={0} className="btn m-1 rounded-full">{<FiUser/>}</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-max">
                <li><a href={"/cart"}>Cart</a></li>
                <li><a onClick={handleSignOut}>Sign-out</a></li>
            </ul>
        </div>
    )
}
function handleSignOut(){
    signOut(auth)
}
function ButtonizedButton({link,name}){
    return(
        <Link href={link} ><a className={"btn btn-sm md:btn-md md:text-lg btn-ghost normal-case"}>
            {name}
        </a></Link>
    )
}
export default function Navbar(){
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
        themeChange(false)
        // 👆 false parameter is required for react project
    }, [])
    return(
        <nav id={"navbar-container "} className={"flex top-0 justify-center sticky w-full glass z-10"}>
            <div className="navbar w-10/12 flex justify-between ">
                <div className={"h-full"}>
                    <FiMonitor className={"text-4xl md:text-5xl"}/>
                    <div className={"flex text-base md:text-xl md:mx-4"}>
                        <ButtonizedButton link={"/"} name={"Home"}/>
                        <ButtonizedButton link={"/products"} name={"Store"}/>
                    </div>
                </div>
                <div>
                    {user ? <NavbarUserComponent/>:<NavbarLoginComponent/>}
                </div>
            </div>


        </nav>
    )
}
