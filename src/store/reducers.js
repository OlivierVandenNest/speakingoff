import {
    REQUEST_MEETING_PENDING,
    REQUEST_MEETING_SUCCESS,
    REQUEST_MEETING_FAILED,
    REQUEST_TOPICS_PENDING,
    REQUEST_TOPICS_SUCCESS,
    REQUEST_TOPICS_FAILED,
    CHANGE_MEETING,
    CHANGE_TOPICS
} from "../constants.js";

const initialMeetingState = {
    isMeetingPending: false,
    meetingError: "",
    meeting: {}
};

const initialTopicsState = {
    areTopicsPending: false,
    topicsError: "",
    topics: {}
};

export const requestMeeting = (state = initialMeetingState, action = {}) => {
    switch (action.type) {
        case REQUEST_MEETING_PENDING:
            return { ...state, isMeetingPending: true };
        case REQUEST_MEETING_SUCCESS:
            return { ...state, meeting: action.payload, isMeetingPending: false };
        case REQUEST_MEETING_FAILED:
            return { ...state, meetingError: action.payload, isMeetingPending: false };
        case CHANGE_MEETING:
            return { ...state, meeting: action.payload };
        default:
            return state;
    }
};

export const requestTopics = (state = initialTopicsState, action = {}) => {
    switch (action.type) {
        case REQUEST_TOPICS_PENDING:
            return { ...state, areTopicsPending: true };
        case REQUEST_TOPICS_SUCCESS:
            return { ...state, topics: action.payload, areTopicsPending: false };
        case REQUEST_TOPICS_FAILED:
            return { ...state, topicsError: action.payload, areTopicsPending: false };
        case CHANGE_TOPICS:
            return { ...state, topics: action.payload };
        default:
            return state;
    }
};
