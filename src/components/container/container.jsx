import styled from 'styled-components';

const Container = styled.section`
    display: flex;
    flex-direction: row;

    & > * {
        flex: 1;
    }

    & > *:first-child {
        max-width: 16.5%;
    }
`;

export default Container;