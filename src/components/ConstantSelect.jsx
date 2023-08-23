/** 
 * Accepts a value, an options object, and a change handler and returns a select element. 
 * Intended to render a select element for constants lists like CAMP_STATUS, CAMP_TYPE, etc.
 */


/**
 * @param value - the current value of the select element
 * @param options - An object on which we will call entries to populate the options:
 *          [[key0, val0],[key1, val1], ...] 
 * @param onChange - the change handler
 */
const ConstantSelect = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange}>
      {Object.entries(options).map(([key, val]) => (
        <option value={key} key={key}>
          {val}
        </option>
      ))}
    </select>
  );
}

export default ConstantSelect;
