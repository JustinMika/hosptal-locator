import Footer from './Footer'

// eslint-disable-next-line react/prop-types
const ContentDashBoardUser = ({ children }) => {
    return (
        <>
            <div className='p-4 sm:ml-64'>
                <div className='p-4 border- rounded dark:border-gray-700 mt-20'>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    )
}

export default ContentDashBoardUser
