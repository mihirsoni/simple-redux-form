import { INITIALIZE, DISTROY, SET_FIELD, TOUCH_ALL } from './actionTypes';

export function initilize(initialValue, form, fields) {
  return {
    type: INITIALIZE,
    initialValue,
    form,
    fields
  };
}

export function setField(field, value, form) {
  return {
    type: SET_FIELD, field, value, form
  };
}

export function touchAll(form, fields) {
  return {
    type: TOUCH_ALL, form, fields
  };
}

export function distroy(form) {
  return {
    type: DISTROY, form
  };
}
