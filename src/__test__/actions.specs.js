/* global define, it, describe */
/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import { INITIALIZE, DESTROY, SET_FIELD, TOUCH_ALL } from '../actionTypes.js';
import { initialize, setField, touchAll, destroy } from '../actions.js';

describe('actions', () => {
  it('should create an action to initialize all form fields with an initial value', () => {
    const actionType = initialize(
      { field1: 'foo', field2: 'bar', field3: 'baz' },
      'mockedForm',
      ['field1', 'field2', 'field3']);
    const action = {
      type: INITIALIZE,
      initialValue: { field1: 'foo', field2: 'bar', field3: 'baz' },
      form: 'mockedForm',
      fields: ['field1', 'field2', 'field3']
    };
    expect(actionType).toEqual(action);
  });
  it('should create action for setting a value to the form field', () => {
    const actionType = setField('mockedField', 'mockedValue', 'mockedForm');
    const action = {
      type: SET_FIELD,
      field: 'mockedField',
      value: 'mockedValue',
      form: 'mockedForm'
    };
    expect(actionType).toEqual(action);
  });
  it('should create action for touching all the values of the field', () => {
    const actionType = touchAll('mockedForm', ['field1', 'field2', 'field3']);
    const action = {
      type: TOUCH_ALL,
      form: 'mockedForm',
      fields: ['field1', 'field2', 'field3']
    };
    expect(actionType).toEqual(action);
  });
  it('should create action for destroying the form', () => {
    const actionType = destroy('mockedForm');
    const action = {
      type: DESTROY,
      form: 'mockedForm'
    };
    expect(actionType).toEqual(action);
  });
});
