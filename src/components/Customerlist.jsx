import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
//import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

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
		},
		{
			field: "lastname",
			sortable: true,
			filter: true,
			headerName: "Lastname",
		},
		{ field: "email", sortable: true, filter: true, headerName: "Email" },
		{ field: "phone", sortable: true, filter: true, headerName: "Phone" },
		{
			field: "streetaddress",
			sortable: true,
			filter: true,
			headerName: "Streetaddress",
		},
		{ field: "postcode", sortable: true, filter: true, headerName: "Postcode" },
		{ field: "city", sortable: true, filter: true, headerName: "City" },
		{
			cellRenderer: (params) => (
				<EditCustomer
					customerdata={params.data}
					fetchCustomers={fetchCustomers}
				/>
			),
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
	useEffect(() => {
		fetchCustomers();
	}, []);

	const fetchCustomers = () => {
		//
		fetch("https://traineeapp.azurewebsites.net/api/customers")
			.then((response) => {
				if (!response.ok)
					throw new Error("Something went wrong: " + response.statusText);
				return response.json();
			})
			.then((data) => setCustomers(data.content))
			.catch((err) => console.error(err));
	};

	//Rendering:
	return (
		<>
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
