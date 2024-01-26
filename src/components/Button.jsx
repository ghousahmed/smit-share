import { useTheme } from "../context/ThemeContext";

function ThemeButton({ disabled, title, onClick }) {
  const {theme} =  useTheme()
  return (
    <button
      style={{backgroundColor: theme === 'dark' ? '#23272f' : '#fff', color: theme === 'dark' ? 'white' : '', borderColor: disabled && "#a1a3a1" }}
      disabled={disabled}
      className="theme-btn"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default ThemeButton;
