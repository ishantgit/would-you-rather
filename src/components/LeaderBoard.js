import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled, { css } from 'styled-components';
import Image from "./ImageDiv";

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px; 
`;

const FlexMain = styled.div`
  display: flex;
  justify-content: center;
`

const MainDiv = styled.div`
  width: 600px;
`;

const InfoDiv = styled.div`
  margin-right: 10px;
  margin-top: 10px;
`;

class LeaderBoard extends Component{

    render() {
        var {list} = this.props;
        return <FlexMain>
            <MainDiv>
            {
                this.props.list.map(user => {
                    console.log(user);
                    return <FlexDiv key={user.id}>
                        <Image avatarURL={user.avatarURL}/>
                        <InfoDiv>
                            {user.name} <br/>
                            Questions Answered {Object.keys(user.answers).length} <br/>
                            Questions Created {user.questions.length} <br/>
                        </InfoDiv>
                        <div>
                            Score {(Object.keys(user.answers).length + user.questions.length)}
                        </div>

                    </FlexDiv>
                })
            }
            </MainDiv>
        </FlexMain>
    }
}

function mapStateToProps ({ users }) {
    const list = Object.values(users).sort((a,b) => (Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length))
    return {
        list
    }
}

export default connect(mapStateToProps)(LeaderBoard);