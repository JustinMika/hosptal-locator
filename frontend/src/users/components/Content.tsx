/* eslint-disable react/prop-types */
import Footer from './Footer'

const Content = ({ children }) => {
    return (
        <div className='w-full h-fit md:h-[85vh] sm:h-screen xs:h-screen -overflow-y-scroll flex justify-between items-center flex-col'>
            {/* my-5 w-full h-full */}
            <div className=''>{children}</div>
            <Footer />
        </div>
    )
}

export default Content
