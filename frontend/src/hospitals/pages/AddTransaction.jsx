import axios from 'axios'
// import getUrlApi from '../../utils/getUrlApi'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import ContentAdmin from '../components/partials/ContentAdmin'
import getUrlApi from '../utils/getUrlApi'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import getUrlSite from '../utils/getUrlSite'

const ValidationSchema = Yup.object().shape({
    medicament: Yup.string().required('Le nom du médicament est requis'),
    montant: Yup.number().required('Le montant est requis'),
    devise: Yup.string().required('La devise est requise'),
    telephone: Yup.string().required('Le numéro de téléphone est requis')
})

const AddTransaction = () => {
    axios.defaults.withCredentials = true
    window.document.title = 'Gestion des Transaction'
    localStorage.setItem('page', 'Gestion des Transaction')
    const [liens, setliens] = useState('')
    const [Copied, setCopied] = useState(false)

    const onCopy = () => {
        console.log('Texte copié dans le presse-papiers')
    }

    const handleSubmit = async (values, { resetForm }) => {
        console.log(values)
        await axios
            .post(`${getUrlApi()}/generate-transaction/`, values)
            .then(response => {
                setliens(response.data.data)
                resetForm()
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <ContentAdmin>
            <div className='container mx-auto p-4'>
                {liens && (
                    <div
                        className='p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 whitespace-pre-line flex items-start justify-center'
                        role='alert'
                    >
                        <p className='font-medium flex-wrap whitespace-pre-line flex-1 mr-1'>
                            <textarea
                                disabled={true}
                                className='w-full rounded-md shadow-sm'
                                value={`${getUrlSite()}${liens}/`}
                            >
                                {`${getUrlSite()}${liens}/`}
                            </textarea>
                        </p>
                        <CopyToClipboard
                            text={`${getUrlSite()}${liens}/`}
                            onCopy={onCopy}
                        >
                            <button
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded focus:outline-none focus:shadow-outline'
                                title='Copier lie lien'
                                onClick={() => {
                                    setCopied(!Copied)
                                }}
                            >
                                {Copied ? (
                                    <svg
                                        className='w-8 h-8'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                        aria-hidden='true'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className='w-8 h-8'
                                        fill='none'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'
                                        aria-hidden='true'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75'
                                        ></path>
                                    </svg>
                                )}
                            </button>
                        </CopyToClipboard>
                    </div>
                )}

                <div className='w-full p-6  rounded-md shadow-md bg-white'>
                    <h2 className='text-2xl font-semibold mb-4 text-gray-600'>
                        Formulaire de Commande
                    </h2>
                    <Formik
                        initialValues={{
                            medicament: '',
                            montant: '',
                            devise: '',
                            telephone: ''
                        }}
                        validationSchema={ValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {/* {({ isSubmitting }) => ( */}
                        <Form>
                            <div className='flex justify-between'>
                                <div className='mb-4 mr-2 w-full'>
                                    <label
                                        htmlFor='medicament'
                                        className='block w-full text-sm font-medium text-gray-700'
                                    >
                                        Nom du médicament
                                    </label>
                                    <Field
                                        type='text'
                                        id='medicament'
                                        name='medicament'
                                        className='mt-1 p-2 w-full border rounded-md'
                                    />
                                    <ErrorMessage
                                        name='medicament'
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                </div>
                                <div className='mb-4 w-full'>
                                    <label
                                        htmlFor='montant'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Montant avec livraison
                                    </label>
                                    <Field
                                        type='number'
                                        id='montant'
                                        name='montant'
                                        className='mt-1 p-2 w-full border rounded-md'
                                    />
                                    <ErrorMessage
                                        name='montant'
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                </div>
                            </div>

                            <div className='flex justify-between mt-4'>
                                <div className='mb-4 mr-2 w-full'>
                                    <label
                                        htmlFor='devise'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Devise
                                    </label>
                                    <Field
                                        as='select'
                                        id='devise'
                                        name='devise'
                                        className='mt-1 p-2 w-full border rounded-md'
                                    >
                                        <option></option>
                                        <option value='CDF'>
                                            Franc Congolais (CDF)
                                        </option>
                                        <option value='USD'>
                                            Dollars Américains (USD)
                                        </option>
                                    </Field>
                                    <ErrorMessage
                                        name='devise'
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                </div>
                                <div className='mb-4 w-full'>
                                    <label
                                        htmlFor='telephone'
                                        className='block text-sm font-medium text-gray-700'
                                    >
                                        Numéro de téléphone
                                    </label>
                                    <Field
                                        type='text'
                                        id='telephone'
                                        name='telephone'
                                        className='mt-1 p-2 w-full border rounded-md'
                                    />
                                    <ErrorMessage
                                        name='telephone'
                                        component='div'
                                        className='text-red-500 text-sm'
                                    />
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full'
                            >
                                Valider
                            </button>
                        </Form>
                        {/* )} */}
                    </Formik>
                </div>
            </div>
        </ContentAdmin>
    )
}

export default AddTransaction
