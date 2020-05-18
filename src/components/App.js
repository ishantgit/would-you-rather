import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router,Switch } from 'react-router-dom';
import LoadingBar from 'react-redux-loading'
import { handleInitialData } from '../actions/shared'
import Login from "./Login";
import {  Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import LeaderBoard from "./LeaderBoard";
import NewPoll from "./NewPoll";
import QuestionDetails from "./QuestionDetails";
import {ErrorComponent} from "./ErrorComponent";

class App extends Component {
  componentDidMount(){
      this.props.dispatch(handleInitialData());
  }
  render() {
      var {authedUser} = this.props;
    return (
      <Router>
        <Fragment>
            <LoadingBar />
            {
                authedUser == null ? <Switch>
                        <Route path='/' exact component={Login} />
                        <Route  component={ErrorComponent} />
                </Switch>:
                    <div>
                    <Nav/>
                    <Switch>
                        <Route path='/' exact component={Dashboard} />
                        <Route path='/add'  component={NewPoll} />
                        <Route path='/leaderboard'  component={LeaderBoard} />
                        <Route path='/question/:id'  component={QuestionDetails} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    </div>
            }
        </Fragment>
      </Router>
    );
  }
}


function mapStateToProps ({ authedUser }) {
    return{
        authedUser
    }
}

export default connect(mapStateToProps)(App)