function ThemeButton({ disabled, title, onClick, className }) {
  return (
    <button
      style={{ borderColor: disabled && "#a1a3a1" }}
      disabled={disabled}
      className={`theme-btn ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default ThemeButton;
