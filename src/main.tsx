import * as React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import {NextUIProvider} from '@nextui-org/react'
import { createRoot } from 'react-dom/client'; // Import createRoot from "react-dom/client"

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <React.StrictMode>

    <ChakraProvider>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </ChakraProvider>

  </React.StrictMode>
);

