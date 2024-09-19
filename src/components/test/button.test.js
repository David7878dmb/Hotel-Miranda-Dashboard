import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import styled from 'styled-components'

const Boton = styled.button`
    background-color: #007bff;
    ${props => props.light && 
        `background-color: #ffffff;`}
`

test ('El boton tiene que tener el color #007bff', () => {
    render (<Boton>Boton</Boton>)
    expect(screen.getByRole('button',{name:/Boton/i})).toHaveStyle({backgroundColor: '#007bff'})
})

test ('El boton tiene que tener el color #fffff, con el atributo light', () => {
    render (<Boton light>Boton</Boton>)
    expect(screen.getByRole('button',{name:/Boton/i})).toHaveStyle({backgroundColor: '#ffffff'})
})
