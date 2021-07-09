import { Step, Steps } from "react-step-builder";
import CreateEventStep1 from "./CreateEventStep1";
import CreateEventStep2 from "./CreateEventStep2";
import CreateEventStep3 from "./CreateEventStep3";
import { Box, Button } from "@chakra-ui/button";
import styles from "./navigation.module.css";
import { Spacer } from "@chakra-ui/layout";
import { useFormikContext } from "formik";

import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";

const Navigation = (props) => {
  const { validateForm, setFieldTouched } = useFormikContext();

  return (
    <div className={styles.navigation}>
      <Button leftIcon={<DeleteIcon />} variant="outline" colorScheme="red">
        Discard
      </Button>
      <div>
        {props.current > 1 ? (
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="outline"
            onClick={props.prev}
          >
            Back
          </Button>
        ) : (
          <Spacer />
        )}
        <Button
          rightIcon={<ArrowForwardIcon />}
          ml={8}
          variant="outline"
          onClick={() => {
            validateForm().then(async (e) => {
              //errors are set if there were any through validate form, but we have to manually touch the field so that the errors show up
              let errors = Object.keys(e).map((key) => {
                setFieldTouched(key, true);
                return key;
              });
              if (!errors.length) {
                props.next();
              }
            });
          }}
        >
          {props.current === 3 ? "Publish" : "Next"}
        </Button>
      </div>
    </div>
  );
};

const Before = (props) => {
  return <span className={styles.steps}>Step {props.current}/3</span>;
};

const config = {
  before: Before, // a React component with special props provided automatically
  navigation: {
    component: Navigation,
    location: "after",
  },
};

const EventSteps = () => (
  <Steps config={config}>
    <Step title="First step" component={CreateEventStep1} />
    <Step title="Second Step" component={CreateEventStep2} />
    <Step title="Third Step" component={CreateEventStep3} />
  </Steps>
);

export default EventSteps;
