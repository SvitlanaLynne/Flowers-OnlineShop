import { useEffect, useState } from "react";

function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/flowers")
      .then((res) => res.json())
      .then((dataOrg) => {
        const flatdata = dataOrg.flatMap((flower) => Object.values(flower)[0]);
        setData(flatdata);
      });
  }, []);

  console.log("FLAT", data);

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Color</th>
          <th>Photo</th>
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
                src={`${process.env.PUBLIC_URL}/images/${flower.picture}`}
                alt={flower.name}
              />
            </td>
            <td>5</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Products;
