import {
  Avatar,
  AvatarBadge,
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FaStar } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getRoom, getRoomReviews } from '../api'
import { IReview, IRoomDetail } from '../types'

export default function RoomDetail() {
  const { roomPk } = useParams()
  const { isLoading, data } = useQuery<IRoomDetail>([`rooms`, roomPk], getRoom)
  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >([`rooms`, roomPk, `reviews`], getRoomReviews)
  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Skeleton height={'43px'} width="25%" isLoaded={!isLoading}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        overflow={'hidden'}
        rounded="xl"
        gap={3}
        height="60vh"
        templateRows={'1fr 1fr'}
        templateColumns={'repeat(4, 1fr)'}
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={'hidden'}
            key={index}
          >
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image
                objectFit={'cover'}
                w="100%"
                h="100%"
                src={data?.photos[index].file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack width={'50%'} justifyContent={'space-between'} mt={10}>
        <VStack alignItems={'flex-start'}>
          <Skeleton isLoaded={!isLoading} height={'30px'}>
            <Heading fontSize={'2xl'}>
              House hosted by {data?.owner.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading} height={'30px'}>
            <HStack justifyContent={'flex-start'} w={'100%'}>
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? '' : 's'}
              </Text>
              <Text>ㆍ</Text>
              <Text>
                {data?.rooms} room{data?.rooms === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        {/* https://chakra-ui.com/docs/components/avatar */}
        <Avatar name={data?.owner.name} size={'xl'} src={data?.owner.avatar}>
          <AvatarBadge boxSize="1.25em" bg="red.500" />
        </Avatar>
      </HStack>
      <Box mt={10}>
        <Heading fontSize={'2xl'}>
          <Skeleton isLoaded={!isReviewsLoading} height={'30px'}>
            <HStack>
              <FaStar /> <Text>{data?.rating}</Text>
              <Text>ㆍ</Text>
              <Text>
                {reviewsData?.length} review
                {reviewsData?.length === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Skeleton>
        </Heading>
      </Box>
    </Box>
  )
}
