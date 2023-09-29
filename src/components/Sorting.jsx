import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Sorting({ order, handleSorting }) {
  return (
    <button onClick={handleSorting}>
      <span>Id</span>
      <br></br>
      <div>
        <FontAwesomeIcon
          icon={order.direction === "asc" ? faCaretDown : faCaretUp}
        />
      </div>
    </button>
  );
}

export default Sorting;
