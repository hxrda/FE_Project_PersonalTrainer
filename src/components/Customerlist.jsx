import { useState, useEffect, useRef, useCallback } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

function Customerlist() {
	//States:
	const [customers, setCustomers] = useState([]);
	const [open, setOpen] = useState(false);
	const gridRef = useRef();

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
				<AddTraining customerdata={params.data.links[0].href} />
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

	const getParams = () => {
		return {
			columnKeys: [
				"firstname",
				"lastname",
				"email",
				"phone",
				"streetaddress",
				"postcode",
				"city",
			],

			suppressQuotes: true,
		};
	};

	const onBtnExport = useCallback(() => {
		gridRef.current.api.exportDataAsCsv(getParams());
	}, []);

	//Rendering:
	return (
		<>
			<Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
				<AddCustomer fetchCustomers={fetchCustomers} />
				&nbsp;
				<Button size="small" onClick={onBtnExport}>
					Export
				</Button>
			</Box>
			<div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
				{""}
				<AgGridReact
					rowData={customers}
					columnDefs={columnDefs}
					pagination={true}
					paginationAutoPageSize={true}
					ref={gridRef}
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
