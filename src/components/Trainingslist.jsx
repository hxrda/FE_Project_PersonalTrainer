import { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import dayjs from "dayjs";

function Trainingslist() {
	//States:
	const [trainings, setTrainings] = useState([]);
	const [open, setOpen] = useState(false);

	const [columnDefs] = useState([
		{
			field: "activity",
			sortable: true,
			filter: true,
			headerName: "Activity",
			width: 150,
		},
		{
			field: "date",
			sortable: true,
			filter: true,
			headerName: "Date",
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
	useEffect(() => {
		fetchTrainings();
	}, []);

	const fetchTrainings = () => {
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
		if (window.confirm("Are you sure?")) {
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
