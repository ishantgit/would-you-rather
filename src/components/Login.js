import React, { Component } from 'react';
import { connect } from 'react-redux'
import {setAuthedUser} from "../actions/authedUser";
import styled from "styled-components";

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`

const LoginButton = styled.button`
  width: 100px;
  height: 40px;
  margin-top: 10px;
  text-align: center;
  background: green;
  color: white;
  border-radius: 10px;
`

class Login extends Component{

    state = {
        userId:""
    };

    componentDidMount() {

    }

    render() {
        var {userId} = this.state;
        console.log(userId);
        return <FlexCenter>
            <div>

            <h3>Welcome to Would You Rather App!</h3>
            <div>Please Sign in to continue</div>
            <h2>Sign In</h2>
            <select value={userId} onChange={event => {
                console.log(event.target.value);
                this.setState({userId:event.target.value})
            }}>
                <option value="" disabled>Select User</option>
                {
                    Object.keys(this.props.users).map(user => {
                        console.log(user);
                        return <option key={user} value={user}>
                            {this.props.users[user].name}
                        </option>
                    })
                }
            </select>
                <br/>
            <LoginButton onClick={event => {
                if(userId !== ''){
                    this.props.dispatch(setAuthedUser(userId));
                }
            }}>Login</LoginButton>
            </div>
        </FlexCenter>
    }
}

function mapStateToProps ({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login);