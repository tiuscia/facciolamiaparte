import moment from 'moment';

export const isEmailFormat = (input) => {
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(input);
};

export const isDateFormat = (input, format) => {
  const anno = moment(input, format, true).year();
  if (input.length > 9) {
    if (anno < 2019 || anno > 2050) {
      return false;
    }
    return moment(input, format, true).isValid();
  }


  return true;

};