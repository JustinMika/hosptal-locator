/* eslint-disable no-unsafe-optional-chaining */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AsideDashboard from '../../../components/site/AsideDashboard'
import ContentDashBoardUser from '../../../components/site/ContentDashBoardUser'
import Header from '../../../components/site/Header'
import getMainUrlApi from '../../../utils/getMainUrlApi'
import saveVisite from '../../../utils/saveVisitors'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    removeData,
    setErreur,
    setIsConnected,
    setToken,
    setUuid,
    setuserData
} from '../../../redux/site/pharmaciens/loginSlice'

const Medicaments = () => {
    window.location.title = 'Gestion des Medicaments'
    const navigate = useNavigate()

    // \\\\\\\\\\\\\\\\\\ Verification login ///////////////////////
    const selector = useSelector(state => state.login)
    const dispatch = useDispatch()
    // Stockez le jeton dans les en-têtes pour les futures requêtes
    axios.defaults.headers.common['Authorization'] = `Bearer ${selector.token}`

    const { uuid } = useParams()
    if (uuid !== selector.uuid) {
        dispatch(removeData())
        dispatch(setErreur('Une erreur est survenue; reessayer.'))
        dispatch(setIsConnected(false))
        navigate('/login')
    }
    const [isUserConnected, setIsUserConnected] = useState(false)
    useEffect(() => {
        async function fetchProtectedData() {
            try {
                axios
                    .get(`${getMainUrlApi()}/api/v1/pharmaciens/check-login`, {
                        withCredentials: true
                    })
                    .then(e => {
                        if (e.status != 200) {
                            dispatch(removeData())
                            dispatch(
                                setErreur('Une erreur est survenue; reessayer.')
                            )
                            dispatch(setIsConnected(false))
                            navigate('/login')
                        }
                        setIsUserConnected(selector?.isConnected)
                        const { token } = e?.data?.data
                        const user = e?.data?.res
                        dispatch(setToken(token))
                        dispatch(setUuid(user.uuid))
                        dispatch(setuserData(user))

                        const { Authorization } = e.config.headers
                        if (Authorization) {
                            if (token === Authorization.split(' ')[1]) {
                                /* empty */
                            } else {
                                dispatch(removeData())
                                dispatch(
                                    setErreur(
                                        'Une erreur est survenue; reessayer.'
                                    )
                                )
                                dispatch(setIsConnected(false))
                                navigate('/login')
                            }
                        }
                        if (
                            localStorage.getItem('isUserConnected') === false &&
                            selector.isConnected === false
                        ) {
                            dispatch(removeData())
                            dispatch(
                                setErreur('Une erreur est survenue; reessayer.')
                            )
                            dispatch(setIsConnected(false))
                            navigate('/login')
                        }
                    })
            } catch (error) {
                setIsUserConnected(false)
            }
        }
        fetchProtectedData()
    }, [
        dispatch,
        isUserConnected,
        navigate,
        selector.isConnected,
        selector.uuid
    ])
    // \\\\\\\\\\\\\\\\\\\\\\ FIN VERIFICATION \\\\\\\\\\\\\\\\\\\\\

    const [medicaments, setMedicaments] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [medicamentsPerPage] = useState(12)
    const [users, setusers] = useState([])

    useEffect(() => {
        setusers(selector?.user)
    }, [selector?.user])

    // Charger la liste de médicaments depuis l'API.
    useEffect(() => {
        async function getAllMedocs() {
            const id = users?.id ?? 0
            const data = {
                id_my_id: id
            }
            const id_my_id = id
            axios
                .get(
                    `${getMainUrlApi()}/api/v1/pharmaciens/medicaments/${id_my_id}`,
                    { data },
                    {
                        withCredentials: true
                    }
                )
                .then(res => {
                    setMedicaments(res.data.data)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
        getAllMedocs()
    }, [users])
    // Filtrer les médicaments en fonction de la recherche
    const filteredMedicaments = medicaments?.filter(medicament =>
        medicament.medicament.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Pagination
    const indexOfLastMedicament = currentPage * medicamentsPerPage
    const indexOfFirstMedicament = indexOfLastMedicament - medicamentsPerPage
    const currentMedicaments = filteredMedicaments.slice(
        indexOfFirstMedicament,
        indexOfLastMedicament
    )
    const paginate = pageNumber => setCurrentPage(pageNumber)

    // supprimer les medicaments dans le stock
    const handleSearch = (id) => {
        const filtered = medicaments.filter(
            medicaments =>
                medicaments.id != id
        )
        const data = {
            id_my_id: id
        }
        const id_my_id = id
        axios
            .delete(
                `${getMainUrlApi()}/api/v1/pharmaciens/medicaments/${id_my_id}`,
                { data },
                {
                    withCredentials: true
                }
            )
            .then(() => {
                toast.info(`🫡 suppression reussi`, {
                    position: 'top-center',
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                })
            })
            .catch(() => {
            })
        setMedicaments(filtered)
    }

    const formatUrl = url => {
        return url.replace(/\/\./g, '')
    }

    localStorage.setItem('isPharmacien', true)
    useEffect(() => {
        return () => {
            saveVisite(window.document.title)
        }
    }, [])

    const handleAddMedocs = () => {
        let url = `/user/medicaments/add/${users?.uuid ?? ''}`
        navigate(url)
    }
    return (
        <>
            <Header
                isUserConnected={isUserConnected}
                setIsUserConnected={setIsUserConnected}
            />
            <ToastContainer />
            <AsideDashboard />
            <ContentDashBoardUser>
                <div className='mb-1 flex justify-between items-center border-b border-gray-400 py-2 shadow-sm'>
                    <p className='text-[#039875] font-bold'>Mes medicaments</p>
                    <button
                        className='px-2 py-1 rounded-md shadow-md bg-[#039875] hover:bg-[#05b68d] hover:shadow-lg text-white'
                        onClick={handleAddMedocs}
                    >
                        <span>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-6 h-6 md:hidden'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M12 4.5v15m7.5-7.5h-15'
                                />
                            </svg>
                            <span className='hidden md:block'>
                                Ajouter un nouveau médicament
                            </span>
                        </span>
                    </button>
                </div>

                <div className='container mx-auto p-4'>
                    {/* Barre de recherche */}
                    <input
                        type='text'
                        placeholder='Rechercher un médicament'
                        className='w-full px-4 py-2 mb-4 rounded-lg shadow focus:outline-none focus:ring focus:border-blue-300'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />

                    {/* Liste des médicaments */}
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {currentMedicaments.map(medicament => (
                            <div
                                key={medicament.id}
                                className='bg-white rounded-xs shadow p-0 hover:shadow-md border hover:border-1 hover:border-gray-300'
                            >
                                <img
                                    src={formatUrl(
                                        `${getMainUrlApi()}/${medicament.photo_medicament
                                        }`
                                    )}
                                    alt={medicament.medocs}
                                    className='w-full h-32 object-cover mb-4'
                                />
                                <div className='px-1 py-0.5'>
                                    <h3 className='text-lg font-semibold mb-2 flex justify-between px-1'>
                                        <a href={`/user/medicaments/detail/${medicament.id}/${users?.uuid ?? ''}`} className='hover:text-blue-500'>{medicament.medicament}</a>
                                        <button title={`supprimer : ${medicament.medicament}`} onClick={() => {
                                            handleSearch(medicament?.id)
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-red-400 hover:text-red-600 hover:font-extrabold">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                            </svg>

                                        </button>
                                    </h3>
                                    <p className='text-gray-600 flex justify-between px-1'>
                                        <span>qte:{medicament?.quantite}</span> {' '}
                                        <span>{medicament?.price}{medicament?.devise}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className='mt-4 flex justify-center items-center'>
                        {Array.from({
                            length: Math.ceil(
                                filteredMedicaments.length / medicamentsPerPage
                            )
                        }).map((_, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1 rounded-lg mx-1 ${currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-300 text-gray-700'
                                    }`}
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </ContentDashBoardUser>
        </>
    )
}

export default Medicaments
