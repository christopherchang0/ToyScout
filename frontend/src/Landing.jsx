import heroImg from './assets/action figure.webp'

const S = {
  page: { minHeight: '100vh', display: 'flex', flexDirection: 'column' },
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 32px'
  },
  navLogo: { fontWeight: 600, fontSize: '18px', color: 'var(--nav-color)', margin: 0 },
  navLinks: { display: 'flex', gap: '16px', alignItems: 'center' },
  navFab: {
    width: '34px', height: '34px', borderRadius: '999px', border: 'none',
    background: 'var(--accent)', cursor: 'pointer', fontSize: '20px', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)'
  },
  navProfile: {
    width: '34px', height: '34px', borderRadius: '999px', border: '1px solid var(--nav-border)',
    background: 'transparent', cursor: 'pointer', fontSize: '13px', color: 'var(--nav-color)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sans)'
  },
  hero: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', padding: '80px 32px 48px', textAlign: 'center'
  },
  title: { fontSize: '60px', fontWeight: 700, color: 'var(--text-h)', margin: '0 0 36px', letterSpacing: '-2px' },
  tagline: { fontSize: '18px', color: 'var(--text)', whiteSpace: 'nowrap', margin: '0 auto 40px', lineHeight: '1.6', textAlign: 'center' },
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
    display: 'flex', alignItems: 'stretch', gap: '48px',
    padding: '40px 32px', borderTop: '1px solid var(--border)', textAlign: 'left',
    minHeight: '420px'
  },
  whatWeDoText: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  whatWeDoHeading: { margin: '0 0 10px', color: 'var(--text-h)', fontSize: '28px', fontWeight: 600 },
  whatWeDoDesc: { color: 'var(--text)', lineHeight: '1.6', fontSize: '18px' },
  heroImg: {
    width: '400px', alignSelf: 'stretch', objectFit: 'cover',
    borderRadius: '12px', border: '1px solid var(--border)', flexShrink: 0, minHeight: '380px'
  }
}

export default function Landing({ onGetStarted, dark, onToggleTheme }) {
  return (
    <div style={S.page}>
      <style>{`
        .nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
          color: var(--nav-color);
          font-family: var(--sans);
          padding: 4px 2px;
          transition: transform 0.15s ease, text-shadow 0.15s ease;
        }
        .nav-link:hover {
          transform: scale(1.1);
          text-shadow: 0 0 12px rgba(37, 99, 235, 0.7);
        }
      `}</style>

      <nav style={S.nav}>
        <p style={S.navLogo}>ToyScout</p>
        <div style={S.navLinks}>
          <button className="nav-link" onClick={onGetStarted}>Discover</button>
          <button className="nav-link" onClick={onGetStarted}>History</button>
          <button style={S.navFab} onClick={onGetStarted}>+</button>
          <button style={S.navProfile} onClick={onToggleTheme}>{dark ? '☀️' : '🌙'}</button>
          <button style={S.navProfile} onClick={onGetStarted}>P</button>
        </div>
      </nav>

      <div style={S.hero}>
        <h1 style={S.title}>ToyScout</h1>
        <p style={S.tagline}>
          Identify, value, and track your toy collection with AI-powered vision
        </p>
        <div style={S.ctaGroup}>
          <button style={S.primaryBtn} onClick={onGetStarted}>Create Account</button>
          <button style={S.secondaryBtn} onClick={onGetStarted}>Begin Scanning</button>
        </div>
      </div>

      <div style={S.whatWeDo}>
        <img src={heroImg} alt="ToyScout demo" style={S.heroImg} />
        <div style={S.whatWeDoText}>
          <h2 style={S.whatWeDoHeading}>What is ToyScout?</h2>
          <p style={S.whatWeDoDesc}>
            ToyScout uses AI vision to instantly identify toys from photos, returning
            name, brand, year, condition, and estimated resale value. Build your collection
            history and track market prices over time. Whether you're a casual collector
            or a serious reseller, ToyScout gives you the information you need at a glance.
            Just snap a photo and we figure out the rest.
          </p>
        </div>
      </div>
    </div>
  )
}
