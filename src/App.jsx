import { ChakraProvider } from '@chakra-ui/react'
import "./index.css";
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Layout from './pages/landing/Layout';
import Auth from './pages/auth/Auth';
import Reg from './pages/auth/Reg';
import SharedLayout from './components/SharedLayout';
import SetProfile from './pages/auth/SetProfile';
import People from './pages/people/People';
import UserProfile from './pages/profile/UserProfile';
import Posts from './pages/Posts/Posts';
import Profile from './components/Test/Profile';
import Test2 from './components/Test/test2';
import LastTest from './components/Test/lastTest';

function App() {
  return (
      <div className='h-full app' style={{minHeight: "100vh"}}>
        <ChakraProvider>
            <Routes>
              <Route path='/' element={<Layout></Layout>}>
                <Route index element={<Landing/>}/>
              </Route>
              <Route path='auth/login' element={<Auth/>}/>
              <Route path='auth/join' element={<Reg/>}/>
              <Route path='auth/set-profile' element={<SetProfile/>}/>
              
              <Route path='test/addUser' element={<Profile/>}/>
              <Route path='test2' element={<Test2/>}/>
              <Route path='test3' element={<LastTest/>}/>



              <Route path='/home' element={<SharedLayout/>}>
                  <Route index element={<Home/>}/>
                  <Route path='people' element={<People/>}/>
                  <Route path='profile/:username/:id' element={<UserProfile/>}/>
                  <Route path='post/:user/:id' element={<Posts/>}/>
              </Route>
            </Routes>
        </ChakraProvider>
      
      </div>
  )
}

export default App
