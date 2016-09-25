import { INITIALIZE, DESTROY, SET_FIELD, TOUCH_ALL } from './actionTypes';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE :
      return {
        ...state,
        [action.form]: {
          ...action.fields.reduce((acc, field) => ({
            ...acc,
            [field]: {
              value: action.initialValue[field]
            }
          }), {}),
          initialized: true,
        }
      };
    case DESTROY : {
      const updateDState = { ...state };
      delete updateDState[action.form];
      return {
        ...updateDState
      };
    }
    case SET_FIELD: {
      const { field, value, form } = action;
      return {
        ...state,
        [form]: {
          ...state[form],
          [field]: {
            touched: true,
            value,
          }
        }
      };
    }
    case TOUCH_ALL: {
      const { fields, form } = action;
      return {
        ...state,
        [form]: {
          ...state[form],
          ...fields.reduce((prevField, field) => ({
            ...prevField,
            [field]: {
              value: state[form] && state[form][field] ? state[form][field].value : '',
              touched: true
            }
          }), {})
        }
      };
    }
    default:
      return state;
  }
}
