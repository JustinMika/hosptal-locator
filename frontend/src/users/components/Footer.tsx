import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className='w-11/12 md:w-4/5 mx-auto z-20 p-4  md:p-6'>
            <div className='md:flex-row md:items-center md:justify-between gap-5'>
                <ul className='flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 order-1'>
                    <li>
                        <Link
                            href='tel:+243971623456'
                            className='mr-4 hover:underline md:mr-6'
                        >
                            +243 902 327 832
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='tel:+243891623456'
                            className='mr-4 hover:underline md:mr-6'
                        >
                            +243 979 310 007
                        </Link>
                    </li>
                    <li>
                        <Link
                            href='mailto:1000pharma@gmail.com'
                            className='mr-4 hover:underline md:mr-6'
                        >
                            1000pharma@gmail.com
                        </Link>
                    </li>
                    <li className='mr-2'>
                        <a href='#' className='hover:underline'>
                            <svg
                                className='w-4 h-4 text-gray-800 dark:text-white hover:text-gray-500'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 8 19'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href='#' className='hover:underline'>
                            <svg
                                className='w-4 h-4 text-gray-800 dark:text-white hover:text-gray-500'
                                aria-hidden='true'
                                xmlns='http://www.w3.org/2000/svg'
                                fill='currentColor'
                                viewBox='0 0 20 17'
                            >
                                <path
                                    fillRule='evenodd'
                                    d='M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z'
                                    clipRule='evenodd'
                                />
                            </svg>
                        </a>
                    </li>
                </ul>

                <ul className='md:my-2 flex flex-wrap justify-center items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0'>
                    <li>
                        <Link href='#' className='mr-4 hover:underline md:mr-6'>
                            {`Conditions d'utilisation`}
                        </Link>
                    </li>
                    <li>
                        <Link href='#' className='mr-4 hover:underline md:mr-6'>
                            Politique de confidentialité
                        </Link>
                    </li>
                    <li>
                        <Link href='#' className='mr-4 hover:underline md:mr-6'>
                            Politique de cookies
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='mt-4 flex space-x-6 sm:mt-0 sm:justify-center justify-center items-center text-gray-500'>
                <span className='text-center'>
                    &copy; copyright by 1000 PHARMA
                </span>
            </div>
        </footer>
    )
}

export default Footer
