/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint no-console: "error" */
import React from "react";
import { bindActionCreators } from "redux";
import { connect, batch } from "react-redux";
import { Switch, Link, Router, Route } from "react-router-dom";


import { Badge, Dropdown, Layout, Menu, Avatar } from "antd";
import serialize from "form-serialize";

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

import ProfileDetails from "../general/user/ProfileDetails";
import EditProfile from "../general/user/EditProfile";

import FundedProjects from "../sme/Projects/FundedProjects";
import InvestmentProject from "../sme/Projects/InvestmentProject";
import ProjectDetails from "../sme/Projects/ProjectDetails";
import ViewProject from "../general/View";

import Milestones from "../sme/Projects/Milestones";
import CreateMilestones from "./Projects/Milestones";
import UpdateMilestone from "./Funds/UpdateMilestone";
import ViewMilestones from "../sme/Funds/ViewMilestones";


import NewApplication from "../sme/Funds/NewApplication";

import Proposal from "./Funds/Proposal";

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

class SmeDashboard extends React.Component {
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
    (!user)?history.push("/"): history.push("/sme/ProfileDetails");
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

    const fetchMilestones = fetch({
      url: "/milestones/all",
      method: "get",
      data: null,
      onSuccess: Types.setMilestones
    })

    const fetchProjectsByApplication = fetch({
      url: `/fund/application/${this.props.user.organizationId}`,
      method: "get",
      data: null,
      onSuccess: Types.setProjectsAppliedFor
    })

    batch(()=>{
      dispatch(fetchProposals);
      dispatch(fetchDisbursements);
      dispatch(fetchProjects);
      dispatch(fetchFundCategories);
      dispatch(fetchMilestones);
      dispatch(fetchProjectsByApplication);
    });

  }

  handleMilestoneUpdate(event) {
    event.preventDefault();
    const form = document.querySelector("form[name=registration]");
    const formFields = serialize(form, { hash: true });

    // axios
    //   .post("https://eazsme-backend.herokuapp.com/milestones/id", formFields)
    //   .then(({ data }) => {
    //     if (data.status === "success") {
    //       this.setState({ success: "Milestone successfully updated!" });
    //     } else {
    //       this.setState({ error: "Error Updating Milestone" });
    //     }
    //   })
    //   .catch((error) => {
    //     /*console.log(error)*/
    //     this.setState({ error: "Error Updating Milestone" });
    //   });
      const { dispatch } = this.props;

      const updateMilestone = fetch({
        url:  "/milestones/id",
        method: "post",
        data: formFields,
        onSuccess: ""
      });

      dispatch(updateMilestone).then(()=>{
        const {status, message} = this.props.request

        if (status === "success") {
          this.setState({ success: message });
        } else {
          this.setState({ error: message });
        }
      });
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { history, user } = this.props;

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
          <Menu className="sme-menu" theme="dark" defaultSelectedKeys={["1"]} defaultOpenKeys={['sub1']} mode="inline">
            <Menu.Item className="sme-menu" key="1">
              <Link to="/sme/ProfileDetails">
                <ProfileOutlined />
                Profile Details
              </Link>
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
                <Link to="/sme/view-projects">View Projects</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<ZoomOutOutlined />}>
                <Link to="/sme/fund-milestones"> View Milestones</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<WalletOutlined />} title="Funds">
              <Menu.Item key="7" icon={<PlusCircleOutlined />}>
                <Link to="/sme/Projects/FundedProjects">Create Application</Link>
              </Menu.Item>
              <Menu.Item key="8" icon={<PlusCircleOutlined />}>
                <Link to="/sme/Projects/Milestones">Create Milestones</Link>
              </Menu.Item>
              <Menu.Item key="9" icon={<FileAddOutlined />}>
                <Link to="/sme/Funds/proposal">Existing Applications</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="10" icon={<LogoutOutlined />}>
              <Link to="/logout">Log out</Link>
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
                <Route path="/sme/fund-milestones" 
                  render={(props) => <ViewMilestones {...props} user={this.props.user} dispatch={this.props.dispatch} projectapplications={this.props.projectapplications} projects={this.props.projects} milestones={this.props.milestones} />} />
                <Route path="/sme/Projects/Milestones" component={CreateMilestones} />
                <Route path="/sme/Funds/proposal" component={Proposal} />
                <Route path="/sme/create-user" component={Create} />
                <Route path="/sme/update-user" component={Update} />
                {/*<Route path="/sme/deactivate-user" component={Remove} />*/}
                <Route path="/sme/ProfileDetails" render={(props) => <ProfileDetails {...props} user={this.props.user} dispatch={this.props.dispatch} />} />
                <Route path="/sme/EditProfile" component={EditProfile} />
                <Route path="/sme/view-projects" render={(props) => <ViewProject {...props} userCat="sme" projects={this.props.projects} dispatch={this.props.dispatch} />} />
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

const mapStateToProps = (state) => ({
  user: state.user,
  projectproposals: state.projectproposals.list,
  disbursements: state.disbursements.list,
  projects: state.projects.list,
  projectapplications: state.projectapplications.list,
  fundcategories: state.fundcategories.list,
  organizationusers: state.organizationusers.list,
  milestones: state.milestones.list,
  request: state.request
});

export default connect(mapStateToProps)(SmeDashboard);
