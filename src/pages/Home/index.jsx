import "./css/style.scss";
import "../../mediaquery/mediaquery.scss";
import {
  Navbar,
  useTheme,
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
  FILE_COLOR,
  FILE_GREY,
  TEXT_COLOR,
  TEXT_GREY,
  FaDownload,
  MdDelete,
  Modal,
  useTranslation,
  FiMenu,
  MdLightMode,
  MdDarkMode,
  Footer,
  FaGithub,
  Link,
} from "../../components/index.js";

function HomePage({ login }) {
  const { isDark } = useTheme();
  const screenWidth = useScreenWidth();
  const { t, i18n } = useTranslation();
  const [isText, setIsText] = useState(false);
  const [type, setType] = useState("text");
  const [textValue, setTextValue] = useState("");
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

  useEffect(() => {
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDark]);

  const getFontFamily = () => {
    switch (i18n.language) {
      case "ur":
        return "urdu-font";
      default:
        return "english-font";
    }
  };

  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  const links = textValue.match(regex) || [];

  return (
    <div className={`container ${getFontFamily()} ${isDark ? "dark" : " "}`}>
      <Navbar login={login} />
      <div className="main-card">
        <div className={`card-sidebar ${isDark ? "dark" : " "}`}>
          {screenWidth.widthScreen <= 768 ? (
            type === "text" ? (
              <h1 className={isDark ? "dark-text" : " "}>{t("Text")}</h1>
            ) : (
              <h1 className={isDark ? "dark-text" : " "}>{t("Files")}</h1>
            )
          ) : null}
          <div>
            <div
              onClick={() => setType("text")}
              className={
                type === "text" ? (isDark ? "dark-light" : "active") : ""
              }
            >
              <img src={type === "text" ? TEXT_COLOR : TEXT_GREY} alt="" />
            </div>
            <div
              onClick={() => setType("files")}
              className={
                type === "files" ? (isDark ? "dark-light" : "active") : ""
              }
            >
              <img src={type === "files" ? FILE_COLOR : FILE_GREY} alt="" />
            </div>
          </div>
        </div>
        <div className={`card-container ${isDark ? "dark-light" : " "}`}>
          {type === "text" ? (
            <div className="text-section">
              {screenWidth.widthScreen > 768 ? (
                <h1 className={isDark ? "dark-light" : " "}>{t("Text")}</h1>
              ) : null}
              <div className="resize-section">
                <TextArea
                  value={textValue}
                  className={isDark ? "dark-lighter" : " "}
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
                  <span onClick={clearText}>{t("Clear")}</span>
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
                      title={t("Save")}
                      className={`${getFontFamily()} ${
                        isDark ? "dark-lighter" : " "
                      }`}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="files-section">
              <div className="files-header">
                {screenWidth.widthScreen > 768 ? (
                  <h1 className={isDark ? "dark-light" : " "}>{t("Files")}</h1>
                ) : null}
                <div className="files-btn">
                  <div
                    onClick={() => {
                      if (files.length > 0) {
                        downloadAll(files);
                      } else {
                        Modal.info({
                          title: "No Files to Download",
                          content: "There are no files to download.",
                        });
                      }
                    }}
                    className="download-btn"
                  >
                    <FaDownload />
                    {t("Download All")}
                  </div>
                  <div onClick={deleteAllFiles} className="delete-btn">
                    <MdDelete />
                    {t("Delete All")}
                  </div>
                </div>
              </div>
              {tempFiles.length || files.length ? (
                <FilesList
                  className={
                    tempFiles.length || files.length ? "fixHight" : " "
                  }
                  tempFiles={tempFiles}
                  files={files}
                  onDrop={onDrop}
                />
              ) : (
                <DropZone
                  onDrop={onDrop}
                  textElement={
                    <>
                      {t("Drag and drop any files up to 2 files, 5Mbs each or")}
                      <span>{t("Browse Upgrade")}</span>
                      {t("to get more space")}
                    </>
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
