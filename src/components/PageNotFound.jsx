import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import ThemeButton from './Button';
const PageNotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={ <Link to={"/"}> <ThemeButton type="primary" title={"Back"} /> </Link> }
  />
);
export default PageNotFound;