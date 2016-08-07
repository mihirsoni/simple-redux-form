import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import deepEqual from 'deep-equal';
import { setField, initilize, touchAll } from './reducer';
import { simplifiedVlaues, createField, hasSyncErrors } from './helpers';

// Higher order component for huge fast dynamic deeply nested universal forms.
export default function simpleReduxForm(Wrapped, options) {
  const {
    form = '',
    fields: initFields = [],
    getInitialState,
    validate = () => {}
  } = options;

  class SimpleReduxForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        model: null
      };
      this.onFieldChange = this.onFieldChange.bind(this);
      this.validate = this.validate.bind(this);
    }
    componentWillMount() {
      this.createFields(this.props.fields); // Create all the fields
      this.setModel(); // set Current state of HOC
    }
    componentDidMount() {
      /*
        initilize the form on client side, as we can access storage easily and
        can avoid the Dom difference.
      */
      const initialState = getInitialState && getInitialState(this.props);
      const state = this.props.currentForm;
      const initilized = state && state.initialized ? state.initialized : false;
      // Make initilized only if object is not empty
      if (!initilized && Object.keys(initialState).length > 0) {
        this.props.actions.initilize(initialState, form, this.props.fields);
        this.setModel();
      }
    }
    componentWillReceiveProps(nextProps) {
      // console.log('NextProps.currentForm', nextProps.currentForm);
      if (!deepEqual(this.props.currentForm, nextProps.currentForm)) {
        const currentFields = Object.keys(this.fields);
        if (!deepEqual(currentFields, nextProps.fields)) {
          this.createFields(nextProps.fields); // Create all the fields
        }
        this.setModel(nextProps.currentForm); // set Current state of HOC
      }
      // Need to compare and then do this thing
      const state = this.props.currentForm;
      const initilized = state && state.initialized ? state.initialized : false;
      if (!initilized) {
        const initialState = getInitialState && getInitialState(nextProps);
        if (initialState) {
          this.props.actions.initilize(initialState, form, this.props.fields);
        }
      }
    }
    componentWillUnmount() {
      this.fields = null;
    }
    onFieldChange(field, value) {
      this.props.actions.setField(field, value, form);
    }
    setModel(newState) {
      const fieldsKeys = Object.keys(this.fields);
      this.values = simplifiedVlaues(newState, fieldsKeys);
      // We are passing two arguments to validate function
      // Second can be used for dynamic validation usecase
      const errors = validate(this.values, this.props);
      fieldsKeys.forEach(field => {
        const { fields, values } = this;
        fields[field].value = values[field];
        fields[field].error = errors && errors[field] ? errors[field] : undefined;
        fields[field].touched = newState && newState[field] ? newState[field].touched : false;
      });
      if (__DEVELOPMENT__) {
        console.log('Following errors are here', errors);
      }
      this.fields = { ...this.fields };
      this.allValid = !hasSyncErrors(errors);
      // this.setState({ model: newState });
    }
    /*
      TODO::This needs to be triggred before every submit.
      We can commbine this to handle All submit which will
      make sure it validates and gives value back with returning
      promise.
    */
    validate() {
      this.props.actions.touchAll(form, this.props.fields);
      return this.allValid;
    }
    // Create all Fields with all sugar functions
    createFields(fieldList) {
      const formFields = fieldList.reduce((fields, field) => ({
        ...fields,
        [field]: createField(field, this.onFieldChange)
      }), {});
      this.fields = { ...formFields };
    }
    render() {
      console.log('current Form is', this.fields);
      return (
        <Wrapped
          {...this.props}
          fields={this.fields}
          allValid={this.allValid}
          values={this.values}
          validate={this.validate}
        />);
    }
  }
  SimpleReduxForm.propTypes = {
    fields: PropTypes.array,
    actions: PropTypes.object,
    currentForm: PropTypes.object,
  };
  SimpleReduxForm.defaultProps = {
    fields: initFields // Take either from the Decorator or else as props
  };
  function mapStateToProps(state) {
    return {
      currentForm: state.forms[form]
    };
  }
  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({
        setField,
        initilize,
        touchAll,
      }, dispatch),
      dispatch
    };
  }
  return connect(mapStateToProps, mapDispatchToProps)(SimpleReduxForm);
}
