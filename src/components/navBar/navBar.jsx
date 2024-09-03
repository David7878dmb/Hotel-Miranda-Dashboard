import { HiMenuAlt2 } from "react-icons/hi";
import { CiMail } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";


const NavBar = () => {
    return(
    <div className="navbar">
        <HiMenuAlt2/>
        <CiMail/>
        <IoIosNotificationsOutline/>
    </div>
    )
}

export default NavBar;