import { useEffect, useState } from "react";
import DropDownMenu from "./DropDownMenu";
import Sorting from "./Sorting";
import { Link } from "react-router-dom";
import { useFlowersDataContext } from "./FlowersDataContext";

function Products() {
  const data = useFlowersDataContext();
  const [filteredAndSortedData, setFilteredAndSortedData] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterColor, setFilterColor] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [rowsNumber, setRowsNumber] = useState(10);
  const rowsNumberArr = ["", 5, 10, 15];
  const [order, setOrder] = useState({ direction: "asc" });

  useEffect(() => {
    // ----- FILTER -----

    setFilterCategory([...new Set(data.map((flower) => flower.category))]);
    setFilterColor([...new Set(data.map((flower) => flower.color))]);

    const filteredData = data.filter((flower) => {
      if (
        selectedFilters.length === 0 ||
        selectedFilters.includes(flower.category) ||
        selectedFilters.includes(flower.color)
      ) {
        return true;
      } else {
        return false;
      }
    });

    // ------ SORTING -----

    const sortedData =
      order.direction === "asc"
        ? filteredData.sort((a, b) => a.id - b.id)
        : filteredData.sort((a, b) => b.id - a.id);

    // ------ ROWS -----

    const filteredSortedSlicedData = sortedData.slice(0, rowsNumber);

    setFilteredAndSortedData(filteredSortedSlicedData);
  }, [selectedFilters, rowsNumber, order, data]);

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

  const handleSorting = () => {
    setOrder((prevOrder) => ({
      direction: prevOrder.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div id="products-Container">
      <table>
        <thead>
          <tr>
            <th>
              <Sorting handleSorting={handleSorting} order={order} />
            </th>
            <th>Title</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedData.map((flower) => (
            <tr key={flower.id}>
              <td>{flower.id}</td>
              <td>
                <Link to={`/product/${flower.id}`}>{flower.name}</Link>
              </td>
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
      <div id="filter-rows-Container">
        {/* ----- filters ----- */}
        <div id="filters-Container">
          <button onClick={handleResetFilers}>Clear Filters</button>
          <div className="filter">
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
          </div>
          <div className="filter">
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
        </div>
        {/* ----- rows selection ----- */}
        <DropDownMenu
          rowsNumberArr={rowsNumberArr}
          handleRowNumberChange={handleRowNumberChange}
        />
      </div>
      {/* ----- products ----- */}
    </div>
  );
}

export default Products;
