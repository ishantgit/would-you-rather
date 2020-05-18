import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled, { css } from 'styled-components';
import Image from "./ImageDiv";
import {answerQuestion} from "../actions/shared";
import {ErrorComponent} from "./ErrorComponent";

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitDiv = styled.button`
 width: 100px;
 height: 40px;
 align-content: center;
 background: green;
 color: white;
 border-radius: 10px;
 text-align: center;
 margin-top: 10px;
`;




class QuestionDetails extends Component{
    state={
      selectedOption:''
    };
    componentDidMount() {

    }

    render() {
        if(this.props.idNotFound){
            return <ErrorComponent/>
        }
        var {question,hasAnswered,users,votePercentage1,votePercentage2,numberOfPeople1,numberOfPeople2,optionAnswered} = this.props;
        var {selectedOption} = this.state;
        return <FlexDiv>
            <Image avatarURL={users[question.author].avatarURL}/>
            {
                hasAnswered ? <div>
                    <h4>Results</h4>
                    Would you rather <br/>
                    <h5>{question.optionOne.text} {optionAnswered === "optionOne" ? "   -> Your Vote" : ""}</h5>
                    <h3>Total Votes {numberOfPeople1}</h3>
                    <h3>Vote Percentage {votePercentage1}</h3>
                    <h5>{question.optionTwo.text} {optionAnswered === "optionTwo" ? "   -> Your Vote" : ""}</h5>
                    <h3>Total Votes {numberOfPeople2}</h3>
                    <h3>Vote Percentage {votePercentage2}</h3>
                </div> : <div>
                    <h4>{question.author} asks</h4>
                    <h5>Would you rather</h5>
                    <div>
                        <input checked={selectedOption === "optionOne"} type="radio" onChange={event => this.setState({selectedOption:"optionOne"})}/>
                        {question.optionOne.text}
                    </div>
                    <div>
                        <input checked={selectedOption === "optionTwo"} type="radio" onChange={event => this.setState({selectedOption:"optionTwo"})}/>
                        {question.optionTwo.text}
                    </div>
                    <SubmitDiv onClick={()=>{
                        if(selectedOption !== ''){
                            this.props.dispatch(answerQuestion(question.id,selectedOption));
                        }
                    }}>
                        Answer
                    </SubmitDiv>
                </div>
            }
        </FlexDiv>
    }
}

function mapsStateToProps({questions,users,authedUser},props) {
    const { id } = props.match.params;
    if(id === undefined || id == null || questions[id] === undefined || questions[id] === null){
        return {
            idNotFound:true
        }
    }
    const question = questions[id];
    const hasAnswered = Object.keys(users[authedUser].answers).includes(id);
    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    const votePercentage1 = ((question.optionOne.votes.length/totalVotes)*100);
    const votePercentage2 = (100-votePercentage1);
    const numberOfPeople1 = question.optionOne.votes.length;
    const numberOfPeople2 = question.optionTwo.votes.length;
    const optionAnswered = users[authedUser].answers[id];
    return{
        question,
        hasAnswered,
        users,
        votePercentage1,
        votePercentage2,
        numberOfPeople1,
        numberOfPeople2,
        optionAnswered
    }
}

export default connect(mapsStateToProps)(QuestionDetails);