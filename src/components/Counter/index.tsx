import React from 'react';
import { useContext, useEffect } from 'react';
import { CounterContext } from '../../hooks/useCounter';

import { Container } from './styles';

export function Counter() {

    const {
        minutes,
        seconds,
        startCounter } = useContext(CounterContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    useEffect(() => {
        startCounter();
    }, [])

    return (
        <Container>
            <span>{minuteLeft}</span>
            <span>{minuteRight}</span>
            <span>:</span>
            <span>{secondLeft}</span>
            <span>{secondRight}</span>
        </Container>
    )

}