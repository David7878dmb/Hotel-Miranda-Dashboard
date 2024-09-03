import { Link } from "react-router-dom";
import { HiOutlinePuzzle } from "react-icons/hi";
import { IoKeyOutline } from "react-icons/io5";
import { TbCalendarCheck } from "react-icons/tb";
import { MdOutlinePerson } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";

const LateralMenu = () => {
    return (
        <div className="lateral">
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>

                <li>
                    <Link to=""> <TbLayoutDashboard /><p>Dashboard</p></Link>
                </li>

                <li>
                    <Link to=""> <IoKeyOutline />Rooms</Link>
                </li>

                <li>
                    <Link to="/booking"> <TbCalendarCheck />Booking</Link>
                </li>


                <li>
                    <Link to=""><MdOutlinePerson />Guest</Link>
                </li>

                <li>
                    <Link to=""><HiOutlinePuzzle />Concierge</Link>
                </li>


            </ul>
        </div>
    )
}

export default LateralMenu;