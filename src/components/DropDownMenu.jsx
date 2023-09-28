function DropDownMenu({ handleRowNumberChange, rowsNumberArr }) {
  return (
    <>
      <label>
        Select number of rows
        <div className="select-Container">
          <select onChange={(event) => handleRowNumberChange(event)}>
            {rowsNumberArr.map((elem, index) => (
              <option key={index} value={elem}>
                {elem}
              </option>
            ))}
          </select>
          <div className="select-arrow">&#9662;</div>
        </div>
      </label>
    </>
  );
}

export default DropDownMenu;
