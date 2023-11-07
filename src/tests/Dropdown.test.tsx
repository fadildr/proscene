import { render, fireEvent, waitFor } from "@testing-library/react";
import Dropdown from "../components/dropdown";
import "@testing-library/jest-dom";
// Mock the onChange function
const mockOnChange = jest.fn();

const filterOptions = ["Option 1", "Option 2", "Option 3"];

describe("Dropdown Component", () => {
  it("renders the selected filter", () => {
    const { getByText } = render(
      <Dropdown
        filterOptions={filterOptions}
        selectedFilter="Option 1"
        onChange={mockOnChange}
      />
    );

    const selectedFilterText = getByText("Option 1");
    expect(selectedFilterText).toBeInTheDocument();
  });

  it("disables the button when isDisabled is true", () => {
    const { getByText } = render(
      <Dropdown
        filterOptions={filterOptions}
        selectedFilter="Option 1"
        onChange={mockOnChange}
        isDisabled={true}
      />
    );

    const button = getByText("Option 1");
    expect(button).toBeDisabled();
  });

  it("toggles the dropdown menu when the button is clicked", async () => {
    const { getByText, queryByTestId } = render(
      <Dropdown
        filterOptions={filterOptions}
        selectedFilter="Option 1"
        onChange={mockOnChange}
      />
    );

    const button = getByText("Option 1");
    fireEvent.click(button);

    // Wait for the component to re-render and the menu to appear
    await waitFor(() => {
      expect(queryByTestId("dropdown-button")).toBeInTheDocument();
    });

    fireEvent.click(button);

    // Wait for the component to re-render and the menu to disappear
    await waitFor(() => {
      expect(queryByTestId("dropdown-button")).not.toBeInTheDocument();
    });
  });

  it("calls onChange when an option is clicked and closes the dropdown", () => {
    const { getByText, queryByTestId } = render(
      <Dropdown
        filterOptions={filterOptions}
        selectedFilter="Option 1"
        onChange={mockOnChange}
      />
    );

    const button = getByText("Option 1");
    fireEvent.click(button);

    const option = getByText("Option 2");
    fireEvent.click(option);

    expect(mockOnChange).toHaveBeenCalledWith("Option 2");
    expect(queryByTestId("dropdown-menu")).not.toBeInTheDocument();
  });
});
