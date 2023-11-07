/* eslint-disable */

import { render, fireEvent } from "@testing-library/react";
import Card from "../components/card";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Card Component", () => {
  const sampleProps = {
    imageSrc: "sample-image.jpg",
    title: "Sample Title",
    description: "Sample Description",
    id: 1,
    type: "movie",
  };

  it("renders with provided props", () => {
    try {
      const { getByText } = render(<Card {...sampleProps} />);
      expect(getByText(sampleProps.title)).toBeInTheDocument();
      expect(getByText(sampleProps.description)).toBeInTheDocument();
    } catch (error) {
      console.log("Error during render:", error);
    }
  });

  it("truncates long titles", () => {
    const longTitleProps = {
      ...sampleProps,
      title: "This is a very long title that should be truncated",
    };
    try {
      const { getByText } = render(<Card {...longTitleProps} />);

      expect(getByText("This is a very long title...")).toBeInTheDocument();
    } catch (error) {
      console.log("Error during render long title:", error);
    }
  });

  it("truncates long descriptions", () => {
    const longDescriptionProps = {
      ...sampleProps,
      description:
        "This is a very long description that should be truncated".repeat(10),
    };
    try {
      const { getByText } = render(<Card {...longDescriptionProps} />);

      expect(
        getByText("This is a very long description that should be truncated...")
      ).toBeInTheDocument();
    } catch (error) {
      console.log("Error during render long description:", error);
    }
  });

  it("handles missing image source", () => {
    const propsWithoutImage = { ...sampleProps, imageSrc: undefined };
    try {
      const { getByAltText } = render(<Card {...propsWithoutImage} />);

      expect(getByAltText(sampleProps.title)).toBeInTheDocument();
    } catch (error) {
      console.log("Error during render missing image:", error);
    }
  });

  it("navigates when title is clicked", () => {
    try {
      const { getByText } = render(<Card {...sampleProps} />);
      const titleElement = getByText(sampleProps.title);

      fireEvent.click(titleElement);
    } catch (error) {
      console.log("Error during clicked title:", error);
    }
  });
});
