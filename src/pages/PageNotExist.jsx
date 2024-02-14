import { Result } from "antd";

const PageNotExist = () => {
  return (
    <div className="container">
      <div className="main-card">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
        />
      </div>
    </div>
  );
};

export default PageNotExist;
