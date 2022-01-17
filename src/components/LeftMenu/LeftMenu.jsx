import React from 'react';
import { Menu, Avatar, Layout, Divider } from 'antd';
import {
  PushpinOutlined,
  PlaySquareOutlined,
  DashboardOutlined,
  UserOutlined,
  SmileOutlined,
  ToolOutlined,
  TableOutlined
} from '@ant-design/icons';
import { Container } from './LeftMenu.styled';
import logo from 'assets/images/logo.png';
import { FlexDiv } from 'stylesheet/div/div.styled';
import { useDispatch } from 'react-redux';
import LoginAction from 'modules/auth/actions/authAction';
import { Link } from 'react-router-dom';
import { BsBookmarkHeart} from "react-icons/bs";

import { MdPayment } from "react-icons/md";

const { Sider } = Layout;

export default function LeftMenu() {
  const [collapsed, setCollapsed] = React.useState(false);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(LoginAction.logoutUser());
  };

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
          <Menu.Item key="1" icon={<BsBookmarkHeart />}>
            Booking
          </Menu.Item>
          <Menu.Item key="2" icon={<MdPayment />}>
            Payment
          </Menu.Item>
          <Menu.Item key="3" icon={<TableOutlined />}>
            <Link to='/user'>
              Clinic
            </Link> 
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
            <p onClick={onLogout} className="font-weight-medium text-dark hover-primary">
              Logout
            </p>
            <p className="text-fade">Booking System</p>
          </FlexDiv>
        </div>
      </Sider>
    </Container>
  );
}
