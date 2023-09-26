import { useParams, useNavigate } from "react-router-dom";
import { useFlowersDataContext } from "./FlowersDataContext";

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
    <>
      <button onClick={handleGoBack}>Go Back</button>
      <h1>{flower.name}</h1>
      <img src={`${process.env.PUBLIC_URL}/images/${flower.picture}`} />
      <p>{flower.description}</p>
      <div>$&nbsp;{flower.price}</div>
    </>
  );
}

export default Details;
