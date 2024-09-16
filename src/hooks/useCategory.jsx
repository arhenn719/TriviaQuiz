import { useEffect, useState } from "react";

export function useCategory(url) {
    const [data, setData] = useState({});
    const [error, setError] = useState({});

    useEffect(() => {
        fetch(url).then((response) => response.json()).then((data) => setData(data)).catch((error) => setError(error))
    }, [])

    return { data, error }

}