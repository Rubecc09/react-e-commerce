const KiwiLogo = () => (
  <svg width="44" height="44" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="21" cy="21" r="21" fill="#eaf3de"/>
    <circle cx="21" cy="21" r="17" fill="#97C459"/>
    <circle cx="21" cy="21" r="10" fill="#c0dd97"/>
    <circle cx="21" cy="21" r="4" fill="#27500A"/>
    <line x1="21" y1="4" x2="21" y2="38" stroke="#27500A" strokeWidth="1" strokeOpacity="0.25"/>
    <line x1="4" y1="21" x2="38" y2="21" stroke="#27500A" strokeWidth="1" strokeOpacity="0.25"/>
    <line x1="8" y1="9" x2="34" y2="33" stroke="#27500A" strokeWidth="1" strokeOpacity="0.25"/>
    <line x1="34" y1="9" x2="8" y2="33" stroke="#27500A" strokeWidth="1" strokeOpacity="0.25"/>
  </svg>
);

const Header = () => {
  return (
    <header className="site-hero p-3">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <KiwiLogo />
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ margin: 0, color: '#27500A', fontSize: '1.8rem' }}>Kiwi</h1>
          <p style={{ margin: 0, color: '#3B6D11', fontSize: '0.85rem', letterSpacing: '0.5px' }}>
            Find the best products here!
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;