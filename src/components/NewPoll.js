import React, { Component } from 'react';
import { connect } from 'react-redux'
import styled, { css } from 'styled-components';
import {addOptions, addQuestion} from "../actions/shared";
import { Redirect } from 'react-router-dom';

const Button = styled.div`
  width: 200px;
  background: green;
  margin-top:20px;
  color: white; 
  height: 40px;
  border-radius: 10px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`

class NewPoll extends Component{

    state={
        option1:'',
        option2:'',
        redirect:false
    };

    componentDidMount() {

    }

    render() {
        if(this.state.redirect){
            return <Redirect to='/'/>
        }
        var {option1,option2} = this.state;
       return <FlexCenter>
           <div>

           <h3>Create A New Poll</h3>
           <h4>Complete the question:</h4>
           <h3>Would you rather...</h3>
           <input value={option1} onChange={event => this.setState({option1:event.target.value})}/>
           <h3>or</h3>
           <input value={option2} onChange={event => this.setState({option2:event.target.value})}/>
           <Button onClick={()=>{
               if(option1.length > 0 && option2.length > 0){
                   this.props.dispatch(addOptions(option1,option2));
                   this.setState({redirect:true});
               }
           }}>
               Submit
           </Button>
           </div>
        </FlexCenter>
    }
}

function mapStateToProps ({ }) {
    return {

    }
}

export default connect(mapStateToProps)(NewPoll);
