import React from "react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import fontsData from "../fonts.json";

const ItalicToggle = ({ isItalic, setIsItalic, fontFamily, fontWeight }) => {
  // Check if the selected font family and weight have an italic variant
  const hasItalic = !!fontsData[fontFamily]?.[fontWeight + "italic"];
  // Handle toggle event for italic switch
  const handleToggle = () => {
    if (hasItalic) {
      setIsItalic(!isItalic); // Toggle italic state if italic variant is available
    }
  };

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel
        htmlFor="italic-toggle"
        mb="0"
        fontSize="18px"
        fontWeight="bold"
      >
        Italic
      </FormLabel>
      <Switch
        id="italic-toggle"
        isChecked={isItalic}
        onChange={handleToggle}
        isDisabled={!hasItalic}
      />
    </FormControl>
  );
};

export default ItalicToggle;
