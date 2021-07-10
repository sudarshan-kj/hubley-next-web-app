import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export default function SliderInput({ label, ...props }) {
  const [value, setValue] = useState(30);

  function getHrs() {
    const hrs = value / 60;
    let suffix = "hour";
    if (hrs > 1) suffix = "hours";
    return `${value / 60} ${suffix}`;
  }

  return (
    <Box {...props}>
      <FormLabel htmlFor="tenantResiding" mb="0">
        {label}: {getHrs()}
      </FormLabel>
      <Slider
        aria-label="slider-ex-1"
        min={30}
        max={360}
        step={30}
        defaultValue={60}
        onChange={(val) => setValue(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb bg="gray.500" />
      </Slider>
    </Box>
  );
}
