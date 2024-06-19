/* eslint-disable no-unsafe-optional-chaining */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AsideDashboard from '../../../components/site/AsideDashboard'
import ContentDashBoardUser from '../../../components/site/ContentDashBoardUser'
import Header from '../../../components/site/Header'
import getMainUrlApi from '../../../utils/getMainUrlApi'
import saveVisite from '../../../utils/saveVisitors'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import {
    removeData,
    setErreur,
    setIsConnected,
    setToken,
    setUuid,
    setuserData
} from '../../../redux/site/pharmaciens/loginSlice'

const DetailMedocUpdate = () => {
    window.document.title = 'Gestion des Medicaments'
    const navigate = useNavigate()
    // \\\\\\\\\\\\\\\\\\ Verification login ///////////////////////
    const selector = useSelector(state => state.login)
    const dispatch = useDispatch()
    // Stockez le jeton dans les en-têtes pour les futures requêtes
    axios.defaults.headers.common['Authorization'] = `Bearer ${selector.token}`

    const { uuid } = useParams()
    if (uuid !== selector.uuid && !selector.uuid) {
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
                                // console.log(new Date())
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

    // recuperation de l'id du medicament a mettre a jour
    const { medicament } = useParams()

    const [medicament_, setmedicament] = useState('');
    const [quantite, setquantite] = useState('');
    const [price, setprice] = useState('');
    const [devise, setdevise] = useState('');

    // const [file_update, setfile_update] = useState();

    // recuperation du medicament a mettre a jour
    useEffect(() => {
        // async function getAllMedocs() {
        const data = {
            id_my_id: medicament ?? 0
        }
        const id_my_id = medicament
        axios
            .get(
                `${getMainUrlApi()}/api/v1/pharmaciens/medicaments-by-id/${id_my_id}`,
                { data },
                {
                    withCredentials: true
                }
            )
            .then(res => {
                let dt = res?.data?.data[0];
                setmedicament(dt?.medicament ?? '')
                setquantite(dt?.quantite ?? '')
                setprice(dt?.price ?? '')
                setdevise(dt?.devise ?? '')
            })
            .catch(err => {
                console.log(err.response)
            })
        // }
        // return(()=>{
        //     getAllMedocs()
        // })
    })

    // eslint-disable-next-line no-unused-vars
    const [users, setusers] = useState([])

    useEffect(() => {
        setusers(JSON.parse(localStorage.getItem('users')))
    }, [])


    const [file_medicament, setFileMedicament] = useState(null)

    const handleFileChange = e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result
            setFileMedicament(base64String)
        }
        reader.readAsDataURL(file)
    }

    // update medicament
    const handleSubmit = e => {
        e.preventDefault()
        if (medicament_ && quantite && devise) {
            const id = medicament ?? ''
            const data = {
                id: id,
                medicament: medicament_,
                quantite: quantite,
                price: price,
                devise: devise
            }

            axios
                .put(
                    `${getMainUrlApi()}/api/v1/pharmaciens/update-medicaments`,
                    data,
                    {
                        withCredentials: true
                    }
                )
                .then(() => {
                    toast.info(`🫡 mise à jour reussi`, {
                        position: 'top-center',
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    })
                    window.location.reload()
                })
                .catch(err => {
                    toast.error(`Erreur : ${err?.message}`, {
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
        } else {
            toast.error('Veuillez remplir tous les champs...')
        }
    }

    // updte  l_ photo du medic_ment
    const handleSubmitPhoto = e => {
        e.preventDefault()
        if (medicament_ && quantite && devise) {
            const id = medicament ?? ''
            const data = {
                user_id: id,
                files: file_medicament,
            }

            axios
                .put(
                    `${getMainUrlApi()}/api/v1/pharmaciens/update-photo-medicament`,
                    data,
                    {
                        withCredentials: true
                    }
                )
                .then(() => {
                    toast.info(`🫡 insertion reussi`, {
                        position: 'top-center',
                        autoClose: 8000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    })
                    window.location.reload()
                })
                .catch(err => {
                    toast.error(err?.message)
                })
        } else {
            toast.error('Veuillez remplir tous les champs...')
        }
    }

    localStorage.setItem('isPharmacien', true)
    useEffect(() => {
        return () => {
            saveVisite(window.document.title)
        }
    }, [])
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
                    <p className='text-[#039875] font-bold'>
                        Mettre à jour les medicaments
                    </p>
                    <p className='text-[#039875] font-bold'> en stocks</p>
                </div>

                <div className='flex flex-wrap md:flex-nowrap sm:flex-wrap'>
                    <div className='w-full mx-auto p-4'>
                        <form
                            className='space-y-2'
                            action='#'
                            method='post'
                            onSubmit={handleSubmit}
                            encType='multipart/form-data'
                        >
                            <div className='mb-4'>
                                <label
                                    htmlFor='medicament'
                                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Medicament
                                </label>
                                <input
                                    type='text'
                                    name='medicament'
                                    id='medicament'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                    placeholder='Paracetamol'
                                    required
                                    onChange={(e) => {
                                        setmedicament(... e.target.value)
                                    }}
                                    value={medicament_}
                                />
                            </div>
                            <div className='mb-4'>
                                <label
                                    htmlFor='quantite'
                                    className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    Quantite
                                </label>
                                <input
                                    type='number'
                                    name='quantite'
                                    id='quantite'
                                    placeholder='500'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                    required
                                    value={quantite ?? ''}
                                    onChange={(e) => {
                                        setquantite(e.target.value)
                                    }}
                                />
                            </div>

                            <div className='flex w-full'>
                                <div className='mb-4 flex-1'>
                                    <label
                                        htmlFor='quantite'
                                        className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Prix
                                    </label>
                                    <input
                                        type='number'
                                        name='price'
                                        id='price'
                                        placeholder='500'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                        required
                                        value={price ?? ''}
                                        onChange={(e) => {
                                            setprice(e.target.value)
                                        }}
                                    />
                                </div>

                                <div className='mb-4 ml-1'>
                                    <label
                                        htmlFor='quantite'
                                        className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'
                                    >
                                        Devise
                                    </label>
                                    <select
                                        name='devise'
                                        id='devise'
                                        placeholder='500'
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                        required
                                        value={devise ?? ''}
                                        onChange={(e) => {
                                            setdevise(e.target.value)
                                        }}
                                    >
                                        <option value=''>--Devise--</option>
                                        <option value='FC'>FC</option>
                                        <option value='USD'>USD</option>
                                    </select>
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='w-full mt-4 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                onSubmit={handleSubmit}
                            >
                                Mettre à jour
                            </button>
                        </form>
                    </div>

                    <div className='w-full mx-auto p-4 border-t-2 border-gray-500 mt-4'>
                        <p className='text-gray-600 my-3 text-center'>Mettre à jour du photo du medicament</p>
                        <form
                            className='space-y-2'
                            action='#'
                            method='post'
                            onSubmit={handleSubmitPhoto}
                            encType='multipart/form-data'
                        >
                            <div className='mb-2 flex-1'>
                                <label
                                    htmlFor='file_medicament'
                                    className='block mb-1 text-sm font-medium text-gray-900 dark:text-white'
                                >
                                    photo medicament
                                </label>
                                <input
                                    type='file'
                                    name='file_medicament'
                                    id='file_medicament'
                                    accept='.png, .jpg, .gif'
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-0.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                                    required
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full mt-0 text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                                onSubmit={handleSubmitPhoto}
                            >
                                Metttre à jour
                            </button>
                        </form>
                    </div>
                </div>
            </ContentDashBoardUser>
        </>
    )
}

export default DetailMedocUpdate
