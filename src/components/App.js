import "../css/App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";

import NavigationBar from "./NavigationBar";
import MeetingProgressBar from "./MeetingProgressBar";
import MeetingPhaseDetails from "./MeetingPhaseDetails";

const backend = process.env.BACKEND || "http://localhost:3001";

function App() {
    const [meetingTopics, setMeetingTopics] = useState([]);

    useEffect(() => {
        fetch(backend + "/topics", {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((topics) => {
                const topicList = [];
                console.log(topics);
                for (const [key, val] in topics) {
                    console.log(key, val);
                    topicList.push(val);
                }
                setMeetingTopics(topicList);
                console.log(meetingTopics);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="App">
            <NavigationBar />
            <h1 className="mb-5">Coca Cola Product Meeting</h1>
            <MeetingProgressBar />
            <MeetingPhaseDetails topics={meetingTopics} />
        </div>
    );
}

export default App;
