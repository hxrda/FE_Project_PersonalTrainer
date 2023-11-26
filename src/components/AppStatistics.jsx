import { useState, useEffect } from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	//Legend,
	ResponsiveContainer,
} from "recharts";
import _ from "lodash";

function AppStatistics() {
	//States:
	const [trainings, setTrainings] = useState([]);

	//Functions:
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
			.then((data) => setTrainings(data.content))
			.catch((err) => console.error(err));
	};

	// Process data and calculate total duration for each activity
	const durationByActivity = () => {
		const activityData = _.groupBy(trainings, "activity");

		const chartData = Object.keys(activityData).map((activity) => ({
			activity,
			duration: _.sumBy(activityData[activity], "duration"),
		}));

		return chartData;
	};

	//Rendering:
	return (
		<>
			<ResponsiveContainer width="100%" height={400}>
				<BarChart
					data={durationByActivity()}
					margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="activity" />
					<YAxis
						label={{
							value: "Duration (min)",
							angle: -90,
							position: "insideLeft",
						}}
					/>
					<Tooltip />
					<Bar dataKey="duration" fill="#6A5ACD" />
				</BarChart>
			</ResponsiveContainer>
		</>
	);
}

export default AppStatistics;

//<Legend />
