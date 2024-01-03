import { AllMovies, Banner, Footer, Header } from '../components'
function Movies() {
  return (
    <>
      <Header/>
      <Banner type={'Movie'}/>
      <AllMovies type={'movie'}/>
      <Footer/>
    </>
  )
}

export default Movies
