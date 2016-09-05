<h1 align="center">Simplest Redux Form</h1>

> Higher order component for React Redux forms (inspired by [redux-form](https://github.com/erikras/redux-form))

## Note 

Idea of this library is 100% inspired from [redux-form](https://github.com/erikras/redux-form) (v5).

This library is subset of [redux-form](https://github.com/erikras/redux-form) for small / few forms.
If your application is form heavey with large / complex form please use [redux-form](https://github.com/erikras/redux-form).

I have implemented this libray for following reasons :- 

* [redux-form](https://github.com/erikras/redux-form) is great way of managing forms within application with react and redux.
* For small forms using large library will add up unnecessary bundle size increase, this library focus on simple and small version of `redux-from`
* Scope of this library will be very minimal, if you want full fledge library please use `redux-form`.

## Installation

```
$ npm install --save simple-redux-form
```

## Usage

### Step #1

The first thing, you have to mount `simple-redux-form` reducer to your redux reducers.
Configure this inside your rootReducers.

```js
import {reducer as simpleFormReducer} from 'simple-redux-form';
const reducers = {
  // your other reducers
  form: simpleFormReducer  
}
```

### Step #2

You need to decorate your component with simpleReduxForm.

```js
import simpleReduxForm from 'simple-redux-form'
const fields = ['firstName', 'lastName'];
function validate(values) {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  return errors;
}

const MyNewForm = ({ fields: {firstName, lastName } }) => (
  <form>
    <input {...firstName} />
    <input {...lastName} />
  </form>
)

export default simpleReduxForm({
  fields: fields,
  validate: validate,
})(MyNewForm)

```

Each field in the fields prop contains the `value` a `onChange`, `error` , `touched` as sugger props to each field.

You can also pass fields as props.

For custom Input components this library expose , `setValue` function with each field for setting vlaues manually.


### Todo

* [ ] Docs
* [ ] Examples
* [ ] Test Cases

## License

MIT
