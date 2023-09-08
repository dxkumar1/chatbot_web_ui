import React from "react";
import CallAgent from "../CallAgent";
import { fireEvent, render } from "@testing-library/react";
import { ModalDialog } from "../..";

test("Component should rendered properly)", () => {
  const closeEndSession = jest.fn();
  const CallLiveAgent = jest.fn();

  const { getByTestId, getByText } = render(
    <ModalDialog
      content={false}
      successTitle={"1(800) 552 1199"}
      cancelTitle={"Cancel"}
      onSuccess={CallLiveAgent}
      onClose={closeEndSession}
      AgentConnect={true}
      modalType={"CallAgent"}
    />
  );
  const getById = getByTestId("modal-dialog-id");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});
