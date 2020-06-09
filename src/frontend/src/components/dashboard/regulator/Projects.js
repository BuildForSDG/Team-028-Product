/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Table, Tag, Space } from "antd";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

/*datasource*/
// const data = [
//     {
//       key: "1",
//       name: "Coco Plantation Setup",
//       category: "Agriculture",
//       Organization: "FCT Farmer",
//       startDate: "2019-01-20",
//       endDate: "2020-01-20",
//       status:"In Progress",
//     },
//     {
//       key: "2",
//       name: "IOT for Lagos State",
//       category: "Information Technology",
//       Organization: "eazSME",
//       startDate: "2020-01-20",
//       endDate: "2020-12-20",
//       status:"Completed: under review",
//     },
//     {
//       key: "3",
//       name: "5G networks installation",
//       category: "ISP",
//       Organization: "SWIFTY Networks",
//       startDate: "2019-06-20",
//       endDate: "2020-01-20",
//       status:"Closed",
//     },
//   ];

// const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       /* render: text => <a>{text}</a>,*/
//     },
//     {
//       title: "Category",
//       dataIndex: "category",
//       key: "category",
//     },
//     {
//       title: "Organization",
//       dataIndex: "Organization",
//       key: "Organization",
//     },
//     {
//         title: "Start Date",
//         dataIndex: "startDate",
//         key: "startDate",
//       },
//       {
//         title: "End Date",
//         dataIndex: "endDate",
//         key: "endDate",
//       },
//       {
//         title: "Status",
//         dataIndex: "status",
//         key: "status",
//       },
//      {
//       title: "Action",
//       key: "action",
//       render: (text, record) => (
//         <Space size="middle">
//                 <Link to="#"> View Details</Link>
//         </Space>
//       ),
//     },
//   ];

  

export default class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: [],
      filteredProjects: [],
      searchTerm: ""
    };

    this.fetchData = this.fetchData.bind(this);
    this.searchProjects = this.searchProjects.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {
    this.fetchData();
  }
  searchProjects(e){
    e.preventDefault();

    const query = this.state.searchTerm;

    this.setState((prevState) => {
      let filteredProjects = prevState.projects;
      if (query.trim() !== ""){
       
        filteredProjects = prevState.projects.filter((element) => {
          
          const description = element.description || "";
          const projectName =  element.projectName || "";

          return description.toLowerCase().includes(query.toLowerCase()) ||
          projectName.toLowerCase().includes(query.toLowerCase());
        });
      }
      return {
        filteredProjects
      };
    });
  }
  onChange(e){
    const value =  e.target.value;
    if (value.trim() === ""){
      this.setState({filteredProjects: this.state.projects, searchTerm: value});
    }else{
      this.setState({searchTerm: value});
    }
    
  }
  async fetchData() {
    const data = await axios.get("https://eazsme-backend.herokuapp.com/projects/all");
    const projects = data.data.data;  
    this.setState({projects, filteredProjects: projects});
  }


  render() {
    const data = this.state.filteredProjects;
    return (
      <Card.Body>
        <div className="invest-fund">
          <h5 className="update" style={{textAlign:"center"}}>Funded Projects</h5>
        </div>
        <div className="update" style={{textAlign:"center"}}>
          <h5> *** Projects View *** </h5>         
        </div>
        
        <div className="sachBody">
          <ul className="sach">
          <li><Button style={{float:"right",borderRadius:"5%", background:"orange"}} onClick={this.searchProjects}  variant="default" type="submit" > Search</Button></li>
            <li><Form.Group controlId="searchId">
                <Form.Control className="searchBar" onChange={this.onChange} style={{ width:"250px", float:"right",marginRight:"10px",marginBottom:"15px" }} type="text" placeholder="Enter project name to search" name="search" />
                </Form.Group>
            </li>
          </ul>
      </div>
        {/* <Table columns={columns} dataSource={data} /> */}

        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Organization</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index, arr) => {
              return (
                <tr key={index}>
                  <td>{item.projectName}</td>
                  <td>{item.category}</td>
                  <td>{item.dateStart}</td>
                  <td>{item.dateEnd}</td>
                  <td>{item.status}</td>
                  <td>{item.action}</td>

                  <td>
                    <Link to={`/view-project/${item.projectId}`}>View Details</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table> 
      </Card.Body>
    );
  }
}
