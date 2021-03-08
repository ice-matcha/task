import React from 'react';
import ReactDOM from 'react-dom';
import theme from '@chakra-ui/theme';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


// 使用操作系统的颜色模式
theme.config.useSystemColorMode = true

const myTheme = {
  ...theme,
  components: {
    ...theme.components
  }
}


ReactDOM.render(
  <Router>
    <ChakraProvider theme={myTheme}>
      <App />
    </ChakraProvider>
  </Router>,
  document.getElementById('root')
);
