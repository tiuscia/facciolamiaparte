import React from "react";
import {
  isEmailFormat,
  isDateFormat,
  isValidUrl,
} from "../../utils/inputValidation.js";
import "./FormInput.scss";

// HOW TO USE IT
/* <Input
      type="text" || "textarea"
      placeholder={'string'}
      autocomplete="username"
      name="username"
      inputValue
      onInputChange={something()} // optional
      isRequired // optional
      isEmail // optional
      isURL // optional
      isMinLength={number} // optional
      isMaxLength={number} // optional
      isDate={dateFormat}   // optional
      getValueFromInput={handleValueOfTextInput} optionaly get the value of the input when not using form
  /> */

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // inputTxt: "",
      errors: {
        required: {
          error: false,
          errorMsg: "Campo richiesto",
        },
        email: {
          error: false,
          errorMsg: "formato email non valido",
        },
        maxLength: {
          error: false,
          errorMsg: "stringa troppo lunga",
        },
        minLength: {
          error: false,
          errorMsg: "stringa troppo corta",
        },
        date: {
          error: false,
          errorMsg: "data non valida, il formato accettato e' gg/mm/aaaa",
        },
        url: {
          error: false,
          errorMsg: "URL non valido",
        },
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
  }

  setErrorState = (hasError, errorType) => {
    const newStateCopy = { ...this.state };
    newStateCopy.errors[errorType].error = hasError;
    this.setState(newStateCopy);
  };

  checkEmail = (isEmail, emailInput) => {
    if (isEmail && !isEmailFormat(emailInput)) {
      this.setErrorState(true, "email");
    } else {
      this.setErrorState(false, "email");
    }
  };

  checkMaxLength = (isMaxLength, inputTxt) => {
    if (isMaxLength < inputTxt.length) {
      this.setErrorState(true, "maxLength");
    } else {
      this.setErrorState(false, "maxLength");
    }
  };

  checkMinLength = (isMinLength, inputTxt) => {
    if (isMinLength > inputTxt.length) {
      this.setErrorState(true, "minLength");
    } else {
      this.setErrorState(false, "minLength");
    }
  };

  checkDate = (isDate, inputTxt) => {
    if (isDateFormat(inputTxt, isDate)) {
      this.setErrorState(false, "date");
    } else {
      this.setErrorState(true, "date");
    }
  };

  checkURL = (link) => {
    if (isValidUrl(link)) {
      this.setErrorState(false, "url");
    } else {
      this.setErrorState(true, "url");
    }
  };

  handleInputChange = (evt) => {
    const {
      onInputChange,
      isEmail,
      isMaxLength,
      isMinLength,
      isDate,
      getValueFromInput,
    } = this.props;

    if (getValueFromInput !== null) {
      getValueFromInput(evt);
    }

    // this.setState({ inputTxt: evt.target.value }, () => {
    //   const { inputTxt } = this.state;
    if (evt.target.value) {
      this.setErrorState(false, "required");
    }

    if (isEmail && evt.target.value && isEmailFormat(evt.target.value)) {
      this.setErrorState(false, "email");
    }

    if (isMaxLength) {
      this.checkMaxLength(isMaxLength, evt.target.value);
    }

    if (isMinLength) {
      this.checkMinLength(isMinLength, evt.target.value);
    }

    if (isDate && isDateFormat(evt.target.value, isDate)) {
      this.setErrorState(false, "date");
    }

    if (onInputChange) onInputChange(evt.target.value);
    // });
  };

  handleOnBlur = (evt) => {
    // const { inputTxt } = this.state;
    const { isRequired, isEmail, isDate, isURL } = this.props;
    // isRequired validation
    if (isRequired && !evt.target.value) {
      const newStateCopy = { ...this.state };
      newStateCopy.errors.required.error = true;
      this.setState(newStateCopy);
    }
    // isEmail validation
    this.checkEmail(isEmail, evt.target.value);
    // isDate validation
    if (isDate) {
      this.checkDate(isDate, evt.target.value);
    }
    // isURL validation
    if (isURL) {
      this.checkURL(evt.target.value);
    }
  };

  render() {
    const {
      type,
      placeholder,
      name,
      autocomplete,
      isRequired,
      isEmail,
      isMaxLength,
      isDate,
      inputValue,
      onKeyPress,
      isURL,
    } = this.props;
    const {
      // inputTxt,
      errors: { required, email, maxLength, date, url },
    } = this.state;

    return (
      <div className="input">
        {/* <label className="input__label" title={title}> */}
        <div
          className={`input__field-wrapper ${
            required.error ? "input__field-wrapper--error" : ""
          }`}
        >
          {type === "text" && (
            <input
              className="input__field"
              type={type}
              placeholder={placeholder}
              name={name}
              autoComplete={autocomplete}
              onKeyPress={onKeyPress}
              required={isRequired}
              onChange={this.handleInputChange}
              onBlur={this.handleOnBlur}
              value={inputValue || ""}
              id={name}
            />
          )}
          {type === "textarea" && (
            <textarea
              className="input__field"
              type={type}
              placeholder={placeholder}
              name={name}
              autoComplete={autocomplete}
              onKeyPress={onKeyPress}
              required={isRequired}
              onChange={this.handleInputChange}
              onBlur={this.handleOnBlur}
              value={inputValue || ""}
              id={name}
              rows="3"
            />
          )}

          <label className="input__label">{placeholder}</label>
        </div>
        {isRequired && !inputValue && (
          <div
            className={`input__helper-txt__wrapper${
              required.error ? "--show" : ""
            }`}
          >
            <span
              className={`input__helper-txt${required.error ? "--error" : ""}`}
            >
              <span className="apex">*</span>
              {required.errorMsg}
            </span>
          </div>
        )}
        {isEmail && (
          <div
            className={`input__helper-txt__wrapper ${
              inputValue && email.error ? "--show" : ""
            }`}
          >
            <span className="input__helper-txt--error">{isEmail.errorMsg}</span>
          </div>
        )}
        {isMaxLength && (
          <div
            className={`input__helper-txt__wrapper ${
              inputValue && maxLength.error ? "--show" : ""
            }`}
          >
            {maxLength.error && (
              <span className="input__helper-txt--error">
                {maxLength.errorMsg}
              </span>
            )}
          </div>
        )}
        {/* {isMinLength && (
            <div
              className={`input__helper-txt__wrapper${
                inputTxt && minLength.error ? "--show" : ""
              }`}
            >
              {minLength.error && (
                <span className="input__helper-txt--error">
                  {minLength.errorMsg}
                </span>
              )}
            </div>
          )} */}
        {isDate && (
          <div
            className={`input__helper-txt__wrapper${
              inputValue && date.error ? "--show" : ""
            }`}
          >
            <span className="input__helper-txt--error">
              {date.errorMsg} {isDate.errorMsg}
            </span>
          </div>
        )}
        {isURL && (
          <div
            className={`input__helper-txt__wrapper${
              inputValue && url.error ? "--show" : ""
            }`}
          >
            <span className="input__helper-txt--error">
              {url.errorMsg} {url.errorMsg}
            </span>
          </div>
        )}
        {/* </label> */}
      </div>
    );
  }
}

export default FormInput;
