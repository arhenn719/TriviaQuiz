import { useQuestions } from '../hooks/useQuestions';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function questions() {
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    let category = location?.state?.category != null ? location.state.category : ''
    let difficulty = location?.state?.difficulty != null ? location.state.difficulty : ''
    let newurl = 'https://opentdb.com/api.php?amount=5&type=multiple';
    if (location.state != null) {
        newurl = `https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${location.state.difficulty}&category=${location.state.category}`

    }

    const { data, updateData, card, loading, error } = useQuestions(newurl);

    if (data?.length && (card == data?.length)) {
        navigate('/finish', { state: { answerScore: score, difficulty: difficulty, category: category } });
        return
    }

    return (
        <>
            <div className='d-flex flex-row justify-content-between align-items-center'>
                <span id="card-count" >{card + 1}/5</span>
                <span className='fw-bold text-secondary'>Score: {score}</span>
            </div>
            {loading && <div className='text-center fw-bold text-danger'>Loading please wait...</div>}

            {data?.map((q, index) => (

                <div id={index} key={`result-${index}`} className={index == card ? 'active d-flex flex-column border-box' : 'hidden d-flex flex-column border-box'}>
                    <div className='mb-4'>
                        <div className='d-flex flex-column text-center fw-bold text-secondary'>
                            <span>{q.category}</span>
                            <span>{q.difficulty}</span>
                        </div>
                    </div>
                    <div className='question-box d-flex text-center flex-row align-items-center justify-content-center mb-4'>
                        <h4 className='text-center p-3 col-10'>{q.question}</h4>
                    </div>
                    <div className='content-general-btn my-4'>
                        <div className='d-flex col-12 text-center align-content-around justify-content-around flex-row flex-wrap'>
                            {q.buttons.map((btn, i) => (

                                <button key={`btn-${i}-${index}`} onClick={() => {
                                    if (q.correctButtonIndex == i) {
                                        setScore(score + 20)
                                    }
                                    updateData(index, i, score)

                                }} className={btn.state}>{btn.name}</button>

                            ))}

                        </div>
                    </div>
                </div>


            ))}

        </>
    )
}

export default questions;

// problemas: como cambiar de tarjetitas, cambiar clases de forma dinamica para saber cual correcto y cual no, envio a finish al acabar la 5 tarjeta, decode de respuestas