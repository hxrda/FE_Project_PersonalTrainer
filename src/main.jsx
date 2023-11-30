import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Customerlist from "./components/Customerlist";
import Trainingslist from "./components/Trainingslist";
import AppCalendar from "./components/AppCalendar";
import AppStatistics from "./components/AppStatistics";
import Error from "./components/Error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				element: <Customerlist />,
				index: true,
			},
			{
				path: "trainings",
				element: <Trainingslist />,
			},
			{
				path: "calendar",
				element: <AppCalendar />,
			},
			{
				path: "statistics",
				element: <AppStatistics />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
