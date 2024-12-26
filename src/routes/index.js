import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "", // Home page route
                element: <Home />,
            },
            {
                path: "details/:mediaType/:id", // Details page for movies or TV shows
                element: <DetailsPage />,
            },
            {
                path: ":explore", // Explore page for categories
                element: <ExplorePage />,
            },
            {
                path: "search", // Search page route
                element: <SearchPage />,
            },
        ],
    },
]);

export default router;
