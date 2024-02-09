import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

function Footer() {
  const link = () => {
    window.location = "https://github.com/ghousahmed/smit-share";
  };
  const webLink = () => {
    window.location = "https://saylaniwelfare.com/en";
  };
  return (
    <div className="footerArea">
      <p className="para">
        Powered By @SMIT Batch 10 ( MWF )<br />
        <a className="sirGithub" href="https://github.com/ghousahmed">
          Sir Ghous Ahmed
        </a>{" "}
      </p>
      <div className="linksContainer">
        <FaGithub className="links" onClick={link} />
        <TbWorld className="links" onClick={webLink} />
      </div>
    </div>
  );
}

export default Footer;
