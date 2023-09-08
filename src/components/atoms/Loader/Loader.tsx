import ILoaderProps from "../../../shared/interfaces/ILoaderProps";

const Loader: React.FC<ILoaderProps> = ({ tabIndex = 0 }) => {
  return (
    <div className="loading">
      <span className="loading-state">Loading...</span>
    </div>
  );
};
export default Loader;
