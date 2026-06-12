// Hierda Karlson — Footer
function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Hierda Karlson</span>
      <span className="footer__c">Madrid</span>
      <a href="https://instagram.com/hierdakarlson" className="footer__r">Instagram ↗</a>
    </footer>
  );
}
window.Footer = Footer;
