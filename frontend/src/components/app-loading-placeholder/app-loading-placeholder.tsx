import { Box, Flex, Spinner, Text } from "@radix-ui/themes";
import React, { FC } from "react";

interface LoadingRedirectProps {
  text: string;
}

const AppLoadingPlaceholder: FC<LoadingRedirectProps> = ({ text }) => {
  return (
    <Box className="loading-placeholder" p="4">
      <Flex direction="row" gap="2" justify="center" align="center">
        <Text size="2" color="gray">
          {text}
        </Text>
        <Spinner size="2" />
      </Flex>
    </Box>
  )
}

export default AppLoadingPlaceholder;