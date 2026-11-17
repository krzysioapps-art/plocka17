import styles from "./BrandLogo.module.css";

export default function BrandLogo({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#home" className={styles.logo} onClick={onClick} aria-label="Płocka – strona główna">
      <img src="/assets/brand/logo.webp" alt="" width={1254} height={1254} />
      <span className={styles.text}>
        <span className={styles.name}>Płocka</span>
        <span className={styles.caption}>Przychodnia weterynaryjna</span>
      </span>
    </a>
  );
}
