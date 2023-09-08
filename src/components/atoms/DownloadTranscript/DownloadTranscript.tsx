import React, { useEffect, useState } from "react";
import { DOWNLOAD_TRANSCRIPT_TIMER } from "../../../shared/utils/constants";
import { IActionProps } from "../../../shared";


const {DownloadTranscriptIcon} = require('@sentaraui/optimahealth_web/dist');

const DownloadTranscript: React.FC<IActionProps> = ({
  onClick,
  title,
  value,
  downloadTranscript
}) => {

  const [show, setShow] = useState(false);
  useEffect(() => {
    const timerShowId = setTimeout(() => setShow(true), DOWNLOAD_TRANSCRIPT_TIMER);
    return () => {
      clearTimeout(timerShowId);
    };
  }, [downloadTranscript]);

  const onButtonClick = (value: string) => {
    if (typeof onClick != undefined && typeof onClick === "function") {
      onClick(value);
    }
  };

  return (
    <div id="ActionDivId" className={(downloadTranscript && !show) ? "download-view _end" :"download-view"}>
        <button
          role="button"
          data-testid={"button"}
          onClick={() => onButtonClick(value)}
          id="button"
          value={title}
          aria-label={title}
          tabIndex={9999}
          className={"active download-btn"}
        >
          <div
            id="ActionDivId"
            className="download-view"
            tabIndex={9999}
            role={"contentinfo"}
            aria-label={title}
          >
           <DownloadTranscriptIcon/>
            <div
              data-testid="myactionbutton"
              id="iconSpace"
              className="download-text"
            >
              {title}
            </div>
          </div>
        </button>
    </div>
  );
};

export default DownloadTranscript;
