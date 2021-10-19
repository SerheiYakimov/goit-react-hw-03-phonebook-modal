import { Component } from "react";
import { v4 as uuid } from "uuid";
import PropsType from "prop-types";
import s from "../Form/Form.module.css";

export class Form extends Component {
  state = {
    name: "",
    number: "",
  };

  idName = uuid();
  idNumber = uuid();

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;

    const contact = {
      name,
      number,
      id: uuid(),
    };

    this.props.addNewContact(contact);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: "", number: "" });
  };

  render() {
    const { idName, idNumber, handleChange, handleSubmit } = this;
    const { name, number } = this.state;
    return (
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label} htmlFor={idName}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            id={idName}
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>
        <label className={s.label} htmlFor={idNumber}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            id={idNumber}
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

Form.PropType = {
  onSubmit: PropsType.func.isRequired,
  onChange: PropsType.func.isRequired,
};
