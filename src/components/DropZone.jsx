import { useDropzone } from "react-dropzone";
import "./index.scss";

function DropZone({ textElement, onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div className="drop-zone " {...getRootProps()}>
      <input {...getInputProps()} />
      <div>{textElement}</div>
    </div>
  );
}

export default DropZone;
