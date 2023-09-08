import { MessageType } from "../../shared";
import moment from "moment";
import IClaimData from "../../shared/interfaces/IClaimData"; //NOSONAR
import IProgressBar from "../../shared/interfaces/IProgressBar";
import IAddress from "../../shared/interfaces/IAddress";
import IMemberData from "../../shared/interfaces/IMemberData";
import IPlanData from "../../shared/interfaces/IPlanData";

const sortMessages = (messages: any[]) => {
  messages.sort((prev: any, next: any) => {
    const prevTime = new Date(prev.timestamp);
    const nextTime = new Date(next.timestamp);
    if (prevTime > nextTime) {
      return 1;
    }
    if (prevTime < nextTime) {
      return -1;
    }
    return 0;
  });
}

const manageSystemAttachments = (messageIndexes: any, messages: MessageType[], message: any) => {
  const {
    id,
    text,
    attachmentLayout,
    replyToId,
    timestamp,
    attachments,
  } = message;

  if (
    (attachmentLayout && attachmentLayout === "list") ||
    attachments
  ) {
    if (attachments.length) {
      const returnData = parseAttachments(
        id,
        replyToId,
        text,
        message.by,
        timestamp,
        attachments
      );
      if (returnData.length > 0) {
        returnData.forEach((data) => {
          messages.push(data);
          messageIndexes[messages[messages.length - 1].id] = messages.length - 1;
        });
      }
    }
  }  
}

const manageSystemTextMessages = (messageIndexes: any, messages: MessageType[], message: any) => {
  const {
    id,
    text,
    replyToId,
    timestamp,
    type
  } = message;
  let messageBy = message.by;
  if (
    messages.length > 1 && 
    messages[messages.length - 1].user !== "member" &&
    (messages[messages.length - 1].type === "text")
  ) {
    messageBy = "memberSecond";
  } 
  messages.push(
    textMessage(id, replyToId, text, messageBy, timestamp, type)
  );

  messageIndexes[messages[messages.length - 1].id] = messages.length - 1;

}

const manageMemberMessage = (messageIndexes: any, messages: MessageType[], message: any, userSelections: any) => {
  const {
    id,
    text,
    replyToId,
    timestamp,
    channelData,
    type,
  } = message;

  messages.push(textMessage(id, replyToId as string, text, "member", timestamp, type));
  messageIndexes[messages[messages.length - 1].id] = messages.length - 1;
  if (
    channelData &&
    channelData.cardAction &&
    channelData.messageIndex
  ) {
    if (messageIndexes[channelData.messageIndex]) {
      processUserSelection(
        messages,
        messageIndexes[channelData.messageIndex],
        text,
        channelData.cardAction
      );
    } else {
      userSelections[channelData.messageIndex] = {
        selectedOption: text,
        selectionType: channelData.cardAction,
      };
    }
  }
}

const parseMessage = (
  chatMessages: any[] = []
): { messages: any[]; userSelections: object } => {
  const messages: MessageType[] = [];
  const messageIndexes: any = {};
  const userSelections: any = {};
  const allowedMessageTypesToProcess = ['message', 'text', 'alert'];
  if (!chatMessages.length) {
    return { messages, userSelections };
  }
  sortMessages(chatMessages);
  chatMessages.forEach((message) => {
      const {
        by,
        type,
      } = message;
      const messageType = type && type.toLocaleLowerCase();      
      if (by === "user") {
        manageMemberMessage(messageIndexes, messages, message, userSelections);
      } else if (allowedMessageTypesToProcess.indexOf(messageType) !== -1) {
        manageSystemTextMessages(messageIndexes, messages, message);
        manageSystemAttachments(messageIndexes, messages, message);
      }
  });
  return { messages, userSelections };
};

const textMessage = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  messageType: string
): MessageType => {
  return {
    type: messageType !== "alert" ? "text" : "alert",
    id: `${id}_0`,
    messageId: id,
    text,
    user,
    title: text,
    focus: true,
    date: +new Date(timestamp),
    dateString: moment(timestamp).format("hh:mm A"),
    status: "delivered",
    className: "",
    replyToId: replyToId,
  };
};

const parseAttachments = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachments: any[] = []
): MessageType[] => {
    if (attachments.length > 1 && attachments[1].content.buttons) {
      return [processActionCard(
        id,
        replyToId,
        text,
        user,
        timestamp,
        attachments[0].content.body[0].text,
        attachments
      )];
    } else if (
      attachments.length > 1 &&
      attachments[1].content.actions &&
      attachments[1].content.body &&
      attachments[1].content.body[0].type === "Container"
    ) {
      return [
        processMultiSelect(
          id,
          replyToId,
          text,
          user,
          timestamp,
          attachments[0].content.body[0].text,
          attachments
        )
        ];
    }
    const attachmentMessages: MessageType[] = [];
    attachments.forEach((attachment: any, idx: number) => {
      if (attachment.content) {
        let processedAttachment;
        switch (getCardType(attachment.content.name)) {
          case "claims":
            processedAttachment = processClaimsCard(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          case "link":
            processedAttachment = processLinkCard(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          case "address":
            processedAttachment = processAddressCard(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          case "confirmation":
            processedAttachment = processConfirmationCard(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          case "digitalId":
            processedAttachment = processDigitalIdCard(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          case "deductible":
            processedAttachment = processDeductiblesCard(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          case "member":
            processedAttachment = processMembersCard(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          case "plan":
            processedAttachment = processPlanDataCard(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          case "cancelAgent":
            processedAttachment = processCancelAgent(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
            break;
          default:
            processedAttachment = processOtherTypes(
              id,
              replyToId,
              text,
              user,
              timestamp,
              attachment,
              idx
            );
        }
        if (processedAttachment) {
          attachmentMessages.push(processedAttachment);
        }
      }
    });
    return attachmentMessages;
};

const processActionCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  helpertext: string,
  attachments: any[] = []
): MessageType => {
  const actions = attachments[1].content.buttons.map((actions: any) => {
    return {
      ...actions,
      ...{ selected: false, type: "button", disabled: false },
    };
  });
  return {
    ...textMessage(id, replyToId, text, user, timestamp, "text"),
    ...{
      id: `${id}_1`,
      text: helpertext,
      title: helpertext,
      buttons: actions,
      type: "prompt",
      active: true,
      onSelect: () => {},
      setChosen: undefined,
      txt: undefined,
    },
  };
};

const processMultiSelect = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  helpertext: string,
  attachments: any[] = []
): MessageType => {
  const actions: any[] = [];
  attachments[1].content.body[0].items[0].choices.forEach((choice: any) => {
    actions.push({
      title: choice.title,
      value: choice.title,
      active: true,
      checked: false,
    });
  });
  const actions2 = attachments[1].content.actions.map((actions: any) => {
    return {
      ...actions,
      ...{
        selected: false,
        type: "button",
        onClick: () => {},
        disabled: false,
        value: actions.title,
      },
    };
  });
  return {
    ...textMessage(id, replyToId, text, user, timestamp, "text"),
    ...{
      id: `${id}_1`,
      text: helpertext,
      title: helpertext,
      options: actions,
      buttons: actions2,
      type: "choice",
      active: true,
      value: "Submit",
      onChange: () => {},
      onSelect: () => {},
      setChosen: undefined,
      txt: undefined,
    },
  };
};

const processMembersCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType | undefined => {
  if (attachment && attachment.content && attachment.content.body) {
    const memberData: IMemberData[] = [];
    attachment.content.body.forEach((data: any) => {
      if (data.type === "FactSet" && Array.isArray(data.facts)) {
        const member = {} as IMemberData;
        member.memberId = getFactValueBasedOfKey(data.facts, "Member Account");
        member.memberName = getFactValueBasedOfKey(data.facts, "Member Name");
        member.dob = formatDate(getFactValueBasedOfKey(data.facts, "Birthday"));
        member.planEffectiveDate = formatDate(getFactValueBasedOfKey(data.facts, "Effective Date"));
        memberData.push(member);
      }
    });
    if (memberData.length > 0) {
      return {
        ...textMessage(id, replyToId, text, user, timestamp, "text"),
        ...{ id: `${id}_${idx + 1}`, type: "member", data: memberData },
      };
    }
  }
};

const formatDate = (date: string) : string => {

  return date;
  //return date ? moment(date.replaceAll("Z", "")).format("MM/DD/YYYY") : "";
}

const formatCurrency = (value: string) : string => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const regCurrency = /[$,]/gi
  if(value) {
    value = value.replace(regCurrency, "");
    return USDollar.format(parseFloat(value));
  }
  return "";
}

const processPlanDataCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType | undefined => {
  if (attachment && attachment.content && attachment.content.body) {
    const genericPlanData: IPlanData[] = [];
    const discountedPlanData: IPlanData[] = [];
    attachment.content.body.forEach((data: any) => {
      if (data.type === "FactSet" && Array.isArray(data.facts)) {
        data.facts.forEach((element: IPlanData) => {
          if (data.id === "generic") {
            genericPlanData.push(element);
          } else if (data.id === "discounted") {
            discountedPlanData.push(element);
          }
        });
      }
    });
    if (genericPlanData.length || discountedPlanData.length) {
      return {
        ...textMessage(id, replyToId, text, user, timestamp, "text"),
        ...{
          id: `${id}_${idx + 1}`,
          type: "plan",
          generic: genericPlanData,
          discounted: discountedPlanData,
        },
      };
    }
  }
};

const processClaimsCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType | undefined => {
  if (attachment && attachment.content && attachment.content.body) {
    const claimData: IClaimData[] = [];
    attachment.content.body.forEach((data: any) => {
      if (data.type === "FactSet" && Array.isArray(data.facts)) {
        const claim = {} as IClaimData;
        claim.claimId = getFactValueBasedOfKey(data.facts, "Claim Number");
        claim.provider = getFactValueBasedOfKey(data.facts, "Description");
        claim.claimAmount = formatCurrency(getFactValueBasedOfKey(data.facts, "Amount"));
        claim.owedAmount = formatCurrency(getFactValueBasedOfKey(data.facts, "Patient Responsibility"));
        claim.claimStatus = getFactValueBasedOfKey(data.facts, "Claim Status");
        claim.claimDate = getFactValueBasedOfKey(data.facts, "Status Date");
        claimData.push(claim);
      }
    });
    if (claimData.length > 0) {
      return {
        ...textMessage(id, replyToId, text, user, timestamp, "text"),
        ...{ id: `${id}_${idx + 1}`, type: "claims", data: claimData },
      };
    }
  }
};

const processDeductiblesCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType | undefined => {
  if (attachment && attachment.content && attachment.content.body) {
    const deductData: IProgressBar[] = [];
    attachment.content.body.forEach((data: any) => {
      if (data.type === "FactSet" && Array.isArray(data.facts)) {
        const deductType = {} as IProgressBar;
        const maxValue = getFactValueBasedOfKey(data.facts, "max");
        const currentValue = getFactValueBasedOfKey(data.facts, "current");
        const nameValue = getFactValueBasedOfKey(data.facts, "type");
        const regex = /[$,]/gi;
        if(maxValue || currentValue || nameValue) {
          deductType.max = formatCurrency(maxValue);
          deductType.current = formatCurrency(currentValue);
          deductType.name = nameValue;
          deductType.title = nameValue;
          deductType.completed = Math.ceil((parseFloat(currentValue.replace(regex, "")) / parseFloat(maxValue.replace(regex, ""))) * 100);
          deductData.push(deductType);
        }
      }
    });
    if (deductData.length > 0) {
      return {
        ...textMessage(id, replyToId, text, user, timestamp, "text"),
        ...{ id: `${id}_${idx + 1}`, type: "deductibles", items: deductData },
      };
    }
  }
};

const getFactValueBasedOfKey = (data: any[], key: string): any => {
  const foundKeyValue = data.filter((fact) => fact.title === key);
  if(foundKeyValue && foundKeyValue.length > 0) {
    return foundKeyValue[0].value;
  }
  return null;
}

const processAddressCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType | undefined => {
  if (attachment && attachment.content && attachment.content.body) {
    const address = {} as IAddress;
    attachment.content.body.forEach((data: any) => {
      if (data.type === "FactSet" && Array.isArray(data.facts)) {
        data.facts.forEach((element: any) => {
          switch (element.title) {
            case "Address 1":
              address.addressLine1 = element.value;
              break;
            case "Address 2":
              address.addressLine2 = element.value;
              break;
            case "City":
              address.city = element.value;
              break;
            case "State":
              address.state = element.value;
              break;
            case "Zip Code":
              address.zip = element.value;
              break;
          }
        });
      }
    });
    if (Object.keys(address).length > 0) {
      return {
        ...textMessage(id, replyToId, text, user, timestamp, "text"),
        ...{ type: "address", ...address, id: `${id}_${idx + 1}` },
      };
    }
  }
};

const phoneNumberFormat = (value: any) => {
  const data = value.toString();
  if (data.length > 10) {
    return `${data.substring(0, 1)}-${data.substring(1, 4)}-${data.substring(
      4,
      7
    )}-${data.substring(7, data.length)}`;
  } else {
    return `${data.substring(0, 3)}-${data.substring(3, 6)}-${data.substring(
      6,
      data.length
    )}`;
  }
};

const processConfirmationCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType | undefined => {
  if (attachment && attachment.content && attachment.content.body) {
    let value = "";
    attachment.content.body.forEach((data: any) => {
      if (data.type === "FactSet" && Array.isArray(data.facts)) {
        data.facts.forEach((element: any) => {
          switch (element.title) {
            case "First Name":
            case "Email Address":
              value = element.value;
              break;
            case "Phone Number":
              value = phoneNumberFormat(element.value);
              break;
            case "Last Name":
              value = `${value} ${element.value}`;
              break;
          }
        });
      }
    });
    if (value) {
      return {
        ...textMessage(id, replyToId, text, user, timestamp, "text"),
        ...{ type: "confirmation", text: value, id: `${id}_${idx + 1}` },
      };
    }
  }
};

const processLinkCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType | undefined => {
  if (attachment && attachment.content && attachment.content.body) {
    const linkData = attachment.content.body[0];
    if (
      linkData &&
      linkData.type === "ActionSet" &&
      Array.isArray(linkData.actions) &&
      linkData.actions.length > 0
    ) {
      return {
        ...textMessage(id, replyToId, text, user, timestamp, "text"),
        ...{
          id: `${id}_${idx + 1}`,
          text: linkData.actions[0].title,
          title: linkData.actions[0].title,
          type: "link",
          uri: linkData.actions[0].url,
          href: linkData.actions[0].url,
          confirmation: linkData.actions[0].confirmation,
          helperText: linkData.actions[0].helperText,
          helperTitle: linkData.actions[0].helperTitle,
          chatEnded: true
        },
      };
    }
  }
};

const processDigitalIdCard = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType => {
  let dataContent = "";
  let helperText = "";
  let mimeType = "application/pdf";
  attachment.content.body.forEach((data: any) => {
    if (data.type === "FactSet" && Array.isArray(data.facts)) {
      data.facts.forEach((element: any) => {
        if (element.title === "pdfcontent") {
          dataContent = element.value;
        } else if (element.title === "pngcontent") {
          dataContent = element.value;
          mimeType = "image/png";
        } else if (element.title === "helperText") {
          helperText = element.value;
        }
      });
    }
  });
  if (dataContent) {
    const binary = atob(dataContent.replace(/\s/g, ""));
    const len = binary.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      view[i] = binary.charCodeAt(i);
    }
    var fileURL = "/member-id-card";
    const browserType: string= checkMobileBrowser();
    if ((browserType.indexOf("Device") === -1))
    {
      const blob = new Blob([view], { type: mimeType });
      fileURL = URL.createObjectURL(blob);  
    }
    return {
      ...textMessage(id, replyToId, text, user, timestamp, "text"),
      ...{
        id: `${id}_${idx + 1}`,
        type: "link",
        uri: fileURL,
        href: fileURL,
        text: helperText,
        title: helperText,
        chatEnded:true
      },
    };
  }
  return {
    ...textMessage(id, replyToId, text, user, timestamp, "text"),
    ...{ id: `${id}_${idx + 1}`, text: "", title: "" },
  };
};

const processCancelAgent = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): void => {
  let returnValue;
  if (
    attachment &&
    attachment.content &&
    attachment.content.body &&
    Array.isArray(attachment.content.body)
  ) {
    attachment.content.body.forEach((element: any) => {
      if (element.type === "TextBlock") {
        returnValue = {
          ...textMessage(id, replyToId, element.text, user, timestamp, "text"),
          ...{ id: `${id}_${idx + 1}`, type: "alert" },
        };
      } 
      // else if (element.type === "Container") {} // NOSONAR
    });
  }
  return returnValue;
};

const processUserSelection = (
  messages: any[],
  idx: number,
  selectedOption: string,
  selectionType: string
) => {
  if (messages && messages[idx]) {
    messages[idx].active = false;
    if (selectionType && selectionType.toLocaleLowerCase() === "selection") {
      messages[idx].buttons.map((button: any) => {
        button.selected = button.value === selectedOption;
        button.disabled = true;
      });
    }
  }
};

const getCardType = (name: string): string => {
  let returnValue = "";
  if (name) {
    if (name.startsWith("link")) {
      returnValue = "link";
    } else if (name.indexOf("claim") !== -1) {
      returnValue = "claims";
    } else if (name.indexOf("deductible") !== -1) {
      returnValue = "deductible";
    } else if (
      name.indexOf("email") !== -1 ||
      name.indexOf("phone") !== -1 ||
      name.indexOf("name") !== -1
    ) {
      returnValue = "confirmation";
    } else if (name.indexOf("covered members") !== -1) {
      returnValue = "member";
    } else if (name.indexOf("my benefits") !== -1) {
      returnValue = "plan";
    } else if (name.indexOf("address") !== -1) {
      returnValue = "address";
    } else if (name.indexOf("cancelAgent") !== -1) {
      returnValue = "cancelAgent";
    } else if (name.indexOf("digital-id") !== -1) {
      returnValue = "digitalId";
    }
  }
  return returnValue;
};

const processOtherTypes = (
  id: string,
  replyToId: string,
  text: string,
  user: any,
  timestamp: string,
  attachment: any = {},
  idx: number
): MessageType | undefined => {
  let returnValue;
  if (
    attachment &&
    attachment.content &&
    attachment.content.body &&
    Array.isArray(attachment.content.body)
  ) {
    attachment.content.body.forEach((element: any) => {
      if (element.type === "TextBlock") {
        returnValue = {
          ...textMessage(id, replyToId, element.text, user, timestamp, "text"),
          ...{ id: `${id}_${idx + 1}` },
        };
      }
    });
  }
  return returnValue;
};

const isMobile = {
  standalone: function () {
    return navigator.userAgent;
  },
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

const isMobilePlatform = () => {
  if (typeof window !== "undefined" && isMobile.any()) {
    return true;
  } else {
    return false;
  }
};


const checkMobileBrowser = () => {
  if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent.toLowerCase();
      const safari = /safari/.test(userAgent);
      const ios = /iphone|ipod|ipad/.test(userAgent);
      const isChrome = !!(window as any).chrome || /CriOS/i.test(userAgent) ;
    if (ios) {
      if (safari) {
        // Safari
        return "safari"
      } else if (!safari) {
        // iOS webview
        return "iOSDevice"
      } else if (isChrome) {
        return "iOSChrome";
      }
    } else {
      if (userAgent.includes('wv')) {
        // Android webview
        return "androidDevice"
      } else {
        // Chrome
        return "Chrome"
      }
    }
  }
  return "browser"
}

export {
  parseMessage,
  getCardType,
  processOtherTypes,
  processUserSelection,
  processDigitalIdCard,
  processLinkCard,
  processConfirmationCard,
  processAddressCard,
  processDeductiblesCard,
  processClaimsCard,
  processPlanDataCard,
  processMembersCard,
  processMultiSelect,
  processActionCard,
  parseAttachments,
  processCancelAgent,
  textMessage,
  isMobilePlatform,
  checkMobileBrowser,
};
