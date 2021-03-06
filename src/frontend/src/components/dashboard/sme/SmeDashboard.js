/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import { Badge, Dropdown, Layout, Menu, Avatar } from "antd";
import { Switch, Link, Router, Route } from "react-router-dom";
import serialize from "form-serialize";
import axios from "axios";
import Proposal from "./Funds/Proposal";
import {
  ProfileOutlined,
  UserOutlined,
  LogoutOutlined,
  BellFilled,
  ZoomOutOutlined,
  FileAddOutlined,
  PieChartOutlined,
  WalletOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";
import Create from "../general/CreateUser";
import Update from "../general/Update";
import ProfileDetails from "../sme/user/ProfileDetails";
import EditProfile from "./user/EditProfile";
import FundedProjects from "../sme/Projects/FundedProjects";
import InvestmentProject from "../sme/Projects/InvestmentProject";
import Milestones from "../sme/Projects/Milestones";
import NewApplication from "../sme/Funds/NewApplication";
import ViewMilestones from "../sme/Funds/ViewMilestones";
import CreateMilestones from "./Projects/Milestones";
import { connect } from "react-redux";
import UpdateMilestone from "./Funds/UpdateMilestone";
import ProjectDetails from "../sme/Projects/ProjectDetails";
import ViewProject from "../general/View";

const menu = (
  <Menu id="dropdown-menu">
    <Menu.Item className="menu-icon" icon={<LogoutOutlined />}>
      {" "}
      <Link to="/logout">Logout</Link>
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

  handleMilestoneUpdate(event) {
    event.preventDefault();
    const form = document.querySelector("form[name=registration]");
    const formFields = serialize(form, { hash: true });

    axios
      .post("https://eazsme-backend.herokuapp.com/milestones/id", formFields)
      .then(({ data }) => {
        if (data.status === "success") {
          this.setState({ success: "Milestone successfully updated!" });
        } else {
          this.setState({ error: "Error Updating Milestone" });
        }
      })
      .catch((error) => {
        /*console.log(error)*/
        this.setState({ error: "Error Updating Milestone" });
      });
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    // use localStorage.getItem("user") to get the user object
    const user = localStorage.getItem("userObj");
    const userData = localStorage.getItem("userData");
    const history = this.props.history;
    if (!user || user === null) {
      history.push("/");
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider className="sme-sider" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo">
            {" "}
            <Link className="dashboard-img" to="#">
              <img
                src={
                  "https://res.cloudinary.com/lordefid/image/upload/c_scale,h_50/v1590937828/Group_160_2x_wad30b.png"
                }
                alt="logo"
              />
            </Link>
          </div>
          <Menu className="sme-menu" theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item className="sme-menu" key="1" icon={<ProfileOutlined />}>
              <Link to="/sme/ProfileDetails">Profile Details</Link>
            </Menu.Item>
            <SubMenu className="sme-submenu" key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/sme/create-user">Create</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                <Link to="/sme/update-user">Update</Link>
              </Menu.Item>
              {/*} <Menu.Item key="4" icon={<UserOutlined />}>
                <Link to="/sme/deactivate-user">Deactivate</Link>
    </Menu.Item>*/}
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
            <Menu.Item key="12" icon={<LogoutOutlined />}>
              <Link to="/">Log out</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <nav class="navbar sme-header">
            <div className="cat-title bgSm">SME HOME</div>
            {/* <Link className="dashboard-img" to="#">
              <img
                src={
                  "https://res.cloudinary.com/lordefid/image/upload/c_scale,h_50/v1590937828/Group_160_2x_wad30b.png"
                }
                alt="logo"
              />
            </Link> */}
            <div>
              <Badge className="badge-item" count={5}>
                <a href="#" className="example" />
              </Badge>
              <BellFilled className="notificationBell" />
            </div>
            <Dropdown overlay={menu}>
              <Avatar
                src="https://res.cloudinary.com/lordefid/image/upload/v1567112037/220190826_163351912_r9yfcl.jpg"
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              />
            </Dropdown>
          </nav>
          <Content style={{ margin: "0 16px" }}>
            <Router history={this.props.history}>
              <Switch>
                {/* <Route path="/sme/projects" component={Project} /> 
                <Route path="/sme/Projects/FundedProjects" component={FundedProjects} />
                <Route
                  path="/sme/Funds/NewApplication"
                  render={(props) => <NewApplication {...props} projects={this.state.projects} />}
                />
                */}
               
                <Route path="/sme/Funds/NewApplication" render={(props) => <NewApplication {...props} projects={this.state.projects } />} />
                <Route path="/sme/Funds/UpdateMilestone" component={UpdateMilestone} />
                <Route path="/sme/Funds/ViewMilestones" component={ViewMilestones} />
                <Route path="/sme/Projects/Milestones" component={CreateMilestones} />
                <Route path="/sme/Funds/proposal" component={Proposal} />
                <Route path="/sme/create-user" component={Create} />
                <Route path="/sme/update-user" component={Update} />
                {/*<Route path="/sme/deactivate-user" component={Remove} />*/}
                <Route path="/sme/ProfileDetails" component={ProfileDetails} />
                <Route path="/sme/EditProfile" component={EditProfile} />
                <Route path="/sme/Projects/InvestmentProject" component={InvestmentProject} />
                <Route path="/sme/Projects/Milestones" component={Milestones} />
          <Route path="/sme/Projects/FundedProjects" render={(props) => <FundedProjects {...props} userCat="sme" />} />
                <Route path="/sme/Projects/ProjectDetails/:projectId" render={(props) => <ProjectDetails {...props} projects={this.state.projects }/>}/>
                    </Switch>
            </Router>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = ({ sme }) => ({
  companyName: sme.companyName,
  category: sme.category,
  userId: sme.userId,
  organizationId: sme.organizationId,
  userData: sme.userData
});

export default connect(mapStateToProps)(SmeDashboard);
