import { ICheckboxProps } from "../../../shared"

const Checkbox: React.FC<ICheckboxProps> = ({ value, active, onClick, title,tabIndex=0 }) => {
  const onSelect = (e: any) => {
    if(onClick &&  typeof onClick === "function") {
      onClick(e);
    }
  }
  return (
    <div className="check-box" role="checkbox" aria-label={title} aria-checked={true} tabIndex={tabIndex + 1}> 
      <input
        data-testid={'check-boxid'}
        type="checkbox"
        value={title}
        onChange={active ? onSelect : undefined}
        id={title}
      />
      <label htmlFor={title} className="checkboxtext redhat_regular"  data-testid={'check-box-value'}>{title}</label>
    </div>
  )
}
export default Checkbox
