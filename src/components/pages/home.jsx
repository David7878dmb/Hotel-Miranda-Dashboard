import styled from 'styled-components';
import LateralMenu from '../lateralMenu/lateralMenu';
import Container from '../container/container';
import NavBar from '../navBar/navBar';

const Title = styled.h1`
    /* color: white; */
`;



export const Home = () => {

    return (
        <Container>
            <LateralMenu/>
            <div >
                <NavBar/>
                <section>
                    <Title>Home</Title>
                </section>
            </div>
        </Container>
    );
};