import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import getMainUrlApi from "../../../utils/getMainUrlApi";

interface VisitData {
	month: string;
	count: number;
}

const AlertMois: React.FC = () => {
	const [data, setData] = useState<VisitData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get<VisitData[]>(
					`${getMainUrlApi()}visite-site/visits-per-month`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching visits per month:", error);
			}
		};

		fetchData();
	}, []); // Empty dependency array to run only once on mount

	// Create an array with all months of the year
	const allMonths = moment
		.months()
		.map((month) => moment().month(month).format("MMMM"));

	// Fill in missing months with zero visits
	const monthsWithZero = allMonths.map((month) => {
		const found = data.find(
			(item) => moment(item.month, "MM").format("MMMM") === month
		);
		return {
			month,
			count: found ? found.count : 0,
		};
	});

	const options: ApexOptions = {
		chart: {
			type: "bar",
			height: 300,
			toolbar: {
				show: false,
			},
		},
		xaxis: {
			categories: allMonths, // Use allMonths array for X-axis categories
		},
	};

	const series = [
		{
			name: "Visits",
			data: monthsWithZero.map((item) => item.count),
		},
	];

	return <Chart options={options} series={series} type="bar" height={300} />;
};

export default AlertMois;
