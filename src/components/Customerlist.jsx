import { useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

//import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function Customerlist() {
	//States:
	const [customers, setCustomers] = useState([]);
	const [open, setOpen] = useState(false);

	const [columnDefs] = useState([
		{
			field: "firstname",
			sortable: true,
			filter: true,
			headerName: "Firstname",
			width: 125,
		},
		{
			field: "lastname",
			sortable: true,
			filter: true,
			headerName: "Lastname",
			width: 125,
		},
		{
			field: "email",
			sortable: true,
			filter: true,
			headerName: "Email",
			width: 180,
		},
		{
			field: "phone",
			sortable: true,
			filter: true,
			headerName: "Phone",
			width: 140,
		},
		{
			field: "streetaddress",
			sortable: true,
			filter: true,
			headerName: "Streetaddress",
			width: 160,
		},
		{
			field: "postcode",
			sortable: true,
			filter: true,
			headerName: "Postcode",
			width: 125,
		},
		{
			field: "city",
			sortable: true,
			filter: true,
			headerName: "City",
			width: 125,
		},
		{
			cellRenderer: (params) => (
				<AddTraining
					customerdata={params.data.links[0].href}
					//fetchCustomers={fetchCustomers}
				/>
			),
			width: 50,
		},
		{
			cellRenderer: (params) => (
				<EditCustomer
					customerdata={params.data}
					fetchCustomers={fetchCustomers}
				/>
			),
			width: 50,
		},
		{
			cellRenderer: (params) => (
				/*
            <Button
				size="small"
				onClick={handleClickOpen}
			>
				*/
				<IconButton
					size="small"
					color="error"
					aria-label="delete customer"
					onClick={() => deleteCustomer(params.data.links[0].href)}
				>
					<DeleteIcon />
				</IconButton>
			),
			width: 50,
		},
	]);

	//Functions:
	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = () => {
		//"https://traineeapp.azurewebsites.net/api/customers"
		fetch(import.meta.env.VITE_API_URL + "/api/customers")
			.then((response) => {
				if (!response.ok)
					throw new Error("Something went wrong: " + response.statusText);
				return response.json();
			})
			.then((data) => setCustomers(data.content))
			.catch((err) => console.error(err));
	};

	const deleteCustomer = (url) => {
		//investigate params/url using the console
		//console.log(url);
		if (window.confirm("Are you sure?")) {
			fetch(url, { method: "DELETE" })
				.then((response) => {
					if (!response.ok) {
						throw new Error("Error in deletion: " + response.statusText);
					} else {
						setOpen(true);
						fetchCustomers();
					}
				})
				.catch((err) => console.error(err));
		}
	};

	//Rendering:
	return (
		<>
			<AddCustomer fetchCustomers={fetchCustomers} />
			<div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
				{""}
				<AgGridReact
					rowData={customers}
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

export default Customerlist;
