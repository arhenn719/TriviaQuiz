import NavigateButtons from "../components/navigateButtons";
import { useLocation } from "react-router-dom";

function positionTable() {
    const location = useLocation();

    const cat = location?.state?.category ?? '';
    const dif = location?.state?.difficulty ?? '';

    let arreglo = JSON.parse(localStorage.getItem('player'))


    return (
        <>
            <div className="text-secondary fw-bold text-center">
                <h4>Position table</h4>
            </div>
            <div id="tablePositions" className="p-2 mb-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Difficulty</th>
                            <th scope="col">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arreglo.map((player, index) => (
                            <tr key={`${player.name}-${index}`}>
                                <td>{player.name}</td>
                                <td>{player.difficulty === '' ? 'any' : player.difficulty}</td>
                                <td>{player.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <NavigateButtons difficulty={dif} category={cat} />
        </>
    )
}

export default positionTable;