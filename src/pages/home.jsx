import { useCategory } from '../hooks/useCategory';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function home() {
    const initialData = {
        category: '',
        difficulty: ''
    }
    const navigate = useNavigate();
    const [initialState, setInitialState] = useState(initialData);
    const { category, difficulty } = initialState;
    const { data, error } = useCategory("https://opentdb.com/api_category.php");

    const toQuestions = () => {
        navigate('/questions', { state: { category: initialState.category, difficulty: initialState.difficulty } });
    }


    const handleChange = (name, value) => {
        setInitialState((prevState) => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <>
            <h3 className='title text-center'>Welcome to TriviaQuiz</h3>
            <p className='text-center mt-3'>TriviaQuiz uses the Open Trivia's API to generate the questions. Feel free to see more <a target='_blank' href="https://opentdb.com/">here</a></p>
            <p className='text-center'>First select a category, after that select a difficulty and that it. Lets play!</p>
            <br />
            <label htmlFor="category">Select a Category</label>
            <select className="form-select form-select-lg mb-3" aria-label="Large select example" name='category' value={category} onChange={e => handleChange(e.target.name, e.target.value)}>
                <option>Any Type</option>
                {data?.trivia_categories?.map((cat) => (<option key={cat.id} value={cat.id}>{cat.name}</option>))}
            </select>
            <label htmlFor="difficulty">Select Difficulty</label>
            <select className="form-select form-select-lg mb-3" aria-label="Large select example" name="difficulty" value={difficulty} onChange={e => handleChange(e.target.name, e.target.value)}>
                <option value="">Any</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button className='btn btn-primary' onClick={toQuestions}>Start!</button>
        </>
    )
}

export default home;