import { Button, ProgressBar } from "react-bootstrap";
import MeetingInvitee from "./MeetingInvitee";
import micLogo from "../../assets/mic_logo.png";
import textLogo from "../../assets/text-logo.png";

import { useState } from "react";

const MeetingPhaseDetail = ({ phaseName, duration, progress }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <div className="mt-4 p-3 block-example border border-info rounded mb-0" onClick={() => setClicked(!clicked)}>
            <div className="meeting-detail-top">
                <div className="meeting-detail-title">
                    <h2>{phaseName}</h2>
                    {clicked && <h3 className="ml-3 font-weight-light">{duration}</h3>}
                </div>

                {clicked && (
                    <Button className="meeting-detail-rightgroup mr-2" variant="info">
                        Add Tag
                    </Button>
                )}
                {clicked && (
                    <Button className="mr-2" variant="outline-info">
                        Remove Tag
                    </Button>
                )}
                <Button className={clicked ? "" : "meeting-detail-rightgroup"} variant={clicked ? "danger" : "info"}>
                    {clicked ? "Hide" : "Show"}
                </Button>
            </div>
            {clicked && (
                <div className="mt-3 meeting-detail-mid">
                    <ProgressBar className="meeting-detail-progressbar" animated now={progress} variant="info" />
                    <div className="meeting-detail-invitees">
                        <MeetingInvitee />
                        <MeetingInvitee />
                        <MeetingInvitee />
                        <MeetingInvitee />
                    </div>
                </div>
            )}
            {clicked && (
                <div className="meeting-detail-bottom">
                    <h5 className="font-weight-bolder">ADD CONCLUSION:</h5>
                    <div className="ml-3 action-imgs">
                        <img src={micLogo} alt="mic" />
                        <img className="ml-3" src={textLogo} alt="text" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default MeetingPhaseDetail;
