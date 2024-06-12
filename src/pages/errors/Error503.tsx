import { Result } from 'antd';
import { BackBtn, RefreshBtn } from '../../components';

const Error503Page = () => {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      extra={[<BackBtn type="primary" />, <RefreshBtn />]}
    />
  );
};

export default Error503Page;
