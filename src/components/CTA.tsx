import { Link as ChakraLink, Button } from "@chakra-ui/react";

import { Container } from "./Container";

export const CTA = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={3}
  >
    <Button
      as="a"
      variant="outline"
      href="https://chakra-ui.com"
      flexGrow={1}
      mx={2}
    >
      chakra-ui
    </Button>

    <Button as="a" href="https://chakra-ui.com" flexGrow={3} mx={2}>
      View Repo
    </Button>
  </Container>
);
