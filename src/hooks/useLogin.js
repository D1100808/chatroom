import { useEffect, useState } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCancelled, setIsCancelled]=useState(false)
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(false)
    const {dispatch}=useAuthContext()

    const login = async (email, password) => {
        setIsPending(true)
        setError(null)

        try {
            const res = await projectAuth.signInWithEmailAndPassword(
              email,
              password
            );

            dispatch({type:'LOGIN', payload:res.user})

            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);                
            }

        }
    }

    useEffect(() => {
        setIsCancelled(false)
        return ()=>setIsCancelled(true)
    },[])

    return {login, isPending, error}
}