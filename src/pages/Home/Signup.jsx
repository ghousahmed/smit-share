import "../../mediaquery/mediaquery.scss";
import SignupForm from "../../components/SignupForm";
import Footer from "../../components/Footer";
import { auth, createUserWithEmailAndPassword } from "../../db/index";
import { Switch, notification } from "antd";
import { Navbar } from "../../components";

function SignupPage({ login }) {
  const registerUser = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        notification.success({
          message: "Registered Successfully",
          description: `Welcome, ${user.email}!`,
          duration: 2.5,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        notification.error({
          message: "Error Occured",
          description: `Sorry, ${errorMessage}`,
          duration: 2.5,
        });
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="main-card">
        <SignupForm registerUser={registerUser} />{" "}
      </div>
      <Footer />
    </div>
  );
}
export default SignupPage;
