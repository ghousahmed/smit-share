function ThemeButton({ disabled, title, onClick }) {
  return (
    <button
      style={{ borderColor: disabled && "#a1a3a1" }}
      disabled={disabled}
      className="theme-btn"
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default ThemeButton;
