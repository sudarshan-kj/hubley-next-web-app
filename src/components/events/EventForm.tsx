import { Formik, Form } from "formik";
import TextInput from "../formFields/TextInput";
import RadioInput from "../formFields/RadioInput";
import SelectInput from "../formFields/SelectInput";
import SwitchInput from "../formFields/SwitchInput";
import * as Yup from "yup";
import { VStack, Flex, Button, Box, Spacer } from "@chakra-ui/react";
const TitleIcon = require("-!svg-react-loader!assets/titleIcon.svg");

const yupValidationObject = Yup.object({
  eventTitle: Yup.string()
    .max(40, "Title is too long")
    .required("Please enter event title"),
  eventCategory: Yup.string().required("Please select a category"),
});

const EventForm = ({ seedData, callback, buttonName }) => {
  return (
    <Formik
      initialValues={{ ...seedData }}
      validationSchema={yupValidationObject}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
          // callback(values);
        }, 100);
      }}
    >
      <Form>
        <VStack spacing={12}>
          <RadioInput name="eventType" type="radio" label="event type" />
          <TextInput
            name="eventTitle"
            type="text"
            label="event title"
            icon={TitleIcon}
          />
          <Flex width="100%" justify="space-between">
            <Box flex={2}>
              <SelectInput
                name="eventCategory"
                label="eventCategory"
                placeholder="select category"
                width="100%"
              >
                <option value="agriculture">Agriculture</option>
                <option value="it">IT</option>
                <option value="food">Food</option>
              </SelectInput>
            </Box>
            <Spacer flex={2} />
            <Box flex={2} alignSelf="center">
              <SwitchInput
                name="recordingAvailable"
                label="recording available?"
              />
            </Box>
          </Flex>
          <Button type="submit">Submit</Button>
        </VStack>
      </Form>
    </Formik>
  );
};

export default EventForm;
