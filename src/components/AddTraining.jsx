import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
//import Box from "@mui/material/Box";

//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import dayjs from "dayjs";

export default function AddTraining({ customerdata }) {
	//States:
	const [training, setTraining] = useState({
		activity: "",
		date: "", //new Date().toISOString(), //dayjs().toISOString, //type: date
		duration: "", //type: int
		customer: customerdata, //object "Customer"  -> customer.id
	});
	const [open, setOpen] = useState(false);

	//test:
	/*
	console.log("activity (addTraining): " + training.activity);
	console.log("date (addTraining): " + training.date);
	console.log("cust (addTrainig): " + training.customer);
	*/

	//Functions:
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		fetchTrainings();
	}, []);

	const fetchTrainings = () => {
		//"https://traineeapp.azurewebsites.net/gettrainings"
		fetch(import.meta.env.VITE_API_URL + "/api/trainings")
			.then((response) => {
				if (!response.ok)
					throw new Error("Something went wrong: " + response.statusText);
				return response.json();
			})
			.then((data) => setTraining(data))
			.catch((err) => console.error(err));
	};

	const handleSave = () => {
		//incl validation handling?
		//https://traineeapp.azurewebsites.net/api
		fetch(import.meta.env.VITE_API_URL + "/api/trainings", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(training),
		})
			.then((response) => {
				if (!response.ok)
					throw new Error("Adding customer failed: " + response.statusText);

				fetchTrainings();
			})
			.catch((err) => console.err(err));

		handleClose();
	};

	/*
	const dateFormatter = (inputDate) => {
		const formattedDate = inputDate.toISOString();

		//test:
		console.log(inputDate.toISOString());
		setTraining({ ...training, date: formattedDate });
	};
    */

	//Rendering
	return (
		<>
			<IconButton
				size="small"
				color="primary"
				aria-label="add to customer"
				onClick={handleClickOpen}
			>
				<AddIcon />
			</IconButton>

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add training</DialogTitle>
				<DialogContent>
					<TextField
						margin="dense"
						label="Activity"
						value={training.activity}
						onChange={(e) =>
							setTraining({ ...training, activity: e.target.value })
						}
						fullWidth
						variant="outlined"
					/>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateTimePicker
							//margin="dense"
							label="DD/MM/YYYY hh:mm aa"
							//format="DD/MM/YYYY hh:mm aa"
							inputFormat="DD/MM/YYYY hh:mm aa"
							value={training.date}
							onChange={(value) =>
								setTraining({ ...training, date: value.toISOString() })
							}
							/*
							onChange={(e) =>
								setTraining({ ...training, date: e.target.value.toISOString() })
							}
                            */
							//onChange={(newValue) => dateFormatter(newValue)}
							//setTraining({ ...training, date: formattedDate });
							/*
							onChange={(newValue) =>
								setTraining({ ...training, date: newValue.toISOString() })
							}
                            */
							//value={training.date ? dayjs(training.date) : null} // Use null for uncontrolled state
							//value={dayjs(training.date)}

							/*
							onChange={(newValue) =>
								setTraining({
									...training,
									date: newValue.toISOString(),
								})
							}
                            */
							//value={dayjs(training.date)}
							/*
							onChange={(newValue) =>
								setTraining({
									...training,
									date: newValue.toISOString(),
								})
							}
                            */
							//value={new Date(training.date)}
							/*
                            onChange={(newValue) =>
								setTraining({
									...training,
									date: newValue.toISOString(),
								})
							}
                            */
							fullWidth
							variant="outlined"
						/>
					</LocalizationProvider>
					<TextField
						margin="dense"
						label="Duration (min)"
						value={training.duration}
						onChange={(e) =>
							setTraining({ ...training, duration: e.target.value })
						}
						fullWidth
						variant="outlined"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

/*
     <IconButton color="primary" aria-label="add to customer">
				<AddIcon />
	 </IconButton>
*/
/*
  <Button size="small" onClick={handleClickOpen}>
				Add T
			</Button>
/*

/*
	<Button
				variant="contained"
				size="small"
				startIcon={<AddIcon />}
				onClick={handleClickOpen}
	>
		New Customer
	</Button>

*/

/*
    <TextField
				margin="dense"
				label="Date"
				value={training.date}
				onChange={(e) => setTraining({ ...training, date: e.target.value })}
				fullWidth
				variant="standard"
	/>
*/
