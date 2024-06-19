import { Avatar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import LOGO_1000PHARMA_PNG from '../../images/1000pharma/LOGO_1000PHARMA_PNG.png'
import { Link } from 'react-router-dom'
import getMainUrlApi from '../../utils/getMainUrlApi'
import { useSelector } from 'react-redux'

const Header = () => {
    const selector = useSelector(state => state.login)

    const [isUserConnected, setisUserConnected] = useState(false)

    const [isMenuOpen, setIsMenuOpen] = useState(true)
    const [isMenuUserOpen, setisMenuUserOpen] = useState(false)

    const [user, setUser] = useState(null)

    useEffect(() => {
        setisUserConnected(selector.isConnected)
        let localS = localStorage.getItem('isUserConnected')
        if (isUserConnected && localS && selector?.isConnected) {
            setisUserConnected(localS)
        }
        setisUserConnected(localS)
        setUser(selector?.user)
    }, [isUserConnected, selector.isConnected, selector?.user])

    const isUserisConnected = localStorage.getItem('isPharmacien')

    const normal = `mx-auto shadow-md border-b border-gray-100 z-[500] bg-white`
    const normaluser = `mx-auto shadow-md border-b border-gray-100 fixed  w-full top-0 right-0 left-0 z-[500] mb-5 bg-white`
    return (
        <div className='w-full z-[500] bg-white'>
            {isUserisConnected === 'true' && (
                <div className={normaluser}>
                    <nav className='mx-auto w-11/12 md:w-4/5 bg-white border-gray-200 dark:bg-gray-900'>
                        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                            <Link to='/' className='flex items-center'>
                                <img
                                    src={LOGO_1000PHARMA_PNG}
                                    className='w-12 h-8- mr-3'
                                    alt='1000pharma logo'
                                />
                            </Link>

                            <div className='flex items-center md:order-2'>
                                {selector?.isConnected && (
                                    <button
                                        type='button'
                                        className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                                        id='user-menu-button'
                                        aria-expanded='true'
                                        data-dropdown-placement='bottom'
                                        onClick={() => {
                                            setisMenuUserOpen(!isMenuUserOpen)
                                        }}
                                    // onBlur={() => {
                                    //     setisMenuUserOpen(!isMenuUserOpen)
                                    // }}
                                    >
                                        <span className='sr-only'>
                                            Open user menu
                                        </span>

                                        {!user?.profil && (
                                            <Avatar
                                                placeholder='JM'
                                                status='online'
                                                rounded
                                                className='border border-gray-500 rounded-full'
                                            />
                                        )}

                                        {user?.profil && (
                                            <img
                                                src={`${getMainUrlApi()}/${user.profil
                                                    }`}
                                                className='w-12 h-12 border border-gray-500 rounded-full'
                                            />
                                        )}
                                    </button>
                                )}

                                {isMenuUserOpen && (
                                    <div
                                        className={`absolute right-20 top-11 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-5`}
                                    >
                                        <div className='px-4 py-3 text-center'>
                                            <span className='block text-sm text-gray-900 dark:text-white'>
                                                {user?.name ?? 'username'}
                                            </span>
                                            <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                                                {user?.email ??
                                                    'username@yourdomaine.com'}
                                            </span>
                                        </div>
                                        <ul
                                            className='py-2'
                                            aria-labelledby='user-menu-button'
                                        >
                                            <li>
                                                <Link
                                                    to={`/user/dashboard/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    to={`/user/profil/${user?.uuid}`}
                                                    className='flex items-center py-2 px-1 text-gray-700 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                                >
                                                    <span className='flex-1 ml-3 whitespace-nowrap'>
                                                        Profil
                                                    </span>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link
                                                    to={`/user/logout/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Sign out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                                <button
                                    data-collapse-toggle='navbar-user'
                                    type='button'
                                    className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                                    aria-controls='navbar-user'
                                    aria-expanded='false'
                                    onClick={() => {
                                        setIsMenuOpen(!isMenuOpen)
                                    }}
                                // onBlur={() => {
                                //     setIsMenuOpen(!isMenuOpen)
                                // }}
                                >
                                    <svg
                                        className='w-5 h-5'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 17 14'
                                    >
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M1 1h15M1 7h15M1 13h15'
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div
                                className={`items-center justify-between ${isMenuOpen ? 'hidden' : 'block'
                                    }  w-full md:flex md:w-auto md:order-1`}
                                id='navbar-user'
                            >
                                <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                                    {isUserConnected && (
                                        <div className='md:hidden'>
                                            <li>
                                                <Link
                                                    to={`/user/dashboard/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Médicaments
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/user/messages/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Messages
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/user/profil/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Profil
                                                </Link>
                                            </li>
                                            <hr />
                                        </div>
                                    )}
                                    <li>
                                        <Link
                                            to='/'
                                            className='block py-2 pl-3 pr-4 text-[#039875]  rounded md:bg-transparent md:text-[#039875] md:p-0 md:dark:text-blue-500'
                                            aria-current='page'
                                        >
                                            Accueil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/Services'
                                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#039875] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >
                                            Services
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to='/Contact'
                                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#039875] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/Apropos'
                                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#039875] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >
                                            Apropos
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
            {isUserisConnected === 'false' && (
                <div className={normal}>
                    <nav className='mx-auto w-11/12 md:w-4/5 bg-white border-gray-200 dark:bg-gray-900'>
                        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
                            <Link to='/' className='flex items-center'>
                                <img
                                    src={LOGO_1000PHARMA_PNG}
                                    className='w-12 h-8- mr-3'
                                    alt='1000pharma logo'
                                />
                            </Link>

                            <div className='flex items-center md:order-2'>
                                {selector?.isConnected && (
                                    <button
                                        type='button'
                                        className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
                                        id='user-menu-button'
                                        aria-expanded='true'
                                        data-dropdown-placement='bottom'
                                        onClick={() => {
                                            setisMenuUserOpen(!isMenuUserOpen)
                                        }}
                                    // onBlur={() => {
                                    //     setisMenuUserOpen(!isMenuUserOpen)
                                    // }}
                                    >
                                        <span className='sr-only'>
                                            Open user menu
                                        </span>
                                        {!user?.profil && (
                                            <Avatar
                                                placeholder='JM'
                                                status='online'
                                                rounded
                                                className='border border-gray-500 rounded-full'
                                            />
                                        )}

                                        {user?.profil && (
                                            <img
                                                src={`${getMainUrlApi()}/${user.profil
                                                    }`}
                                                className='w-12 h-12 border border-gray-500 rounded-full'
                                            />
                                        )}
                                    </button>
                                )}

                                {isMenuUserOpen && (
                                    <div
                                        className={`absolute right-20 top-11 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 mt-5'
                            `}
                                    >
                                        <div className='px-4 py-3 text-center'>
                                            <span className='block text-sm text-gray-900 dark:text-white'>
                                                {user?.name ?? 'username'}
                                            </span>
                                            <span className='block text-sm  text-gray-500 truncate dark:text-gray-400'>
                                                {user?.email ??
                                                    'username@yourdomaine.com'}
                                            </span>
                                        </div>
                                        <ul
                                            className='py-2'
                                            aria-labelledby='user-menu-button'
                                        >
                                            <li>
                                                <Link
                                                    to={`/user/dashboard/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/user/profil/${user?.uuid}`}
                                                    className='flex items-center py-2 px-1 text-gray-700 rounded-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
                                                >
                                                    <span className='flex-1 ml-3 whitespace-nowrap'>
                                                        Profil
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/user/logout/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Sign out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}

                                <button
                                    data-collapse-toggle='navbar-user'
                                    type='button'
                                    className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                                    aria-controls='navbar-user'
                                    aria-expanded='false'
                                    onClick={() => {
                                        setIsMenuOpen(!isMenuOpen)
                                    }}
                                // onBlur={() => {
                                //     setIsMenuOpen(!isMenuOpen)
                                // }}
                                >
                                    <svg
                                        className='w-5 h-5'
                                        aria-hidden='true'
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 17 14'
                                    >
                                        <path
                                            stroke='currentColor'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth='2'
                                            d='M1 1h15M1 7h15M1 13h15'
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div
                                className={`items-center justify-between ${isMenuOpen ? 'hidden' : 'block'
                                    }  w-full md:flex md:w-auto md:order-1`}
                                id='navbar-user'
                            >
                                <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                                    {isUserConnected && (
                                        <div className='md:hidden'>
                                            <li>
                                                <Link
                                                    to={`/user/profil/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Médicaments
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/user/profil/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Messages
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to={`/user/profil/${user?.uuid}`}
                                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                                                >
                                                    Profil
                                                </Link>
                                            </li>
                                            <hr />
                                        </div>
                                    )}
                                    <li>
                                        <Link
                                            to='/'
                                            className='block py-2 pl-3 pr-4 text-[#039875]  rounded md:bg-transparent md:text-[#039875] md:p-0 md:dark:text-blue-500'
                                            aria-current='page'
                                        >
                                            Accueil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/Services'
                                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#039875] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >
                                            Services
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            to='/Contact'
                                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#039875] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to='/Apropos'
                                            className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#039875] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                                        >
                                            Apropos
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </div>
    )
}
export default Header
