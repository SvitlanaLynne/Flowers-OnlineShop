/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, fireEvent } from "@testing-library/react";

const MockProducts = ({ data }) => {
  return (
    <div>
      {data.map((flower) => (
        <div key={flower.id}>
          {flower.name}, {flower.category}, {flower.color}
        </div>
      ))}
      <button onClick={() => console.log("Button clicked")}>Click Me</button>
    </div>
  );
};

test("The array of selected filters is filled when the filter is selected", () => {
  const data = [
    {
      id: 1,
      name: "Buttercup",
      color: "yellow",
      category: "wedding",
      description: "A vibrant yellow flower, perfect for weddings.",
      picture: "buttercup.png",
      price: 5.0,
    },
    {
      id: 2,
      name: "Crocus",
      color: "purple",
      category: "spring",
      description: "A lovely purple flower that blooms in spring.",
      picture: "crocus.png",
      price: 6.0,
    },
    {
      id: 3,
      name: "Daffodil",
      color: "yellow",
      category: "spring",
      description: "Bright yellow spring flower.",
      picture: "daffodil.png",
      price: 7.0,
    },
  ];

  const { getByRole, container } = render(
    <div>
      <MockProducts data={data} />
    </div>,
  );
  const button = getByRole("button");
  fireEvent.click(button);

  expect(container.querySelector("button")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
