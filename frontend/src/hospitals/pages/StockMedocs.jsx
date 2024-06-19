import axios from 'axios'
import ContentAdmin from '../components/partials/ContentAdmin'
import getUrlApi from '../utils/getUrlApi'
import { useEffect, useState } from 'react'

const StockMedocs = () => {
    axios.defaults.withCredentials = true
    localStorage.setItem('page', 'Medicaments des pharmaciens')
    window.document.title = "Medicaments des pharmaciens"

    const [pharmacien, setPharmacien] = useState([])

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredUsers, setFilteredUsers] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const [usersPerPage, setusersPerPage] = useState(5)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${getUrlApi()}/stock-medicaments/`
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
                pharmaciens.medicament
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
                    <table className='w-full border-collapse shadow-md'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='py-2 px-4 border'>ID</th>
                                <th className='py-2 px-4 border'>Nom</th>
                                <th className='py-2 px-4 border'>Email</th>
                                <th className='py-2 px-4 border'>Téléphone</th>
                                <th className='py-2 px-4 border'>Medicament</th>
                                <th className='py-2 px-4 border'>Quantite</th>
                                <th className='py-2 px-4 border'>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map(pharmacien => (
                                <tr
                                    key={pharmacien.id}
                                    className='hover:bg-gray-100 transition-colors'
                                >
                                    <td className='py-2 px-4 border'>
                                        {pharmacien.id}
                                    </td>
                                    <td className='py-2 px-4 border'>
                                        {pharmacien.name}
                                    </td>
                                    <td className='py-2 px-4 border'>
                                        {pharmacien.email}
                                    </td>
                                    <td className='py-2 px-4 border'>
                                        {pharmacien?.telephone}
                                    </td>
                                    <td className='py-2 px-4 border'>
                                        {pharmacien.medicament}
                                    </td>

                                    <td className='py-2 px-4 border'>
                                        {pharmacien?.quantite}
                                    </td>
                                    <td className='py-2 px-4 border'>
                                        {pharmacien?.price} {''} {pharmacien?.devise}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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
        </ContentAdmin>
    )
}

export default StockMedocs
