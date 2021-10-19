import PropsType from "prop-types";
import s from "../Filter/Filter.module.css";

export function Filter({ value, onChange }) {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Find contacts by name:</h3>
      <input
        type="text"
        name="filter"
        value={value}
        onChange={onChange}
        className={s.input}
      />
    </div>
  );
}

Filter.PropsType = {
  value: PropsType.string,
  onChange: PropsType.func.isRequired,
};
