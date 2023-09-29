function DropDownMenu({ handleRowNumberChange, rowsNumberArr }) {
  return (
    <>
      <label>
        Select number of rows
        <select onChange={(event) => handleRowNumberChange(event)}>
          {rowsNumberArr.map((elem, index) => (
            <option key={index} value={elem}>
              {elem}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export default DropDownMenu;
