import React from "react";
import { Textarea } from "@chakra-ui/react";

const TextArea = ({ text, onChange, fontStyles }) => {
  return (
    <Textarea
      style={fontStyles}
      value={text}
      onChange={(e) => onChange(e.target.value)}
      height="300px"
      width="97%"
      maxW="100%"
      mt={4}
      resize="vertical"
      overflowX="hidden"
    />
  );
};

export default TextArea;
