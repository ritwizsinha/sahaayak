import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Input, Row, Col, Button, message } from 'antd';
import {updatePassword} from '../../redux/actions/userActions';
const InputGroup = Input.Group;

class Password extends Component {
  state ={
    oldPassword: null,
    newPassword: null,
    confNewPassword: null
  }
  onChange = e=>{
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onClick = ()=>{
    if(this.state.newPassword !== this.state.confNewPassword){
      message.error("New password doesn't match");
    }
    else if(this.state.oldPassword === this.state.newPassword){
      message.info("Cannot set the same password");
    }
    else{
      console.log(this.props.user);
       this.props.updatePassword({oldPassword: this.state.oldPassword,newPassword:this.state.newPassword},this.props.user.id);
    }
  }
  render() {
    const {passwordChangeStatus}  = this.props;
    let data;
    if(passwordChangeStatus !== null){
    data = passwordChangeStatus === "Ongoing" ?  message.info("Ongoing"):passwordChangeStatus === "Done" ? message.success("Password Changed") : message.error("Failed try again") ;
    }
    return (
      <Fragment>
        <h1>Password</h1>
        <hr />
        <br />
        {data}
        <InputGroup>
          <Row gutter={8}>
            <Col span={4}>
              <label>Current Password</label>
            </Col>
            <Col span={8}>
              <Input name="oldPassword" value={this.state.oldPassword}  type="password"  onChange={this.onChange}/>
            </Col>
          </Row>
        </InputGroup>
        <br />
        <InputGroup>
          <Row gutter={8}>
            <Col span={4}>
              <label>New Password</label>
            </Col>
            <Col span={8}>
              <Input name="newPassword" value={this.state.newPassword} type="password" onChange={this.onChange}/>
            </Col>
          </Row>
        </InputGroup>
        <br />
        <InputGroup>
          <Row gutter={8}>
            <Col span={4}>
              <label>Verify Password</label>
            </Col>
            <Col span={8}>
              <Input name="confNewPassword" value={this.state.confNewPassword} type="password" onChange={this.onChange}/>
            </Col>
          </Row>
        </InputGroup>
        <br />
        <InputGroup>
          <div>Forgot your Password?</div>
        </InputGroup>
        <br />
        <Button type="primary" onClick={this.onClick}>
          Save Changes
        </Button>
      </Fragment>)
  }
}
const mapStateToProps = state=>({
  user: state.user.user,
  passwordChangeStatus: state.user.passwordChangeStatus
})
export default connect(
  mapStateToProps,
  {updatePassword}
)(Password);