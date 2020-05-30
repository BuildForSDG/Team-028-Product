/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import { Badge, Dropdown, Layout, Menu, Breadcrumb } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { CaretDownFilled, UsergroupAddOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { BellFilled } from "@ant-design/icons";
import { DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import SmeProposals from "./SmeProposals";
import TotalInvestments from "./TotalInvestments";
import AddUsers from "./AddUsers";
import AllUsers from "./AllUsers";
import InvestmentHistory from "./InvestmentHistory";
import { Badge, Dropdown, Layout, Menu, Breadcrumb } from "antd";
import { FileDoneOutlined } from "@ant-design/icons";
import { CaretDownFilled, UsergroupAddOutlined, SettingOutlined, LogoutOutlined, ReconciliationOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { Switch, Router, Route, } from "react-router-dom";
import { BellFilled, UserAddOutlined, UserSwitchOutlined, RiseOutlined } from "@ant-design/icons";
import { BarChartOutlined, PieChartOutlined, FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";


const menu = (
  <Menu id="dropdown-menu">
    <Menu.Item className="menu-icon" icon={<UserOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Profile
      </a>
      <Link to="/investor/SmeProposals">All Proposals</Link>
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

class InvestorDashboard extends React.Component {
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
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="/investor/SmeProposals">All Proposals</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<BarChartOutlined />}>
              <Link to="/investor/InvestmentHistory">Investment History</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="4"><Link to="/investor/AddUsers"><UserAddOutlined />Add Users</Link></Menu.Item>
              <Menu.Item key="3" icon={<UserSwitchOutlined />}><Link to="/investor/AllUsers">All Users</Link></Menu.Item>
              <Menu.Item key="5" icon={<ReconciliationOutlined />}><Link to="/investor/Investroles">Roles</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="7">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<RiseOutlined />}><Link to="/investor/TotalInvestments">Total Funds Invested</Link></Menu.Item>
            <Menu.Item key="3" icon={<LogoutOutlined/>}> Log Out</Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
              <ul className="dashboard-items">
                <li className="dashboard-item-1">
                    <Link className="dashboard-img" to="#">
                      <img src={"./logo.png"} alt="logo" />
                    </Link></li>
                <li className="dashboard-item-1 item-right">
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                      <CaretDownFilled id="menu-trigger" />
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
            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Router history={this.props.history}>
              <Switch>
                <Route path="/investor/SmeProposals" component={SmeProposals} />
                <Route path="/investor/InvestmentHistory" component={InvestmentHistory} />
                <Route path="/investor/TotalInvestments" component={TotalInvestments} />
                <Route path="/investor/AddUsers" component={AddUsers} />
                <Route path="/investor/AllUsers" component={AllUsers} />
              </Switch>
            </Router>
            </div>
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>eaZSME ©2020  Created by Team-028</Footer> */}
        </Layout>
      </Layout>
    );
  }
}

export default InvestorDashboard;
