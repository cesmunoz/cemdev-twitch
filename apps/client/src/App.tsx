import {
  Route,
  BrowserRouter,
  Routes,
} from 'react-router-dom';
import { Footer, Header } from './components/Layout';
import './App.css';
import {
  About,
  Contact,
  Histories,
  Home,
  Requests,
} from './components/Pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container mx-auto">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
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
  );
}

export default App;
