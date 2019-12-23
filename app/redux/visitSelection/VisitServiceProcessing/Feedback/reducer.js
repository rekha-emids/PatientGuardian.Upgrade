import {
    QuestionsList
} from './actions'

const defaultState = {QuestionsList: null},

 FeedbackState = (state = defaultState, action) => {
    switch (action.type) {

        case QuestionsList.getQuestionsListSuccess:
            return {
                ...state,
                QuestionsList: action.data
            };

        default:
            return state;
    }
}

export default FeedbackState;
