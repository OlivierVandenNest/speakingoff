import {
    REQUEST_MEETING_PENDING,
    REQUEST_MEETING_SUCCESS,
    REQUEST_MEETING_FAILED,
    REQUEST_TOPICS_PENDING,
    REQUEST_TOPICS_SUCCESS,
    REQUEST_TOPICS_FAILED,
    CHANGE_MEETING,
    CHANGE_TOPICS,
    START_MEETING_PENDING,
    START_MEETING_SUCCESS,
    START_MEETING_FAILED,
    FINISH_MEETING_PENDING,
    FINISH_MEETING_SUCCESS,
    FINISH_MEETING_FAILED,
    ADD_TOPIC,
    TOGGLE_TOPIC
} from "../constants";

const initialMeetingState = {
    isMeetingPending: false,
    meetingError: "",
    meeting: {}
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
        case START_MEETING_PENDING:
            return { ...state };
        case START_MEETING_SUCCESS:
            return { ...state, meeting: action.payload };
        case START_MEETING_FAILED:
            return { ...state, meetingError: action.payload };
        case FINISH_MEETING_PENDING:
            return { ...state };
        case FINISH_MEETING_SUCCESS:
            return { ...state, meeting: action.payload };
        case FINISH_MEETING_FAILED:
            return { ...state, meetingError: action.payload };
        default:
            return state;
    }
};

export const topicToggleReducer = (state = { topics: [] }, action) => {
    switch (action.type) {
        case ADD_TOPIC: {
            if (
                state.topics.filter((topicToggleState) => {
                    return topicToggleState.meetingName === action.meeting && topicToggleState.topicName === action.topic;
                }).length === 0
            ) {
                return {
                    ...state,
                    topics: [
                        ...state.topics,
                        {
                            meetingName: action.meeting,
                            topicName: action.topic,
                            toggled: false
                        }
                    ]
                };
            } else {
                return state;
            }
        }
        case TOGGLE_TOPIC: {
            return {
                ...state,
                topics: state.topics?.map((topic) => {
                    if (topic.topicName !== action.topic) {
                        return topic;
                    }
                    return {
                        ...topic,
                        toggled: !topic.toggled
                    };
                })
            };
        }
        default:
            return state;
    }
};
