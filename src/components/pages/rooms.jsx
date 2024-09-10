import { useParams } from "react-router-dom"
import Container from "../container/container";
import LateralMenu from "../lateralMenu/lateralMenu";
import styled from 'styled-components';
import NavBar from "../navBar/navBar";

const Title = styled.h1`
    /* color: white; */
`;

export const Rooms = () => {
    const { id } = useParams();

    return (
        <Container>
            <LateralMenu/>
            <div >
                <NavBar/>
                <section>
                    <Title>Rooms</Title>
                </section>
            </div>
        </Container>
    )
}