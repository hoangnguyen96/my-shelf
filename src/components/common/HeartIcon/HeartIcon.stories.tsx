import { Meta, StoryFn } from "@storybook/react";
import { ChakraProvider, IconButton } from "@chakra-ui/react";
import theme from "@app/themes";
import { useCallback, useMemo, useState } from "react";
import { HeartIconFull, HeartIconOutline } from "@app/assets/icons";

const HeartIcon = () => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  const iconHeart = useCallback(
    () => (isSelected ? <HeartIconFull /> : <HeartIconOutline />),
    [isSelected]
  );

  const colorHeart = useMemo(
    () => (isSelected ? "red.500" : "gray.500"),
    [isSelected]
  );

  return (
    <IconButton
      aria-label="Heart icon"
      icon={iconHeart()}
      onClick={handleClick}
      variant="unstyled"
      fontSize="xl"
      color={colorHeart}
      minW={30}
      minH={30}
    />
  );
};

const meta: Meta<typeof HeartIcon> = {
  component: HeartIcon,
  decorators: [
    (Story: StoryFn) => (
      <ChakraProvider theme={theme}>
        <Story />
      </ChakraProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof HeartIcon> = (args) => <HeartIcon />;

export const Default = Template.bind({});
Default.args = {};
