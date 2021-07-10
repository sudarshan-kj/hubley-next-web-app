import { Box, Stack } from "@chakra-ui/react";

export default function ContentLayout({ children, ...rest }) {
  return (
    <Box width="100%" minH="calc(100vh - 112px)" bg="white">
      <Stack
        marginX="auto"
        spacing={8}
        maxW="1200px"
        borderRadius="lg"
        px={[10, 40]}
        py={[10, 16]}
        {...rest}
      >
        {children}
      </Stack>
    </Box>
  );
}

export function ContentLayoutWBg({ children, ...rest }) {
  return (
    <Box
      width="100%"
      minH="calc(100vh - 112px)"
      bgGradient="linear(to-b ,#ffffff 50%, #3f8cff 50%,#0052cc 85%)"
    >
      <Stack
        marginX="auto"
        spacing={8}
        maxW="1200px"
        bg="white"
        px={[10, 40]}
        py={[10, 16]}
        {...rest}
      >
        {children}
      </Stack>
    </Box>
  );
}
