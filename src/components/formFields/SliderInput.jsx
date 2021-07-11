import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormLabel,
  Box,
} from "@chakra-ui/react";
import { useField } from "formik";

export default function SliderInput({ label, ...props }) {
  const [field, _meta, helpers] = useField(props);
  const { setValue } = helpers;

  function getHrs() {
    const hrs = field.value / 60;
    let suffix = "hour";
    if (hrs > 1) suffix = "hours";
    return `${field.value / 60} ${suffix}`;
  }

  return (
    <Box width="100%" {...props}>
      <FormLabel htmlFor="tenantResiding" mb="0">
        {label}: {getHrs()}
      </FormLabel>
      <Slider
        aria-label="slider-ex-1"
        min={30}
        max={360}
        step={30}
        defaultValue={60}
        onChange={(val) => {
          setValue(val);
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb bg="gray.500" />
      </Slider>
    </Box>
  );
}
