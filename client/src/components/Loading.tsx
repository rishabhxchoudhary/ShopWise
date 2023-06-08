"use client"
import { RootState } from '../redux/store'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'


const Loading = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state : RootState) => state.loading.value)
    if (loading){
        return <>
        {/* Write Loader Component Here */}
        <div id="loading-screen" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="loader flex items-center justify-center bg-white rounded-full h-16 w-16">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-gray-900"></div>
            </div>
            </div>
        </>
    }
    else{
        return <></>
    }

}

export default Loading