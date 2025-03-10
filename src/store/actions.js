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
    TOGGLE_TOPIC,
    ADD_TOPIC
} from "../constants";

const backend = process.env.REACT_APP_BACKEND;

export const changeMeeting = (meeting) => ({
    type: CHANGE_MEETING,
    payload: meeting
});

export const requestMeeting = (meetingName) => (dispatch) => {
    dispatch({ type: REQUEST_MEETING_PENDING });
    fetch(`${backend}/meetings/${meetingName}`)
        .then((data) => data.json())
        .then((meeting) => {
            dispatch({ type: REQUEST_MEETING_SUCCESS, payload: meeting });
            for (const t of meeting.meeting.meetingTopicsList) {
                dispatch({ type: ADD_TOPIC, meeting: t.topicInputDTO.meetingName, topic: t.topicInputDTO.topicName });
            }
        })
        .catch((err) => dispatch({ type: REQUEST_MEETING_FAILED, payload: err }));
};

export const requestTopics = (meetingName) => (dispatch) => {
    dispatch({ type: REQUEST_TOPICS_PENDING });
    fetch(`${backend}/meetings/${meetingName}/topics`)
        .then((data) => data.json())
        .then((topics) => dispatch({ type: REQUEST_TOPICS_SUCCESS, payload: topics }))
        .catch((err) => dispatch({ type: REQUEST_TOPICS_FAILED, payload: err }));
};

export const startMeeting = (meetingName) => (dispatch) => {
    dispatch({ type: START_MEETING_PENDING });
    fetch(`${backend}/meetings/${meetingName}/start`)
        .then((data) => data.json())
        .then((meeting) => dispatch({ type: START_MEETING_SUCCESS, payload: meeting }))
        .catch((err) => dispatch({ type: START_MEETING_FAILED, payload: err }));
};

export const finishMeeting = (meetingName) => (dispatch) => {
    dispatch({ type: FINISH_MEETING_PENDING });
    fetch(`${backend}/meetings/${meetingName}/finish`)
        .then((data) => data.json())
        .then((meeting) => dispatch({ type: FINISH_MEETING_SUCCESS, payload: meeting }))
        .catch((err) => dispatch({ type: FINISH_MEETING_FAILED, payload: err }));
};

export const addTopic = (meetingName, topicName) => (dispatch) => {
    dispatch({ type: ADD_TOPIC, meeting: meetingName, topic: topicName });
};

export const toggleTopic = (meetingName, topicName) => (dispatch) => {
    dispatch({ type: TOGGLE_TOPIC, meeting: meetingName, topic: topicName });
};
