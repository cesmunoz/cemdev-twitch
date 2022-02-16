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

function App() {
  return (
    <div className="App">
      <div id="container mx-auto" className="flex flex-row">
        <div className="flex flex-col">
          <BrowserRouter>
            <Header />
            <div id="content" className="w-full">
              <Routes>
                <Route path="/about" element={<About />} />
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
            <Footer />
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
