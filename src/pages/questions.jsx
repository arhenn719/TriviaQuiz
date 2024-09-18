import { useQuestions } from '../hooks/useQuestions';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function questions() {

    const [score, setScore] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const category = location?.state?.category ?? '';
    const difficulty = location?.state?.difficulty ?? '';

    let newurl = 'https://opentdb.com/api.php?amount=5&type=multiple';

    if (location.state != null) {
        newurl = `https://opentdb.com/api.php?amount=5&type=multiple&difficulty=${difficulty}&category=${category}`

    }

    const { data, updateData, card, loading, error } = useQuestions(newurl);

    useEffect(() => {
        if (!loading & (card == data.length & data.length > 0)) {
            navigate('/finish', { state: { answerScore: score, difficulty: difficulty, category: category } });
        }
    }, [card, loading])

    const exitGame = (yesno) => {
        if (yesno) {
            navigate('/',)
        } else {
            const popup = document.querySelector('#popup');
            popup.classList.add('hidden');
        }


    }
    const openPopup = () => {
        const popup = document.querySelector('#popup');
        popup.classList.remove('hidden');
    }


    return (
        <>
            <div id="popup" className="hidden d-flex justify-content-center align-items-center">
                <div className="col-xs-10 col-sm-10 col-md-8 col-lg-6 col-xl-4 card p-4 text-center">
                    <span className="mb-4 fw-bold">Are you sure you want to finish the game?</span>
                    <div className="d-flex flex-row justify-content-around my-2">
                        <button className="btn btn-danger p-2 col-5" onClick={() => exitGame(false)}>No</button>
                        <button className="btn btn-success p-2 col-5" onClick={() => exitGame(true)} >Yes</button>
                    </div>
                </div>
            </div>
            {!loading && <div className='d-flex flex-row justify-content-between align-items-center'>
                <span id="card-count" >{card + 1}/5</span>
                <span className='fw-bold text-secondary'>Score: {score}</span>
            </div>}
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
            {!loading &&
                <div className="flex flex-row justify-content-center text-center">
                    <div className="btn btn-danger col-xs-10 col-sm-10 col-md-5 p-2 mt-2" onClick={openPopup}>Exit</div>
                </div>
            }

        </>
    )
}

export default questions;


/* 

*/