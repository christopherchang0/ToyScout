import heroImg from './assets/action figure.webp'

const S = {
  page: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 32px', borderBottom: '1px solid var(--border)'
  },
  navLogo: { fontWeight: 600, fontSize: '18px', color: 'var(--text-h)', margin: 0 },
  navLinks: { display: 'flex', gap: '8px', alignItems: 'center' },
  navPill: {
    padding: '6px 18px', borderRadius: '999px', border: '1px solid var(--border)',
    background: 'transparent', cursor: 'pointer', fontSize: '14px', color: 'var(--text-h)',
    fontFamily: 'var(--sans)'
  },
  navFab: {
    width: '34px', height: '34px', borderRadius: '999px', border: 'none',
    background: 'var(--accent)', cursor: 'pointer', fontSize: '20px', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)'
  },
  navProfile: {
    width: '34px', height: '34px', borderRadius: '999px', border: '1px solid var(--border)',
    background: 'var(--code-bg)', cursor: 'pointer', fontSize: '13px', color: 'var(--text-h)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)'
  },
  hero: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '80px 32px 48px', textAlign: 'center'
  },
  title: { fontSize: '60px', fontWeight: 700, color: 'var(--text-h)', margin: '0 0 16px', letterSpacing: '-2px' },
  tagline: { fontSize: '18px', color: 'var(--text)', maxWidth: '460px', margin: '0 auto 40px', lineHeight: '1.5' },
  ctaGroup: { display: 'flex', gap: '12px', justifyContent: 'center' },
  primaryBtn: {
    padding: '12px 28px', background: 'var(--accent)', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: 500,
    fontFamily: 'var(--sans)'
  },
  secondaryBtn: {
    padding: '12px 28px', background: 'transparent', color: 'var(--text-h)',
    border: '1px solid var(--border)', borderRadius: '8px', fontSize: '15px', cursor: 'pointer', fontWeight: 500,
    fontFamily: 'var(--sans)'
  },
  whatWeDo: {
    display: 'flex', alignItems: 'center', gap: '48px',
    padding: '40px 32px', borderTop: '1px solid var(--border)', textAlign: 'left'
  },
  whatWeDoText: { flex: 1 },
  whatWeDoHeading: { margin: '0 0 10px', color: 'var(--text-h)', fontSize: '22px', fontWeight: 500 },
  whatWeDoDesc: { color: 'var(--text)', lineHeight: '1.6', fontSize: '16px' },
  heroImg: {
    width: '220px', height: '160px', objectFit: 'cover',
    borderRadius: '12px', border: '1px solid var(--border)', flexShrink: 0
  }
}

export default function Landing({ onGetStarted, dark, onToggleTheme }) {
  return (
    <div style={S.page}>
      <nav style={S.nav}>
        <p style={S.navLogo}>ToyScout</p>
        <div style={S.navLinks}>
          <button style={S.navPill} onClick={onGetStarted}>Discover</button>
          <button style={S.navPill} onClick={onGetStarted}>History</button>
          <button style={S.navFab} onClick={onGetStarted}>+</button>
          <button style={S.navProfile} onClick={onToggleTheme}>{dark ? '☀️' : '🌙'}</button>
          <button style={S.navProfile} onClick={onGetStarted}>P</button>
        </div>
      </nav>

      <div style={S.hero}>
        <h1 style={S.title}>Toyscout</h1>
        <p style={S.tagline}>
          Identify, value, and track your toy collection with AI-powered vision
        </p>
        <div style={S.ctaGroup}>
          <button style={S.primaryBtn} onClick={onGetStarted}>Create Account</button>
          <button style={S.secondaryBtn} onClick={onGetStarted}>Begin Scanning</button>
        </div>
      </div>

      <div style={S.whatWeDo}>
        <div style={S.whatWeDoText}>
          <h2 style={S.whatWeDoHeading}>What we do:</h2>
          <p style={S.whatWeDoDesc}>
            ToyScout uses AI vision to instantly identify toys from photos — returning
            name, brand, year, condition, and estimated resale value. Build your collection
            history and track market prices over time.
          </p>
        </div>
        <img src={heroImg} alt="ToyScout demo" style={S.heroImg} />
      </div>
    </div>
  )
}
