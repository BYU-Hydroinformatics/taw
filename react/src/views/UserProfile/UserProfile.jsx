import React, { Component } from "react"
import { connect } from "react-redux"
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap"

import { Card } from "../../components/Card/Card.jsx"
import { FormInputs } from "../../components/FormInputs/FormInputs.jsx"
import { UserCard } from "../../components/UserCard/UserCard.jsx"
import Button from "../../components/CustomButton/CustomButton.jsx"

import avatar from "../../assets/img/faces/face-3.jpg"

class UserProfile extends Component {
    constructor(props, context) {
      super(props, context)
      console.log(this.props.user.userDetails)
      // const {username, email, firstName,lastName,about} = this.props.user.userDetails
      // console.log(username)
      this.state = {
        username: "username",
        email:"email",
        firstname:"firstName",
        lastname:"lastName",
        about:"about"
      }
      // this.handleChange = this.handleChange.bind(this)
      
    }

    componentWillMount(){
      const {userDetails} = this.props.user
      console.log(userDetails)
      this.setState({
        username: userDetails? userDetails.username: "",
        email: userDetails? userDetails.email: "",
        firstname: userDetails? userDetails.firstName: "",
        lastname: userDetails? userDetails.lastname: "",
        about: userDetails? userDetails.about: ""
      })
    }
    componentDidMount(){
      // const {userDetails} = this.props.user
      // console.log(userDetails.username)
      // console.log(this.props.user.userDetails)
      // this.setState({
      //   username: userDetails.username
      // })
    }


  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Edit Profile"
                content={
                  <form>
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "Username",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Username",
                          defaultValue: this.state.username,
                          disabled: true
                        },
                        {
                          label: "Email address",
                          type: "email",
                          bsClass: "form-control",
                          defaultValue: this.state.email
                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-6", "col-md-6"]}
                      proprieties={[
                        {
                          label: "First name",
                          type: "text",
                          bsClass: "form-control",
                          // placeholder: this.state.firstname,
                          defaultValue: this.state.firstname
                        },
                        {
                          label: "Last name",
                          type: "text",
                          bsClass: "form-control",
                          // placeholder: this.state.lastname,
                          defaultValue: this.state.firstname
                        }
                      ]}
                    />
                    <Row>
                      <Col md={12}>
                        <FormGroup controlId="formControlsTextarea">
                          <ControlLabel>About Me</ControlLabel>
                          <FormControl
                            rows="5"
                            componentClass="textarea"
                            bsClass="form-control"
                            placeholder="Here can be your description"
                            defaultValue={this.state.about}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button bsStyle="info" pullRight fill type="submit">
                      Update Profile
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            {/* <Col md={4}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={avatar}
                name={this.state.firstname + this.state.lastname}
                userName="michael24"
                description={this.state.about}
                socials={
                  <div>
                    <Button simple>
                      <i className="fa fa-facebook-square" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-twitter" />
                    </Button>
                    <Button simple>
                      <i className="fa fa-google-plus-square" />
                    </Button>
                  </div>
                }
              />
            </Col> */}
          </Row>
        </Grid>
      </div>
    )
  }
}

function userProfileToProps(state, ownProps){
  const {user} = state
  return {
    user
  }
}
export default connect (userProfileToProps)(UserProfile) 
