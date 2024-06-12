import { Flex, FlexProps, theme, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

import './styles.css';

type LogoProps = {
  color: CSSProperties['color'];
  imgSize?: {
    h?: number | string;
    w?: number | string;
  };
  asLink?: boolean;
  href?: string;
  bgColor?: CSSProperties['backgroundColor'];
} & Omit<FlexProps, 'children'>;

const Logo = ({ color, href, imgSize, bgColor, ...others }: LogoProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  return (
    <Link to={href || '#'} className="logo-link">
      <Flex gap={others.gap || 'small'} align="center" {...others}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
          alt="design sparx logo"
          height={imgSize?.h || 48}
        />
        <Typography.Title
          level={4}
          type="secondary"
          style={{
            color,
            margin: 0,
            padding: `4px 8px`,
            backgroundColor: bgColor,
            borderRadius,
          }}
        >
          Admin Dashboard
        </Typography.Title>
      </Flex>
    </Link>
  );
};

export default Logo;
