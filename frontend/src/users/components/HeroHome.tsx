import LogoPharmacie from '../../images/1000pharma/LogoPharmacie.png'
import saveVisite from '../../utils/saveVisitors'

const HeroHome = props => {
    // eslint-disable-next-line react/prop-types
    const { openWhatsAppChat } = props
    saveVisite(window.document.title)
    return (
        <section className='md:bg-white flex justify-center items-cente sm:items-center sm:flex-wrap sm:flex-col'>
            <div className='absolute top left-0 right-0 h-80 bg-gradient-to-br from-[#95d8c8] to-slate-50 blur-md opacity-10 shadow-slate-50 shadow-2xl' />
            <div className='w-11/12 mt-5  justify-between md:flex items-center mx-auto md:w-3/4 sm:full sm:mx-10 xs:mx-10'>
                <div className='gap-2 space-y-5'>
                    <p className='text-left z-10 text-[#039875] uppercase font-extrabold text-2xl'>
                        1000 pharma
                    </p>
                    <p className='my-5 text-xl sm:text-base'>
                        Votre Santé, est notre priorité.
                        <br />
                        Trouvez Rapidement votre Médicaments, avec ou, sans
                        Ordonnance médical. Conseil et Orientations
                        Pharmaceutique c&apos; est gratuit. Disponible partout, 24h/24
                        et 7jrs/7.
                    </p>
                    <div className='flex justify-center md:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-4'>
                        <button
                            onClick={openWhatsAppChat}
                            className='z-50 inline-flex justify-center items-center py-3 px-7 text-base font-medium text-center text-white rounded-full bg-[#039875] hover:bg-[#048164] focus:ring-4 focus:ring-[#048164] dark:focus:ring-[#048164] shadow-sm hover:shadow-md first-letter:uppercase'
                        >
                            Services
                        </button>
                    </div>
                </div>
                <img src={LogoPharmacie} />
            </div>
        </section>
    )
}

export default HeroHome
