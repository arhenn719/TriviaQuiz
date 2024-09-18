import { useNavigate } from "react-router-dom";

function navigateButtons(props) {
    const navigate = useNavigate();

    const sendButton = (id) => {
        id == 'exit' ? navigate('/',) : id == 'restart' ? navigate('/questions', { state: { difficulty: props.difficulty, category: props.category } }) : ''
    }

    return (
        <div>
            <div className='d-flex justify-content-around align-items-center'>
                <button id="exit" className='btn btn-danger' onClick={e => sendButton(e.target.id)}>Exit</button>
                <button id="restart" className='btn btn-primary' onClick={e => sendButton(e.target.id)}>Restart</button>
            </div>
        </div>
    )

}
export default navigateButtons;