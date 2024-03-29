import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import LoaderRing from "../components/LoaderRing"
import { useAuth } from "../context/AuthContext"

const Username = () => {

    const { username, currentUser } = useAuth()
    const usernameRef = useRef()
    const[error, setError] = useState('')
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(true)
        setError('')

        let item = {
            displayName: usernameRef.current.value
        }

        try {   
            await username(currentUser, item)
            setIsLoading(false)
            navigate('/')
        }catch(e){
            setError('Unable to proceed')
            setIsLoading(false)
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <div className="login__container p-4 rounded bg-light">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="mb-4 mt-2">
                        <h3 className="mb-0">Enter Username</h3>
                    </div>
                    {error.length !== 0 && <div className="alert alert-danger mb-3" role="alert">
                        {error}
                    </div>}
                    <div className="mb-3 w-100">
                        <input type="text" className="form-control" id="username" required ref={usernameRef} />
                    </div>
                    <div className="mb-3 w-100">
                        <button type="submit" className="btn btn-submit w-100">{isLoading ? <LoaderRing /> : "Submit"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Username