import React from 'react';
import { Menu, Avatar, Layout, Divider } from 'antd';
import {
  PushpinOutlined,
  PlaySquareOutlined,
  DashboardOutlined,
  UserOutlined,
  SmileOutlined,
  ToolOutlined,
  TableOutlined,
} from '@ant-design/icons';
import { Container } from './LeftMenu.styled';
import logo from 'assets/images/logo.png';
import { FlexDiv } from 'stylesheet/div/div.styled';
import { useDispatch, useSelector } from 'react-redux';
import LoginAction from 'modules/auth/actions/authAction';
import { Link } from 'react-router-dom';
import { BsBookmarkHeart } from "react-icons/bs";

import { MdPayment, MdManageAccounts } from "react-icons/md";

const { Sider } = Layout;

export default function LeftMenu() {
  const [collapsed, setCollapsed] = React.useState(false);
  const { type } = useSelector((state) => state.auth.user)
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
            <Link to='/'>
              Booking
            </Link>
          </Menu.Item>
          {/* <Menu.Item key="2" icon={<MdPayment />}>
            <Link to='/payment'>
              Payment
            </Link>
          </Menu.Item> */}
          {type === 'ADMIN' ? (
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to='/user'>
                Account
              </Link>
            </Menu.Item>
          ) : null}

          {/* <Menu.Item key="sub1" icon={<SmileOutlined />}>
            <Link to='/profile'>
              Profile
            </Link>
          </Menu.Item>
          <Menu.Item key="sub2" icon={<MdManageAccounts />}>
            <Link to='/account'>
              Manage Account
            </Link>
          </Menu.Item>
          <Menu.Item key="sub3" icon={<ToolOutlined />}>
            <Link to='/tools'>
              Tools
            </Link>
          </Menu.Item>
          <Menu.Item key="sub4" icon={<PushpinOutlined />}>
            <Link to='/resouce'>
              Resource
            </Link>
          </Menu.Item> */}
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
