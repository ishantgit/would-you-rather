import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled, { css } from 'styled-components';
import {NavLink} from "react-router-dom";
import Image from "./ImageDiv";
import {setAuthedUser} from "../actions/authedUser";

const NavFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NavWrapper = styled.div`
  padding: 10px;
  cursor: pointer;
`;


class Nav extends Component{

    render() {
        var {currentUser} = this.props;
        console.log(currentUser);
        return <FlexBetween>
            <NavFlex>
                <NavWrapper>
                    <NavLink to='/'>Home</NavLink>
                </NavWrapper>
                <NavWrapper>
                    <NavLink to='/add'>New Poll</NavLink>
                </NavWrapper>
                <NavWrapper>
                    <NavLink to='/leaderboard'>Leader Board</NavLink>
                </NavWrapper>
            </NavFlex>

            <NavFlex>
                <Image small  avatarURL={currentUser != null ? currentUser.avatarURL : null}/>
                <h4>{currentUser.name}</h4>
                <NavWrapper onClick={()=>{
                    this.props.dispatch(setAuthedUser(null));
                }}>Logout</NavWrapper>
            </NavFlex>

        </FlexBetween>
    }
}

function mapStateToProps ({ users ,authedUser }) {
    if(authedUser == null)
        return{
            currentUser: null
        };
    const currentUser = users[authedUser];
    return {
        currentUser
    }
}

export default connect(mapStateToProps)(Nav)