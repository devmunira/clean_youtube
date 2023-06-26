import { useState } from "react";

const useBoolean = () => {
    const [boolean, setBoolean] = useState(false);
    return{
        boolean, setBoolean
    }
}

export default useBoolean