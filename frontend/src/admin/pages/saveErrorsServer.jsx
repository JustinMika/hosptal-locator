import axios from 'axios'
import ContentAdmin from '../components/partials/ContentAdmin'
import getUrlApi from '../utils/getUrlApi'
import { useEffect, useState } from 'react'

const SaveErrorsServer = () => {
    axios.defaults.withCredentials = true
    localStorage.setItem('page', 'Erreur du serveur')
    window.document.title = 'Erreur du serveur'
    localStorage.setItem('page', 'Erreur du serveur')

    const [erreurserveur, setErreurServeur] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [erreurserveursPerPage] = useState(5)

    // Simulation des erreurserveur
    useEffect(() => {
        axios
            .get(`${getUrlApi()}/get-errors-server/`)
            .then(data => {
                setErreurServeur(data.data.data)
                console.log(data.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // Filtrer les erreurserveur en fonction de la recherche
    const filteredErreurServeur = erreurserveur.filter(
        erreurserveur =>
            erreurserveur?.erreurserveur
                ?.toLowerCase()
                .includes(searchQuery?.toLowerCase()) ||
            erreurserveur?.erreurs
                ?.toLowerCase()
                .includes(searchQuery?.toLowerCase())
    )

    // Pagination
    const indexOfLastErreurServeur = currentPage * erreurserveursPerPage
    const indexOfFirstErreurServeur =
        indexOfLastErreurServeur - erreurserveursPerPage
    const currentErreurServeur = filteredErreurServeur.slice(
        indexOfFirstErreurServeur,
        indexOfLastErreurServeur
    )

    // Changer de page
    const nextPage = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }

    const prevPage = () => {
        setCurrentPage(prevPage => prevPage - 1)
    }

    const isFirstPage = currentPage === 1
    const isLastPage = indexOfLastErreurServeur >= filteredErreurServeur.length

    const markAsRead = id => {
        const updatedErreurServeur = erreurserveur.map(erreurserveur =>
            erreurserveur.id === id
                ? { ...erreurserveur, isReaded: true }
                : erreurserveur
        )
        setErreurServeur(updatedErreurServeur)
    }

    // Changer de page
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const deleteErreurServeur = id => {
        const updatedErreurServeur = erreurserveur.filter(
            erreurserveur => erreurserveur.id !== id
        )
        setErreurServeur(updatedErreurServeur)
    }
    return (
        <ContentAdmin>
            <div className='container mx-auto p-4 bg-white rounded-md shadow-sm'>
                <h1 className='text-2xl font-bold mb-4'>ErreurServeur</h1>
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
                            <th className='w-1/5- px-4 py-2 text-left'>Date</th>
                            <th className='w-3/4- px-4 py-2 text-left'>
                                ErreurServeur
                            </th>
                            <th className='w-1/5- px-4 py-2 text-left'>
                                script
                            </th>
                            <th className='w-1/4- px-4 py-2 text-left'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentErreurServeur &&
                            currentErreurServeur.map(erreurserveur => (
                                <tr
                                    key={erreurserveur.id}
                                    className={
                                        erreurserveur.isReaded
                                            ? 'bg-gray-200'
                                            : 'border-b border-gray-400'
                                    }
                                >
                                    <td className='px-4 py-2 text-base font-bold'>
                                        {new Date(
                                            erreurserveur.created_at
                                        ).toLocaleString()}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {erreurserveur.erreurs}
                                    </td>
                                    <td className='px-4 py-2'>
                                        {erreurserveur.scripts}
                                    </td>
                                    <td className='px-4 py-2 flex items-center'>
                                        {!erreurserveur.isReaded && (
                                            <button
                                                className='mr-2 text-green-500'
                                                onClick={() =>
                                                    markAsRead(erreurserveur.id)
                                                }
                                            >
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    fill='none'
                                                    viewBox='0 0 24 24'
                                                    stroke='currentColor'
                                                    className='h-5 w-5'
                                                >
                                                    <path
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                        strokeWidth='2'
                                                        d='M5 13l4 4L19 7'
                                                    />
                                                </svg>
                                            </button>
                                        )}
                                        <button
                                            className='text-red-500'
                                            onClick={() =>
                                                deleteErreurServeur(
                                                    erreurserveur.id
                                                )
                                            }
                                        >
                                            <svg
                                                xmlns='http://www.w3.org/2000/svg'
                                                fill='none'
                                                viewBox='0 0 24 24'
                                                stroke='currentColor'
                                                className='h-5 w-5'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth='2'
                                                    d='M6 18L18 6M6 6l12 12'
                                                />
                                            </svg>
                                        </button>
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
                                            filteredErreurServeur.length /
                                                erreurserveursPerPage
                                        )
                                    },
                                    (_, index) => (
                                        <li key={index}>
                                            <button
                                                className={`px-3 py-1 focus:outline-none mx-1 rounded-full ${
                                                    currentPage === index + 1
                                                        ? 'bg-gray-300'
                                                        : 'bg-gray-100'
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
                                ? 'bg-gray-200 cursor-not-allowed'
                                : 'bg-gray-200 hover:bg-gray-300'
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

export default SaveErrorsServer
