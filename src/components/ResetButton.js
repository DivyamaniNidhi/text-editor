import React from "react";
import { Button } from "@chakra-ui/react";

const ResetButton = ({ handleReset }) => (
  <Button colorScheme="blue" mt={4} onClick={handleReset}>
    Reset
  </Button>
);

export default ResetButton;
