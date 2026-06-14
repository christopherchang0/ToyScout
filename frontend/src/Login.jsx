import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import heroImg from './assets/toy.avif'

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
)

const S = {
  page: {
    position: 'fixed', inset: 0, display: 'flex', alignItems: 'stretch', overflow: 'hidden',
    background: 'var(--bg)'
  },
  left: {
    width: '650px', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center',
    padding: '60px 80px',
  },
  formInner: {
    display: 'flex', flexDirection: 'column'
  },
  heading: { margin: '0 0 10px', color: 'var(--text-h)', fontSize: '36px', fontWeight: 700, textAlign: 'left' },
  subheading: { margin: '0 0 36px', color: 'var(--text)', fontSize: '17px', textAlign: 'left' },
  field: {
    width: '100%', padding: '16px 18px', border: '1px solid var(--border)',
    borderRadius: '10px', fontSize: '17px', fontFamily: 'var(--sans)',
    background: 'var(--bg)', color: 'var(--text-h)', boxSizing: 'border-box', marginBottom: '14px'
  },
  submitBtn: {
    width: '100%', padding: '16px', background: 'var(--accent)', color: '#fff',
    border: 'none', borderRadius: '10px', fontSize: '17px', cursor: 'pointer',
    fontWeight: 600, fontFamily: 'var(--sans)', marginTop: '4px'
  },
  toggleBtn: {
    background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer',
    fontSize: '15px', marginTop: '18px', padding: 0, fontFamily: 'var(--sans)'
  },
  error: { color: '#dc2626', fontSize: '14px', margin: '8px 0 0', textAlign: 'left' },
  right: {
    flex: 1, position: 'relative', minHeight: '100vh'
  },
  rightImg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block'
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
                <div style={S.formInner}>
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
            </div>
            <div style={S.right}>
                <img src={heroImg} alt="ToyScout" style={S.rightImg} />
            </div>
        </div>
    )
}
