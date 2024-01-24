import "./index.scss";
import { useEffect, useRef } from "react";
function TextArea({ value, onChange }) {
    const textareaRef = useRef()

    const resizeTextArea = (event) => {
        textareaRef.current.style.height = "24px"
        textareaRef.current.style.height = textareaRef.current.scrollHeight + 12 + "px"
    }

    useEffect(() => {
        resizeTextArea()
    }, [value])

    return (
        <textarea value={value} onChange={onChange} ref={textareaRef} onInput={resizeTextArea} placeholder="Type something..." className="text-area"></textarea>
    )
}

export default TextArea;