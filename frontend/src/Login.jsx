import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import heroImg from './assets/hero.png'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
)

const S = {
  page: {
    minHeight: '100vh', display: 'flex', alignItems: 'stretch'
  },
  left: {
    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '60px 48px', maxWidth: '480px'
  },
  heading: { margin: '0 0 8px', color: 'var(--text-h)', fontSize: '28px', fontWeight: 600, textAlign: 'left' },
  subheading: { margin: '0 0 32px', color: 'var(--text)', fontSize: '15px', textAlign: 'left' },
  field: {
    width: '100%', padding: '12px 14px', border: '1px solid var(--border)',
    borderRadius: '8px', fontSize: '15px', fontFamily: 'var(--sans)',
    background: 'var(--bg)', color: 'var(--text-h)', boxSizing: 'border-box', marginBottom: '12px'
  },
  submitBtn: {
    width: '100%', padding: '12px', background: 'var(--accent)', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer',
    fontWeight: 500, fontFamily: 'var(--sans)', marginTop: '4px'
  },
  toggleBtn: {
    background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer',
    fontSize: '14px', marginTop: '16px', padding: 0, fontFamily: 'var(--sans)'
  },
  error: { color: '#dc2626', fontSize: '14px', margin: '8px 0 0', textAlign: 'left' },
  right: {
    flex: 1, background: 'var(--code-bg)', display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '40px'
  },
  rightImg: {
    width: '100%', maxWidth: '380px', height: '340px', objectFit: 'cover',
    borderRadius: '16px', border: '1px solid var(--border)'
  }
}

export default function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSignUp, setIsSignUp] = useState(false)
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
        <div style={S.page}>
            <div style={S.left}>
                <h2 style={S.heading}>{isSignUp ? 'Create account' : 'Welcome back'}</h2>
                <p style={S.subheading}>{isSignUp ? 'Start identifying your toys' : 'Sign in to continue'}</p>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input
                        style={S.field}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        style={S.field}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button style={S.submitBtn} type="submit">
                        {isSignUp ? 'Create account' : 'Log in'}
                    </button>
                </form>
                {error && <p style={S.error}>{error}</p>}
                <button style={S.toggleBtn} onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
                </button>
            </div>
            <div style={S.right}>
                <img src={heroImg} alt="ToyScout" style={S.rightImg} />
            </div>
        </div>
    )
}
