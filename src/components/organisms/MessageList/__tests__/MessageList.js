import React from "react";
import MessageList from "../MessageList";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../../../shared/redux/store";
import { SignalRProvider } from "../../../../shared/context/SignalRContext";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

import { getMessages,setSessionAttributes } from "../../../../shared/redux/action";

import actionTypes from "../../../../shared/types/actionTypes";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { createStore, combineReducers } from "redux";
jest.mock("next/dist/client/router", () => require("next-router-mock"));

//import configureStore from 'redux-mock-store'
window.HTMLElement.prototype.scrollIntoView = jest.fn();
jest.mock("broadcast-channel");
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));
// const data = [
//   {
//     type: "message",
//     id: "4sVoZwvZrbp9V5VvQZ8kwL-us|0000007",
//     timestamp: "2023-01-31T11:40:36.97186Z",
//     by: "Healthbot",
//     text: "Your phone number on file is:",
//     attachments: [
//       {
//         content: {
//           body: [
//             {
//               type: "FactSet",
//               facts: [
//                 {
//                   title: "Phone Number",
//                   value: "7576458464",
//                 },
//               ],
//               isVisible: false,
//             },
//           ],
//           name: "other admin--demographic phone number",
//         },
//       },
//     ],
//     replyToId: "4sVoZwvZrbp9V5VvQZ8kwL-us|0000006",
//   },
// ];


// jest.mock('react-redux',()=>({
//   ...jest.requireActual("react-redux"),
//   useDispatch:jest.fn(),
//   useSelector:jest.fn(),

// }))



//jest.mock('react-redux',jest.fn())






test("ChatbotFooter snapshot test", () => {

  store.dispatch(
    getMessages({ messages: [{"type":"message","id":"99W38dBy40fDWGZYf9NsYX-us|0000001","timestamp":"2023-02-27T13:13:49.0585024Z","by":"Healthbot","text":"Hello Claudia! I'm your healthbot. How can I help you today?","attachments":[{"content":{"body":[{"type":"TextBlock","text":"Please select one of the following:","wrap":true,"color":"Default","horizontalAlignment":"Center","size":"Small"}]}},{"content":{"buttons":[{"title":"My Benefits","type":"imBack","value":"My Benefits"},{"title":"My Claims","type":"imBack","value":"My Claims"},{"title":"My Account","type":"imBack","value":"My Account"},{"title":"Something Else","type":"imBack","value":"Something Else"}]}}],"replyToId":"99W38dBy40fDWGZYf9NsYX-us|0000000"}], count: 6 }))



  const component = renderer.create(
    <SignalRProvider>
      <Provider store={store}>
        <MessageList />
      </Provider>
    </SignalRProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test("footer value testing", async () => {

  store.dispatch(
    getMessages({ messages: [{"type":"message","id":"99W38dBy40fDWGZYf9NsYX-us|0000001","timestamp":"2023-02-27T13:13:49.0585024Z","by":"Healthbot","text":"Hello Claudia! I'm your healthbot. How can I help you today?","attachments":[{"content":{"body":[{"type":"TextBlock","text":"Please select one of the following:","wrap":true,"color":"Default","horizontalAlignment":"Center","size":"Small"}]}},{"content":{"buttons":[{"title":"My Benefits","type":"imBack","value":"My Benefits"},{"title":"My Claims","type":"imBack","value":"My Claims"},{"title":"My Account","type":"imBack","value":"My Account"},{"title":"Something Else","type":"imBack","value":"Something Else"}]}}],"replyToId":"99W38dBy40fDWGZYf9NsYX-us|0000000"}], count: 6 }))



  render(
    <SignalRProvider>
      <Provider store={store}>
        <MessageList />
      </Provider>
    </SignalRProvider>
  );
  const btnEl = screen.getByTestId("message_list");
  expect(btnEl).toBeInTheDocument();
});



