/* eslint-disable @typescript-eslint/no-unused-vars */

import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import GamesDetails from "./Components/Games-details/GamesDetails";
import Category from "./Components/Category/Category";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        {path:'games-details/:id',element:<GamesDetails></GamesDetails>},
        {path:'category/:category',element:<Category></Category>}
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
