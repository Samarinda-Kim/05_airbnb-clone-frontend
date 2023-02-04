import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { FaRegHeart, FaStar } from 'react-icons/fa'

export default function Room() {
  const gray = useColorModeValue('gray.600', 'gray.300')
  return (
    <VStack alignItems={'flex-start'}>
      <Box>
        <Box position="relative" overflow={'hidden'} mb={3} rounded={'3xl'}>
          <Image
            minH="280"
            src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-553863823287705078/original/f2369864-c9eb-4222-a73a-018e55254aed.jpeg?im_w=720"
          />
          <Button
            variant={'unstyled'}
            position="absolute"
            top={0}
            right={0}
            color="white"
          >
            <FaRegHeart size="20" />
          </Button>
        </Box>
      </Box>
      <Box>
        <Grid gap={2} templateColumns={'6fr 1fr'}>
          <Text as="b" noOfLines={1} fontSize="md">
            Ganggu-myeon, Yeongdeok-gun, 경상북도, 한국
          </Text>
          <HStack spacing={1}>
            <FaStar size={15} />
            <Text>5.0</Text>
          </HStack>
        </Grid>
        <Text fontSize={'sm'} color={gray}>
          Seoul, S. Korea
        </Text>
      </Box>
      <Text fontSize={'sm'} color={gray}>
        <Text as="b">$72</Text> / night
      </Text>
    </VStack>
  )
}
