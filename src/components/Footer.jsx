import "./index.scss";
import { FaGithub } from "react-icons/fa";
import { Link, useTheme } from "../components/index";
function Footer() {
  const { isDark } = useTheme();
  return (
    <>
      <div>
        <p className="footer">
          Made with ❤️ BY SMIT BATCH 10 ||
          <span className="footer-link">
            <Link
              onClick={() =>
                window.open(
                  "https://github.com/ghousahmed/smit-share",
                  "_blank"
                )
              }
            >
              <FaGithub
                target="_blank"
                className={isDark ? "dark-text" : null}
              />
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}

export default Footer;
