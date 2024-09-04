import { HiMenuAlt2 } from "react-icons/hi";
import { CiMail } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import styled from "styled-components";
import { IoIosLogOut } from "react-icons/io";

const Parrafo = styled.p`
    padding-left:1rem;
    display: inline;
    font-size: 18px;
    
`;

const Imagenes = styled.p`
    padding-left:1rem;
`
const Row = styled.p`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`


const NavBar = () => {
    return(
    <div className="navbar">
        <div>
            <HiMenuAlt2/>
            <Parrafo>Dashboard</Parrafo>
        </div>
        <Row>
            <Imagenes>
                <CiMail/>
            </Imagenes>
            <Imagenes>
                <IoIosNotificationsOutline/>
            </Imagenes>
            <Imagenes>
                <IoIosLogOut />
            </Imagenes>
        </Row>
    </div>
    )
}

export default NavBar;