/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import { Switch, Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Badge, Dropdown, Avatar } from "antd";
import {
  UserAddOutlined,
  ProfileOutlined,
  UserOutlined,
  LogoutOutlined,
  AppstoreOutlined,
  DollarCircleOutlined,
  BellFilled,
  SwitcherOutlined,
  ProjectOutlined,
  WalletOutlined
} from "@ant-design/icons";
import ProfileDetails from "./user/ProfileDetails";
import ProjectDetails from "./ProjectDetails";

import InvestorsAndFunding from "./InvestorsAndFunding";
import SmeAndProjects from "./SmeAndProjects";
import Create from "../general/CreateUser";
import Update from "../general/Update";
import EditProfile from "./user/EditProfile";
import CreatCategory from "./category/Create";
import ViewCategory from "./category/View";
import DeleteCategory from "./category/Delete";
import UpdateCategory from "./category/Update";
import ViewProject from "../general/View";
import CreateProject from "../general/Create";
import CreateEligibility from "./projects/CreateEligibility";
import CreateMilestone from "./milestone/Create";
import ViewMilestone from "./milestone/View";
import InvestmentCategory from "./category/InvestmentCategory";
import DeleteMilestone from "./milestone/Delete";
import {connect} from "react-redux";


const menu = (
  <Menu id="dropdown-menu">
    <Menu.Item className="menu-icon" icon={<LogoutOutlined />}>
      {" "}
      <Link to="/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

class AdminDashboard extends React.Component {
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
    // use localStorage.getItem("user") to get the user object
    const user = localStorage.getItem("userObj");
    const history = this.props.history;
    if (!user || user === null) {
      history.push("/");
    }
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider className="admin-sider" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo">
            <Link className="dashboard-img" to="#">
              <img
                src={
                  "https://res.cloudinary.com/lordefid/image/upload/c_scale,h_50/v1590937828/Group_160_2x_wad30b.png"
                }
                alt="logo"
              />
            </Link>
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="/admin/ProfileDetails">Profile Details</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<SwitcherOutlined />} title="Category">
              <Menu.Item key="1" icon={<SwitcherOutlined />}>
                <Link to="/admin/create-category">Project Category</Link>
              </Menu.Item>
              <Menu.Item key="12" icon={<SwitcherOutlined />}>
                <Link to="/admin/category/InvestmentCategory">Investment Category</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<SwitcherOutlined />}>
                <Link to="/admin/view-category">View Category</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<ProjectOutlined />} title="Projects">
              <Menu.Item key="3" icon={<ProjectOutlined />}>
                <Link to="/admin/create-project">Create Project</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<ProjectOutlined />}>
                <Link to="/admin/projects/CreateEligibility">Create Eligibility</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<ProjectOutlined />}>
                <Link to="/admin/view-projects">View Projects</Link>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="sub3" icon={<UserOutlined />} title="User">
              <Menu.Item key="6" icon={<UserAddOutlined />}>
                <Link to="/admin/create-user">Create</Link>
              </Menu.Item>
              <Menu.Item key="7" icon={<UserOutlined />}>
                <Link to="/admin/update-user">Update</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<WalletOutlined />} title="Funds">
              <Menu.Item key="11" icon={<AppstoreOutlined />}>
                <Link to="/admin/smeandprojects"> SMEs Projects</Link>
              </Menu.Item>
              <Menu.Item key="12" icon={<DollarCircleOutlined />}>
                <Link to="/admin/view-milestone">View Milestone</Link>
              </Menu.Item>
              <Menu.Item key="13" icon={<DollarCircleOutlined />}>
                <Link to="/admin/investorsandfunding">Investors Funding</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="12" icon={<LogoutOutlined />}>
            <Link to="/">Log out</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background header"> */}
          <nav class="navbar admin-header">
            <div className="cat-title bgAd">ADMIN HOME</div>
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

          {/* Content elements are here */}

          <Content style={{ margin: "0 16px" }}>
            <div className="content-title"></div>
            <Router history={this.props.history}>
           
              <Switch>
              
                <Route path="/admin/investorsandfunding" component={InvestorsAndFunding} />
                <Route path="/admin/smeandprojects" component={SmeAndProjects} />
                <Route path="/admin/create-user" component={Create} />
                <Route path="/admin/update-user" component={Update} />
                {/**  <Route path="/admin/deactivate-user" component={Remove} />
                 * <Route path="/admin/update-milestone/:milestoneId" component={UpdateMilestone} />
                 *
                 */}
                <Route path="/admin/create-category" component={CreatCategory} />
                <Route path="/admin/view-category" component={ViewCategory} />
                <Route path="/admin/delete-category/:categoryId" component={DeleteCategory} />
                <Route path="/admin/update-category/:categoryId" component={UpdateCategory} />
                <Route path="/admin/create-project" component={CreateProject} />
                <Route path="/admin/view-projects" render={(props) => <ViewProject {...props} userCat="admin" />} />
                <Route path="/admin/view-project/:projectId" render={(props) => <ProjectDetails {...props}/>}/>
                <Route path="/admin/ProfileDetails" component={ProfileDetails} />
                <Route path="/admin/EditProfile" component={EditProfile} />
                <Route path="/admin/projects/CreateEligibility" component={CreateEligibility} />
                <Route path="/admin/view-milestone" component={ViewMilestone} />
                <Route path="/admin/create-milestone" component={CreateMilestone} />
                <Route path="/admin/category/investmentCategory" component={InvestmentCategory} />
                <Route path="/admin/delete-milestone/:milestoneId" component={DeleteMilestone} />
              </Switch>
            </Router>
          </Content>

          {/* <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content> */}
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  companyName: state.admin.companyName,
  category: state.admin.category,
  userId: state.admin.userId,
  organizationId:state.admin.organizationId
});
export default connect(mapStateToProps)(AdminDashboard);
