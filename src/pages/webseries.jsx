import { AllMovies, Banner, Footer, Header } from "../components";
function Webseries() {
  return (
    <>
      <Header />
      <Banner type={"Webserie"} />
      <AllMovies type={"Webserie"}/>
      <Footer />
    </>
  );
}

export default Webseries;
