import React from "react";
import { HStack, Select, Text } from "@chakra-ui/react";
import fontsData from "../fonts.json";

const VariantSelector = ({ fontFamily, fontWeight, handleWeightChange }) => {
  // Get font weights for the selected font family, excluding italic variants
  const weights = Object.keys(fontsData[fontFamily] || {})
    .filter((variant) => !variant.includes("italic")) // Exclude italic variants
    .map((variant) => variant.replace("italic", "")) // Remove 'italic' from the variant strings
    .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

  return (
    <HStack spacing={4} align="center">
      <Text fontSize="18px" fontWeight="bold">
        Variant{" "}
      </Text>
      <Select
        width="180px"
        variant="outline"
        value={fontWeight}
        onChange={(e) => handleWeightChange(e.target.value)}
      >
        {weights.map((weight) => (
          <option key={weight} value={weight}>
            {weight}
          </option>
        ))}
      </Select>
    </HStack>
  );
};

export default VariantSelector;
