import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App';
import SignIn from './component/SignIn';
import Register from './component/Register';
import './index.scss';
import DashboardOrganizer from './component/DashboardOrganizer';
import DashboardOwner from './component/DashboardOwner';
import DashboardParticipant from './component/DashboardParticipant';
import PageNotFound from './component/PageNotFound';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard/organizer",
    element: <DashboardOrganizer />,
  },
  {
    path: "/dashboard/owner",
    element: <DashboardOwner />,
  },
  {
    path: "/dashboard/participant",
    element: <DashboardParticipant />,
  },
  {
    path: "*",
    element:<PageNotFound />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
