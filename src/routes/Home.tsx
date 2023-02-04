import { FaStar } from 'react-icons/fa'
import { Box, Grid, Text, HStack, Image, VStack } from '@chakra-ui/react'

export default function Home() {
  return (
    <Grid
      mt={10}
      px={40}
      columnGap={4}
      rowGap={8}
      templateColumns={'repeat(5, 1fr)'}
    >
      <VStack alignItems={'flex-start'}>
        <Box>
          <Box overflow={'hidden'} mb={3} rounded={'3xl'}>
            <Image
              h="280"
              src="https://a0.muscache.com/im/pictures/prohost-api/Hosting-553863823287705078/original/f2369864-c9eb-4222-a73a-018e55254aed.jpeg?im_w=720"
            />
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
          <Text fontSize={'sm'} color="gray.600">
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize={'sm'} color="gray.600">
          <Text as="b">$72</Text> / night
        </Text>
      </VStack>
    </Grid>
  )
}
