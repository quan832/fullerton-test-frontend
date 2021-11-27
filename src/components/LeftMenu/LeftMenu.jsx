import React from 'react';
import { Menu, Avatar, Layout, Divider } from 'antd';
import {
  PushpinOutlined,
  // MenuUnfoldOutlined,
  // MenuFoldOutlined,
  PlaySquareOutlined,
  DashboardOutlined,
  UserOutlined,
  SmileOutlined,
  ToolOutlined
} from '@ant-design/icons';
import { Container } from './LeftMenu.styled';
import logo from 'assets/images/logo.png';
import { FlexDiv } from 'stylesheet/div/div.styled';

const { Sider } = Layout;

export default function LeftMenu() {
  const [collapsed, setCollapsed] = React.useState(false);
  return (
    <Container>
      <Sider
        width={256}
        trigger={null}
        collapsible
        className="site-layout-background sider"
        collapsed={collapsed}
        // onMouseLeave={(e) => {
        //   if (!collapsed) {
        //     setCollapsed(true);
        //   }
        // }}
        // onMouseEnter={(e) => {
        //   if (collapsed) {
        //     setCollapsed(false);
        //   }
        // }}
      >
        <div className="logo">
          <img src={logo} alt=""></img>
        </div>
        <Divider />
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          className="menu-style"
          subMenuCloseDelay={0.8}
          subMenuOpenDelay={0.8}
          // selectedKeys={'/'}
          // style={{ height: "100%" }}
          // theme="dark"
          // inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Booking
          </Menu.Item>
          <Menu.Item key="2" icon={<PlaySquareOutlined />}>
            Payment
          </Menu.Item>
          <Menu.Item key="sub1" icon={<SmileOutlined />}>
            Profile
          </Menu.Item>
          <Menu.Item key="sub2" icon={<ToolOutlined />}>
            Tools
          </Menu.Item>
          <Menu.Item key="sub3" icon={<PushpinOutlined />}>
            Resource
          </Menu.Item>
        </Menu>
        <div className="logout-menu">
          <Divider />
          <FlexDiv rowReverse spaceBetween>
            <p className="font-weight-medium text-dark hover-primary">Logout</p>
            <p className="text-fade">Booking System</p>
          </FlexDiv>
        </div>
      </Sider>
    </Container>
  );
}
