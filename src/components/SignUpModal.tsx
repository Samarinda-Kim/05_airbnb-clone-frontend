import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { FaLock, FaUserNinja, FaEnvelope, FaUserSecret } from 'react-icons/fa'
import { ISignUpError, ISignUpSuccess, ISignUpVariables, signUp } from '../api'
import SocialLogin from './SocialLogin'

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

interface IForm {
  name: string
  email: string
  username: string
  password: string
  currency: string
  gender: string
  language: string
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>()
  const toast = useToast()
  const queryClient = useQueryClient()
  const mutation = useMutation<ISignUpSuccess, ISignUpError, ISignUpVariables>(
    signUp,
    {
      onSuccess: (data) => {
        toast({
          title: 'Signed Up!',
          description: 'You have been signed up.',
          status: 'success',
          position: 'bottom-right',
        })
        onClose()
        queryClient.refetchQueries(['me'])
        reset()
      },
      onError: () => {
        reset()
      },
    },
  )

  const onSubmit = ({
    username,
    password,
    name,
    email,
    currency,
    gender,
    language,
  }: IForm) => {
    mutation.mutate({
      username,
      password,
      name,
      email,
      currency,
      gender,
      language,
    })
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign up</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserSecret />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.name?.message)}
                {...register('name', { required: true })}
                variant={'filled'}
                placeholder="Name"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaEnvelope />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register('email', { required: true })}
                variant={'filled'}
                placeholder="Email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaUserNinja />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register('username', { required: true })}
                variant={'filled'}
                placeholder="Username"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color="gray.500">
                    <FaLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register('password', { required: true })}
                variant={'filled'}
                placeholder="Password"
                type="password"
              />
            </InputGroup>
            <Select
              placeholder="currency option"
              {...register('currency', { required: true })}
            >
              <option value="won">Korean Won</option>
              <option value="usd">Dollar</option>
            </Select>
            <Select
              placeholder="gender option"
              {...register('gender', { required: true })}
            >
              <option value="male">Male</option>
              <option value="female">Femail</option>
            </Select>
            <Select
              placeholder="language option"
              {...register('language', { required: true })}
            >
              <option value="kr">Korean</option>
              <option value="en">English</option>
            </Select>
          </VStack>
          {mutation.isError ? (
            <Text color="red.500" textAlign={'center'} fontSize="sm">
              Username or email already taken
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={'red'}
            w="100%"
          >
            Sign Up
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
