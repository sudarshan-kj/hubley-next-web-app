import { Formik, Form } from "formik";
import * as Yup from "yup";
import EventSteps from "./create-event-steps/EventSteps";

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
        }, 100);
      }}
    >
      <Form style={{ position: "relative" }}>
        <EventSteps />
      </Form>
    </Formik>
  );
};

export default EventForm;
