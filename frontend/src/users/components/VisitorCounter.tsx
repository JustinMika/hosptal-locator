import axios from "axios";

const VisitorCounter = () => {
	try {
		const pageVisited = window.location.href;
		const data = {
			pageVisited: pageVisited ?? "empty",
		};
		axios
			.post(`/saveVisite/`, data)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => console.error(err));
	} catch (error) {
		console.log(error);
	}
	return <div></div>;
};

export default VisitorCounter;
