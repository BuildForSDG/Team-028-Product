/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import { Switch, Router, Route, Link } from "react-router-dom";
import { 
  ProfileOutlined, 
  UsergroupAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  PieChartOutlined,
  BellFilled,
  UserOutlined,
  WalletOutlined,
  EditOutlined,
  OrderedListOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, Row, Col,Badge, Dropdown, Avatar } from "antd";
import {connect} from "react-redux";
import Investors from "./Investors";
import Projects from "./Projects";
import Users from "./Users";
import SMEs from "./SMEs";
import Funds from "./Funds";
import Projectcategories from "../admin/category/View";
import Create from "../general/Create";
import Remove from "../general/Remove";
import Update from "../general/Update";
import ProfileDetails from "./user/ProfileDetails";
import EditProfile from "./user/EditProfile";

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
    <Link to="/regulator/Settings"> Logout</Link>
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
    // use localStorage.getItem("user") to get the user object
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ paddingTop: "42px" }}>
          <div className="logo"></div>          
          <br />
          <Menu
            theme="dark"
            onClick={this.handleClick}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="/Regulator/ProfileDetails">Profile Details</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<PieChartOutlined />} title="Projects">
              <Menu.Item key="5">
                <Link to="/regulator/Projectcategories"> Project Categories</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/regulator/Projects">View Projects</Link>
              </Menu.Item>
            </SubMenu>
              <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                <Link to="/regulator/Investors">Investors List</Link>
              </Menu.Item>
            <Menu.Item key="3" icon={<OrderedListOutlined />}>
              <Link to="/regulator/SMEs"> SMEs List</Link>
            </Menu.Item>           
        
          <SubMenu key="sub2" icon={<WalletOutlined />} title="Funds">
          <Menu.Item key="7" icon={<EditOutlined />}>
            <Link to="/regulator/Funds"> Funds Application</Link>
          </Menu.Item>             
          </SubMenu>
          <SubMenu key="sub3" icon={<UserOutlined />} title="User">
              <Menu.Item key="8" icon={<UserOutlined />}>
                <Link to="/regulator/create-user">Create</Link>
              </Menu.Item>
              <Menu.Item key="9" icon={<UserOutlined />}>
                <Link to="/regulator/update-user">Update</Link>
              </Menu.Item>
              <Menu.Item key="10" icon={<UserOutlined />}>
                <Link to="/regulator/deactivate-user">Deactivate</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="4" icon={<LogoutOutlined />}>
              {" "}
              Log Out
            </Menu.Item>
        </Menu>
        </Sider>
        <Layout className="site-layout">
          <nav className="navbar">
                <Link className="dashboard-img" to="#">
                  <img src={"https://res.cloudinary.com/lordefid/image/upload/c_scale,h_50/v1590937828/Group_160_2x_wad30b.png"} alt="logo" />
                </Link>
                <div>
                  <Badge className="badge-item" count={5}>
                    <a href="#" className="example" />
                  </Badge>
                    <BellFilled className="notificationBell" />
                  </div>
                <Dropdown overlay={menu}>
                  <Avatar src="https://res.cloudinary.com/lordefid/image/upload/v1567112037/220190826_163351912_r9yfcl.jpg" className="ant-dropdown-link" onClick={(e) => e.preventDefault()} />
                </Dropdown>
            </nav>
          <Content style={{ margin: "0 16px" }}>
            <Router history={this.props.history}>
              <Switch>
                <Route path="/regulator/projects" component={Projects} />
                <Route path="/regulator/Projectcategories" component={Projectcategories} />
                <Route path="/regulator/Investors" component={Investors} />
                <Route path="/regulator/SMEs" component={SMEs} />
                <Route path="/regulator/Users" component={Users} />
                <Route path="/regulator/Funds" component={Funds} />
                <Route path="/regulator/create-user" component={Create} />
                <Route path="/regulator/update-user" component={Update} />
                <Route path="/regulator/deactivate-user" component={Remove} />
                <Route path="/regulator/ProfileDetails" component={ProfileDetails} />
                <Route path="/regulator/EditProfile" component={EditProfile} />
              </Switch>
            </Router>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  companyName: state.regulator.companyName,
  category: state.regulator.category,
  userId: state.regulator.userId
});

export default connect(mapStateToProps)(RegulatorDashboard);
