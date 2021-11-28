import styled from 'styled-components';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

export const LayoutStyled = styled(Layout)`
  height: 100%;
  background: #fff;
`;
export const ContentStyled = styled(Content)`
  // padding: 25px;
`;
export const HeaderStyled = styled(Header)`
  background: #fff;
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  display: flex;
  justify-content: space-between;
  height: 65px;
  padding-left: 55px;

  padding-right: 25px !important;

  .iconHeader {
    font-size: 20px;
    &:hover {
      opacity: 0.5;
      cursor pointer;
    }
  }
`;
export const FooterStyled = styled(Footer)``;
