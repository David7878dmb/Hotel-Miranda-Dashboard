import { HiMenuAlt2 } from "react-icons/hi";
import { CiMail } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import styled from "styled-components";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../login/authContext';

const Parrafo = styled.span`
    padding-left: 1rem;
    display: inline;
    font-size: 18px;
`;

const Imagenes = styled.div`
    padding-left: 1rem;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;



const NavBar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
      };


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
            <Imagenes  onClick={handleLogout} style={{ cursor: 'pointer' }}>
                <IoIosLogOut />
            </Imagenes>
        </Row>
    </div>
    )
}

export default NavBar;