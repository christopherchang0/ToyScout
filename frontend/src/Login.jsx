import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient (
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
)

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setisSignUp] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const { data, error } = isSignUp
            ? await supabase.auth.signUp({ email, password })
            : await supabase.auth.signInWithPassword({ email, password })
    
        if (error) {
            setError(error.message)
        } else {
            onLogin(data.user)
        }
     }
     return (
        <div>
            <h2>{isSignUp ? 'Sign Up' : 'Log In'}</h2>
            <form onSubmit={handleSubmit}>
                <input type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</button>
            </form>
            {error && <p>{error}</p>}
            <button onClick={() => setisSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
            </button>
        </div>
    )
}