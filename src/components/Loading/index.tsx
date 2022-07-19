import ReactLoading from 'react-loading';
import { Container } from "./styles";

import { Counter } from '../Counter';

export default function Loading({ type, color }) {

    return (
        <Container>
            <ReactLoading type={type} color={color} height={5} width={200} />
            <Counter />
        </Container>
    )
}