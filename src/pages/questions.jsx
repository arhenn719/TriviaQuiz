import { useQuestions } from '../hooks/useQuestions';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function questions() {
    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    let category = location.state.category != null ? location.state.category : ''
    let difficulty = location.state.difficulty != null ? location.state.difficulty : ''
    let newurl = 'https://opentdb.com/api.php?amount=5&type=multiple';
    if (location.state != null) {
        newurl = `https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${location.state.difficulty}&category=${location.state.category}`

    }

    const { data, updateData, card, error } = useQuestions(newurl);

    if (data?.length && (card == data?.length)) {
        navigate('/finish', { state: { answerScore: score, difficulty: difficulty, category: category } });
        return
    }

    console.log(data)
    return (
        <>   <div><p>Score: {score}</p></div>
            {data?.map((q, index) => (

                <div id={index} key={`result-${index}`} className={index == card ? 'active' : 'hidden'}>
                    <div >
                        <div>
                            <p>Category: {q.category}</p>
                            <p>Difficulty: {q.difficulty}</p>
                        </div>
                    </div>
                    <div>
                        <h4>{q.question}</h4>
                    </div>
                    <div>
                        <div className='asdasd'>
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