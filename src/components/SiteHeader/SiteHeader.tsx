"use client";

import { useEffect, useRef, useState } from "react";
import BrandLogo from "@/components/BrandLogo/BrandLogo";
import styles from "./SiteHeader.module.css";

type SiteHeaderProps = {
  menuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeMenu: () => void;
};

export default function SiteHeader({
  menuOpen,
  setMenuOpen,
  closeMenu,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 821px)");
    const onBreakpoint = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen, setMenuOpen]);

  useEffect(() => {
    const updateScroll = () => setScrolled(window.scrollY > 8);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <header ref={headerRef} className={`${styles.siteHeaderNav} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.isOpen : ""}`}>
      <div className={`container ${styles.headerInner}`}>
        <div className={styles.siteHeaderLogo}><BrandLogo onClick={closeMenu} /></div>
        <nav id="main-navigation" className={`${styles.mainNav} ${menuOpen ? styles.isOpen : ""}`} aria-label="Główna nawigacja">
          <a className={styles.mobileHours} href="#visit" onClick={closeMenu}>Godziny i dojazd</a>
          <a href="#about" onClick={closeMenu}>O nas</a>
          <a href="#services" onClick={closeMenu}>Usługi</a>
          <a className={styles.mobileHours} href="#opinions" onClick={closeMenu}>Opinie</a>
          <a href="#faq" onClick={closeMenu}>Pytania</a>
          <a href="#contact" onClick={closeMenu}>Kontakt</a>
        </nav>
        <a className={`button button-secondary ${styles.headerCall}`} href="tel:+48224125424" aria-label="Zadzwoń do przychodni: 22 412 54 24">
          <span className={styles.phoneNumber}>22 412 54 24</span>
          <span className={styles.mobileCall}>Zadzwoń</span>
        </a>
        <a className={`button button-primary ${styles.headerVisit}`} href="#visit" onClick={closeMenu}>Godziny i dojazd</a>
        <button ref={menuButtonRef} className={styles.menuButton} type="button" aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(value => !value)}>
          {menuOpen ? "Zamknij" : "Menu"}
        </button>
      </div>
    </header>
  );
}
