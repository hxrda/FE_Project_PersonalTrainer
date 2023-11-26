import { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

//import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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
			width: 130,
		},
		{
			field: "date",
			sortable: true,
			filter: true,
			headerName: "Date",
			//valueGetter also works
			valueFormatter: (params) =>
				dayjs(params.data.date).format("DD.MM.YYYY hh:mm a"),
			width: 200,
		},
		{
			field: "duration",
			sortable: true,
			filter: true,
			headerName: "Duration (min)",
			width: 155,
		},
		{
			field: "customer",
			sortable: true,
			filter: true,
			headerName: "Customer",
			cellRenderer: (params) => {
				return `${params.data.customer.firstname} ${params.data.customer.lastname}`;
			},
			width: 180,
		},
		{
			cellRenderer: (params) => (
				/*
				<Button size="small" onClick={() => deleteTraining(params.data.id)}>
					Delete
				</Button>
				*/

				<IconButton
					size="small"
					color="error"
					aria-label="delete training"
					onClick={() => deleteTraining(params.data.id)}
				>
					<DeleteIcon />
				</IconButton>
			),
			width: 50,
		},
	]);

	//Functions:
	/*
	const formatDate = (dateInMillis) => {
		return dayjs(dateInMillis.format("DD.MM.YYYY hh:mm A"));
	};
	*/

	useEffect(() => {
		fetchTrainings();
	}, []);

	const fetchTrainings = () => {
		//"https://traineeapp.azurewebsites.net/gettrainings"
		fetch(import.meta.env.VITE_API_URL + "/gettrainings")
			.then((response) => {
				if (!response.ok)
					throw new Error("Something went wrong: " + response.statusText);
				return response.json();
			})
			.then((data) => setTrainings(data))
			.catch((err) => console.error(err));
	};

	const deleteTraining = (id) => {
		//investigate params/url using the console
		//console.log(id);
		if (window.confirm("Are you sure?")) {
			//`https://traineeapp.azurewebsites.net/api/trainings/${id}`
			fetch(import.meta.env.VITE_API_URL + `/api/trainings/${id}`, {
				method: "DELETE",
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error in deletion: " + response.statusText);
					} else {
						setOpen(true);
						fetchTrainings();
					}
				})
				.catch((err) => console.error(err));
		}
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
				message="Training deleted succesfully"
			/>
		</>
	);
}

export default Trainingslist;
