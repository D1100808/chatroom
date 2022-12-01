import { useEffect, useReducer, useState } from "react"
import { projectFirestore, timestamp } from "../firebase/config"


const initialState = {
    messages: null,
    isPending: false,
    error: null,
    success: null
}

const databaseReducer = (state, action) => {

    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, messages: null, error: null, success:false }
        case 'ADDED_MESSAGE':
            return { isPending: false, messages: action.payload, error: null, success:true}
        case 'ERROR':
            return {isPending:false, messages:action.payload, error:action.payload}
        default:
            return state
    }
}

export const useDatabase = (collection) => {
    const [response, dispatch] = useReducer(databaseReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    const ref = projectFirestore.collection(collection)

    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            console.log('action is', action);
            dispatch(action)
        }
    }
    
    const addMessage = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedMessage = await ref.add({ ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_MESSAGE', payload: addedMessage })
        } catch (err) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
        }
        
    }
        useEffect(() => {
            setIsCancelled(false)
            return ()=>setIsCancelled(true)
        },[])

        return {addMessage, response}
}