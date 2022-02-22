import {
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import './App.css';
import {
  About,
  Contact,
  Histories,
  Home,
  Requests,
} from './Pages';
import SidebarWithHeader from './components/Layout/Layout';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <SidebarWithHeader>
            {/* <div id="container mx-auto" className="flex flex-row"> */}
            <div id="container" className="">
              {/* <div className="flex flex-col w-full"> */}
              <div className="">
                <div
                  id="content"
                  className="container flex flex-wrap justify-between items-center mx-auto w-full">
                  <Routes>
                    <Route
                      path="/about"
                      element={<About />}
                    />
                    <Route
                      path="/contact"
                      element={<Contact />}
                    />
                    <Route
                      path="/histories"
                      element={<Histories />}
                    />
                    <Route
                      path="/requests"
                      element={<Requests />}
                    />
                    <Route path="/" element={<Home />} />
                  </Routes>
                </div>
              </div>
            </div>
          </SidebarWithHeader>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
