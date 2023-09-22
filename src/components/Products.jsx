import { useEffect, useState } from "react";
import DropDownMenu from "./DropDownMenu";

function Products() {
  const [data, setData] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterColor, setFilterColor] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [rowsNumber, setRowsNumber] = useState(10);
  const rowsNumberArr = ["", 5, 10, 15];

  useEffect(() => {
    fetch("http://localhost:3000/flowers")
      .then((res) => res.json())
      .then((data) => {
        // ----- FILTER -----

        setFilterCategory([...new Set(data.map((flower) => flower.category))]);
        setFilterColor([...new Set(data.map((flower) => flower.color))]);

        const filteredData = data.filter((flower) =>
          selectedFilters.includes(flower.category) ||
          selectedFilters.includes(flower.color)
            ? flower
            : data,
        );
        // ------ ROWS -----

        const filteredSlicedData = filteredData.slice(0, rowsNumber);

        setData(filteredSlicedData);
      });
  }, [selectedFilters, rowsNumber]);

  const handleCheckboxChange = (event) => {
    const filterOption = event.target.name;
    setSelectedFilters((selectedFilters) =>
      selectedFilters.includes(filterOption)
        ? selectedFilters.filter((elem) => elem !== filterOption)
        : [...selectedFilters, filterOption],
    );
  };

  const handleResetFilers = () => {
    setSelectedFilters([]);
  };

  const handleRowNumberChange = (event) => {
    setRowsNumber(event.target.value === "" ? 10 : event.target.value);
  };

  return (
    <>
      {/* ----- filters ----- */}
      <div>
        <button onClick={handleResetFilers}>Clear Filters</button>
        <span>Category</span>
        {filterCategory.map((filter) => (
          <label key={filter}>
            <input
              name={filter}
              type="checkbox"
              checked={selectedFilters.includes(filter)}
              onChange={handleCheckboxChange}
            />
            {filter}
          </label>
        ))}
        <span>Color</span>
        {filterColor.map((filter) => (
          <label key={filter}>
            <input
              name={filter}
              type="checkbox"
              checked={selectedFilters.includes(filter)}
              onChange={handleCheckboxChange}
            />
            {filter}
          </label>
        ))}
      </div>
      {/* ----- rows selection ----- */}
      <DropDownMenu
        rowsNumberArr={rowsNumberArr}
        handleRowNumberChange={handleRowNumberChange}
      />
      {/* ----- products ----- */}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((flower) => (
            <tr key={flower.id}>
              <td>{flower.id}</td>
              <td>{flower.name}</td>
              <td>{flower.color}</td>
              <td>
                <img
                  className="flower_picture"
                  src={`${process.env.PUBLIC_URL}/images/${flower.picture}`}
                  alt={flower.name}
                />
              </td>
              <td>$&nbsp;{flower.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Products;
