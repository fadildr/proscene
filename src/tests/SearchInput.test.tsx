/* eslint-disable */
import { render, fireEvent } from "@testing-library/react";
import SearchInput from "../components/searchInput";
import "@testing-library/jest-dom";
describe("SearchInput Component", () => {
  it("renders with the provided placeholder", () => {
    const placeholder = "Search Placeholder";
    const { getByPlaceholderText } = render(
      <SearchInput onSearch={() => {}} placeHolder={placeholder} />
    );
    const inputElement = getByPlaceholderText(placeholder);

    expect(inputElement).toBeInTheDocument();
  });

  it("calls the onSearch function on input change", () => {
    const onSearchMock = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput onSearch={onSearchMock} placeHolder="Search" />
    );
    const inputElement = getByPlaceholderText("Search");

    fireEvent.change(inputElement, { target: { value: "example" } });

    expect(onSearchMock).toHaveBeenCalledWith("example");
  });

  it("updates the input value on change", () => {
    const { getByPlaceholderText } = render(
      <SearchInput onSearch={() => {}} placeHolder="Search" />
    );
    const inputElement = getByPlaceholderText("Search");

    fireEvent.change(inputElement, { target: { value: "example" } });

    expect(inputElement.getAttribute("value")).toBe("example");
  });
});
