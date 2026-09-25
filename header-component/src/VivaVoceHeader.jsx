import React, { useEffect, useId, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { menus, navItems, slug } from './menuData';
import './header.css';

gsap.registerPlugin(useGSAP);

const asset = name => `${import.meta.env.BASE_URL}assets/${name}`;
const defaultHref = (label, section) => section === 'Editorial' ? `/blogs/editorial/${slug(label)}` : `/collections/${slug(label)}`;

function MenuContent({ name, getHref, onNavigate }) {
  const menu = menus[name];
  return <div className={`vv-menu vv-menu--${slug(name)}`}>
    <div className="vv-columns">
      {menu.columns.map(column => <section className="vv-column" key={column.title}>
        <h2>{column.title}</h2>
        <ul>{column.links.map(link => {
          const label = typeof link === 'string' ? link : link.label;
          const avatar = typeof link === 'object' ? link.avatar : null;
          return <li key={label} className={avatar ? 'vv-link-row' : undefined}>
            {avatar && <img className="vv-link-avatar" src={asset(avatar)} alt=""/>}
            <a href={getHref(label, name)} onClick={() => onNavigate?.(label)}>{label}</a>
          </li>;
        })}</ul>
      </section>)}
    </div>
    {menu.cards && <div className="vv-cards">{menu.cards.map(card => <a className="vv-card" key={card.title} href={getHref(card.title, name)} onClick={() => onNavigate?.(card.title)}>
      <div className="vv-card-media"><img src={asset(card.image)} alt={card.title}/>{card.badge && <span className="vv-badge">{card.badge}</span>}</div>
      <span className="vv-card-title"><span>{card.title}</span></span>
    </a>)}</div>}
    {menu.stories && <section className="vv-stories"><h2>Latest Stories</h2><div className="vv-story-list">{menu.stories.map(story => <a className="vv-story" key={story.title} href={getHref(story.title, name)} onClick={() => onNavigate?.(story.title)}>
      <img src={asset(story.image)} alt=""/>
      <div className="vv-story-copy"><span className="vv-story-category">{story.category}</span><h3>{story.title}</h3><span className="vv-story-date">{story.date}</span></div>
    </a>)}</div></section>}
  </div>;
}

/** Supply getHref(label, section) to connect this header to your store's routes. */
export default function VivaVoceHeader({ initialMenu = null, getHref = defaultHref, onNavigate }) {
  const [active, setActive] = useState(initialMenu);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const root = useRef(null);
  const toggle = useRef(null);
  const searchButton = useRef(null);
  const searchInput = useRef(null);
  const tabRefs = useRef({});
  const mobileBodyRefs = useRef({});
  const desktopPanelRefs = useRef({});
  const closeTimer = useRef(null);
  const id = useId();
  const cancelClose = () => clearTimeout(closeTimer.current);
  const closeAll = () => { setActive(null); setMobileOpen(false); setSearchOpen(false); };
  const navigate = label => { closeAll(); onNavigate?.(label); };
  const { contextSafe } = useGSAP({ scope: root });
  const revealLinks = contextSafe(container => {
    const targets = container?.querySelectorAll('.vv-column a, .vv-card-title span');
    if (!targets?.length) return;
    gsap.fromTo(targets, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out' });
  });
  const toggleMobileSection = contextSafe(name => {
    const next = mobileSection === name ? null : name;
    const closing = mobileSection && mobileBodyRefs.current[mobileSection];
    const opening = next && mobileBodyRefs.current[next];
    if (closing && closing !== opening) gsap.to(closing, { height: 0, duration: 0.25, ease: 'power2.inOut' });
    if (opening) {
      gsap.to(opening, { height: 'auto', duration: 0.25, ease: 'power2.inOut' });
      revealLinks(opening);
    }
    setMobileSection(next);
  });

  useEffect(() => { if (active) revealLinks(desktopPanelRefs.current[active]); }, [active]);

  useEffect(() => {
    function outside(event) { if (!root.current?.contains(event.target)) closeAll(); }
    function escape(event) {
      if (event.key !== 'Escape') return;
      if (searchOpen) searchButton.current?.focus();
      else if (mobileOpen) toggle.current?.focus();
      else if (active) tabRefs.current[active]?.focus();
      closeAll();
    }
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [active, mobileOpen, searchOpen]);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const reset = () => {
      closeAll();
      Object.values(mobileBodyRefs.current).forEach(el => el && gsap.set(el, { height: 0 }));
      setMobileSection(null);
    };
    media.addEventListener('change', reset);
    return () => { media.removeEventListener('change', reset); cancelClose(); };
  }, []);
  useEffect(() => { if (searchOpen) searchInput.current?.focus(); }, [searchOpen]);

  function navKey(event, name) {
    const index = navItems.indexOf(name);
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? navItems.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + navItems.length) % navItems.length;
      tabRefs.current[navItems[next]]?.focus();
    }
    if (event.key === 'ArrowDown' && menus[name]) {
      event.preventDefault(); setActive(name); setSearchOpen(false);
      requestAnimationFrame(() => root.current?.querySelector('.vv-desktop-panel a')?.focus());
    }
  }

  return <header className="vv-header" ref={root} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) { setActive(null); setMobileOpen(false); setSearchOpen(false); }
  }}>
    <a className="vv-announcement" href="/pages/about-us" onClick={() => navigate('Our size-inclusive movement')}>Learn more about our size-inclusive movement</a>
    <div className="vv-main-row">
      <div className="vv-help"><a href="/pages/contact" onClick={() => navigate('Need Help?')}>Need Help?</a><span aria-hidden="true">|</span><span className="vv-shipping"><img src={asset('shipping.svg')} alt=""/>FREE Shipping on all U.S. orders</span></div>
      <button className="vv-mobile-toggle vv-icon-button" ref={toggle} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} aria-controls={`${id}-mobile`} onClick={() => { setMobileOpen(!mobileOpen); setSearchOpen(false); setActive(null); }}><span className={mobileOpen ? 'vv-hamburger is-open' : 'vv-hamburger'} /></button>
      <a className="vv-logo" href="/" aria-label="Viva Voce home" onClick={() => navigate('Home')}><img src={asset('logo.png')} alt="Viva Voce"/></a>
      <div className="vv-controls"><a className="vv-account" href="/account/login" onClick={() => navigate('Sign In / Register')}>Sign In / Register</a><div className="vv-icons">
        <button className="vv-icon-button" ref={searchButton} aria-label="Search" aria-expanded={searchOpen} aria-controls={`${id}-search`} onClick={() => { setSearchOpen(!searchOpen); setActive(null); setMobileOpen(false); }}><img src={asset('search.svg')} alt=""/></button>
        <a className="vv-icon-button vv-wishlist" aria-label="Wishlist" href="/pages/wishlist" onClick={() => navigate('Wishlist')}><img src={asset('heart.svg')} alt=""/></a>
        <a className="vv-icon-button" aria-label="Shopping bag" href="/cart" onClick={() => navigate('Shopping bag')}><img src={asset('bag.svg')} alt=""/></a>
      </div></div>
    </div>
    <div className="vv-desktop" onPointerEnter={cancelClose} onPointerLeave={event => { if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) closeTimer.current = setTimeout(() => setActive(null), 180); }}>
      <nav className="vv-nav" aria-label="Main navigation">{navItems.map(name => menus[name] ? <button key={name} ref={el => { tabRefs.current[name] = el; }} className={`vv-nav-tab${active === name ? ' is-active' : ''}`} id={`${id}-${slug(name)}-tab`} aria-expanded={active === name} aria-controls={`${id}-${slug(name)}-panel`} onPointerEnter={event => { if (event.pointerType === 'mouse') { cancelClose(); setActive(name); setSearchOpen(false); } }} onClick={() => { cancelClose(); setActive(active === name ? null : name); setSearchOpen(false); }} onKeyDown={event => navKey(event, name)}>{name}</button> : <a key={name} ref={el => { tabRefs.current[name] = el; }} className="vv-nav-tab" href={getHref(name)} onPointerEnter={() => setActive(null)} onKeyDown={event => navKey(event, name)} onClick={() => navigate(name)}>{name}</a>)}</nav>
      {Object.keys(menus).map(name => <div key={name} ref={el => { desktopPanelRefs.current[name] = el; }} className={`vv-desktop-panel${active === name ? ' is-open' : ''}`} aria-hidden={active !== name} id={`${id}-${slug(name)}-panel`} aria-labelledby={`${id}-${slug(name)}-tab`}><MenuContent name={name} getHref={getHref} onNavigate={navigate}/></div>)}
    </div>
    <nav className={`vv-mobile-nav${mobileOpen ? ' is-open' : ''}`} id={`${id}-mobile`} aria-label="Mobile navigation" aria-hidden={!mobileOpen}>
      {navItems.map(name => menus[name] ? <div key={name} className="vv-mobile-section"><button className="vv-mobile-heading" aria-expanded={mobileSection === name} aria-controls={`${id}-mobile-${slug(name)}`} onClick={() => toggleMobileSection(name)}>{name}<span aria-hidden="true">{mobileSection === name ? '−' : '+'}</span></button><div ref={el => { mobileBodyRefs.current[name] = el; }} className="vv-mobile-section-body" id={`${id}-mobile-${slug(name)}`} aria-hidden={mobileSection !== name}><MenuContent name={name} getHref={getHref} onNavigate={navigate}/></div></div> : <a className="vv-mobile-heading" key={name} href={getHref(name)} onClick={() => navigate(name)}>{name}</a>)}
      <div className="vv-mobile-utilities"><a href="/account/login" onClick={() => navigate('Sign In / Register')}>Sign In / Register</a><a href="/pages/contact" onClick={() => navigate('Need Help?')}>Need Help?</a><span>FREE Shipping on all U.S. orders</span></div>
    </nav>
    <div className={`vv-search${searchOpen ? ' is-open' : ''}`} id={`${id}-search`} aria-hidden={!searchOpen}><form action="/search" role="search"><label htmlFor={`${id}-query`}>Search Viva Voce</label><div className="vv-search-row"><input ref={searchInput} id={`${id}-query`} name="q" type="search" placeholder="Search clothing, brands, and more" required/><button type="submit">Search</button><button type="button" aria-label="Close search" onClick={() => { setSearchOpen(false); searchButton.current?.focus(); }}>×</button></div></form></div>
  </header>;
}
