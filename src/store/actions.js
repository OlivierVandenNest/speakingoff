import { REQUEST_MEETING_PENDING, REQUEST_MEETING_SUCCESS, REQUEST_MEETING_FAILED, CHANGE_MEETING } from "../constants.js";

const backend = process.env.REACT_APP_BACKEND;

export const changeMeeting = (meeting) => ({
    type: CHANGE_MEETING,
    payload: meeting
});

export const requestMeeting = (meetingName) => (dispatch) => {
    dispatch({ type: REQUEST_MEETING_PENDING });
    fetch(`${backend}/meetings/${meetingName}`)
        .then((data) => data.json())
        .then((meeting) => dispatch({ type: REQUEST_MEETING_SUCCESS, payload: meeting }))
        .catch((err) => dispatch({ type: REQUEST_MEETING_FAILED, payload: err }));
};
