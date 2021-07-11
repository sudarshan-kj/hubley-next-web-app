import { Step, Steps } from "react-step-builder";
import CreateEventStep1 from "components/events/create-event-steps/CreateEventStep1";
import CreateEventStep2 from "components/events/create-event-steps/CreateEventStep2";
import CreateEventStep3 from "components/events/create-event-steps/CreateEventStep3";
import { Button } from "@chakra-ui/button";
import styles from "./EventSteps.module.css";
import { Spacer } from "@chakra-ui/layout";
import { useFormikContext } from "formik";
import AlertDialogModal from "components/modals/AlertDialogModal";
import { ArrowBackIcon, ArrowForwardIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";

const Navigation = (props) => {
  const { validateForm, setFieldTouched } = useFormikContext();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.navigation}>
      <AlertDialogModal
        isOpen={isOpen}
        onSafeClose={() => setIsOpen(false)}
        onClickAction={() => router.push("/")}
        safeButtonName="Cancel"
        actionButtonName="Discard"
      />
      <Button
        onClick={() => setIsOpen(true)}
        leftIcon={<DeleteIcon />}
        variant="outline"
        colorScheme="red"
      >
        Discard
      </Button>
      <div>
        {props.current > 1 ? (
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="outline"
            onClick={() => {
              /**this is captured so that we know from which page the user is coming.
               * If the user is coming from step-2, then we slide step-1 from left, otherwise by default we slide from right */
              props.setState("from", props.current);
              props.prev();
            }}
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
                setFieldTouched(key);
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
  const { values } = useFormikContext();

  return (
    <div className={styles.stepsContainer}>
      <span className={styles.steps}>Step {props.current}/3</span>
      <p>
        &#x1F6C8; You are now creating{" "}
        {values.eventType === "live" ? "a" : "an"}{" "}
        <span className={styles.eventType}>{values.eventType}</span> event
      </p>
    </div>
  );
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
