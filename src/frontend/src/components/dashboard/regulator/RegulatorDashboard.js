

import React from "react";

import { bindActionCreators } from "redux";
import { connect, batch } from "react-redux";

import { Switch, Router, Route, Link } from "react-router-dom";

import {
  ProfileOutlined,
  LogoutOutlined,
  PieChartOutlined,
  BellFilled,
  UserOutlined,
  WalletOutlined,
  EditOutlined,
  OrderedListOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { Layout, Menu, Badge, Dropdown, Avatar } from "antd";

import Investors from "./Investors";
import ViewProject from "../general/project/View";
import ProjectDetails from "../general/project/ProjectDetails";
import Users from "./Users";
import SMEs from "./SMEs";
import Funds from "./Funds";

import Projectcategories from "../admin/category/View";
import Create from "../general/project/Create";
import Remove from "../general/Remove";
import Update from "../general/Update";
import ProfileDetails from "../general/user/ProfileDetails";
import EditProfile from "../general/user/EditProfile";

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

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class RegulatorDashboard extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = props;

    this.bindActionCreators = bindActionCreators(fetch, dispatch);

    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {
    const { history, user }= this.props;
    (!user)?history.push("/"): history.push(`/${user.category}/profile-details`);
    
    this.fetchData();
  }
  fetchData = async() => {

    const { dispatch } = this.props;

    const fetchProjects = fetch({
      url:  "/projects/all",
      method: "get",
      data: null,
      onSuccess: Types.setProjects
    });

    const fetchInvestors = fetch({
      url: "/organizations/list",
      method: "get",
      params: { category: "investor" },
      onSuccess: Types.setInvestorsList
    });

    const fetchSMEs = fetch({
      url: "/organizations/list",
      method: "get",
      params: { category: "sme" },
      onSuccess: Types.setSMEsList
    });

    const fetchAllFundApplications = fetch({
      url: "/funds/all",
      method: "get",
      data: null,
      onSuccess: Types.setFundApplicationsList
    });

    batch(()=>{
      dispatch(fetchProjects);
      dispatch(fetchInvestors);
      dispatch(fetchSMEs);
      dispatch(fetchAllFundApplications);
    });

  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider className="reg-sider" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
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
          <br />
          <Menu
            className="reg-menu"
            theme="dark"
            onClick={this.handleClick}
            defaultOpenKeys={["sub1"]}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            <Menu.Item key="1" icon={<ProfileOutlined />}>
              <Link to="/regulator/profile-details">Profile Details</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<PieChartOutlined />} title="Projects">
              <Menu.Item key="5">
                <Link to="/regulator/project-categories"> Project Categories</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/regulator/view-projects">View Projects</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="2" icon={<UnorderedListOutlined />}>
              <Link to="/regulator/investors">Investors List</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<OrderedListOutlined />}>
              <Link to="/regulator/smes"> SMEs List</Link>
            </Menu.Item>

            <SubMenu key="sub2" icon={<WalletOutlined />} title="Funds">
              <Menu.Item key="7" icon={<EditOutlined />}>
                <Link to="/regulator/funds"> Funds Application</Link>
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
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <nav className="navbar reg-header">
            <div className="cat-title bgRe">REGULATOR HOME</div>
            {/* <Link className="dashboard-img" to="#">
                  <img src={"https://res.cloudinary.com/lordefid/image/upload/c_scale,h_50/v1590937828/Group_160_2x_wad30b.png"} alt="logo" />
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
                <Route path="/regulator/view-projects" render={(props) => <ViewProject {...props} userCat="regulator" projects={this.props.projects} dispatch={this.props.dispatch} />} />
                <Route path="/regulator/view-project/:projectId" render={(props) => <ProjectDetails {...props} dispatch={this.props.dispatch} projects={this.state.projects }/>}/>
                <Route path="/regulator/project-categories" component={Projectcategories} />
                <Route path="/regulator/investors" render={(props)=> <Investors {...props} investors={this.props.investors}/>} />
                <Route path="/regulator/smes" render={(props) => <SMEs {...props} smes={this.props.smes} />} />
                <Route path="/regulator/users" component={Users} />
                <Route path="/regulator/funds" render={(props)=> <Funds {...props} fundapplications={this.props.fundapplications} />} />
                <Route path="/regulator/create-user" component={Create} />
                <Route path="/regulator/update-user" component={Update} />
                <Route path="/regulator/deactivate-user" component={Remove} />
                <Route path="/regulator/profile-details" component={ProfileDetails} />
                <Route path="/regulator/edit-profile" component={EditProfile} />
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
  user: state.user,
  projects: state.projects.list,
  investors: state.investors.list,
  smes: state.smes.list,
  fundapplications: state.fundapplications.list,
  request: state.request
});

export default connect(mapStateToProps)(RegulatorDashboard);