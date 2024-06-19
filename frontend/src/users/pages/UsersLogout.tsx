import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ContentDashBoardUser from '../../../components/site/ContentDashBoardUser'
import getMainUrlApi from '../../../utils/getMainUrlApi'
import saveVisite from '../../../utils/saveVisitors'
import {
    removeData,
    setErreur
} from '../../../redux/site/pharmaciens/loginSlice'
import { useDispatch } from 'react-redux'

const UsersLogout = () => {
    window.location.title = 'Logout'
    const navigate = useNavigate()
    const dispatch = useDispatch()

    try {
        axios
            .get(`${getMainUrlApi()}/api/v1/pharmaciens/logout/`, {
                withCredentials: true
            })
            .then(() => {
                // localStorage.removeItem('isPharmacien')
                localStorage.removeItem('isUserConnected')
                localStorage.removeItem('persist:1000pharmaSlice')
                dispatch(removeData())
                dispatch(setErreur('Session expired'))
            })
    } catch (error) {
        // localStorage.removeItem('isPharmacien')
        localStorage.removeItem('isUserConnected')
        localStorage.removeItem('persist:1000pharmaSlice')
        dispatch(removeData())
        dispatch(setErreur('Session expired'))
    }

    useEffect(() => {
        if (!localStorage.getItem('isUserConnected')) {
            navigate('/')
        } else {
            navigate('/')
        }
        return () => {
            saveVisite(window.document.title)
            navigate('/')
        }
    }, [navigate])
    navigate('/')
    return (
        <>
            <ContentDashBoardUser>
                <div className='grid grid-cols-3 gap-4 mb-4'>users logout</div>
            </ContentDashBoardUser>
        </>
    )
}

export default UsersLogout
