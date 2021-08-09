import { REQUEST_MEETING_PENDING, REQUEST_MEETING_SUCCESS, REQUEST_MEETING_FAILED, CHANGE_MEETING } from "../constants.js";

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
        default:
            return state;
    }
};
