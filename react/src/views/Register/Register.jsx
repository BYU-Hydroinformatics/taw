import React, { Component } from "react"
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap"
import { Redirect } from "react-router-dom"

import { Card } from "../../components/Card/Card.jsx"
import { registerUser } from "../../store/Users"

class Register extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      username: "",
      password: "",
      email: "",
      lastname: "",
      firstname:"",
      about:"",
    }
  }

  getValidationState(key) {
    // const length = this.state[key].length
    // if (length > 8) {
    //   return "success"
    // } else if (length > 0) {
    //   return "warning"
    // } else if (length <= 0) {
    //   return "error"
    // }
    return null
  }

  handleChange(e) {
    console.log(e)
    this.setState({ [e.target.id]: e.target.value.trim() })    
  }

  handleClick(event) {
    event.preventDefault();
    const creds = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      about: this.state.about
    }

    //@TODO: Validate if username and passsord are entered
    this.props.dispatch(registerUser(creds))
  }

  render() {
    const { errorMessage, isAuthenticated } = this.props
    const { from } = this.props.location.state || { from: { pathname: "/" } }

    if (isAuthenticated) {
      return <Redirect to={from} />
    }

    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={3} mdOffset={4}>
              <Card
                title="Register"
                content={
                  <form>
                    <Row>
                      <Col md={12}>
                        <FormGroup
                          controlId="username"
                          validationState={this.getValidationState("username")}>
                          <ControlLabel>Username</ControlLabel>
                          <FormControl
                            type="text"
                            value={this.state.username}
                            placeholder="Username"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup
                          controlId="password"
                          validationState={this.getValidationState("password")}>
                          <ControlLabel>Password</ControlLabel>
                          <FormControl
                            type="password"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup
                          controlId="email"
                          validationState={this.getValidationState("email")}>
                          <ControlLabel>Email</ControlLabel>
                          <FormControl
                            type="email"
                            value={this.state.email}
                            placeholder="email"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup
                          controlId="lastname"
                          validationState={this.getValidationState("lastname")}>
                          <ControlLabel>Last Name</ControlLabel>
                          <FormControl
                            type="lastname"
                            value={this.state.lastname}
                            placeholder="Last Name"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup
                          controlId="firstname"
                          validationState={this.getValidationState("firstname")}>
                          <ControlLabel>First Name</ControlLabel>
                          <FormControl
                            type="firstname"
                            value={this.state.firstname}
                            placeholder="First Name"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                        <FormGroup
                          controlId="about"
                          validationState={this.getValidationState("about")}>
                          <ControlLabel>About You</ControlLabel>
                          <FormControl
                            type="about"
                            value={this.state.about}
                            placeholder="About You"
                            onChange={this.handleChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {errorMessage && (
                      <Row>
                        <p>{errorMessage}</p>
                      </Row>
                    )}

                    <Button 
                      type="submit"
                      bsStyle="info"
                      pullRight
                      fill
                      onClick={event => this.handleClick(event)}>
                      Register
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
          </Row>
        </Grid>>
      </div>
    )
  }
}

export default Register