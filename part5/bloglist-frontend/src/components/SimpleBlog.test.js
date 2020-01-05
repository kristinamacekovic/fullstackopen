import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Steely Dan",
    likes: 10
  };

  const component = render(<SimpleBlog blog={blog} />);

  const div1 = component.container.querySelector(".title");
  expect(div1).toHaveTextContent(
    "Component testing is done with react-testing-library"
  );

  const div2 = component.container.querySelector(".author");
  expect(div2).toHaveTextContent("Steely Dan");

  const div3 = component.container.querySelector(".likes");
  expect(div3).toHaveTextContent("10");
});

test("registers 2 clicks", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Steely Dan",
    likes: 10
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
