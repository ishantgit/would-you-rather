import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const ImageDiv = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-right: 10px;
  ${props => props.small && css`
        width: 25px;
        height: 25px;
        border-radius: 25px;          
    `}
`;

export default function Image(props) {
    return <ImageDiv src={props.avatarURL} alt={''} small={props.small} />
}