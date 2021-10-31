import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './Form.module.css';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmite = event => {
    event.preventDefault();
    this.props.getFormData(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    const { handleInputChange, handleSubmite } = this;
    return (
      <>
        <form onSubmit={handleSubmite}>
          <label>
            <p>Name</p>
            <input
              type="text"
              value={name}
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              required
              onChange={handleInputChange}
            />
          </label>
          <label>
            <p>Number</p>
            <input
              type="tel"
              value={number}
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </form>
      </>
    );
  }
}

export default Form;

Form.propTypes = {
  getFormData: PropTypes.func,
};