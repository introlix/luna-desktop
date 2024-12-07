import { useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs"

export const Theme = () => {
    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }
    return (
        <div>
            <button onClick={() => darkModeHandler()}>
                {

                    dark && <BsSun /> // render sunny when dark is true
                }
                {
                    !dark && <BsMoon /> // render moon when dark is false
                }
            </button>
        </div>
    )
}
