import "../../mediaquery/mediaquery.scss";
import "../../pages/Home/css/style.scss";
import LoginForm from "../../components/LoginForm";
import { Switch, notification } from "antd";
import { auth, signInWithEmailAndPassword } from "../../db/index";
import Footer from "../../components/Footer";
import { Navbar } from "../../components";

function LoginPage({ login }) {
  let loginUser = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        notification.success({
          message: "Login Success",
          description: `Welcome, ${user.email}!`,
          duration: 2.5,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        notification.error({
          message: "Login Failed",
          description: errorMessage,
          duration: 2.5,
        });
      });
  };

  return (
    <div className="container">
      <Navbar />
      <div className="main-card">
        <LoginForm loginUser={loginUser} />
      </div>
      <Footer />
    </div>
  );
}
export default LoginPage;
