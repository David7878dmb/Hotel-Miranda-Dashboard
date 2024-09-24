import { Link } from "react-router-dom";
import { HiOutlinePuzzle } from "react-icons/hi";
import { IoKeyOutline } from "react-icons/io5";
import { TbCalendarCheck } from "react-icons/tb";
import { MdOutlinePerson } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaHotel } from "react-icons/fa6";
import styled from "styled-components";


const Parrafo = styled.p`
    padding-left:1rem;
    display: inline;
    font-size: 18px;
`;

const IconWrapper = styled.span`
    font-size:40px;
    margin-right: 8px;
    color:black;
`;

const LateralMenu = () => {
    return (
        <div className="lateral" >
            <Link to="/" style={{width:'100%', margin:'2rem'}}>
                        <IconWrapper>
                            <FaHotel />
                        </IconWrapper>
                    </Link>
            <ul>

                <li>
                    <Link to="/dashboard"> <TbLayoutDashboard /><Parrafo>Dashboard</Parrafo></Link>
                </li>

                <li>
                    <Link to="/rooms"> <IoKeyOutline /><Parrafo>Rooms</Parrafo></Link>
                </li>

                <li>
                    <Link to="/booking"> <TbCalendarCheck /><Parrafo>Booking</Parrafo></Link>
                </li>


                <li>
                    <Link to="/contact"><MdOutlinePerson /><Parrafo>Contact</Parrafo></Link>
                </li>

                <li>
                    <Link to="/concierge"><HiOutlinePuzzle /><Parrafo>Concierge</Parrafo></Link>
                </li>


            </ul>
        </div>
    )
}

export default LateralMenu;