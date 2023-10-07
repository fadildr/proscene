import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

import Home from "./pages/home";
import Movies from "./pages/movies";
import Detail from "./pages/detail";
import Trending from "./pages/trending";
import Series from "./pages/series";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/:id" element={<Detail />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/series" element={<Series />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
