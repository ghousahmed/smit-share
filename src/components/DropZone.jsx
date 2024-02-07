import { useDropzone } from "react-dropzone";
import { useTheme } from "../context/ThemeContext";
import "./index.scss";

function DropZone({ textElement, onDrop, className }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { isDark } = useTheme();
  return (
    <div
      className={`drop-zone ${isDark ? "dark-lighter" : null}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div>{textElement}</div>
    </div>
  );
}

export default DropZone;
