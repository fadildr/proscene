import { render, screen } from "@testing-library/react";
import Home from "../pages/home";
import { useQuery } from "react-query"; // Import the query function from your query library

// Mock the useQuery function
jest.mock("react-query");

describe("Home Component", () => {
  it("renders without crashing", () => {
    // Mock useQuery to return loading state
    (useQuery as jest.Mock).mockReturnValue({ isLoading: true });

    render(<Home />);
    // Check if the component renders without errors
  });

  it("displays the trending section", async () => {
    // Mock the data for trending section
    const trendingData = {
      results: [
        {
          id: 1,
          poster_path: "path",
          title: "Trending Movie",
          overview: "Overview",
        },
      ],
    };

    // Mock useQuery to return data
    (useQuery as jest.Mock).mockReturnValue({
      data: trendingData,
      isLoading: false,
    });

    render(<Home />);

    // Check if the "Trending" section is displayed
    const trendingSection = screen.getByText("Trending");
    expect(trendingSection).toBeInTheDocument();

    // Check if a movie card is displayed
    const movieCard = screen.getByText("Trending Movie");
    expect(movieCard).toBeInTheDocument();
  });

  // Similar tests for other sections
});
