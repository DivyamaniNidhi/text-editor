import React, { useState, useEffect } from "react";
import { Box, HStack } from "@chakra-ui/react";
import FontSelector from "./components/FontSelector";
import VariantSelector from "./components/VariantSelector";
import ItalicToggle from "./components/ItalicToggle";
import ResetButton from "./components/ResetButton";
import TextArea from "./components/TextArea";
import FontSizeSelector from "./components/FontSizeSelector";
import fontsData from "./fonts.json";

const TextEditor = () => {
  const [text, setText] = useState(""); // State for holding text content
  const [fontFamily, setFontFamily] = useState("ABeeZee"); // Initial font family
  const [fontWeight, setFontWeight] = useState("400"); // initial font weight
  const [isItalic, setIsItalic] = useState(false); // initially not italic
  const [fontSize, setFontSize] = useState("16px"); // Initial font size

  // Effect to load saved settings from localStorage on component mount
  useEffect(() => {
    const savedText = localStorage.getItem("text");
    const savedFontFamily = localStorage.getItem("fontFamily");
    const savedFontWeight = localStorage.getItem("fontWeight");
    const savedIsItalic = localStorage.getItem("isItalic") === "true";
    const savedFontSize = localStorage.getItem("fontSize");

    if (savedText) setText(savedText);
    if (savedFontFamily) setFontFamily(savedFontFamily);
    if (savedFontWeight) setFontWeight(savedFontWeight);
    setIsItalic(savedIsItalic);
    setFontSize(savedFontSize);
  }, []);

  // Effect to save current settings to localStorage when text, font, or style changes
  useEffect(() => {
    localStorage.setItem("text", text);
    localStorage.setItem("fontFamily", fontFamily);
    localStorage.setItem("fontWeight", fontWeight);
    localStorage.setItem("isItalic", isItalic.toString());
    localStorage.setItem("fontSize", fontSize);
  }, [text, fontFamily, fontWeight, isItalic, fontSize]);

  // Effect to dynamically load fonts into the document head based on selected fontFamily
  useEffect(() => {
    if (fontFamily) {
      const variants = fontsData[fontFamily] || {}; // Get font variants from fontsData or empty object if not found
      const style = document.createElement("style"); // Create a style element

      // Loop through each variant and create @font-face rules dynamically
      Object.entries(variants).forEach(([weight, url]) => {
        const fontFace = `
          @font-face {
            font-family: '${fontFamily}';
            font-style: ${weight.includes("italic") ? "italic" : "normal"};
            font-weight: ${weight.replace("italic", "")};
            src: url(${url}) format('woff2');
          }
        `;
        style.appendChild(document.createTextNode(fontFace)); // Append each font-face rule to the style element
      });

      document.head.appendChild(style); // Append the style element to the document head
    }
  }, [fontFamily]);

  // Function to find the closest font weight from available variants
  const findClosestWeight = (weights, targetWeight) => {
    return weights.reduce((prev, curr) =>
      Math.abs(curr - targetWeight) < Math.abs(prev - targetWeight)
        ? curr
        : prev
    );
  };

  // Event handler for font family change
  const handleFontChange = (newFontFamily) => {
    setFontFamily(newFontFamily); // Update selected font family
    const variants = Object.keys(fontsData[newFontFamily] || {}); // Get available variants for the selected font family
    // Handle case when no variants are available
    if (variants.length === 0) {
      setFontWeight("");
      setIsItalic(false);
      return;
    }
    // Map available variants to their respective weights
    const availableWeights = variants.map((variant) =>
      parseInt(variant.replace("italic", ""))
    );

    let newWeight = fontWeight;
    let newItalic = isItalic;
    // Adjust font weight and italic style based on current settings
    if (isItalic) {
      // Find closest italic variant if current weight is italic
      const closestItalicVariant = variants
        .filter((variant) => variant.includes("italic"))
        .map((variant) => parseInt(variant.replace("italic", "")))
        .sort((a, b) => Math.abs(a - fontWeight) - Math.abs(b - fontWeight))[0];
      // Update font weight and italic style accordingly
      if (closestItalicVariant !== undefined) {
        newWeight = closestItalicVariant;
      } else {
        newItalic = false;
        newWeight = findClosestWeight(availableWeights, fontWeight);
      }
    } else {
      newWeight = findClosestWeight(availableWeights, fontWeight);
    }
    // Update font weight and italic state
    setFontWeight(newWeight.toString());
    setIsItalic(newItalic);
  };

  // Event handler for font weight change
  const handleWeightChange = (newFontWeight) => {
    setFontWeight(newFontWeight); // Update selected font weight
    // Disable italic if no italic variant is available for the current weight
    if (!fontsData[fontFamily][newFontWeight + "italic"]) {
      setIsItalic(false);
    }
  };

  // Event handler for italic toggle
  const handleItalicToggle = () => {
    setIsItalic(!isItalic); // Toggle italic state
  };

  // Event handler for font size change
  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value); // Update selected font size
  };

  // Event handler to reset editor to default settings
  const handleReset = () => {
    setText("");
    setFontFamily("ABeeZee");
    setFontWeight("400");
    setIsItalic(false);
    setFontSize("16px");
    localStorage.removeItem("text");
    localStorage.removeItem("fontFamily");
    localStorage.removeItem("fontWeight");
    localStorage.removeItem("isItalic");
    localStorage.removeItem("fontSize");
  };

  // Inline styles object for applying font styles to TextArea component
  const fontStyles = {
    fontFamily,
    fontWeight,
    fontStyle: isItalic ? "italic" : "normal",
    fontSize,
  };

  return (
    <Box margin="20px 0 20px 20px" width="100%">
      <HStack spacing={10}>
        <FontSelector
          fontFamily={fontFamily}
          handleFontChange={handleFontChange}
        />
        <VariantSelector
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          handleWeightChange={handleWeightChange}
          isItalic={isItalic}
        />
        <FontSizeSelector fontSize={fontSize} onChange={handleFontSizeChange} />
        <ItalicToggle
          isItalic={isItalic}
          setIsItalic={handleItalicToggle}
          fontFamily={fontFamily}
          fontWeight={fontWeight}
        />
      </HStack>
      <TextArea text={text} onChange={setText} fontStyles={fontStyles} />
      <ResetButton handleReset={handleReset} />
    </Box>
  );
};

export default TextEditor;
