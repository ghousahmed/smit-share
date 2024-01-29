import "./index.scss";
import { useTheme } from "../context/ThemeContext.jsx";
import { useEffect, useRef } from "react";

function TextArea({ value, onChange, className }) {
  const { isDark, toggleTheme } = useTheme();
  const textareaRef = useRef();
  const resizeTextArea = (event) => {
    textareaRef.current.value.length >= 200
      ? ((textareaRef.current.style.height = "240px"),
        (textareaRef.current.style.height =
          textareaRef.current.scrollHeight + 12 + "px"))
      : (textareaRef.current.style.height = "240px");
  };

  useEffect(() => {
    resizeTextArea();
  }, [value]);

  return (
    <textarea
      value={value}
      onChange={onChange}
      ref={textareaRef}
      onInput={resizeTextArea}
      placeholder="Type something..."
      className={`text-area ${className}`}
    ></textarea>
  );
}

export default TextArea;
