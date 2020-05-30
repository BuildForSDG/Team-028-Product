/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import { Badge, Dropdown, Avatar } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { CaretDownFilled, UsergroupAddOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { BellFilled } from "@ant-design/icons";
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Switch, Router, Route, Link } from "react-router-dom";
import { FileDoneOutlined } from "@ant-design/icons";
import { CaretDownFilled, UsergroupAddOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, Row, Col,Badge, Dropdown, Avatar } from "antd";
import {AppstoreOutlined, DollarCircleOutlined,BellFilled } from "@ant-design/icons";
import { DesktopOutlined, PieChartOutlined,MailOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import Investors from "./Investors";
import Projects from "./Projects";
import Users from "./Users";
import SMEs from "./SMEs";
import Funds from "./Funds";
import Projectcategories from "./Projectcategories";


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

const menu = (
  <Menu id="dropdown-menu">
    <Menu.Item className="menu-icon" icon={<UserOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Profile
      </a>
    </Menu.Item>
    <Menu.Item className="menu-icon" icon={<UsergroupAddOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Manage Users
      </a>
    </Menu.Item>
    <Menu.Item className="menu-icon" icon={<FileDoneOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Review Reports
      </a>
    </Menu.Item>
    <Menu.Item className="menu-icon" icon={<SettingOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Settings
      </a>
    </Menu.Item>
    <Menu.Item className="menu-icon" icon={<LogoutOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Logout
      </a>
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
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ paddingTop: "60px" }}>
          <div className="logo"></div>          
          <br />
        <br />
        <Menu
          theme="dark"
          onClick={this.handleClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="Projects">
            <Menu.Item key="1"><Link to="/regulator/Projectcategories"> Project Categories</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/regulator/Projects"> Projects List</Link></Menu.Item>
                </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Investors">
          <Menu.Item key="1"><Link to="/regulator/Investors"> Investors List</Link></Menu.Item>
          </SubMenu>
            <SubMenu key="sub3" title="SMEs">
            <Menu.Item key="1"><Link to="/regulator/SMEs"> SMEs List</Link></Menu.Item>           
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Funds">
          <Menu.Item key="1"><Link to="/regulator/Funds"> Funds Application</Link></Menu.Item>             
          </SubMenu>
          <SubMenu key="sub5" icon={<SettingOutlined />} title="Users">
          <Menu.Item key="1"><Link to="/regulator/Users"> Users List</Link></Menu.Item>  
         
          </SubMenu>
        </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
          <Header className="site-layout-background header">
          <ul className="dashboard-items">
                <li className="dashboard-item-1">
                    <Link className="dashboard-img" to="#">
                      <img src={"./logo.png"} alt="logo" />
                    </Link></li>
                    <li className="dashboard-item-1 item-right">
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      <CaretDownFilled />
                      </a>
                    </Dropdown>                 
                      <Link to="/#" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}> </Link>
                       </Dropdown>
                </li>  
                <li className="dashboard-item-1 item-right">   
                    <Avatar src="https://res.cloudinary.com/lordefid/image/upload/v1567112037/220190826_163351912_r9yfcl.jpg" />
                </li>
                <li className="dashboard-item-1 item-right">
                    <Badge className="badge-item" count={5}>
                      <a href="#" className="example" />

                     <Link to="/#" className="example"> </Link>
                    </Badge>
                    <BellFilled className="notificationBell" />
                </li>
              </ul>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Router history={this.props.history}>
              <Switch>
              <Route path="/regulator/projects" component={Projects} />
              <Route path="/regulator/Projectcategories" component={Projectcategories} />
                <Route path="/regulator/Investors" component={Investors} />
                <Route path="/regulator/SMEs" component={SMEs} />
                <Route path="/regulator/Users" component={Users} />
                <Route path="/regulator/Funds" component={Funds} />
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
