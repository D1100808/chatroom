import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()
    
    const signup = async (email, password, displayName) => {
        setIsPending(true)
        setError(null)

        try {
            const res = await projectAuth.createUserWithEmailAndPassword(email, password)
            console.log(res.user);
            if (!res) {
                throw new Error('Could not complete signup')
            }
            await res.user.updateProfile({ displayName })

            dispatch({type: 'LOGIN', payload: res.user})
            console.log(res.user);
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        setIsCancelled(false)
        return ()=>setIsCancelled(true)
    }, [])

    return {signup, isPending, error}
}