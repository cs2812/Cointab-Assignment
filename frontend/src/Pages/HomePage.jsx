import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";

const HomePage = () => {
  let img =
    "https://www.cointab.in/wp-content/uploads/2022/09/Blue-Modern-Corporate-Digital-Finance-Presentation-Deck-1000-%C3%97-700-px-1.1.png";
  return (
    <Box w="90vw" m="auto">
      <Text fontSize={["sm", "md", "lg", "2xl"]}
      fontWeight={"bold"}
      fontFamily={"cursive"}
      color="teal"
      >
        Cointab Software Private Limited
      </Text>
      <Image w="100vw" h="80vh" src={img} alt="welcome" />
    </Box>
  );
};
export default HomePage;
