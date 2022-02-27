import {
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {
  About,
  Contact,
  Histories,
  Home,
  Requests,
} from './Pages';
import Layout from './components/Layout';
import Commands from './Pages/Commands';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Layout>
            {/* <div id="container mx-auto" className="flex flex-row"> */}
            <div id="container" className="">
              {/* <div className="flex flex-col w-full"> */}
              <div className="">
                <div
                  id="content"
                  className="container flex flex-wrap justify-between items-center mx-auto w-full"
                >
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
                    <Route
                      path="/commands"
                      element={<Commands />}
                    />
                    <Route path="/" element={<Home />} />
                  </Routes>
                </div>
              </div>
            </div>
          </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
