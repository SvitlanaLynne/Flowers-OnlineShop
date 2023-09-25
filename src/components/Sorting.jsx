import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Sorting({ order, handleSorting }) {
  return (
    <>
      <div onClick={handleSorting}>Id</div>
      <div>
        <FontAwesomeIcon
          icon={order.direction === "asc" ? faCaretDown : faCaretUp}
        />
      </div>
    </>
  );
}

export default Sorting;
