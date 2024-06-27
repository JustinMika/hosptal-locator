import React from "react";
import ContentAdmin from "../components/ContentAdmin";
import axios from "axios";

const ALertesHospital: React.FC = () => {
	axios.defaults.withCredentials = true;
	localStorage.setItem("page", "Messagerie");
	return (
		<ContentAdmin>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
			libero sapien, convallis a rutrum a, pretium ullamcorper magna. Sed
			elit sem, cursus sed ipsum a, maximus consequat orci. Suspendisse
			sit amet vestibulum dolor. Integer hendrerit congue quam, ac iaculis
			est. Vivamus consequat facilisis lectus. Pellentesque vitae nulla
			ligula. Sed id nulla ullamcorper, fringilla sapien vel, eleifend
			justo. Donec consequat metus eu neque vestibulum, ac congue nunc
			varius. Integer consequat sapien ut turpis egestas, pulvinar
			fermentum massa ornare. Donec porta malesuada leo, sit amet egestas
			odio pretium vitae. Ut accumsan nisi quis augue pretium, ut
			tincidunt dui volutpat. Integer posuere ut dolor quis gravida. Fusce
			a sagittis ex. Nam nec venenatis metus, vitae feugiat leo. Aliquam
			quis gravida elit. Sed neque dui, volutpat non pulvinar eu,
			sollicitudin vitae metus. Maecenas nec tortor at eros imperdiet
			imperdiet sodales ut ex. Aenean imperdiet bibendum egestas. Etiam
			condimentum velit ornare, vestibulum erat non, fringilla turpis.
			Praesent volutpat purus at dui posuere, eget condimentum enim
			pretium. Praesent dictum dui tincidunt libero venenatis, blandit
			mattis nisi blandit. Phasellus consectetur rutrum velit, nec iaculis
		</ContentAdmin>
	);
};

export default ALertesHospital;
