import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Field, reduxForm } from 'redux-form'

import RenderFormGroup from 'components/user/RenderFormGroup';

import { required, emailCheck, passwordCheck, nickNameLengthCheck, nickNameCheck } from '../../lib/user/validations';

import './signup.scss';


class SignUp extends Component {
  constructor (props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      checkPassword: '',
      nickname: ''
    }

    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  handleChangeValue (type, value) {
   
    this.setState({
      [type]: value
    })
  }

  render () {
    return (
      <div className="container text-center">
        <h2 className="mt-3 mb-3">회원가입</h2>
        <Form className="wo-form ml-auto mr-auto">
          <Field name="email" type="email" component={RenderFormGroup} placeholderMessage="이메일" validate={[required, emailCheck]}/> 
          <Field name="password" type="password" component={RenderFormGroup} placeholderMessage="비밀번호" validate={[required, passwordCheck]}/> 
          <Field name="passwordCheck" type="password" component={RenderFormGroup} placeholderMessage="비밀번호 확인" validate={[required, passwordCheck]}/> 
          <Field name="nickname" type="text" component={RenderFormGroup} placeholderMessage="닉네임" validate={[required, nickNameLengthCheck, nickNameCheck]}/>  
          <button type="submit" className="btn mr-3">가입</button>
          <button type="submit" className="btn">취소</button>           
        </Form>    
      </div>
    );
  }
}

SignUp = reduxForm({
	form: 'signUp'
})(SignUp);

export default SignUp;