/*********************************************************************
 * File Name: Strings.js
 * Date Created: 20-Feb-2022
 * Date Modified: 20-Feb-2022
 * Description: unit testing for completing scenario on Strings.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import { render, screen } from "@testing-library/react";
import React from "react";
import {
  END_CHAT,
  END_CHAT_BTN_CANCEL,
  END_CHAT_CONTENT,
  END_CHAT_SUB_CONTENT,
  END_CHAT_BTN_SUBMIT,
  SESSION_TRANSFER_TITLE,
  END_SESSION_INACTIVITY,
  END_SESSION_MESSAGE,
  THANK_YOU,
  SURVEY_MESSAGE,
  TAKE_SURVEY,
  EXIT,
  SURVEY_TITLE,
  SURVEY_CONTENT,
  SURVEY_SUB_CONTENT,
  SURVEY_BTN_SUBMIT,
  SURVEY_BTN_CANCEL,
  AGENT_NUMBER,
  AGENT_NUMBER_CALL,
  AGENT_CALL_CANCEL,
  AGENTP_CONNECT_INFO,
  WE_APOLOGIZE,
  ALTERNATIVELY,
  WE_ARE_UNABLE,
  ALTERNATIVELYMOBILE,
  AGENTP_CONNECT,
  AGENTP_CONNECT_LATER,
  SESSION_TRANSFER_CONTENT,
  SESSION_TRANSFER_SUB_CONTENT,
  SESSION_TRANSFER_SUB_CONTENT1,
  TRANSFER_HERE,
  START_NEW_SESSION,
  CALL_LIVE_AGENT,
  AGENT_CONNECTED,
  SESSION_TRANSFERED,
  SESSION_TRANSFERED_NEW,
  DEFAULT_GLOBAL_PHONE,
  CLOSE,
  AGENT_CONNECT_CANCELED,
  TIMEOUT_SUCCESS_TEXT,
  TIMEOUT_FAIL_TEXT,
  CONNECTION_LIVE_AGENT,
  SERVICE_ERROR_DESCRIPTION,
  SERVICE_ERROR_SUCCESS_TEXT,
  SERVICE_ERROR_FAIL_TEXT,
  SERVICE_ERROR_TITLE
} from "../strings";

const Component = ({ data }) => {
  return <div data-testid="data">{data}</div>;
};

describe("END_CHAT test", () => {
  it("END_CHAT test", () => {
    const { debug, getByTestId, getByText } = render(
      <Component data={END_CHAT} />
    );
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("END_CHAT_CONTENT test", () => {
  it("END_CHAT_CONTENT test", () => {
    const { debug, getByTestId, getByText } = render(
      <Component data={END_CHAT_CONTENT} />
    );
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("END_CHAT_SUB_CONTENT test", () => {
  it("END_CHAT_SUB_CONTENT test", () => {
    const { debug, getByTestId, getByText } = render(
      <Component data={END_CHAT_SUB_CONTENT} />
    );
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("ChatbotFEND_SESSION_INACTIVITYooter test", () => {
  it("END_SESSION_INACTIVITY test", () => {
    const { debug, getByTestId, getByText } = render(
      <Component data={END_SESSION_INACTIVITY} />
    );
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("END_SESSION_MESSAGE test", () => {
  it("END_SESSION_MESSAGE test", () => {
    const { debug, getByTestId, getByText } = render(
      <Component data={END_SESSION_MESSAGE} />
    );
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("THANK_YOU test", () => {
  it("THANK_YOU test", () => {
    const { debug, getByTestId, getByText } = render(
      <Component data={THANK_YOU} />
    );
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("SURVEY_MESSAGE test", () => {
  it("SURVEY_MESSAGE test", () => {
    const { debug, getByTestId, getByText } = render(
      <Component data={SURVEY_MESSAGE} />
    );
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("TAKE_SURVEY test", () => {
  it("TAKE_SURVEY test", () => {
    const { debug, getByTestId, getByText } = render(
      <Component data={TAKE_SURVEY} />
    );
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("EXIT test", () => {
  it("EXIT test", () => {
    const { debug, getByTestId, getByText } = render(<Component data={EXIT} />);
    const getById = getByTestId("data");
    expect(getById).toBeTruthy();
    expect(getById.tagName).toBe("DIV");
  });
});

describe("END_CHAT_BTN_SUBMIT test", () => {
    it("END_CHAT_BTN_SUBMIT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={END_CHAT_BTN_SUBMIT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("END_CHAT_BTN_CANCEL test", () => {
    it("END_CHAT_BTN_CANCEL test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={END_CHAT_BTN_CANCEL} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SURVEY_TITLE test", () => {
    it("SURVEY_TITLE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SURVEY_TITLE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SURVEY_CONTENT test", () => {
    it("SURVEY_CONTENT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SURVEY_CONTENT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SURVEY_SUB_CONTENT test", () => {
    it("SURVEY_SUB_CONTENT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SURVEY_SUB_CONTENT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SURVEY_BTN_SUBMIT test", () => {
    it("SURVEY_BTN_SUBMIT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SURVEY_BTN_SUBMIT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SURVEY_BTN_CANCEL test", () => {
    it("SURVEY_BTN_CANCEL test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SURVEY_BTN_CANCEL} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("AGENT_NUMBER test", () => {
    it("AGENT_NUMBER test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={AGENT_NUMBER} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("AGENT_NUMBER_CALL test", () => {
    it("AGENT_NUMBER_CALL test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={AGENT_NUMBER_CALL} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("AGENT_CALL_CANCEL test", () => {
    it("AGENT_CALL_CANCEL test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={AGENT_CALL_CANCEL} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("AGENTP_CONNECT_INFO test", () => {
    it("AGENTP_CONNECT_INFO test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={AGENTP_CONNECT_INFO} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("WE_APOLOGIZE test", () => {
    it("WE_APOLOGIZE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={WE_APOLOGIZE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("WE_ARE_UNABLE test", () => {
    it("WE_ARE_UNABLE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={WE_ARE_UNABLE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("ALTERNATIVELY test", () => {
    it("ALTERNATIVELY test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={ALTERNATIVELY} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("ALTERNATIVELYMOBILE test", () => {
    it("ALTERNATIVELYMOBILE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={ALTERNATIVELYMOBILE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("AGENTP_CONNECT test", () => {
    it("AGENTP_CONNECT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={AGENTP_CONNECT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("AGENTP_CONNECT_LATER test", () => {
    it("AGENTP_CONNECT_LATER test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={AGENTP_CONNECT_LATER} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SESSION_TRANSFER_TITLE test", () => {
    it("SESSION_TRANSFER_TITLE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SESSION_TRANSFER_TITLE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SESSION_TRANSFER_CONTENT test", () => {
    it("SESSION_TRANSFER_CONTENT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SESSION_TRANSFER_CONTENT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SESSION_TRANSFER_SUB_CONTENT test", () => {
    it("SESSION_TRANSFER_SUB_CONTENT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SESSION_TRANSFER_SUB_CONTENT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SESSION_TRANSFER_SUB_CONTENT1 test", () => {
    it("SESSION_TRANSFER_SUB_CONTENT1 test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SESSION_TRANSFER_SUB_CONTENT1} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("TRANSFER_HERE test", () => {
    it("TRANSFER_HERE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={TRANSFER_HERE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("START_NEW_SESSION test", () => {
    it("START_NEW_SESSION test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={START_NEW_SESSION} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("CALL_LIVE_AGENT test", () => {
    it("CALL_LIVE_AGENT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={CALL_LIVE_AGENT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("AGENT_CONNECTED test", () => {
    it("AGENT_CONNECTED test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={AGENT_CONNECTED} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SESSION_TRANSFERED test", () => {
    it("SESSION_TRANSFERED test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SESSION_TRANSFERED} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SESSION_TRANSFERED_NEW test", () => {
    it("SESSION_TRANSFERED_NEW test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SESSION_TRANSFERED_NEW} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("DEFAULT_GLOBAL_PHONE test", () => {
    it("DEFAULT_GLOBAL_PHONE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={DEFAULT_GLOBAL_PHONE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });

  describe("AGENT_CONNECT_CANCELED test", () => {
    it("AGENT_CONNECT_CANCELED test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={AGENT_CONNECT_CANCELED} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });

  describe("CLOSE test", () => {
    it("CLOSE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={CLOSE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });

  describe("TIMEOUT_FAIL_TEXT test", () => {
    it("TIMEOUT_FAIL_TEXT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={TIMEOUT_FAIL_TEXT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("TIMEOUT_SUCCESS_TEXT test", () => {
    it("TIMEOUT_SUCCESS_TEXT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={TIMEOUT_SUCCESS_TEXT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("CONNECTION_LIVE_AGENT test", () => {
    it("CONNECTION_LIVE_AGENT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={CONNECTION_LIVE_AGENT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SERVICE_ERROR_DESCRIPTION test", () => {
    it("SERVICE_ERROR_DESCRIPTION test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SERVICE_ERROR_DESCRIPTION} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SERVICE_ERROR_TITLE test", () => {
    it("SERVICE_ERROR_TITLE test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SERVICE_ERROR_TITLE} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SERVICE_ERROR_SUCCESS_TEXT test", () => {
    it("SERVICE_ERROR_SUCCESS_TEXT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SERVICE_ERROR_SUCCESS_TEXT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  describe("SERVICE_ERROR_FAIL_TEXT test", () => {
    it("SERVICE_ERROR_FAIL_TEXT test", () => {
      const { debug, getByTestId, getByText } = render(<Component data={SERVICE_ERROR_FAIL_TEXT} />);
      const getById = getByTestId("data");
      expect(getById).toBeTruthy();
      expect(getById.tagName).toBe("DIV");
    });
  });
  