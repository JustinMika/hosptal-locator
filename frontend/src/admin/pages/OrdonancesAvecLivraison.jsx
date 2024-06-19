import axios from 'axios'
import moment from 'moment'
import { useEffect, useState } from 'react'
import ContentAdmin from '../components/partials/ContentAdmin'
import getMainUrlApi from '../utils/getMainUrlApi'
import getUrlApi from '../utils/getUrlApi'

const OrdonancesAvecLivraison = () => {
    axios.defaults.withCredentials = true
    localStorage.setItem('page', 'Ordonances Avec Livraison')
    window.document.title = 'Ordonances avec livraison'
    localStorage.setItem('page', 'Ordonances avec livraison')
    const [ordonance, setOrdonance] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setusersPerPage] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${getUrlApi()}/avec-ordonance/`
                )
                setOrdonance(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    }, [])

    const handleSearch = () => {
        const filtered = ordonance.filter(
            ordonance =>
                ordonance.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                ordonance.email
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                ordonance.phone
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                ordonance.adresse
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
        )
        setFilteredUsers(filtered)
        setCurrentPage(1) // Réinitialiser la page actuelle lors d'une recherche
    }

    const handleResetSearch = () => {
        setSearchTerm('')
        setFilteredUsers([])
        setCurrentPage(1) // Réinitialiser la page actuelle après avoir supprimé la recherche
    }

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = searchTerm
        ? filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
        : ordonance.slice(indexOfFirstUser, indexOfLastUser)

    const totalUsers = searchTerm ? filteredUsers.length : ordonance.length
    const totalPages = Math.ceil(totalUsers / usersPerPage)

    const [openModal, setopenModal] = useState(false);
    const [img, setImg] = useState('');
    const isModalOpen = `fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full flex backdrop-brightness-90  backdrop-blur-sm`;
    const isModalClose = `fixed left-0 right-0 z-50 items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full hidden backdrop-brightness-120`;

    const paginate = pageNumber => setCurrentPage(pageNumber)
    return (
        <ContentAdmin>
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
                    <div className='overflow-x-auto'>
                        <table className='w-full border-collapse shadow-md'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='py-2 px-4 border'>Date</th>
                                    <th className='py-2 px-4 border'>Nom</th>
                                    <th className='py-2 px-4 border'>
                                        Téléphone
                                    </th>
                                    <th className='py-2 px-4 border'>
                                        Adresse
                                    </th>
                                    <th
                                        className='py-2 px-4 border'
                                        title='Livraison a domicile'
                                    >
                                        Livrable
                                    </th>
                                    <th className='py-2 px-4 border'>
                                        Ordonance
                                    </th>
                                    <th className='py-2 px-4 border'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentUsers.map(ordonances => (
                                    <tr
                                        key={ordonances.id}
                                        className='hover:bg-gray-100 transition-colors'
                                    >
                                        <td className='py-2 px-4 border'>
                                            {moment(
                                                ordonances?.created_at
                                            ).fromNow()}
                                        </td>
                                        <td className='py-2 px-4 border'>
                                            {ordonances?.name}
                                        </td>
                                        <td className='py-2 px-4 border'>
                                            {ordonances?.phone}
                                        </td>

                                        <td className='py-2 px-4 border'>
                                            {ordonances?.adresse}
                                        </td>

                                        <td
                                            className='py-2 px-4 border'
                                            title='Livraison a domicile'
                                        >
                                            {ordonances?.isLivraisonAtHome
                                                ? 'Oui'
                                                : 'Non'}
                                        </td>

                                        <td className='py-2 px-4 border'>
                                            <b
                                                className='text-blue-500 hover:border-b hover:border-blue-400 '
                                                onClick={() => {
                                                    setopenModal(!openModal)
                                                    const url = `${getMainUrlApi()}/${ordonances?.file_ordonance
                                                        }`
                                                    setImg(url)
                                                }}
                                            >
                                                lien vers la photo
                                            </b>
                                        </td>

                                        <td className='py-2 px-4 border flex justify-between items-center gap-2'>
                                            <button
                                                title='contacter sur whatsapp'
                                                onClick={() => {

                                                    const phoneNumber =
                                                        ordonances?.phone
                                                    const message = `Bonjour ${ordonances?.name}`

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
                                className={`px-3 py-1 rounded ${currentPage === index + 1
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
            {/* modal */}
            <div className={openModal ? isModalOpen : isModalClose}>
                <div className="relative w-full h-full max-w-2xl px-4 md:h-auto z-50 transition-all ease-in-out">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                            <h3 className="text-xl font-semibold dark:text-white">
                                Image de l&apos;ordonance
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
                        <div className='w-full h-full p-2'>
                            <img src={img} alt='image non disponible' />
                        </div>
                    </div>
                </div>
            </div>
        </ContentAdmin>
    )
}

export default OrdonancesAvecLivraison
