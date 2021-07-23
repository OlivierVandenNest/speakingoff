import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/general/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { requestMeeting, requestTopics } from "./store/reducers";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ requestMeeting, requestTopics });
const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
