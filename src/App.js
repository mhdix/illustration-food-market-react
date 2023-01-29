
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart/Cart';
import HomePage from './pages/HomePage/HomePage';
import DarkModeProvider from './provider/DarkModeProvider';
import ProductProvider from './provider/ProductProvider';
import './responsive.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import MenuProvider from './provider/MenuProvider';


function App() {

  return (
    <DarkModeProvider>
     <MenuProvider>
     <ToastContainer />
      <Router>
        <ProductProvider>
          <Routes>
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/' exact element={<HomePage />} />
            {/* <Route path='*' element={<HomePage />} /> */}
          </Routes>
        </ProductProvider>
      </Router>
     </MenuProvider>
    </DarkModeProvider>
  );
}

export default App;
