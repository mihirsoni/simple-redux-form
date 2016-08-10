/* global define, it, describe */
/* eslint-disable import/no-extraneous-dependencies */
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { initilize, setField, touchAll, distroy } from '../actions.js';
import reducer from '../reducer';

describe('reducers', () => {
  it('should initial from with fields and given values', () => {
    const stateBefore = {};
    const action = initilize(
      { field1: 'foo', field2: 'bar', field3: 'baz' },
      'mockedForm',
      ['field1', 'field2', 'field3']);
    const stateAfter = {
      mockedForm: {
        field1: { value: 'foo' },
        field2: { value: 'bar' },
        field3: { value: 'baz' },
        initialized: true
      }
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('should modify the value of the given field, if the field exists', () => {
    const stateBefore = {
      mockedForm: {
        field1: { value: 'foo' },
        field2: { value: 'bar' },
        field3: { value: 'baz' },
        initialized: true
      }
    };
    const action = setField('field1', 'modifiedFoo', 'mockedForm');
    const stateAfter = {
      mockedForm: {
        field1: { touched: true, value: 'modifiedFoo' },
        field2: { value: 'bar' },
        field3: { value: 'baz' },
        initialized: true
      }
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('should add a new field, if the given field does not exist', () => {
    const stateBefore = {
      mockedForm: {
        field1: { value: 'foo' },
        field2: { value: 'bar' },
        field3: { value: 'baz' },
        initialized: true
      }
    };
    const action = setField('field4', 'tar', 'mockedForm');
    const stateAfter = {
      mockedForm: {
        field1: { value: 'foo' },
        field2: { value: 'bar' },
        field3: { value: 'baz' },
        field4: { touched: true, value: 'tar' },
        initialized: true
      }
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('should add set touched propery of all fields to true, and if not exist add them', () => {
    const stateBefore = {
      mockedForm: {
        field1: { value: 'foo', touched: true },
        field2: { value: 'bar' },
        field3: { value: 'baz' },
        initialized: true
      }
    };
    const action = touchAll('mockedForm', ['field1', 'field2', 'field3']);
    const stateAfter = {
      mockedForm: {
        field1: { value: 'foo', touched: true },
        field2: { value: 'bar', touched: true },
        field3: { value: 'baz', touched: true },
        initialized: true
      }
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
  it('should destory the mounted FORM, from the state tree', () => {
    const stateBefore = {
      mockedForm: {
        field1: { value: 'foo', touched: true },
        field2: { value: 'bar' },
        field3: { value: 'baz' },
        initialized: true
      },
      otherState: {
        viewState: 'VIEW_ALL'
      }
    };
    const action = distroy('mockedForm');
    const stateAfter = {
      otherState: {
        viewState: 'VIEW_ALL'
      },
    };
    deepFreeze(stateBefore);
    deepFreeze(stateAfter);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });
});

