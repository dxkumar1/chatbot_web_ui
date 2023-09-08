
import React from 'react';

import { SignalRProvider } from "../../context/SignalRContext";
import renderer from "react-test-renderer";
jest.mock("@microsoft/signalr",()=>({
...jest.requireActual("@microsoft/signalr"),
DefaultHttpClient:jest.fn(),
HttpRequest:jest.fn(),
HubConnectionBuilder:jest.fn(),
HttpResponse:jest.fn(),
}));

it("Signal snapshot test", () => {
    const component = renderer.create(<SignalRProvider/>);
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
});
