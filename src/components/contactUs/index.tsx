import { Heading } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/react";
import TextInputField from "../inputs/TextInputField";
import TextAreaInputField from "../inputs/TextAreaInputField";

const ContactUs = () => (
  <VStack spacing="6" width="300px">
    <Heading color="white" alignSelf="flex-start" mb="8">
      Contact Us
    </Heading>
    <TextInputField
      label="name"
      onChange={() => console.log("Value is being changed")}
      value="Kiran Shaw"
      inputBoxProps={{
        color: "white",
        bgColor: "brand.600",
        borderColor: "brand.600",
      }}
      labelProps={{
        color: "white",
      }}
    />
    <TextInputField
      label="email"
      onChange={() => console.log("Value is being changed")}
      value="kiran@gmail.com"
      inputBoxProps={{
        color: "white",
        bgColor: "brand.600",
        borderColor: "brand.600",
      }}
      labelProps={{
        color: "white",
      }}
    />

    <TextAreaInputField
      label="message"
      onChange={() => console.log("Value is being changed")}
      value="Lorem ipsum, dolor sit amet consectetur adipisicing elit. In, porro rem? Porro vitae vel, nulla ex doloribus dolorem atque aut!"
      textAreaBoxProps={{
        color: "white",
        bgColor: "brand.600",
        borderColor: "brand.600",
        height: "150px",
      }}
      labelProps={{
        color: "white",
      }}
    />
  </VStack>
);

export default ContactUs;
