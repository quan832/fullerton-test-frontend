import styled from 'styled-components';

export const Container = styled.div`
  .ant-layout-sider {
    height: 100%;
    box-shadow: -3px 0 5px 0 #555;
  }

  .ant-layout-sider-children {
    background: white;
  }

  .logo {
    margin: 10px;
    display: flex;
    align-items: center;
    img {
      width: 108px;
      padding: 10px;
      // height: 62px;
    }
    height: 80px;
    background: #fff;
  }
  .logo img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 225px;
  }

  .menu-style {
    background: #fff;
    .ant-menu-item {
      height: 57px !important;
    }
  }
`;
