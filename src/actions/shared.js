import { getInitialData } from '../utils/api'
import { addUserQuestion, saveUserAnswer, receiveUsers } from '../actions/users'
import { addQuestion, receiveQuestions, saveQuestionAnswer } from '../actions/questions'
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({ users, questions})=> {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(hideLoading());
        })
    }
}

export function addOptions (optionOneText, optionTwoText){
    return (dispatch, getState) => {
        dispatch(showLoading());
        const { authedUser } = getState();
        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question));
            dispatch(addUserQuestion(authedUser, question.id));
            dispatch(hideLoading());
        })

    }
}

export function answerQuestion (qid, option) {
    return (dispatch, getState) => {
      const { authedUser } = getState();
      dispatch(showLoading());
      const info = {
        authedUser: authedUser,
        qid,
        answer: option
      };
      _saveQuestionAnswer(info)
          .then(() => {
              dispatch(saveQuestionAnswer(authedUser, qid, option));
              dispatch(saveUserAnswer(authedUser, qid, option));
              dispatch(hideLoading());
          })
    }
}