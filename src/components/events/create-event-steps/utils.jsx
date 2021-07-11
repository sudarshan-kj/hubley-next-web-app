import { SlideFade } from "@chakra-ui/react";

export function withSlider(Component) {
  return (props) => {
    let fromRight = true;
    if (props?.state?.from > props?.current) fromRight = false;
    return (
      <SlideFade
        offsetX={fromRight ? "100px" : "-100px"}
        offsetY="0px"
        in={true}
      >
        <Component {...props} />
      </SlideFade>
    );
  };
}
