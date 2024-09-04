import { Checkbox, CheckboxProps } from "@chakra-ui/react";

interface CheckboxBaseProps extends CheckboxProps {
  text?: string;
}

const CheckboxBase = ({ text = "Remember me", ...rest }: CheckboxBaseProps) => {
  return (
    <Checkbox size="md" {...rest}>
      {text}
    </Checkbox>
  );
};

export default CheckboxBase;
