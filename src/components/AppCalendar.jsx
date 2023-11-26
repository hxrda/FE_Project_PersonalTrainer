import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import parseISO from "date-fns/parseISO";
import startOfWeek from "date-fns/startOfWeek";
import addMinutes from "date-fns/addMinutes";
import getDay from "date-fns/getDay";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
//import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import "react-datepicker/dist/react-datepicker.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import "./App.css";
import enUS from "date-fns/locale/en-US";

const locales = {
	"en-US": enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

//Dummy data:
//NB! month is shown as -1, starts from 0
/*
const dummyEvents = [
	{
		title: "Big Meeting", //Activity
		allDay: true,
		start: new Date(2023, 10, 0), //date (based on duration)
		end: new Date(2023, 10, 0), //date (start time)
	},
	{
		title: "Vacation",
		start: new Date(2023, 10, 7),
		end: new Date(2023, 10, 10),
	},
	{
		title: "Conference",
		start: new Date(2023, 10, 20),
		end: new Date(2023, 10, 23),
	},
];
*/

function AppCalendar() {
	//States:
	/*
	const [trainings, setTrainings] = useState([]);
	const [newEvent, setNewEvent] = useState([
		{
			title: "", //title: String  -> Activity + Name?
			start: "", //start: Date
			end: "", //end: Date (duration?)
		},
	]);
	*/
	const [allEvents, setAllEvents] = useState([]);

	// Set the calendar's start and end times
	const minTime = setHours(setMinutes(new Date(), 0), 6);
	const maxTime = setHours(setMinutes(new Date(), 0), 22);

	// Define event styles, including font size
	/*
	const eventStyleGetter = (event, start, end, isSelected) => ({
		style: {
			fontSize: "10px", // Adjust the font size as needed
		},
	});
	*/

	//Functions:

	/*
	function addEvent(){
		setAllEvents([...allEvents, newEvent])
		onchange{(e) => setNewEvent({...newEvent, title: e.target.value})}
	}
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
			.then((data) => {
				// Map the fetched data into the format expected by react-big-calendar
				const formattedEvents = data.map((training) => ({
					title: `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`,
					start: parseISO(training.date),
					end: addMinutes(parseISO(training.date), training.duration),
				}));
				//set formatted events into state
				setAllEvents(formattedEvents);
			})

			.catch((err) => console.error(err));
	};

	//Rendering:
	return (
		<>
			<div className="AppCalendar">
				<Calendar
					localizer={localizer}
					events={allEvents} //{dummyEvents}
					startAccessor="start"
					endAccessor="end"
					min={minTime}
					max={maxTime}
					//eventStyleGetter={eventStyleGetter}
					style={{ height: 500, margin: "50px" }}
				/>
			</div>
		</>
	);
}

export default AppCalendar;

/*
<div style={{ height: "95vh" }}></div>
*/
