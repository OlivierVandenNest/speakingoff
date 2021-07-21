import MeetingPhaseDetail from "./MeetingPhaseDetail";
import addButton from "../add_button.png";
import Button from "react-bootstrap/Button";
import TopicForm from "./TopicForm";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { requestTopics } from "../store/actions";

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting,
        meetingTopics: state.requestTopics.topics
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadTopics: (meetingName) => {
            dispatch(requestTopics(meetingName));
        }
    };
};

const MeetingPhaseDetails = ({ meeting, meetingTopics, onReloadTopics }) => {
    // State specific to this component
    const [creatingTopic, setCreatingTopic] = useState(false);
    const [topicList, setTopicList] = useState([]);

    useEffect(() => {
        var newTopicList = [];
        Object.values(meetingTopics).forEach((topic) => newTopicList.push(topic));
        setTopicList(newTopicList);
    }, [meetingTopics]);

    const createTopic = (event) => {
        setCreatingTopic(!creatingTopic);
    };

    // const fetchTopics = () => {
    //     fetch(`${backend}/meetings/${meeting.meetingName}/topics`, {
    //         method: "get",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then((response) => {
    //             if (response.status === StatusCodes.OK) {
    //                 return response.json();
    //             } else {
    //                 console.log(`bad response status when fetching topics: ${response.status}`);
    //             }
    //         })
    //         .then((topics) => {
    //             var newTopicList = [];
    //             for (const [_, value] of Object.entries(topics)) {
    //                 newTopicList.push(value);
    //             }
    //             setTopicList(newTopicList);
    //         })
    //         .catch((err) => console.log(err));
    // };

    return (
        <div className="px-5 meeting-details">
            {/* <MeetingPhaseDetail phaseName={"Product Design"} duration={"ongoing"} progress={50} />
            <MeetingPhaseDetail phaseName={"Marketing"} duration={"15 min"} progress={0} />
            <MeetingPhaseDetail phaseName={"Sales"} duration={"45 min"} progress={0} />
            <MeetingPhaseDetail phaseName={"Legal"} duration={"1h 15min"} progress={0} /> */}
            <div>
                {topicList.map((topic) => {
                    console.log(topic);
                    return <MeetingPhaseDetail key={topic.topicId} phaseName={topic.topicName} duration={topic.duration} progress={0} />;
                })}
            </div>
            <Button className="mt-5 button" variant="white" onClick={createTopic}>
                <img className="add-button-image" src={addButton} alt="add"></img>
            </Button>
            {creatingTopic && <TopicForm />}
            <Button className="mt-5 mx-auto button" variant="success" onClick={() => onReloadTopics(meeting.meetingName)}>
                Reload Topics
            </Button>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingPhaseDetails);
