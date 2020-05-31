/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import { Badge, Dropdown, Avatar } from "antd";
import { Switch, Router, Route, Link } from "react-router-dom";
import {
  CaretDownFilled,
  UsergroupAddOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
  BellFilled
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import Create from "./user/Create";
import Remove from "./user/Remove";
import Update from "./user/Update";


const menu = (
  <Menu id="dropdown-menu">
    <Menu.Item className="menu-icon" icon={<UserOutlined />}>
    <Link to="/regulator/Profile"> Profile</Link>
    </Menu.Item>
    <Menu.Item className="menu-icon" icon={<UsergroupAddOutlined />}>
    <Link to="/regulator/OrgUsers"> Manage Users</Link>
    </Menu.Item>
      <Menu.Item className="menu-icon" icon={<SettingOutlined />}>
      <Link to="/regulator/Settings"> Settings</Link>
    </Menu.Item>
    <Menu.Item className="menu-icon" icon={<LogoutOutlined />}>
    <Link to="#"> Log out</Link>
     
    </Menu.Item>
  </Menu>
);

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class RegulatorDashboard extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to="/regulator/create-user">Create</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<UserOutlined />}>
                <Link to="/regulator/update-user">Update</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<UserOutlined />}>
                <Link to="/regulator/deactivate-user">Deactivate</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <ul className="dashboard-items">
              <li className="dashboard-item-1">
                <Link className="dashboard-img" to="#">
                  <img src={"./logo.png"} alt="logo" />
                </Link>
              </li>
              <li className="dashboard-item-1 item-right">
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    <CaretDownFilled />
                  </a>
                </Dropdown>
              </li>
              <li className="dashboard-item-1 item-right">
                <Avatar src="https://res.cloudinary.com/lordefid/image/upload/v1567112037/220190826_163351912_r9yfcl.jpg" />
              </li>
              <li className="dashboard-item-1 item-right">
                <Badge className="badge-item" count={5}>
                  <a href="#" className="example" />
                </Badge>
                <BellFilled className="notificationBell" />
              </li>
            </ul>

          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Router history={this.props.history}>
              <Switch>
                <Route path="/regulator/create-user" component={Create} />
                <Route path="/regulator/update-user" component={Update} />
                <Route path="/regulator/deactivate-user" component={Remove} />
             </Switch>
            </Router>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    );
  }
}

export default RegulatorDashboard;
