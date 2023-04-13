import React from "react";
import {ClassComponentTest} from "./classcomponents/ClassComponentTest";
import {FunctionalComponentTest} from "./functionalcomponents/FunctionalComponentTest";
import chromeIcon from "../../assets/icons/chrome.png";
import reactIcon from "../../assets/icons/react.png";

const App: React.FC = () => {
    return (
        <div>
            An Awesome App
            <img className='item-icon' src={reactIcon} />
            <img className='item-icon' src={chromeIcon} />

            <ClassComponentTest />
            <FunctionalComponentTest />
        </div>)
}

export {
    App
}
