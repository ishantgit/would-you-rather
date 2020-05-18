import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled, { css } from 'styled-components';
import Image from "./ImageDiv";

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 300px; 
  margin-top: 30px;
`;

const ButtonBox = styled.button`
  background: black;
  color: white;
  width: 200px;
  margin-top: 25px;
`

export default function Questions(props){
    return <FlexDiv>
        <Image avatarURL={props.user.avatarURL}/>
        <div>
            Would You Rather <br/>
            {props.question.optionOne.text}<br/>
            or
            {
                props.answered ? <ButtonBox onClick={props.questionClicked}>
                    Results
                </ButtonBox> : <ButtonBox onClick={props.questionClicked}>
                    Answer Poll
                </ButtonBox>
            }
        </div>
    </FlexDiv>
};