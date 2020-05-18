import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled, { css } from 'styled-components';
import Questions from "./Questions";

const FlexDiv = styled.div`
    display: flex;   
    justify-content: center;
    margin-top: 10px;
`;

const NavDiv = styled.div`
     cursor: pointer;
     padding: 10px;       
    ${props => props.currentTab && css`
      border: solid 1px blue;        
    `}
`;

class Dashboard extends Component{

    state = {
        currentTab:1
    }

    componentDidMount() {

    }

    render() {
        var {currentTab} = this.state;
        var {answeredQuestions,unansweredQuestions,users} = this.props;
        var renderList = currentTab === 1 ? unansweredQuestions:answeredQuestions;
        return <div>
            <FlexDiv>
                <NavDiv currentTab={currentTab === 1} onClick={()=>{
                    this.setState({currentTab: 1});
                }}>Unanswered</NavDiv>
                <NavDiv currentTab={currentTab === 2} onClick={()=>{
                    this.setState({currentTab: 2});
                }}>Answered</NavDiv>
            </FlexDiv>
            <FlexDiv>
                <div>
                    {
                        renderList.map((question) => {
                            return <Questions key={question.id} question={question} answered={currentTab === 2} user={users[question.author]} questionClicked={()=>{
                                this.props.history.push('/question/'+question.id);
                            }}/>
                        })
                    }
                </div>
            </FlexDiv>
        </div>
    }
}

function mapStateToProps ({ questions,users,authedUser }) {
    const user = users[authedUser];
    // const answeredQuestions = Object.keys(user.answers).filter(id=> questions[id] !== undefined);
    const answeredQuestions = Object.keys(questions).filter(id => Object.keys(user.answers).includes(id)).map(id => questions[id]);
    const unansweredQuestions = Object.keys(questions).filter(id => !Object.keys(user.answers).includes(id)).map(id => questions[id]);
    // const unansweredQuestions = Object.keys(questions).filter(id => Object.keys())
    return {
        unansweredQuestions:unansweredQuestions.sort((a,b) => b.timestamp - a.timestamp),
        answeredQuestions:answeredQuestions.sort((a,b) => b.timestamp - a.timestamp),
        users
    }
}

export default connect(mapStateToProps)(Dashboard);