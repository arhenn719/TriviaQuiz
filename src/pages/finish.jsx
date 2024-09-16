import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function finish() {
    const location = useLocation();

    console.log(location.state.answerScore)
    console.log(location.state.difficulty)
    console.log(location.state.category)
    return (
        <h1>finish</h1>
    )
}

export default finish;