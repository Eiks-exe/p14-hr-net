import React from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelHidden?: boolean;
}

const LabeledInput = (props: Props) => {
  return (
    <div>
        <label htmlFor={props.id}>
            {props.label}
        </label>
        <input {...props}/>
    </div>
  )
}

export default LabeledInput