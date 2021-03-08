import { Box, Image, Text, Flex } from "@chakra-ui/react";
import { Switch, Link, Route, useLocation } from 'react-router-dom';
import SignIn from './components/login/SignIn.js';
import SignUp from './components/login/SignUp.js';

function App() {
  const { pathname } = useLocation()
  return (
    <Flex justify="center" align="center" h="100vh" bg="gray.100">
      <Image src="/assets/images/logo.png" pos="absolute" top={10} left={10} />
      
      <Box w="430px" pos="relative">
        <Box p={10} mt={2} l={1/2} bg="white" boxShadow="lg" borderRadius="lg" overflow="hidden">
          <Box d="flex" justifyContent="space-around">
            <Link to="/sign_in">
              <Text color={pathname !== '/sign_up' ? '#ea6f5a': "gray.900"} fontSize="2xl" fontWeight="lg">登录</Text>
            </Link>
            <Link to="/sign_up">
              <Text color={pathname === '/sign_up' ? '#ea6f5a': "gray.900"} fontSize="2xl" fontWeight="lg">注册</Text>
            </Link>
          </Box>
          <Box p={5}>
            <Switch>
              <Route path="/sign_in">
                <SignIn />
              </Route>
              <Route path="/sign_up">
                <SignUp />
              </Route>
              <Route path="/">
                <SignIn />
              </Route>
            </Switch>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
