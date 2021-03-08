import { useState } from 'react'
import axios from 'axios'
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Divider,
  Stack, 
  Button,
  HStack,
  Link,
  useToast
} from '@chakra-ui/react'
import { FaUserAlt, FaLock, FaEnvelope, FaWeixin, FaQq } from "react-icons/fa";

export default function SignUp () {
  const toast = useToast()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSignUp = async () => {
    try {
      const {data} = await axios.post('https://conduit.productionready.io/users', {
        user: {
          username,
          email,
          password
        }
      })
      console.log(data);

      toast({
        position: "top-right",
        title: "注册成功",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } catch (e) {
      console.log(e);
      toast({
        position: "top-right",
        title: "注册失败",
        description: e.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }
  return (
    <form>
      <Stack spacing={8}>
        <Stack>
          <InputGroup>
            <InputLeftAddon children={<FaUserAlt/>}/>
            <Input placeholder="昵称" value={username} onChange={e => setUsername(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={<FaEnvelope/>} />
            <Input placeholder="邮箱" value={email} onChange={e => setEmail(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children={<FaLock/>} />
            <Input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)}/>
          </InputGroup>
        </Stack>
        <Button color="white" bgColor="#42c02e" _hover={{bgColor: '#3db922'}} borderRadius="30px" onClick={handleSignUp} >
          注册
        </Button>
        <Text fontSize="12px" color="gray.500" textAlign="center">
          点击 “注册” 即表示您同意并愿意遵守简书
          <Link color="#3194d0" href="#">用户协议</Link>
          和
          <Link color="#3194d0" href="#">隐私政策 </Link>
          。
        </Text>
        <HStack justifyContent="space-between">
          <Divider w={1/4} />
          <Text color="gray.500" fontSize="12px">社交帐号直接注册</Text>
          <Divider w={1/4} />
        </HStack>
        <HStack fontSize="2xl" justifyContent="center" spacing="5">
          <FaWeixin color="#00bb29"/>
          <FaQq color="#498ad5"/>
        </HStack>
      </Stack>
    </form>
  )
}