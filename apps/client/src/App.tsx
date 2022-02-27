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
  Commands,
  CommandsTemplate,
} from './Pages';
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Layout>
            <div id="container">
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
                  <Route
                    path="/commands-template"
                    element={<CommandsTemplate />}
                  />
                  <Route path="/" element={<Home />} />
                </Routes>
            </div>
          </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;
