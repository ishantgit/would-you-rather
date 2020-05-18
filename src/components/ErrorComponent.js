import React, { Component } from 'react'
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";
import styled, { css } from 'styled-components';

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 200px;
`

const BackButton = styled.div`
  background: gray;
  color: black;
  height: 40px;
  width: 100px;
  cursor: pointer;
  margin-top: 40px;
  line-height: 40px;
  text-align: center;
`

export class ErrorComponent extends Component{

    render() {
        return <FlexDiv>
            <div>
            <div>
                404 Page Not Found
            </div>
            <BackButton>
                <NavLink to='/'>
                    Home
                </NavLink>
            </BackButton>
            </div>
        </FlexDiv>
    }
}