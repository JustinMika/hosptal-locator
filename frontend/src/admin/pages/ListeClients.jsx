import axios from 'axios'
import ContentAdmin from '../components/partials/ContentAdmin'
import { useEffect, useState } from 'react'
import getUrlApi from '../utils/getUrlApi'

const ListeClients = () => {
    window.document.title = 'Liste des clients'
    axios.defaults.withCredentials = true
    localStorage.setItem('page', 'Liste des clients')
    const [ordonance, setOrdonance] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setusersPerPage] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${getUrlApi()}/liste-des-clients/`
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
                    {currentUsers && (
                        <table className='w-full border-collapse shadow-md'>
                            <thead>
                                <tr className='bg-gray-100'>
                                    <th className='py-2 px-4 border'>
                                        Creation compte
                                    </th>
                                    <th className='py-2 px-4 border'>Nom</th>
                                    <th className='py-2 px-4 border'>
                                        Téléphone
                                    </th>
                                    <th className='py-2 px-4 border'>
                                        Adresse
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
                                            {/* {moment(
                                            ordonances?.created_at
                                        ).fromNow()} */}
                                            {new Date(ordonances?.created_at).toLocaleString()}
                                        </td>
                                        <td className='py-2 px-4 border'>
                                            {ordonances?.name}
                                        </td>
                                        <td className='py-2 px-4 border'>
                                            {ordonances?.phone}
                                        </td>

                                        <td className='py-2 px-4 border'>
                                            {ordonances?.adresse ?? '-'}
                                        </td>

                                        <td className='py-2 px-4 border flex justify-between items-center gap-2'>
                                            <button
                                                title='contacter sur whatsapp'
                                                onClick={() => {
                                                    const phoneNumber =
                                                        ordonances?.phone
                                                    const message = 'Bonjour!'

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
                    )}
                    {!currentUsers ?? (
                        <p className='text-center text-xl'>Aucun utulisateur</p>
                    )}
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

export default ListeClients
