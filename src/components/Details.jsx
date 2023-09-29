import { useParams, useNavigate } from "react-router-dom";
import { useFlowersDataContext } from "./FlowersDataContext";
import Logo from "./Logo";

function Details() {
  const data = useFlowersDataContext();
  const { flowerId } = useParams();
  const navigate = useNavigate();

  const flower = data.find((flower) => flower.id === parseInt(flowerId));
  {
    if (!flower) {
      return <div>Flower not found</div>;
    }
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div id="Container">
      <Logo />
      <button onClick={handleGoBack}>Go Back</button>

      <div id="product-Container">
        <h2>{flower.name}</h2>
        <img src={`${process.env.PUBLIC_URL}/images/${flower.picture}`} />
        <p>{flower.description}</p>
        <span>$&nbsp;{flower.price}</span>
      </div>
    </div>
  );
}

export default Details;
