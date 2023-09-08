import React from "react";
import { IInputProps } from "../../../shared";

const Input: React.FC<IInputProps> = ({
  type = "text",
  multiline = false,
  minHeight = 25,
  maxHeight = 200,
  autoHeight = true,
  autofocus = false,
  onChange,
  reference,
  rightButtons,
  leftButtons,
  placeholder,
  defaultValue,
  inputStyle,
  onCopy,
  onCut,
  onPaste,
  onBlur,
  onFocus,
  onSelect,
  onSubmit,
  onReset,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  disabled=false,
  value
  
}) => {

  const setMinHeight = (e: any) => {
    if (e.target.style.height !== minHeight + "px") {
      e.target.style.height = minHeight + "px";
    }
  }

  const setHeight = (e: any) => {
    let height = maxHeight + "px";
    if (e.target.scrollHeight <= maxHeight) {
      height = e.target.scrollHeight + "px";
    }

    if (e.target.style.height !== height) {
      e.target.style.height = height;
    }
  }
  const setAutoHeight = (e: any) => {
    setMinHeight(e);
    setHeight(e);
  }

  const onChangeEvent = (e: any) => {
    if (onChange instanceof Function) {
      onChange(e);
    }

    if (multiline === true && autoHeight === true ) {
       setAutoHeight(e);
    }
  };

  return (
    <div>
      {leftButtons && <div>{leftButtons}</div>}
      {multiline === false ? (
        <input
          aria-label="user-input"
          data-testid={'inputvalid'}
          role="textbox"
          ref={reference}
          type={type}
          placeholder={placeholder}
          style={inputStyle}
          onChange={onChangeEvent}
          onCopy={onCopy}
          onCut={onCut}
          onPaste={onPaste}
          onBlur={onBlur}
          onFocus={onFocus}
          onSelect={onSelect}
          onSubmit={onSubmit}
          onReset={onReset}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          value={value}
          disabled={disabled}
          tabIndex={9998}        
          className={"redhat_semibold"}
        />
      ) : (
        <textarea
          aria-label="user-inputs"
          data-testid={'textvalid'}
          role="textval"
          ref={reference}
          placeholder={placeholder}
          defaultValue={defaultValue}
          style={inputStyle}
          onChange={onChangeEvent}
          onCopy={onCopy}
          onCut={onCut}
          onPaste={onPaste}
          onBlur={onBlur}
          onFocus={onFocus}
          onSelect={onSelect}
          onSubmit={onSubmit}
          onReset={onReset}
          onKeyDown={onKeyDown}
          onKeyPress={onKeyPress}
          onKeyUp={onKeyUp}
          value={value}
          disabled={disabled}
          tabIndex={9998}        
        ></textarea>
      )}
      {rightButtons && <>{rightButtons}</>}
    </div>
  );
};

export default Input;
