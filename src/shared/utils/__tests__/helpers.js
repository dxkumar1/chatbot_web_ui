import "@testing-library/jest-dom";
import {
  welcome,
  parseWelcome,
  blankMessage,
  parseBlankMessage,
  textMessageMockResponse,
  attachmentMessagesMockResponse,
  attachmentMessagesMockRequest,
  parseBlankAttachments,
  blankAttachments,
  actionCardMockRequest,
  actionCardMockResponse,
  deductableAttachmentMockRequest,
  deductableAttachmentMockResponse,
  linkAttachmentMockRequest,
  linkAttachmentMockResponse,
  multiSelectAttachmentMockRequest,
  multiSelectAttachmentMockResponse,
  addressAttachmentMockRequest,
  addressAttachmentMockResponse,
  othersAttachmentMockRequest,
  othersAttachmentMockResponse,
  confirmationAttachmentMockRequest,
  confirmationAttachmentMockResponse,
  userSelectionMessage,
  userSelectionResponse,
  othersTextBlockAttachmentMockRequest,
  othersTextBlockAttachmentMockResponse,
  membersAttachmentMockRequest,
  membersAttachmentMockResponse,
  //sj
  CancellinkAgentMockRequest,
  cancelLiveAgentMockResponse, //no response got yet 
  processFileCardMockRequest,
  processFileCardMockResponse, 
  processLinkCardMockRequest,
  processLinkCardMockResponse, 
  processClaimsCardMockRequest,
  processClaimsCardMockResponse, 
  processPlanDataCardMockRequest
} from "../__mock__/welcome";
import {
  parseMessage,
  getCardType,
  textMessage,
  parseAttachments,
  processActionCard,
  //sj
  processCancelAgent,
  processDigitalIdCard,
  processLinkCard,
  processClaimsCard,
  processPlanDataCard,
  isMobilePlatform
} from "../helpers";

describe("Validate helper", () => {
  test("validate  parseMessage without issues", () => {
    expect(JSON.stringify(parseMessage(welcome))).toEqual(parseWelcome);
  });

  test("validate  blank message without issues", () => {
    expect(JSON.stringify(parseMessage(blankMessage))).toEqual(
      parseBlankMessage
    );
  });

  // test("validate userselection in parseMessage without issues", () => {
  //   expect(JSON.stringify(parseMessage(userSelectionMessage))).toEqual(
  //     userSelectionResponse
  //   );
  // });

  // test("validate  get text message without issues", () => {
  //   expect(
  //     textMessage(
  //       "CMmFb4EFJlx6j6om5tQzXF-us|0000001",
  //       "CMmFb4EFJlx6j6om5tQzXF-us|0000000",
  //       "Hello  Bill! I'm your Optima Health Bot. How can I help you today?",
  //       "system",
  //       "2022-11-19T15:01:07.2603252Z"
  //     )
  //   ).toEqual(textMessageMockResponse);
  // });

  test("validate  parse attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(attachmentMessagesMockRequest))
      )
    ).toEqual(attachmentMessagesMockResponse);
  });

  test("validate  blank attachments without issues", () => {
    expect(
      JSON.stringify(parseAttachments(...Object.values(blankAttachments)))
    ).toEqual(parseBlankAttachments);
  });

  test("validate  deductable attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(deductableAttachmentMockRequest))
      )
    ).toEqual(deductableAttachmentMockResponse);
  });

  test("validate link attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(linkAttachmentMockRequest))
      )
    ).toEqual(linkAttachmentMockResponse);
  });

  test("validate multiselect attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(multiSelectAttachmentMockRequest))
      )
    ).toEqual(multiSelectAttachmentMockResponse);
  });

  test("validate address attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(addressAttachmentMockRequest))
      )
    ).toEqual(addressAttachmentMockResponse);
  });

  test("validate confirmation attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(confirmationAttachmentMockRequest))
      )
    ).toEqual(confirmationAttachmentMockResponse);
  });

  test("validate others attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(othersAttachmentMockRequest))
      )
    ).toEqual(othersAttachmentMockResponse);
  });

  test("validate others textblock attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(othersTextBlockAttachmentMockRequest))
      )
    ).toEqual(othersTextBlockAttachmentMockResponse);
  });

  test("validate members attachments without issues", () => {
    expect(
      JSON.stringify(
        parseAttachments(...Object.values(membersAttachmentMockRequest))
      )
    ).toEqual(membersAttachmentMockResponse);
  });

  // test("validate confirmation attachments without issues", () => {
  //   expect(
  //     JSON.stringify(
  //       parseAttachments(...Object.values(confirmationAttachmentMockRequest))
  //     )
  //   ).toEqual(confirmationAttachmentMockResponse);
  // });

  test("validate process action card without issues", () => {
    expect(
      JSON.stringify(processActionCard(...Object.values(actionCardMockRequest)))
    ).toEqual(actionCardMockResponse);
  });

  //sj
  test("validate Cancel Agent Link without issues", () => {
    expect(
      JSON.stringify(
        processCancelAgent(...Object.values(CancellinkAgentMockRequest))
      )
    ).toEqual(undefined);
  });
 
  test("validate  file download without issues", () => {
    expect(
      JSON.stringify(
        processDigitalIdCard(...Object.values(processFileCardMockRequest))
      )
    ).toEqual(processFileCardMockResponse);
  });
 
  test("validate  Link Card without issues", () => {
    expect(
      JSON.stringify(
        processLinkCard(...Object.values(processLinkCardMockRequest))
      )
    ).toEqual(undefined);
  });
 
  test("validate claim Card without issues", () => {
    expect(
      JSON.stringify(
        processClaimsCard(...Object.values(processClaimsCardMockRequest))
      )
    ).toEqual(undefined);
  });
 
  test("validate claim Card without issues", () => {
    expect(
      JSON.stringify(
        processPlanDataCard(...Object.values(processPlanDataCardMockRequest))
      )
    ).toEqual(undefined);
  });

  test("valid isMobilePlatform without issues", () => {
    expect(isMobilePlatform()).toEqual(false);
  })
  test("invalid isMobilePlatform without issues", () => {
    expect(isMobilePlatform()).toEqual(false);
  })

  test("validate  get card type without issues", () => {
    expect(getCardType("link")).toEqual("link");
    expect(getCardType("claim")).toEqual("claims");
    expect(getCardType("email")).toEqual("confirmation");
    expect(getCardType("deductible")).toEqual("deductible");
    expect(getCardType("covered members")).toEqual("member");
    expect(getCardType("my benefits")).toEqual("plan");
    expect(getCardType("address")).toEqual("address");
    expect(getCardType("cancelAgent")).toEqual("cancelAgent");
    expect(getCardType("abc")).toEqual("");
    expect(getCardType("digital-id")).toEqual("digitalId");
  });
});
