import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function AddTraining({ customerdata }) {
	//States:
	const [training, setTraining] = useState({
		activity: "",
		date: Date,
		duration: "",
		customer: customerdata,
	});

	const [open, setOpen] = useState(false);

	//Functions:
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		fetch(import.meta.env.VITE_API_URL + "/api/trainings", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(training),
		})
			.then((response) => {
				if (!response.ok)
					throw new Error("Adding training failed: " + response.statusText);
			})
			.catch((err) => console.err(err));

		handleClose();
	};

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
							label="DD/MM/YYYY hh:mm aa"
							inputFormat="DD/MM/YYYY hh:mm aa"
							value={training.date}
							onChange={(value) =>
								setTraining({ ...training, date: value.toISOString() })
							}
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
