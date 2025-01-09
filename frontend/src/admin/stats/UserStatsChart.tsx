import axios from "axios";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import getMainUrlApi from "../../utils/getMainUrlApi";
import { ApexOptions } from "apexcharts";

export interface UserStat {
	page: string;
	count: number;
}

const UserStatsChart: React.FC = () => {
	const [data, setData] = useState<UserStat[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${getMainUrlApi()}users/user-stats/users`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching user stats:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array to run only once on mount

	const options: ApexOptions = {
		chart: {
			type: "bar",
			height: 300,
			toolbar: {
				show: true,
			},
		},
		xaxis: {
			categories: data.map((item) => item.page),
		},
	};

	const series = [
		{
			name: "Nombres",
			data: data.map((item) => item.count),
		},
	];

	return (
		<Chart
			options={options}
			series={series}
			type="line"
			height={300}
			width={`100%`}
		/>
	);
};

export default UserStatsChart;
