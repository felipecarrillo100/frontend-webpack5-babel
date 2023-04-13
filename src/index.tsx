// Application to Render
import React from "react";
import ReactDOM from "react-dom";
// React 18
// import {createRoot} from "react-dom/client";
import {App} from './components/App';

const app = <App />;

// Render application in DOM React 18
// createRoot(document.getElementById('document-root')).render(app);

ReactDOM.render((app), document.getElementById("document-root"));
