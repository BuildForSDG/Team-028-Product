/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import { Badge, Dropdown, Layout, Menu, Avatar } from "antd";
import { Switch, Link, Router, Route } from "react-router-dom";
// import Project from "./Project";
import Proposal from "./Funds/Proposal";
import {
  ProfileOutlined,
  UsergroupAddOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  FileDoneOutlined,
  BellFilled,
  ZoomOutOutlined,
  FileAddOutlined,
  PieChartOutlined,
  WalletOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import Create from "../general/CreateUser";
import Remove from "../general/Remove";
import Update from "../general/Update";
import ProfileDetails from "../sme/user/ProfileDetails";
import EditProfile from "./user/EditProfile";
import FundedProjects from "../sme/Projects/FundedProjects";
import InvestmentProject from "../sme/Projects/InvestmentProject";
import Milestones from "../sme/Projects/Milestones";
import NewApplication from "../sme/Funds/NewApplication";
import ViewMilestones from "../sme/Funds/ViewMilestones";
import CreateMilestones from "./Projects/Milestones";



const menu = (
  <Menu id="dropdown-menu">
    <Menu.Item className="menu-icon" icon={<UserOutlined />}>
      <Link to="/sme/ProfileDetails">Profile</Link>
    </Menu.Item>
    <Menu.Item className="menu-icon" icon={<UsergroupAddOutlined />}>
      <Link to="/sme/create">Manage Users</Link>
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

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

class SmeDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style={{ paddingTop: "64px" }}>
          <div className="logo"></div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="/sme/ProfileDetails">Profile Details</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/sme/create-user">Create</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                <Link to="/sme/update-user">Update</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to="/sme/deactivate-user">Deactivate</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<PieChartOutlined />} title="Projects">
            <Menu.Item key="5" icon={<ZoomOutOutlined />}>
              <Link to="/sme/Projects/InvestmentProject">View Projects</Link>
            </Menu.Item>
             <Menu.Item key="6" icon={<ZoomOutOutlined />}>
              <Link to="/sme/Funds/ViewMilestones"> View Milestones</Link>
            </Menu.Item>
            
            </SubMenu>
            <SubMenu key="3" icon={<WalletOutlined />} title="Funds">
            <Menu.Item key="8" icon={<PlusCircleOutlined />}>
              <Link to="/sme/Projects/FundedProjects">Create Application</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<PlusCircleOutlined />}>
              <Link to="/sme/Projects/Milestones">Create Milestones</Link>
            </Menu.Item>
              <Menu.Item key="9" icon={<FileAddOutlined />}>
              <Link to="/sme/Funds/proposal">Existing Applications</Link>
            </Menu.Item>
            </SubMenu>
            
           
          
            <Menu.Item key="4" icon={<LogoutOutlined />}>
              {" "}
              Log Out
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <nav class="navbar">
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
                {/* <Route path="/sme/projects" component={Project} /> */}
                <Route path="/sme/Projects/FundedProjects" component={FundedProjects} />
                <Route path="/sme/Funds/NewApplication" component={NewApplication} />
                <Route path="/sme/Funds/ViewMilestones" component={ViewMilestones} />
                <Route path="/sme/Projects/Milestones" component={CreateMilestones} />
                <Route path="/sme/Funds/proposal" component={Proposal} />
                <Route path="/sme/create-user" component={Create} />
                <Route path="/sme/update-user" component={Update} />
                <Route path="/sme/deactivate-user" component={Remove} />
                <Route path="/sme/ProfileDetails" component={ProfileDetails} />
                <Route path="/sme/EditProfile" component={EditProfile} />
                <Route path="/sme/Projects/InvestmentProject" component={InvestmentProject} />
                <Route path="/sme/Projects/Milestones" component={Milestones} />
              </Switch>
            </Router>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SmeDashboard;
