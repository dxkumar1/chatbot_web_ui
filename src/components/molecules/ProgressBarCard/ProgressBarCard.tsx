import React, { Key } from 'react'
import { ProgressBar }  from '../../atoms';
import { IProgressBarCardProps } from "../../../shared"

const ProgressBarCard = (props: IProgressBarCardProps) => {
  return (
    <div data-testid={"progress_bar"}>
      {props.items && props.items.map((x: any, i: number) => (
        <ProgressBar tabIndex={i  + 1}
          key={i as Key}
          {...x}
          />
        ))}
    </div>
  )
}
export default ProgressBarCard
