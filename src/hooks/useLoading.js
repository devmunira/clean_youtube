import { useState } from "react"

const useLoading = () => {
    const [loading, setloading] = useState(false);
    return{
        loading,
        setloading
    }
}

export default useLoading;