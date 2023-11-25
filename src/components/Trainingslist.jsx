import { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

//import AddCustomer from "./AddCustomer";
//import EditCustomer from "./EditCustomer";

//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

function Trainingslist() {
	//States:
	const [trainings, setTrainings] = useState([]);
	const [open, setOpen] = useState(false);
	//const dayjs = require("dayjs");
	//const gridRef = useRef();

	const [columnDefs] = useState([
		{
			field: "activity",
			sortable: true,
			filter: true,
			headerName: "Activity",
		},
		{
			field: "date",
			sortable: true,
			filter: true,
			headerName: "Date",
			valueGetter: (params) =>
				dayjs(params.data.date).format("DD.MM.YYYY hh:mm a"),
		},
		{
			field: "duration",
			sortable: true,
			filter: true,
			headerName: "Duration (min)",
		},
		{
			field: "customer",
			sortable: true,
			filter: true,
			headerName: "Customer",
			cellRenderer: (params) => {
				return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
			},
		},
		{
			cellRenderer: (params) => (
				<Button
					size="small"
					//onClick={()=> deleteCustomer(params.data.links[0].href)}
				>
					Delete
				</Button>
			),
		},
	]);

	//Functions:
	/*
	const formatDate = (dateInMillis) => {
		return dayjs(dateInMillis.format("DD.MM.YYYY hh:mm A"));
	};
	*/

	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = () => {
		//
		fetch("https://traineeapp.azurewebsites.net/gettrainings")
			.then((response) => {
				if (!response.ok)
					throw new Error("Something went wrong: " + response.statusText);
				return response.json();
			})
			.then((data) => setTrainings(data))
			.catch((err) => console.error(err));
	};

	//Rendering:
	return (
		<>
			<div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
				{""}
				<AgGridReact
					rowData={trainings}
					columnDefs={columnDefs}
					pagination={true}
					paginationAutoPageSize={true}
				/>
			</div>
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
				message="Customer deleted succesfully"
			/>
		</>
	);
}

export default Trainingslist;
