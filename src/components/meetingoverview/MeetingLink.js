import { Alert, Button } from "react-bootstrap";
import { connect } from "react-redux";
import copyLink from "../../assets/copylink.svg";
import { useState } from "react";

const mapStateToProps = (state) => {
    return {
        meeting: state.requestMeeting.meeting
    };
};
const MeetingLink = ({ meeting }) => {
    const domain = process.env.REACT_APP_DOMAIN;
    const [copied, setCopied] = useState(false);

    const copyLinkCallback = () => {
        navigator.clipboard.writeText(`${domain}/meeting/${meeting.meetingName}`);
        setCopied(true);
    };
    return (
        <div>
            <h1>Invite your co-workers!</h1>
            <div className="copylinkrow mx-auto mt-4">
                <Alert id="linkalert" variant="info ml-auto">{`${domain}/meeting/${meeting.meetingName}`}</Alert>
                {!copied && document.queryCommandSupported("copy") && (
                    <Button className="button mr-auto" variant="white" onClick={copyLinkCallback}>
                        <img src={copyLink} alt="copy" className="copyicon"></img>
                        <h6 className="mr-auto my-auto">Copy link</h6>
                    </Button>
                )}
                {copied && <h6 className="mr-auto mt-3 ml-3">Copied!</h6>}
            </div>
        </div>
    );
};

export default connect(mapStateToProps, {})(MeetingLink);
