import "./css/style.scss";
import "../../mediaquery/mediaQuery.scss";
import {
  downloadAll,
  uploadFile,
  useScreenWidth,
  TextArea,
  ThemeButton,
  DropZone,
  FilesList,
  useEffect,
  useState,
  db,
  ref,
  set,
  onValue,
  remove,
  LOGO,
  FILE_COLOR,
  FILE_GREY,
  TEXT_COLOR,
  TEXT_GREY,
  FaDownload,
  MdDelete,
  FiMenu,
} from "../../components/index.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import { MdLightMode } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";

function HomePage() {
  const { theme, toggleTheme } = useTheme();
  const screenWidth = useScreenWidth();

  let styles ={
      color: theme === 'dark' ? '#fff' : '',
      backgroundColor: theme === 'dark' ? '#23272F' : '',
  }

  const [type, setType] = useState("text");
  const [textValue, setTextValue] = useState("");
  const [isText, setIsText] = useState(false);
  const [files, setFiles] = useState([]);
  const [tempFiles, setTempFiles] = useState([]);

  const onDrop = async (acceptedFiles) => {
    setTempFiles([...tempFiles, ...acceptedFiles]);
    let arr = [];
    for (var i = 0; i < acceptedFiles.length; i++) {
      arr.push(uploadFile(acceptedFiles[i], files.length + i));
    }
    const allFiles = await Promise.all(arr);
    setFiles([...files, ...allFiles]);
    set(ref(db, "file-sharing"), {
      files: [...files, ...allFiles],
    });
    setTempFiles([]);
  };

  const saveChanges = () => {
    set(ref(db, "text-sharing"), {
      text: textValue,
    });
  };

  const clearText = async () => {
    await remove(ref(db, "text-sharing"));
    setTextValue("");
    setIsText(false);
  };

  const deleteAllFiles = async () => {
    await remove(ref(db, "file-sharing"));
    setFiles([]);
  };

  useEffect(() => {
    const textRef = ref(db, "text-sharing");
    onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.text) {
        setTextValue(data.text);
        setIsText(true);
      }
    });
    const fileRef = ref(db, "file-sharing");
    onValue(fileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFiles(data.files);
      }
    });
  }, []);

  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  const links = textValue.match(regex) || [];

  return (
    <div className="container">
      <div className="header-bar">
        <div className="logo">
          <img src={LOGO} alt="" />
        </div>
        <div className="menu-bar">
          {screenWidth.widthScreen > 768 ? (
            <ul>
              <li style={styles}>How it works</li>
              <li style={styles}>Download</li>
              <li style={styles}>Upgrade</li>
              <li style={styles}>Feedback </li>
              <li className="menu-btn"><span> <Link className="menu-btn" style={{textDecoration:"none"}} to={"/login"}> Login </Link></span>/ <span> <Link className="menu-btn" to={"/signup"} style={{textDecoration:"none"}}> Register </Link></span></li>
              <li onClick={toggleTheme}> {theme === 'light' ? <MdDarkMode size={24} /> : <MdLightMode  size={24} color="white"/>} </li>
            </ul>
          ) : (
            <ul>
              <li>
                <FiMenu size={30} />
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className="main-card" style={{backgroundColor: theme === 'dark' ? 'rgb(20 23 30)' : ''}}>
        <div className="card-sidebar" style={{backgroundColor: theme === 'dark' ? 'rgb(20 23 30)' : '' }}>
          {screenWidth.widthScreen <= 768 ? (
            type === "text" ? (
              <h1 style={styles}>Text</h1>
            ) : (
              <h1 style={styles}>Files</h1>
            )
          ) : null}
          <div>
            <div
              onClick={() => setType("text")}
              className={type === "text" ? "active" : ""}
            >
              <img src={type === "text" ? TEXT_COLOR : TEXT_GREY} alt="" />
            </div>
            <div
              onClick={() => setType("files")}
              className={type === "files" ? "active" : ""}
            >
              <img src={type === "files" ? FILE_COLOR : FILE_GREY} alt="" />
            </div>
          </div>
        </div>
        <div className="card-container">
          {type === "text" ? (
            <div className="text-section">
              {screenWidth.widthScreen > 768 ? <h1 style={{color: theme === 'dark' ? '#fff' : ''}}>Text</h1> : null}
              <div className="resize-section">
              <TextArea
                
                value={textValue}
                onChange={(e) => {
                  setTextValue(e.target.value);
                  setIsText(false);
                }}
              />
              </div>
              <div className="text-footer">
                <div className="links">
                  {links.map((v, i) => (
                    <div key={i}>
                      <span>
                        <a href={v} target="_blank" rel="noopener noreferrer">
                          {v}
                        </a>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="save-btn-section">
                  <span style={{color: theme === 'dark' ? '#fff' : ''}} onClick={clearText}>Clear</span>
                  {isText ? (
                    <ThemeButton
                      onClick={() => {
                        navigator.clipboard.writeText(textValue);
                      }}
                      title={"Copy"}
                    />
                  ) : (
                    <ThemeButton
                      onClick={saveChanges}
                      disabled={textValue ? false : true}
                      title={"Save"}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="files-section">
              <div className="files-header">
                {screenWidth.widthScreen > 768 ? <h1 style={{color: theme === 'dark' ? '#fff' : ''}}>Files</h1> : null}
                <div className="files-btn">
                  <div
                    onClick={() => downloadAll(files)}
                    className="download-btn"
                  >
                    <FaDownload />
                    Download All
                  </div>
                  <div onClick={deleteAllFiles} className="delete-btn">
                    <MdDelete />
                    Delete All
                  </div>
                </div>
              </div>
              {tempFiles.length || files.length ? (
                <FilesList
                  tempFiles={tempFiles}
                  files={files}
                  onDrop={onDrop}
                />
              ) : (
                <DropZone
                  onDrop={onDrop}
                  textElement={
                    <>
                      Drag and drop any files up to 2 files, 5Mbs each or{" "}
                      <span>Browse Upgrade</span> to get more space
                    </>
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
