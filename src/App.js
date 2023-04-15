import logo from './logo.svg';
import './App.css';
import PrimarySearchAppBar from './HomePage/HomePage';
import TitlebarImageList from './Items/Items';
import ItemCard from './ItemCard/ItemCard';
import Ad from './Ad/Ad';
import SignUp from './Login/Login';
import Layout from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (

    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Ad/>}/>
      <Route path="signup" element={<SignUp/>}/>
    </Route>
  </Routes>
 );
}

    // <>
    // <PrimarySearchAppBar/>
    // <Ad/>
    // <SignUp/>
    // {/* <TitlebarImageList/> */}
    // </>
   
 
export default App;
