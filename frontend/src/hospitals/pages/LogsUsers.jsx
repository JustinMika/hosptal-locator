import axios from 'axios'
import ContentAdmin from '../components/partials/ContentAdmin'
import { useEffect, useState } from 'react'
import getUrlApi from '../utils/getUrlApi'

const LogsUsers = () => {
    axios.defaults.withCredentials = true
    localStorage.setItem('page', 'Logs des utilisateurs')
    window.document.title = 'Logs des utilisateurs'
    localStorage.setItem('page', 'Logs des utilisateurs')

    const [Logs, setLogs] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [LogsPerPage] = useState(5)

    // Simulation des Logs
    useEffect(() => {
        axios
            .get(`${getUrlApi()}/log-users/`)
            .then(data => {
                setLogs(data.data.data)
                // console.log(data.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // console.log(Logs)

    // Filtrer les Logs en fonction de la recherche logs
    const filteredLogs = Logs.filter(
        logs =>
            logs?.logs?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
            logs?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    // Pagination
    const indexOfLastNotification = currentPage * LogsPerPage
    const indexOfFirstNotification = indexOfLastNotification - LogsPerPage
    const currentLogs = filteredLogs?.slice(
        indexOfFirstNotification,
        indexOfLastNotification
    )

    // Changer de page
    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1)
    }

    const isFirstPage = currentPage === 1
    const isLastPage = indexOfLastNotification >= filteredLogs.length

    // Changer de page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    console.log(currentLogs)
    return (
        <ContentAdmin>
            <div className='container mx-auto p-4'>
                <div className='mb-4 flex items-center'>
                    <input
                        type='text'
                        placeholder='Rechercher...'
                        className='flex-grow border border-gray-300 rounded-md py-2 px-4 focus:outline-none'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <table className='w-full table-fixed'>
                    <thead>
                        <tr className='border-b border-gray-400'>
                            <th className='w-1/4 px-4 py-2 text-left'>
                                heure & Date
                            </th>
                            <th className='w-3/4 px-4 py-2 text-left'>Logs</th>
                            <th className='w-1/4 px-4 py-2 text-left'>
                                Utilisateur
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLogs.map(log => (
                            <tr key={log.id} className='hover:bg-slate-50'>
                                <td className='px-4 py-2 text-base font-bold'>
                                    {log.created_at}
                                </td>
                                <td className='px-4 py-2'>{log.logs}</td>
                                <td className='px-4 py-2 flex items-center'>
                                    {log.name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='mt-4 flex justify-between '>
                    <button
                        className={`px-2 py-1 rounded-md focus:outline-none ${
                            isFirstPage
                                ? 'bg-gray-200 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        disabled={isFirstPage}
                        onClick={prevPage}
                    >
                        Précédent
                    </button>

                    <div className='mt-4'>
                        <nav className='flex justify-center'>
                            <ul className='flex items-center'>
                                {Array.from(
                                    {
                                        length: Math.ceil(
                                            filteredLogs.length / LogsPerPage
                                        )
                                    },
                                    (_, index) => (
                                        <li key={index}>
                                            <button
                                                className={`px-3 py-1 focus:outline-none mx-1 rounded-full ${
                                                    currentPage === index + 1
                                                        ? 'bg-green-300'
                                                        : 'bg-green-100'
                                                }`}
                                                onClick={() =>
                                                    paginate(index + 1)
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

                    <button
                        className={`px-2 py-1 rounded-md focus:outline-none ${
                            isLastPage
                                ? 'bg-blue-300 cursor-not-allowed'
                                : 'bg-blue-800 hover:bg-blue-400'
                        }`}
                        disabled={isLastPage}
                        onClick={nextPage}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </ContentAdmin>
    )
}

export default LogsUsers
