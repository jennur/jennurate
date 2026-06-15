import { Routes, Route } from 'react-router-dom';
import { DrawingCanvas, About } from './pages';
import { useThemeColor, DrawingProvider } from './context';
import Header from './components/Header/Header';

export default function App() {
  const { setRandomColor } = useThemeColor();

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className='app' onClick={setRandomColor}>
      <Header />
      <Routes>
        <Route path='/about' element={<About />} />
        <Route
          path='/'
          element={
            <DrawingProvider>
              <DrawingCanvas />
            </DrawingProvider>
          }
        />
      </Routes>
    </div>
  );
}
