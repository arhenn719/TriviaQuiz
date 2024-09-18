import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NavigateButtons from '../components/navigateButtons';
function finish() {


    const [positions, setPositions] = useState(JSON.parse(localStorage.getItem('player') || '[]'))
    const [newPlayer, setNewPlayer] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const prevScore = location?.state?.answerScore ?? 0;
    const category = location?.state?.category ?? '';
    const difficulty = location?.state?.difficulty ?? '';

    let cardsCountCorrect = prevScore / 20
    let textGrats = 'You can do better'



    function createPlayer(player) {
        let newPositions = [{ name: player, difficulty: difficulty, score: prevScore }, ...positions]
        setPositions(newPositions)
        localStorage.setItem('player', JSON.stringify(newPositions))
        navigate('/positionTable', { state: { difficulty: difficulty, category: category } })
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
            <div className='text-center container-finish mb-1 mt-4'>
                <span>Your final score is:</span>
                <div id="final-score">{prevScore}</div>
                <span>You answered <b>{cardsCountCorrect}/5</b> questions correctly.</span><br />
                <span id='text-grats'>{textGrats}</span>

            </div>
            <div className='mb-5 d-flex justify-content-center'>
                <div className='d-flex justify-content-center'>
                    <div className="input-group mb-3 col-10">
                        <input type="text" className="form-control" placeholder="Enter your name" onChange={(e) => setNewPlayer(e.target.value)} />
                        <button className="btn btn-primary" type="button" id="button-addon2" onClick={(e) => createPlayer(newPlayer)}>Save</button>
                    </div>
                </div>
            </div>
            <NavigateButtons difficulty={difficulty} category={category} />

        </>
    )
}

export default finish;