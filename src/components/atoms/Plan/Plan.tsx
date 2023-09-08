import IPlanData  from "../../../shared/interfaces/IPlanData";

const Plan: React.FC<{data: IPlanData[]}> = ({data}) => {
  return (
    <div className="plan">
      {data.map((obj, idx) => {
        return (
          <div key={idx}>
            <div className="plan-row" data-testid="row">
              <div className="title">{obj.title}</div>
              <div className="value">{obj.value || '--'}</div>
              {
                obj.notes && <><br/><div className="notes" >{obj.notes}</div></>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Plan;
