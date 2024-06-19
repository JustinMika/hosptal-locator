/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unsafe-optional-chaining */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AsideDashboard from '../../../components/site/AsideDashboard'
import ContentDashBoardUser from '../../../components/site/ContentDashBoardUser'
import Header from '../../../components/site/Header'
import getMainUrlApi from '../../../utils/getMainUrlApi'
import saveVisite from '../../../utils/saveVisitors'
import { useDispatch, useSelector } from 'react-redux'
import {
    removeData,
    setErreur,
    setIsConnected,
    setToken,
    setUuid,
    setuserData
} from '../../../redux/site/pharmaciens/loginSlice'

const UsersProfil = () => {
    window.document.title = 'Profil'
    const [isUserConnected, setIsUserConnected] = useState(false)
    const navigate = useNavigate()
    const [Email, setEmail] = useState(null)
    const [Name, setName] = useState(null)
    const [Phone, setPhone] = useState(null)
    const [user, setuser] = useState(null)
    const [files, setFiles] = useState(null)
    axios.defaults.withCredentials = true

    //  ============================== CHECKINH AUTH USERS     ======================================
    const selector = useSelector(state => state.login)
    const dispatch = useDispatch()
    // Stockez le jeton dans les en-têtes pour les futures requêtes
    axios.defaults.headers.common['Authorization'] = `Bearer ${selector?.token}`

    const { uuid } = useParams()
    if (uuid !== selector?.uuid) {
        dispatch(removeData())
        dispatch(setErreur('Une erreur est survenue; reessayer.'))
        dispatch(setIsConnected(false))
        navigate('/login')
    }

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
                        // dispatch(removeData())
                        setIsUserConnected(selector?.isConnected)
                        const { token } = e?.data?.data
                        const user = e?.data?.res
                        dispatch(setToken(token))
                        dispatch(setUuid(user.uuid))
                        dispatch(setuserData(user))
                        setuser(user)
                        const { Authorization } = e?.config?.headers
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
                            selector?.isConnected === false
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

    const [pwd, setPwd] = useState('')
    const [pwd2, setPwd2] = useState('')
    //  ============================== END CHECKINH AUTH USERS ======================================

    const handleSubmit = e => {
        e.preventDefault()
        const data = {
            name: Name,
            email: Email,
            numero: Phone,
            user_id: user?.id
        }
        axios
            .put(
                `${getMainUrlApi()}/api/v1/pharmaciens/update-user-infos/`,
                data
            )
            .then(data => {
                toast.info(`${data.data.message}🫡`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                })
                dispatch(setuserData(data.data.users))
                // window.location.reload()
            })
            .catch(err => {
                toast.error(`Erreur : ${err?.response?.data?.message}🫡`, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light'
                })
            })
    }

    const handleFileChange = e => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64String = reader.result
            setFiles(base64String)
        }
        reader.readAsDataURL(file)
    }

    const handleSubmitFiles = e => {
        e.preventDefault()
        const data = {
            files: files,
            user_id: user.id
        }
        if (files) {
            axios
                .put(
                    `${getMainUrlApi()}/api/v1/pharmaciens/update-user-profil/`,
                    data
                )
                .then(data => {
                    toast.info(`${data.data.message}🫡`, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    })
                    window.location.reload()
                })
                .catch(err => {
                    toast.error(`Erreur : ${err?.response?.data?.message}🫡`, {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    })
                })
        } else {
            toast.error(`Erreur :🫡 Veuillez selectionner la photo svp!`, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
        }
    }

    useEffect(() => {
        return () => {
            setName(selector.user.name)
            setPhone(selector.user.telephone)
            setEmail(selector.user.email)
        }
    }, [])

    localStorage.setItem('isPharmacien', true)
    useEffect(() => {
        return () => {
            saveVisite(window.document.title)
        }
    }, [])

    // update le  mot de passe
    const handleChangePasswordSubmit = e => {
        e.preventDefault()
        const data = {
            pwd: pwd,
            pwd2: pwd2,
            user_id: user?.id
        }
        // console.log(data)
        if (pwd == pwd2) {
            axios
                .put(
                    `${getMainUrlApi()}/api/v1/pharmaciens/update-user-infos-password/`,
                    data
                )
                .then(data => {
                    toast.info(`${data.data.message}🫡`, {
                        position: 'top-right',
                        autoClose: 9000,
                        hideProgressBar: 0,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    })
                    window.location.reload()
                })
                .catch(err => {
                    toast.error(`Erreur : ${err?.response?.data?.message}🫡`, {
                        position: 'top-right',
                        autoClose: 9000,
                        hideProgressBar: 0,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                    })
                })
        } else {
            toast.error(`le s deux mot de passent ne correspodent pas.`, {
                position: 'top-center',
                autoClose: 9000,
                hideProgressBar: 0,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
            })
        }
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
                <div className='grid grid-cols-5 gap-8'>
                    {/* informations */}
                    <div className='col-span-5 xl:col-span-3'>
                        <div className='rounded-sm border border-stroke bg-white shadow-default shadow-md'>
                            <div className='border-b border-stroke py-4 px-7'>
                                <h3 className='font-medium text-black'>
                                    Personal Information
                                </h3>
                            </div>
                            <div className='p-3'>
                                <form action='#' onSubmit={handleSubmit}>
                                    <div className='mb-3 flex flex-col gap-5 sm:flex-row'>
                                        <div className='w-full sm:w-1/2'>
                                            <label
                                                className='mb-3 block text-sm font-medium text-black'
                                                htmlFor='fullName'
                                            >
                                                Full Name
                                            </label>
                                            <input
                                                className='w-full rounded border border-stroke  py-1 px-2 text-slate-500 focus:border-primary focus-visible:outline-none'
                                                type='text'
                                                name='fullName'
                                                id='fullName'
                                                placeholder='Name'
                                                value={Name ?? '-'}
                                                onChange={e => {
                                                    setName(e.target.value)
                                                }}
                                                required
                                                max={15}
                                            />
                                        </div>

                                        <div className='w-full sm:w-1/2'>
                                            <label
                                                className='mb-3 block text-sm font-medium text-black'
                                                htmlFor='phoneNumber'
                                            >
                                                Phone Number
                                            </label>
                                            <input
                                                className='w-full rounded border border-stroke  py-1 px-2 text-slate-500 focus:border-primary focus-visible:outline-none'
                                                type='text'
                                                name='phoneNumber'
                                                id='phoneNumber'
                                                required
                                                placeholder='Phone'
                                                onChange={e => {
                                                    setPhone(e.target.value)
                                                }}
                                                value={Phone ?? '-'}
                                            />
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <label
                                            className='mb-3 block text-sm font-medium text-black'
                                            htmlFor='emailAddress'
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            className='w-full rounded border border-stroke py-1 px-2 text-slate-500 focus:border-primary focus-visible:outline-none'
                                            type='email'
                                            name='emailAddress'
                                            id='emailAddress'
                                            required
                                            placeholder='E-mail'
                                            onChange={e => {
                                                setEmail(e.target.value)
                                            }}
                                            value={Email ?? '-'}
                                        />
                                    </div>

                                    <div className='mb-3 hidden'>
                                        <label
                                            className='mb-3 block text-sm font-medium text-black'
                                            htmlFor='Username'
                                        >
                                            UUID
                                        </label>
                                        <input
                                            className='w-full rounded border border-stroke  py-1 px-2 text-slate-500 focus:border-primary focus-visible:outline-none'
                                            name='uuid'
                                            id='uuid'
                                            value={selector.user.uuid ?? '-'}
                                            disabled
                                        />
                                    </div>

                                    {/* submit button */}
                                    <div className='flex justify-end gap-2'>
                                        <button
                                            className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1'
                                            type='submit'
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className='flex justify-center rounded bg-sky-600 hover:bg-sky-800 py-2 px-6 font-medium text-white hover:shadow-sm'
                                            type='submit'
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* mot de passe */}
                    <div className='col-span-5 xl:col-span-2 shadow-lg h-fit'>
                        <div className='rounded-sm border border-stroke bg-white shadow-default shadow-md'>
                            <div className='border-b border-stroke px-2 py-4 dark:border-strokedark'>
                                <h3 className='font-medium text-black dark:text-white'>
                                    Gestion de mot de passe
                                </h3>
                            </div>
                            <div className='p-3'>
                                <form
                                    action='#'
                                    onSubmit={handleChangePasswordSubmit}
                                >
                                    <div className='mb-2 flex flex-col gap-5'>
                                        <div className='w-full'>
                                            <label
                                                className='mb-3 block text-sm font-medium text-black dark:text-white'
                                                htmlFor='fullName'
                                            >
                                                Mot de passe
                                            </label>
                                            <div className='w-full'>
                                                <input
                                                    className='w-full rounded border border-stroke bg-gray-50 py-1 px-2 text-black focus:border-primary focus-visible:outline-none'
                                                    type='password'
                                                    name='pwd'
                                                    id='pwd'
                                                    placeholder='Mot de passe'
                                                    value={pwd}
                                                    onChange={e => {
                                                        setPwd(e.target.value)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className='w-full'>
                                            <label
                                                className='mb-3 block text-sm font-medium text-black dark:text-white'
                                                htmlFor='pwd2'
                                            >
                                                Confirmer le mot de passe
                                            </label>
                                            <input
                                                className='w-full rounded border border-stroke bg-gray py-1 px-2 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary'
                                                type='password'
                                                name='pwd2'
                                                id='pwd2'
                                                placeholder='confirmer le mot de passe'
                                                value={pwd2}
                                                onChange={e => {
                                                    setPwd2(e.target.value)
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex justify-end gap-2'>
                                        <button
                                            className='flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white'
                                            type='reset'
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className='flex justify-center rounded bg-sky-600 hover:bg-sky-800 py-2 px-6 font-medium text-white hover:shadow-sm'
                                            type='submit'
                                        >
                                            Changer le mot de passe
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* update photo */}
                    <div className='col-span-5 xl:col-span-2 shadow-lg'>
                        <div className='rounded-sm border border-stroke bg-white shadow-default dark:bg-boxdark'>
                            <div className='border-b border-stroke py-4 px-7'>
                                <h3 className='font-medium text-gray-800'>
                                    Votre photo
                                </h3>
                            </div>
                            <div className='p-7'>
                                <form action='#' onSubmit={handleSubmitFiles}>
                                    <div className='mb-4 flex justify-center items-center gap-5'>
                                        <div className='h-16 w-16 rounded-full flex justify-center items-center'>
                                            {user?.profil && (
                                                <img
                                                    src={`${getMainUrlApi()}/${user?.profil
                                                        }`}
                                                    alt='User'
                                                    className='h-16 w-16 rounded-full border'
                                                />
                                            )}
                                        </div>
                                        <div className='gap-5'>
                                            <span className='mb-1.5 text-black'>
                                                Editer votre photo
                                            </span>
                                            <span className='flex gap-2.5'>
                                                <button className='w-full mt-2 text-sm hover:text-primary bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded-md shadow-md text-white'>
                                                    Update
                                                </button>
                                            </span>
                                        </div>
                                    </div>

                                    <div
                                        id='FileUpload'
                                        className='relative mb-2 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary -50 py-2 px-4 sm:py-7'
                                    >
                                        <input
                                            type='file'
                                            accept='image/*'
                                            className='absolute inset-0 z-10 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none'
                                            onChange={handleFileChange}
                                        />
                                        <div className='flex flex-col items-center justify-center space-y-1'>
                                            <span className='flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:bg-boxdark'>
                                                <svg
                                                    width='16'
                                                    height='16'
                                                    viewBox='0 0 16 16'
                                                    fill='none'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        clipRule='evenodd'
                                                        d='M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z'
                                                        fill='#3C50E0'
                                                    />
                                                    <path
                                                        fillRule='evenodd'
                                                        clipRule='evenodd'
                                                        d='M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z'
                                                        fill='#3C50E0'
                                                    />
                                                    <path
                                                        fillRule='evenodd'
                                                        clipRule='evenodd'
                                                        d='M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z'
                                                        fill='#3C50E0'
                                                    />
                                                </svg>
                                            </span>
                                            <p>
                                                <span className='text-primary'>
                                                    Click to upload
                                                </span>
                                            </p>
                                            <p className='mt-1.5'>
                                                SVG, PNG, JPG or GIF
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </ContentDashBoardUser>
        </>
    )
}

export default UsersProfil
