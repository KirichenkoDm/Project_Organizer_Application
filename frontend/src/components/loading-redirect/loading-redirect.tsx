import { Box, Flex, Spinner, Text } from "@radix-ui/themes";
import React, { FC } from "react"; 

interface LoadingRedirectProps {
  isLoading: boolean
}

const LoadingRedirect: FC<LoadingRedirectProps> = ({isLoading}) => {
  return (
    <Box className="loading-placeholder" p="4">
      <Flex direction="row" gap="2" justify="center" align="center">
        {
          isLoading
          ?
          <Text size="2" color="gray">
            Loading in progress. 
            Wait for page to load...
          </Text>
          :
          <Text size="2" color="gray">
            You are unauthorised. 
            Soon you will be redirected...
          </Text>
        }
        <Spinner size="2" />
      </Flex>
    </Box>
  )
}

export default LoadingRedirect;