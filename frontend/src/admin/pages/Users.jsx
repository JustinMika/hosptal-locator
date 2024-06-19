import axios from "axios";
import ContentAdmin from "../components/partials/ContentAdmin";
import { useEffect, useState } from "react";
import getUrlApi from "../utils/getUrlApi";
import getMainUrlApi from "../utils/getMainUrlApi";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
    const selector = useSelector((state) => state.login);
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    axios.defaults.withCredentials = true;
    localStorage.setItem("page", "Liste des utilisateurs");
    const [openModal, setopenModal] = useState(false);
    const isModalOpen = `fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex backdrop-brightness-90  backdrop-blur-sm`;
    const isModalClose = `fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full hidden backdrop-brightness-120`;

    useEffect(() => {
        axios
            .get(`${getUrlApi()}/get-users/`)
            .then((data) => {
                setUsers(data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Filtrer les utilisateurs en fonction de la recherche
    const filteredUsers = users?.filter(
        (user) =>
            user?.name?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
            user?.telephone?.toLowerCase().includes(searchQuery?.toLowerCase())
    );

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const deleteUser = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        axios
            .delete(`${getUrlApi()}/delete-users-admin/${id}/`)
            .then((data) => {
                setUsers(data.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const [Pseudo, setPseudo] = useState("");
    const [IsActive, setIsActive] = useState("");
    const [Email, setEmail] = useState("");
    const [Telephone, setTelephone] = useState("");

    const handleAddUsers = (e) => {
        e.preventDefault();
        const data = {
            name: Pseudo,
            email: Email,
            numero: Telephone,
            IsActive: IsActive,
        };
        if (Pseudo && Email && Telephone && IsActive) {
            try {
                axios
                    .post(`${getUrlApi()}/create-account-admin-users/`, data)
                    .then((data) => {
                        setopenModal(!openModal);
                        toast.info(`${data.data.message}🫡`, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: true,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                        setPseudo("");
                        setEmail("");
                        setIsActive("");
                        setTelephone("");
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                        toast.error(
                            `Erreur : ${err?.response?.data?.message}🫡`,
                            {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: true,
                                closeOnClick: false,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            }
                        );
                    });
            } catch (e) {
                toast.error(`Erreur : ${e.getMessage()}🫡`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } else {
            toast.error(`🫡 Veuillez remplir tous les champs svp.`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };
    return (
        <ContentAdmin>
            <ToastContainer />
            <main>
                <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
                    <div className="w-full">
                        <div className="sm:flex">
                            <div className="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
                                <div className="lg:pr-3">
                                    <label
                                        htmlFor="users-search"
                                        className="sr-only"
                                    >
                                        Search
                                    </label>
                                    <div className="relative mt-1 lg:w-64 xl:w-96">
                                        <input
                                            onChange={(e) => {
                                                setSearchQuery(e.target.value);
                                            }}
                                            type="text"
                                            name="email"
                                            id="users-search"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Search for users"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center ml-auto space-x-2 sm:space-x-3">
                                <button
                                    onClick={() => {
                                        setopenModal(!openModal);
                                    }}
                                    type="button"
                                    className="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2 -ml-1"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Add user
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 right-0 items-center w-full pp-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700"></div>
                {/*  */}
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden shadow">
                                <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                Access
                                            </th>
                                            <th
                                                scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                telephone
                                            </th>
                                            <th
                                                scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                                            >
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {currentUsers.map((user) => (
                                            <tr
                                                key={user?.id}
                                                className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                            >
                                                <td className="flex items-center p-4 mr-12 space-x-6 whitespace-nowrap">
                                                    {user?.profil ? (
                                                        <img
                                                            className="w-10 h-10 rounded-full"
                                                            src={`${getMainUrlApi()}/${
                                                                user.profil
                                                            }`}
                                                            alt="Neil Sims avatar"
                                                        />
                                                    ) : (
                                                        <div className="relative border border-gray-300 inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-green-1400 rounded-full dark:bg-gray-600">
                                                            <span className="font-semibold text-xl text-slate-400 dark:text-gray-300 uppercase">
                                                                {user?.name[0]}
                                                                {user?.name[1]}
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                        <div className="text-base font-semibold text-gray-900 dark:text-white">
                                                            {user?.name}
                                                        </div>
                                                        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                            {user?.email}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {user?.access == "user" ? (
                                                        <span>pharmacien</span>
                                                    ) : (
                                                        <span>Admin</span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {user.telephone}
                                                </td>
                                                <td className="p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white">
                                                    <div className="flex items-center">
                                                        {user?.isActive ? (
                                                            <span className="flex items-baseline">
                                                                <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2"></div>
                                                                active
                                                            </span>
                                                        ) : (
                                                            <div className="h-2.5 w-2.5 rounded-full bg-red-400 mr-2"></div>
                                                        )}
                                                    </div>
                                                </td>
                                                {parseInt(
                                                    selector?.user?.id
                                                ) === parseInt(user?.id) ? (
                                                    <td className="p-4 space-x-2 whitespace-wrap">
                                                        <button
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        >
                                                            <svg
                                                                className="w-4 h-4 mr-2"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                                                    clipRule="evenodd"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                deleteUser(
                                                                    user?.id
                                                                );
                                                            }}
                                                            type="button"
                                                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                                        >
                                                            <svg
                                                                className="w-4 h-4 mr-2"
                                                                fill="currentColor"
                                                                viewBox="0 0 20 20"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                    clipRule="evenodd"
                                                                ></path>
                                                            </svg>
                                                        </button>
                                                    </td>
                                                ) : (
                                                    <td className=""></td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="mt-4">
                                    <nav className="flex justify-center">
                                        <ul className="flex items-center">
                                            {Array.from(
                                                {
                                                    length: Math.ceil(
                                                        filteredUsers.length /
                                                            usersPerPage
                                                    ),
                                                },
                                                (_, index) => (
                                                    <li key={index}>
                                                        <button
                                                            className={`px-3 py-1 mx-1 rounded-full focus:outline-none ${
                                                                currentPage ===
                                                                index + 1
                                                                    ? "bg-gray-300"
                                                                    : "bg-gray-100"
                                                            }`}
                                                            onClick={() =>
                                                                paginate(
                                                                    index + 1
                                                                )
                                                            }
                                                        >
                                                            {index + 1}
                                                        </button>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*  */}
            </main>

            {/* modal */}
            <div className={openModal ? isModalOpen : isModalClose}>
                <div className="relative w-full h-full max-w-2xl px-4 md:h-auto z-50 transition-all ease-in-out">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                            <h3 className="text-xl font-semibold dark:text-white">
                                Add new user
                            </h3>
                            <button
                                onClick={() => {
                                    setopenModal(!openModal);
                                }}
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <form action="#" onSubmit={handleAddUsers}>
                            <div className="p-6 space-y-3">
                                <div className="grid grid-cols-6 gap-3">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="first-name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Pseudo
                                        </label>
                                        <input
                                            type="text"
                                            name="first-name"
                                            id="first-name"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Bonnie"
                                            required=""
                                            value={Pseudo}
                                            onChange={(e) => {
                                                setPseudo(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="telephone"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            telephone
                                        </label>
                                        <input
                                            type="text"
                                            name="telephone"
                                            id="telephone"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Green"
                                            required
                                            value={Telephone}
                                            onChange={(e) => {
                                                setTelephone(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="example@company.com"
                                            required=""
                                            value={Email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="active"
                                            className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Active
                                        </label>
                                        <select
                                            type="active"
                                            name="active"
                                            id="active"
                                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required=""
                                            onChange={(e) => {
                                                setIsActive(e.target.value);
                                            }}
                                        >
                                            <option value="">----------</option>
                                            <option value={1}>Activer</option>
                                            <option
                                                value={0}
                                            >{`N'est pas Activer`}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 gap-3 border-t border-gray-200 rounded-b dark:border-gray-700 flex justify-end ">
                                <button
                                    onClick={() => {
                                        setopenModal(!openModal);
                                    }}
                                    className="flex justify-end items-end text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                >
                                    Fermer
                                </button>
                                <button
                                    className="flex justify-end items-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="submit"
                                >
                                    Add user
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* little modal */}
            <div
                className="fixed left-0 right-0 z-50 items-center justify-center hidden overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full"
                id="delete-user-modal"
            >
                <div className="relative w-full h-full max-w-md px-4 md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="flex justify-end p-2">
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                                data-modal-toggle="delete-user-modal"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-6 pt-0 text-center">
                            <svg
                                className="w-16 h-16 mx-auto text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                            <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
                                Are you sure you want to delete this user?
                            </h3>
                            <a
                                href="#"
                                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800"
                            >
                                Yes, m sure
                            </a>
                            <a
                                href="#"
                                className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                data-modal-toggle="delete-user-modal"
                            >
                                No, cancel
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </ContentAdmin>
    );
};

export default Users;
