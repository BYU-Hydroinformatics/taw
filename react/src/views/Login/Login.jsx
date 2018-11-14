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
import { loginUser } from "../../store/Users"

class Login extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleChange = this.handleChange.bind(this)

    this.state = {
      username: "",
      password: ""
    }
  }

  getValidationState(key) {
    const length = this.state[key].length
    if (length > 8) {
      return "success"
    } else if (length > 0) {
      return "warning"
    } else if (length <= 0) {
      return "error"
    }
    return null
  }

  handleChange(e) {
    this.setState({ [e.target.id]: e.target.value.trim() })    
  }

  handleClick(event) {
    event.preventDefault();
    const creds = {
      username: this.state.username,
      password: this.state.password
    }

    //@TODO: Validate if username and passsord are entered
    this.props.dispatch(loginUser(creds))
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
                title="Login"
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
                      Login
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

export default Login
