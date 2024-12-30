
import './App.css';
import Header from '../src/Components/Header';
import Home from  '../src/Components/Home';
import Card from './Components/Card';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './Components/Product';
import Payment from './Components/Payment';
import Address from './Components/Address';
import View from './Components/view';
import Success from '../src/Components/Success';
import Preview from './Components/Preview';
// import Edit from './Components/Edit';

function App() {
  return (
   <>
      <BrowserRouter>
        <Header/>
        <div className='Container'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/Card' element={<Card />}/>
            <Route path='/Product' element={<Product />}/>
            <Route path='/Address' element={<Address />}/>
            <Route path='/Payment' element={<Payment />}/>
            <Route path='/Success' element={<Success />}/>
            <Route path='/Preview' element={<Preview />}/>
            <Route path='/View/:id' element={<View />}/>
            
                          
            {/* <Route path='/Edit/:id' element={<Edit />}/> */}
          </Routes>
        </div>
      </BrowserRouter>
   </>
  );
}

export default App;
