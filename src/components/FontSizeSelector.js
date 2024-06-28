import React from "react";
import { HStack, Select, Text } from "@chakra-ui/react";

const FontSizeSelector = ({ fontSize, onChange }) => {
  return (
    <HStack spacing={4} align="center">
      <Text whiteSpace="nowrap" fontSize="18px" fontWeight="bold">
        Font Size
      </Text>
      <Select
        width="120px"
        variant="outline"
        value={fontSize}
        onChange={onChange}
      >
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
      </Select>
    </HStack>
  );
};

export default FontSizeSelector;
