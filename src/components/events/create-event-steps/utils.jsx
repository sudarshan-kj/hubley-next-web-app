import { SlideFade } from "@chakra-ui/react";

export function withSlider(Component) {
  return (props) => (
    <SlideFade offsetX="100px" offsetY="0px" in={true}>
      <Component {...props} />
    </SlideFade>
  );
}
