import React from "react";
import { HStack, Select, Text } from "@chakra-ui/react";
import fontsData from "../fonts.json";

const FontSelector = ({ fontFamily, handleFontChange }) => (
  <HStack spacing={4} align="center">
    <Text whiteSpace="nowrap" fontSize="18px" fontWeight="bold">
      Font family
    </Text>
    <Select
      width="380px"
      variant="outline"
      value={fontFamily}
      onChange={(e) => handleFontChange(e.target.value)}
    >
      {Object.keys(fontsData).map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </Select>
  </HStack>
);

export default FontSelector;
