import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let chatBotConfig = {
    apiUrl: "https://webapi.sentara.com/uat1/optimamember/v1/chat",
    memberId: "MDAxNTc3NVhVKjAx",
    userId: "Q2xhdWRpYV90ZXN0",
    token: "VPScnQeGaKKK8JEnCT6ZK9iSOaZu",
    subscriptionKey: "ea8c672e5f61415ab590975f575f8d35",
    phone: "123456789",
    chatBotStatus: false,
    sessionIdle: "900",
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    satmetrixKey: "Q6LALHP6Q76ILYZC3XYL7UIOJD3YE75CJRSAUVKSGS3P3XIOQ2JQ====",
    satmetrixSecret: "E7K6EFWJJR4JX4ERA45I5ZYJ767JTCSM4FVBQIA257RF4UHXXFSA===="

  }
const ChatbotMain = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
ChatbotMain.render(
  <React.StrictMode>
    <App botConfig={chatBotConfig} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

export default ChatbotMain;


