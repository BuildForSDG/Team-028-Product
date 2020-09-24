/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint no-console: "error" */

import React from "react";
import { bindActionCreators } from "redux";
import { connect, batch } from "react-redux";
import { Switch, Router, Route, Link } from "react-router-dom";


import { Badge, Dropdown, Layout, Menu, Avatar } from "antd";
import {
  WalletOutlined,
  AuditOutlined,
  LogoutOutlined,
  ProfileOutlined,
  PoundOutlined,
  BellFilled,
  PieChartOutlined,
  UserOutlined,
  RiseOutlined,
  UsergroupAddOutlined,
  UserAddOutlined
} from "@ant-design/icons";


import SmeProposals from "./SmeProposals";
import TotalInvestments from "./TotalInvestments";
import InvestmentHistory from "./InvestmentHistory";

import AllUsers from "./user/AllUsers";
import Create from "../general/CreateUser";
import Update from "../general/Update";

import ProfileDetails from "./user/ProfileDetails";
import ProposalDetails from "./ProposalDetails";
import ProjectDetails from "./ProjectDetails";
import FundDetails from "./FundDetails";
import EditProfile from "./user/EditProfile";
import Invest from "./invest";

import ViewProject from "../general/View";
import CreateProject from "../general/Create";

import * as Types from "../../../redux/types";
import { fetch } from "../../../redux/actionCreators";


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

class InvestorDashboard extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.bindActionCreators = bindActionCreators(fetch, dispatch);

    this.state = {
      collapsed: false
    };
  }
  componentDidMount() {
    this.fetchData();
    const { history, user }= this.props;
    (!user)?history.push("/"): history.push("/investor/ProfileDetails");
  }
  fetchData = async() => {

    const { dispatch } = this.props;

    const fetchProposals = fetch({
      url:  "/project/investorAll",
      method: "get",
      data: null,
      onSuccess: Types.setProjectProposals
    });

    const fetchDisbursements = fetch({
      url:  `/disbursements/${this.props.user.organizationId}`,
      method: "get",
      data: null,
      onSuccess: Types.setDisbursements
    });


    const fetchProjects = fetch({
      url:  "/projects/all",
      method: "get",
      data: null,
      onSuccess: Types.setProjects
    });


    const fetchFundCategories = fetch({
      url:  "/funds/category/all",
      method: "get",
      data: null,
      onSuccess: Types.setFundCategories
    });


    const fetchInvestments = fetch({
      url:  `/funds/organizations/${this.props.user.organizationId}`,
      method: "get",
      data: null,
      onSuccess: Types.updateUserInvestments
    });

    batch(()=>{
      dispatch(fetchProposals);
      dispatch(fetchDisbursements);
      dispatch(fetchProjects);
      dispatch(fetchFundCategories);
      dispatch(fetchInvestments);
    });

  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {  
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
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
          <Menu theme="dark" defaultSelectedKeys={["1"]} defaultOpenKeys={['sub1']} mode="inline">
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="/investor/ProfileDetails">Profile Details</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Users">
              <Menu.Item key="2">
                <Link to="/investor/AllUsers">
                  <UsergroupAddOutlined />
                  All Users
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/investor/create-user">
                  <UserAddOutlined />
                    Create
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/investor/update-user">
                  <UserOutlined />
                  Update
                </Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="6" icon={<PieChartOutlined />}>
              <Link to="/investor/view-projects">View Projects</Link>
            </Menu.Item>

            <SubMenu key="sub2" icon={<WalletOutlined />} title="Investments">
              <Menu.Item key="7" icon={<WalletOutlined />}>
                <Link to="/investor/invest">Invest</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/investor/InvestmentHistory">
                  <RiseOutlined />
                  History
                </Link>
              </Menu.Item>

              <Menu.Item key="9" icon={<PoundOutlined />}>
                <Link to="/investor/TotalInvestments">Amount</Link>
              </Menu.Item>
              <Menu.Item key="10" icon={<AuditOutlined />}>
                <Link to="/investor/SmeProposals">All Proposals</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="12" icon={<LogoutOutlined />}>
            <Link to="/logout">Log out</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <nav className="navbar inv-header">
            <div className="cat-title bgIn">INVESTOR HOME</div>
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
                <a href="/" className="example" ></a>
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

          {/* Content Elements are here */}
          <Content style={{ margin: "0 16px" }}>
            <div className="content-title">
              {/* <h5>WELCOME TO YOUR INVESTMENT DASHBOARD</h5>
              <p>Here you can view and manage all your investments</p>*/}
            </div>

            {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Router history={this.props.history}>
                <Switch>
                  <Route
                    path="/investor/SmeProposals"
                    render={(props) => <SmeProposals {...props} projectproposals={this.props.projectproposals} />}
                  />

                  <Route
                    path="/investor/InvestmentHistory"
                    render={(props) => <InvestmentHistory {...props} user={this.props.user} dispatch={this.props.dispatch} disbursements={this.props.disbursements} />}
                  />
                  <Route
                    path="/investor/TotalInvestments"
                    render={(props) => <TotalInvestments {...props} user={this.props.user} dispatch={this.props.dispatch} />}
                  />
                  <Route path="/investor/AllUsers" render={(props) => <AllUsers {...props} user={this.props.user} dispatch={this.props.dispatch} organizationusers={this.props.organizationusers} />} />
                  <Route path="/investor/create-user" component={Create} />
                  <Route path="/investor/update-user" component={Update} />
                  {/**<Route path="/investor/deactivate-user" component={Remove} />*/}
                  <Route path="/investor/ProfileDetails" render={(props) => <ProfileDetails {...props} user={this.props.user} dispatch={this.props.dispatch} />} />
                  <Route path="/investor/EditProfile" component={EditProfile} />
                  <Route path="/investor/create-project" component={CreateProject} />
                  <Route path="/investor/view-projects" render={(props) => <ViewProject {...props} userCat="investor" projects={this.props.projects} dispatch={this.props.dispatch} />} />
                  <Route path="/investor/view-project/:projectId" render={(props) => <ProjectDetails {...props} dispatch={this.props.dispatch} />} />
                  <Route path="/investor/proposal-details/:id" render={(props) => <ProposalDetails {...props} projectproposals={this.props.projectproposals} dispatch={this.props.dispatch}  />} />
                  <Route path="/investor/FundDetails/:id" render={(props) => <FundDetails {...props} user={this.props.user} dispatch={this.props.dispatch} />} />
                 <Route path="/investor/invest" render={(props) => <Invest {...props} user={this.props.user} dispatch={this.props.dispatch} projects={this.props.projects} fundcategories={this.props.fundcategories}/>} />
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
const mapStateToProps = (state) => ({
  user: state.user,
  projectproposals: state.projectproposals.list,
  disbursements: state.disbursements.list,
  projects: state.projects.list,
  fundcategories: state.fundcategories.list,
  organizationusers: state.organizationusers.list
});

export default connect(mapStateToProps)(InvestorDashboard);
