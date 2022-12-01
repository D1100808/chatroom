import { useEffect, useState } from "react"
import { projectAuth } from "../firebase/config";
import { useAuthContext } from '../hooks/useAuthContext'

export const useLogout = () => {
    const [isCancelled, setIsCancelled]=useState(false)
    const [ isPending, setIsPending ] = useState(false)
    const [ error, setError ] = useState(null);
    const { dispatch } = useAuthContext()
    
    const logout = async () => {
        setIsPending(true)
        setError(false)

        try {
            await projectAuth.signOut();

            dispatch({ type: 'LOGOUT' })
            
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
              setIsPending(false);
              setError(err.message);
            }
        }

    }    

    useEffect(() => {
        setIsCancelled(false)
        return ()=>setIsCancelled(true)
    },[])

    return { logout, isPending, error };
}