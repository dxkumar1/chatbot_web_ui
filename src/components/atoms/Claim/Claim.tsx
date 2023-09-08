import { IClaimProps } from "../../../shared";
import moment from "moment";

const Claim: React.FC<IClaimProps> = ({ data, tabIndex = 0 }) => {
  return (
    <div className="claims" role="contentinfo" tabIndex={tabIndex + 1} aria-label="Claim">
      {data.map((obj, idx) => {
        return (
          <div key={idx} data-testid={"claim-data"} tabIndex={tabIndex + 1}>
            <div className="claim-tr">
              <div className="claim-td">
                <div className="claim-td-inner">
                  <div className="claims-p" tabIndex={tabIndex + 1} aria-label={obj.claimId}>
                    {obj.claimId}
                  </div>
                  <div className="claims-p" tabIndex={tabIndex + 1} aria-label={obj.claimStatus}>
                    {obj.claimStatus}
                  </div>
                </div>
              </div>
              <div className="claim-td">
                <div className="claim-td-inner">
                  <div className="claims-p" title={obj.provider} tabIndex={tabIndex + 1} aria-label={obj.provider}>
                    {obj.provider}
                  </div>
                  <div className="claims-p" tabIndex={tabIndex + 1} aria-label={obj.claimDate}>
                    {moment(obj.claimDate).format('ll')}
                  </div>
                </div>
              </div>
              <div className="claim-td">
                <div className="claim-td-inner">
                  <div
                    className="claims-p" tabIndex={tabIndex + 1} aria-label={obj.owedAmount}
                  >
                   {obj.owedAmount}
                  </div>
                  <div
                    className="claims-p" tabIndex={tabIndex + 1} aria-label={" Your responsibility"}
                  >
                    Your responsibility
                  </div>
                </div>
              </div>
            </div>
            <div className="Line-3"></div>
          </div>
        );
      })}
    </div>
  );
};
export default Claim;
