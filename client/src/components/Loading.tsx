import { RootState } from '../redux/store'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Loading = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state : RootState) => state.loading.value)
    if (loading){
        return <>
        {/* Write Loader Component Here */}
        <p className='text-4xl'>Loading....</p>
        </>
    }
    else{
        return <></>
    }

}

export default Loading