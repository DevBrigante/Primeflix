import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { ListFilms } from "./pages/ListFilms";
import { Layout } from "./components/Layout";
import { Favorites } from "./pages/Favorites";


const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/details/:id",
        element: <ListFilms/>
      },
      {
        path: "/favorites",
        element: <Favorites/>
      }
    ]
  }
])

export {router}




