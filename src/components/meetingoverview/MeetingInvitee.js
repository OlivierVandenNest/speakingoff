import "./meetingoverview.scss";

var randomColor = require("randomcolor");

const MeetingInvitee = () => {
    var randomColorValue = randomColor({ hue: "blue", count: 1 });
    return (
        <div>
            <span style={{ backgroundColor: randomColorValue }} className="dot"></span>
        </div>
    );
};

export default MeetingInvitee;
