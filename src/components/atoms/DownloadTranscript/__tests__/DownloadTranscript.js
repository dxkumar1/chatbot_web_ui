import React from "react";
import DownloadTranscript from "../DownloadTranscript";
import renderer from "react-test-renderer";
import { render, fireEvent } from "@testing-library/react";

test("Button snapshot test", () => {
  const component = renderer.create(<DownloadTranscript />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("download transcript class click", () => {
  const onSelect = jest.fn();
  const { debug, getByTestId } = render(
    <DownloadTranscript
      title="Download Chat Transcript"
      onClick={() => onSelect()}
      downloadTranscript={true}
      show={true}
      setShow={jest.fn()}
    />
  );

  const myBtn = getByTestId("button");
  fireEvent.click(myBtn);
  expect(onSelect).toBeCalled();
});

test("download transcript button click", () => {
  const onSelect = jest.fn();
  const { debug, getByTestId } = render(
    <DownloadTranscript
      title="Download Chat Transcript"
      onClick={() => onSelect()}
    />
  );

  const myBtn = getByTestId("button");
  fireEvent.click(myBtn);
  expect(onSelect).toBeCalled();
});
