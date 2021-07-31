import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const EventTypeFilter = (props) => (
  <Tabs>
    <TabList>
      <Tab fontWeight="bold" textTransform="uppercase" _focus={{}}>
        All
      </Tab>
      <Tab fontWeight="bold" textTransform="uppercase" _focus={{}}>
        Live
      </Tab>
      <Tab fontWeight="bold" textTransform="uppercase" _focus={{}}>
        On Demand
      </Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <strong>three!</strong>
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default EventTypeFilter;
