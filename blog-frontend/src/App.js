import AllRoutes from "./AllRoutes"
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CustomToast from './components/CustomToast';

const App = () => {
  return(
    <>
    <Header />
    <AllRoutes />
    <Footer />
    <CustomToast />
    </>
  )
}

export default App;