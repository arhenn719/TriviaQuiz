import { useState, useEffect } from "react";

const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const htmlDecode = (input) => {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

export function useQuestions(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState({});

    const [card, setCard] = useState(0);

    const getData = () => {
        fetch(url).then((response) => response.json()
        ).then((data) => {
            const InitialData = data.results.map((element) => {
                const buttonttext = [element.correct_answer, ...element.incorrect_answers].map(htmlDecode)
                element.category = htmlDecode(element.category)
                element.question = htmlDecode(element.question)
                const shuffledButtons = shuffle(buttonttext)
                const correctButtonIndex = shuffledButtons.findIndex(i => i === element.correct_answer)

                element.buttons = shuffledButtons.map((but, i) => {
                    const isCorrect = false
                    if (element.correct_answer == but) {
                        element.correctButtonIndex = correctButtonIndex
                    }

                    return ({
                        id: "button-" + i,
                        state: 'btn btn-primary',
                        name: but,
                        isCorrect: isCorrect
                    })
                });

                return element
            })
            setData(InitialData)
        }).catch((error) => setError(error))
    }


    useEffect(() => {
        getData()
    }, []);

    const updateData = (questionIndex, buttonIndex, score) => {
        const newData = [...data];

        let correct_answer = false
        const btnData = newData[questionIndex].buttons[buttonIndex]
        if (btnData.isCorrect) {
            btnData.state = 'btn btn-success';
            correct_answer = true

        } else {
            btnData.state = 'btn btn-danger';
            newData[questionIndex].buttons[newData[questionIndex].correctButtonIndex].state = 'btn btn-success';
        }
        newData[questionIndex].buttons[buttonIndex] = btnData
        setTimeout(() => {
            setCard(card + 1);
        }, "1000");

        setData(newData)

        return correct_answer
    }

    return { data, updateData, card, error };
}
