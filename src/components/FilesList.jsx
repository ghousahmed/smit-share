import { CiFileOn } from "react-icons/ci";
import DropZone from "./DropZone";
import { GoPlus } from "react-icons/go";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import LOADER from "../assets/loader.gif";

function FilesList({ tempFiles, files, onDrop }) {
  return (
    <div className="files-list">
      {files.map((v, i) => {
        let icon;
        switch (v.type) {
          case "text/html":
            icon = <FaHtml5 />;
            break;
          case "text/css":
            icon = <FaCss3Alt />;
            break;
          case "text/javascript":
            icon = <IoLogoJavascript />;
            break;
          default:
            icon = <CiFileOn />;
        }
        return (
          <a href={v.url} target="_blank" download key={i}>
            <div>
              {v.type.indexOf("image") !== -1 ? (
                <img
                  className="image-file"
                  height={100}
                  width={100}
                  src={v.url}
                  alt=""
                />
              ) : (
                <>
                  {icon}
                  <span className="file-name">
                    {v.name.slice(0, 10)}
                    <b>{v.name.slice(v.name.lastIndexOf("."))}</b>
                  </span>
                </>
              )}
            </div>
          </a>
        );
      })}
      {tempFiles.map((v, i) => {
        let icon;
        switch (v.type) {
          case "text/html":
            icon = <FaHtml5 />;
            break;
          case "text/css":
            icon = <FaCss3Alt />;
            break;
          case "text/javascript":
            icon = <IoLogoJavascript />;
            break;
          default:
            icon = <CiFileOn />;
        }
        return (
          <div className="temp-file" key={i}>
            {v.type.indexOf("image") !== -1 ? (
              <img
                className="image-file"
                height={100}
                width={100}
                src={URL.createObjectURL(v)}
                alt=""
              />
            ) : (
              <>
                {icon}
                <span className="file-name">
                  {v.name.slice(0, 10)}
                  <b>{v.name.slice(v.name.lastIndexOf("."))}</b>
                </span>
              </>
            )}
            <img className="upload-loader" src={LOADER} alt="" />
          </div>
        );
      })}

      <div>
        <DropZone
          onDrop={onDrop}
          textElement={
            <span className="add-more-files">
              <GoPlus />
              <p>Add file</p>
              <span>(Upto 5 MB)</span>
            </span>
          }
        />
      </div>
    </div>
  );
}

export default FilesList;
