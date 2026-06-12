// Hierda Karlson — App composition
function App() {
  return (
    <>
      <Nav />
      <Cover />
      <div className="section-sep" />
      <Parametry />
      <div className="section-sep" />
      <Snepi />
      <div className="section-sep" />
      <Gallery />
      <div className="section-sep" />
      <About />
      <div className="section-sep" />
      <Shop />
      <div className="section-sep" />
      <Contact />
      <Footer />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
