import moment from 'moment';

export const isEmailFormat = (input) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(input);
};

export const isDateFormat = (input, format) => {
  const anno = moment(input, format, true).year();
  if (input.length > (format.length - 1)) {
    if (anno < 2019 || anno > 2050) {
      return false;
    }
    return moment(input, format, true).isValid();
  }
  if (input.length < format.length || input.length > format) {
    return false;
  }
  return true;
};

export const isValidUrl = (inputString) => {
  var res = inputString.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
  return (res !== null)
};