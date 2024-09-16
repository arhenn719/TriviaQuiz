import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function finish() {
    const location = useLocation();
    const navigate = useNavigate();
    const prevScore = location?.state?.answerScore != null ? location.state.answerScore : 0;
    let cardsCountCorrect = prevScore / 20
    let textGrats = 'You can do better'
    const sendButton = (id) => {
        id == 'exit' ? navigate('/',) : id == 'restart' ? navigate('/questions', { state: { difficulty: location?.state?.difficulty, category: location?.state?.category } }) : ''
    }

    if (cardsCountCorrect == 5) {
        textGrats = 'Excellent'
    } else if (cardsCountCorrect < 5 && cardsCountCorrect > 2) {
        textGrats = 'Good'
    }


    return (
        <>
            <div className='text-center text-secondary text-end p-3'>
                <h1>End Game</h1>
            </div>
            <div className='text-center container-finish mb-5 mt-4'>
                <span>Your final score is:</span>
                <div id="final-score">{prevScore}</div>
                <span>You answered <b>{cardsCountCorrect}/5</b> questions correctly.</span><br />
                <span id='text-grats'>{textGrats}</span>

            </div>
            <div>
                <div className='d-flex justify-content-around align-items-center'>
                    <button id="exit" className='btn btn-danger' onClick={e => sendButton(e.target.id)}>Exit</button>
                    <button id="restart" className='btn btn-primary' onClick={e => sendButton(e.target.id)}>Restart</button>
                </div>
            </div>
        </>
    )
}

export default finish;