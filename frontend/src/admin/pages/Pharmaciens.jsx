import axios from 'axios'
import ContentAdmin from '../components/partials/ContentAdmin'
import { useEffect, useState } from 'react'
import getUrlApi from '../utils/getUrlApi'
import { ToastContainer, toast } from 'react-toastify'

const Pharmaciens = () => {
    axios.defaults.withCredentials = true
    window.document.title = 'Liste des pharmaciens'
    axios.defaults.withCredentials = true
    localStorage.setItem('page', 'Liste des pharmaciens')

    const [pharmacien, setPharmacien] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setusersPerPage] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${getUrlApi()}/get-pharmaciens/`
                )
                setPharmacien(response.data.data)
            } catch (error) {
                alert('Erreur lors de la récupération des données')
            }
        }

        fetchData()
    }, [])

    const handleSearch = () => {
        const filtered = pharmacien.filter(
            pharmaciens =>
                pharmaciens.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                pharmaciens.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                pharmaciens.telephone
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                pharmaciens.quantite
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
        setCurrentPage(1)
    }

    const handleResetSearch = () => {
        setSearchTerm('')
        setFilteredUsers([])
        setCurrentPage(1)
    }

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = searchTerm
        ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
        : pharmacien.slice(indexOfFirstUser, indexOfLastUser)

    const totalUsers = searchTerm ? filteredUsers.length : pharmacien.length
    const totalPages = Math.ceil(totalUsers / usersPerPage)
    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (
        <ContentAdmin>
            <ToastContainer />
            <div className='w-full'>
                <div>
                    <div className='flex mb-4'>
                        <input
                            type='text'
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder='Rechercher...'
                            className='p-2 border border-gray-300 rounded-l w-full'
                        />
                        <button
                            onClick={handleSearch}
                            className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                className='w-6 h-6'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M21 21l-4.35-4.35'
                                />
                                <circle cx='10' cy='10' r='7' />
                            </svg>
                        </button>
                        {searchTerm && (
                            <button
                                onClick={handleResetSearch}
                                className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 ml-2'
                            >
                                Réinitialiser
                            </button>
                        )}
                        <select
                            name='perpage'
                            id='perpage'
                            className='p-2 border border-gray-300 rounded-r'
                            onChange={e => setusersPerPage(e.target.value)}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div className='overflow-x-scroll'>
                        <table className='w-full border-collapse shadow-md'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='py-2 px-4 border'>ID</th>
                                    <th className='py-2 px-4 border'>Nom</th>
                                    <th className='py-2 px-4 border'>Email</th>
                                    <th className='py-2 px-4 border'>
                                        Téléphone
                                    </th>
                                    <th className='py-2 px-4 border'>
                                        Adresse
                                    </th>
                                    <th className='py-2 px-4 border'>state</th>
                                    <th className='py-2 px-4 border'>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(pharmacien => (
                                    <tr
                                        key={pharmacien.id}
                                        className='hover:bg-gray-50 transition-colors'
                                    >
                                        <td className='py-4 px-4 border'>
                                            {pharmacien.id}
                                        </td>
                                        <td className='py-2 px-4 border'>
                                            {pharmacien.name}
                                        </td>
                                        <td className='py-4 px-4 border'>
                                            {pharmacien.email}
                                        </td>
                                        <td className='py-4 px-4 border'>
                                            {pharmacien.telephone}
                                        </td>

                                        <td className='py-2 px-4 border'>
                                            {pharmacien?.adresse ?? '-'}
                                        </td>
                                        <td className='p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white'>
                                            <div className='flex items-center'>
                                                {pharmacien?.isActive ? (
                                                    <span className='flex items-baseline'>
                                                        <div className='h-6 w-6 rounded-full animate-pulse bg-green-400 mr-2'></div>
                                                    </span>
                                                ) : (
                                                    <div className='h-6 w-6 animate-pulse rounded-full bg-red-700 mr-2'></div>
                                                )}
                                            </div>
                                        </td>

                                        <td className='py-4 px-4 border flex justify-between flex-wrap items-center'>
                                            <button
                                                title='Activer/Deactiver'
                                                className='p-1 bg-green-500 hover:bg-green-700 hover:animate-spin rounded-full'
                                                onClick={() => {
                                                    const id_user =
                                                        pharmacien?.id
                                                    let new_state = Boolean(
                                                        pharmacien?.isActive
                                                    )
                                                    const data = {
                                                        state: !new_state
                                                    }
                                                    axios
                                                        .put(
                                                            `${getUrlApi()}/active-users-pharm/${id_user}/`,
                                                            data
                                                        )
                                                        .then(() => {
                                                            window.location.reload()
                                                        })
                                                        .catch(e => {
                                                            console.log(
                                                                e.response
                                                            )
                                                            toast.error(
                                                                `🫡 Une erreur s'est produite,... ${e.response.data}`,
                                                                {
                                                                    position:
                                                                        'top-right',
                                                                    autoClose: 5000,
                                                                    hideProgressBar: true,
                                                                    closeOnClick: false,
                                                                    pauseOnHover: true,
                                                                    draggable: true,
                                                                    progress:
                                                                        undefined,
                                                                    theme: 'light'
                                                                }
                                                            )
                                                        })
                                                }}
                                            >
                                                <svg
                                                    className='w-6 h-6 animate-bounce- mr-1 text-white'
                                                    aria-hidden='true'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='currentColor'
                                                    viewBox='0 0 18 21'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        d='M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z'
                                                    ></path>
                                                </svg>
                                            </button>
                                            <button
                                                title='contacter sur whatsapp'
                                                onClick={() => {
                                                    const phoneNumber =
                                                        pharmacien?.telephone
                                                    const message = `Bonjour ${pharmacien?.name}`

                                                    // Encodage du message pour l'URL
                                                    const encodedMessage =
                                                        encodeURIComponent(
                                                            message
                                                        )
                                                    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`
                                                    window.open(url, '_blank')
                                                }}
                                            >
                                                <svg
                                                    className='w-6 h-6 text-green-500 hover:text-green-700 dark:text-white'
                                                    aria-hidden='true'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 20 18'
                                                >
                                                    <path
                                                        stroke='currentColor'
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth='2'
                                                        d='M16 5h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2v3l-4-3H8m4-13H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2v3l4-3h4a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z'
                                                    />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className='mt-4 flex justify-center'>
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === index + 1
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-blue-500'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </ContentAdmin>
    )
}

export default Pharmaciens
