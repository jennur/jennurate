import { createContext, useState, useContext } from 'react';

const ColorContext = createContext({
  color: 'orange',
  setColor: () => {},
  setRandomColor: () => {},
});

export const ColorProvider = ({ children }) => {
  const [color, setColor] = useState('orange');
  const colors = ['red', 'orange', 'blue', 'purple', 'blue-green', 'yellow'];

  const setRandomColor = () => {
    const randomNum = Math.floor(Math.random() * colors.length);
    setColor(colors[randomNum]);
  };

  return (
    <ColorContext.Provider value={{ color, setColor, setRandomColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useThemeColor = () => useContext(ColorContext);
