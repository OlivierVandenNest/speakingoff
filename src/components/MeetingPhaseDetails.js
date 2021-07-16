import MeetingPhaseDetail from "./MeetingPhaseDetail";
import addButton from "../add_button.png";
import Button from "react-bootstrap/Button";
import TopicForm from "./TopicForm";
import { useState, useEffect } from "react";

const backend = process.env.BACKEND || "http://localhost:3001";

const MeetingPhaseDetails = ({ meetingTopics }) => {
    const [creatingTopic, setCreatingTopic] = useState(false);
    const [topicList, setTopicList] = useState(meetingTopics || []);

    // TODO: store everything in redux / localstorage

    const createTopic = (event) => {
        setCreatingTopic(!creatingTopic);
    };

    const fetchTopics = () => {
        fetch(backend + "/topics", {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((topics) => {
                var newTopicList = [];
                for (const [_, value] of Object.entries(topics)) {
                    newTopicList.push(value);
                }
                setTopicList(newTopicList);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="px-5 meeting-details">
            <MeetingPhaseDetail phaseName={"Product Design"} duration={"ongoing"} progress={50} />
            <MeetingPhaseDetail phaseName={"Marketing"} duration={"15 min"} progress={0} />
            <MeetingPhaseDetail phaseName={"Sales"} duration={"45 min"} progress={0} />
            <MeetingPhaseDetail phaseName={"Legal"} duration={"1h 15min"} progress={0} />
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
            <Button className="mt-5 mx-auto button" variant="success" onClick={fetchTopics}>
                Reload Topics
            </Button>
        </div>
    );
};

export default MeetingPhaseDetails;
