import TopicDetail from "./TopicDetail";
import addButton from "../../assets/add_rounded_corners.svg";
import Button from "react-bootstrap/Button";
import TopicForm from "../forms/TopicForm";
import { useState } from "react";
import { connect } from "react-redux";
import { requestMeeting } from "../../store/actions";

const mapStateToProps = (state) => {
    return {
        serverResponse: state.requestMeeting.meeting
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReloadMeeting: (meetingName) => {
            dispatch(requestMeeting(meetingName));
        }
    };
};

const TopicList = ({ serverResponse, onReloadMeeting }) => {
    const [creatingTopic, setCreatingTopic] = useState(false);

    const createTopic = (event) => {
        setCreatingTopic(!creatingTopic);
    };

    return (
        <div className="px-5 meeting-details">
            <div>
                {serverResponse.meeting?.meetingTopicsList?.map((topic) => {
                    return <TopicDetail key={topic.topicId} topicInputDTO={topic.topicInputDTO} />;
                })}
            </div>
            {creatingTopic && <TopicForm />}
            <Button className="mt-5 button" variant="white" onClick={createTopic}>
                <img className="add-button-image" src={addButton} alt="add"></img>
            </Button>
            <Button className="mt-5 mx-auto button" variant="info" onClick={() => onReloadMeeting(serverResponse.meeting?.meetingInputDTO?.meetingName)}>
                Reload Topics
            </Button>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicList);
