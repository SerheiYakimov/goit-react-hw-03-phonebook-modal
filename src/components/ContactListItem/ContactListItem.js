import PropsType from "prop-types";
import s from "../ContactListItem/ContactListItem.module.css";

export function ContactListItem({ id, name, number, onDeleteContact }) {
  return (
    <li className={s.list}>
      <p className={s.item}>
        {name}:<span className={s.span}>{number}</span>
      </p>
      <button
        type="submit"
        onClick={() => onDeleteContact(id)}
        className={s.button}
      >
        Delete
      </button>
    </li>
  );
}

ContactListItem.PropsTypes = {
  id: PropsType.number.isRequired,
  name: PropsType.string.isRequired,
  number: PropsType.number.isRequired,
  onDeleteContact: PropsType.func.isRequired,
};
