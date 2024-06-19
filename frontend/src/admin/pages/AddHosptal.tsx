import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ContentAdmin from "./../components/ContentAdmin.tsx";
import { useState } from "react";

const ValidationSchema = Yup.object().shape({
	medicament: Yup.string().required("Le nom du médicament est requis"),
	montant: Yup.number().required("Le montant est requis"),
	devise: Yup.string().required("La devise est requise"),
	telephone: Yup.string().required("Le numéro de téléphone est requis"),
});

const AddHosptal = () => {
	axios.defaults.withCredentials = true;
	window.document.title = "Ajout des hopitaux dans la base de donnees";
	localStorage.setItem("page", "Ajout des hopitaux dans la base de donnees");
	const [liens, setliens] = useState("");

	const handleSubmit = async (values, { resetForm }) => {
		console.log(values);
		await axios
			.post(`generate-transaction/`, values)
			.then((response) => {
				setliens(response.data.data);
				resetForm();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<ContentAdmin>
			<div className="w-1/2 mx-auto p-4">
				{liens && (
					<div
						className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 whitespace-pre-line flex items-start justify-center"
						role="alert"
					>
						<p className="font-medium flex-wrap whitespace-pre-line flex-1 mr-1">
							<textarea
								disabled={true}
								className="w-full rounded-md shadow-sm"
								value={`/`}
							>
								{`/`}
							</textarea>
						</p>
					</div>
				)}

				<div className="w-full p-6  rounded-md shadow-md bg-white">
					<h2 className="text-2xl  my-4 font-semibold mb-4 text-gray-600">
						Ajout des hopitaux
					</h2>
					<Formik
						initialValues={{
							medicament: "",
							montant: "",
							devise: "",
							telephone: "",
						}}
						validationSchema={ValidationSchema}
						onSubmit={handleSubmit}
					>
						{/* {({ isSubmitting }) => ( */}
						<Form>
							<div className="flex justify-between">
								<div className="mb-4 mr-2 w-full">
									<label
										htmlFor="medicament"
										className="block w-full text-sm font-medium text-gray-700"
									>
										Nom du médicament
									</label>
									<Field
										type="text"
										id="medicament"
										name="medicament"
										className="mt-1 p-2 w-full border rounded-md"
									/>
									<ErrorMessage
										name="medicament"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
								<div className="mb-4 w-full">
									<label
										htmlFor="montant"
										className="block text-sm font-medium text-gray-700"
									>
										Montant avec livraison
									</label>
									<Field
										type="number"
										id="montant"
										name="montant"
										className="mt-1 p-2 w-full border rounded-md"
									/>
									<ErrorMessage
										name="montant"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
							</div>

							<div className="flex justify-between mt-4">
								<div className="mb-4 mr-2 w-full">
									<label
										htmlFor="devise"
										className="block text-sm font-medium text-gray-700"
									>
										Devise
									</label>
									<Field
										id="devise"
										name="devise"
										className="mt-1 p-2 w-full border rounded-md border-gray-600"
									/>
									<ErrorMessage
										name="devise"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
								<div className="mb-4 w-full">
									<label
										htmlFor="telephone"
										className="block text-sm font-medium text-gray-700"
									>
										Numéro de téléphone
									</label>
									<Field
										type="text"
										id="telephone"
										name="telephone"
										className="mt-1 p-2 w-full border rounded-md"
									/>
									<ErrorMessage
										name="telephone"
										component="div"
										className="text-red-500 text-sm"
									/>
								</div>
							</div>
							<button
								type="submit"
								className="px-4 py-2.5 bg-blue-400 text-white rounded-md hover:bg-blue-600 transition-all duration-200 w-full"
							>
								Ajouter
							</button>
						</Form>
						{/* )} */}
					</Formik>
				</div>
			</div>
		</ContentAdmin>
	);
};

export default AddHosptal;
