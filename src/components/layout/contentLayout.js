import { Stack } from "@chakra-ui/react";

export default function ContentLayout({ children, ...rest }) {
  return (
    <Stack
      marginX="auto"
      spacing={8}
      maxW="1200px"
      px={[10, 40]}
      pt={4}
      pb={6}
      minH="calc(100vh - 112px)"
      {...rest}
    >
      {children}
    </Stack>
  );
}
