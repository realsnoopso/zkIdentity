import React from "react";
import styled from "styled-components";
import {Text} from "./index"
import { Colors } from "./Colors";

const RadioButton = (props) => {
  const {
    name,
    label,
    caption,
  } = props;

  const styles = {

  }

  return (
    <>
      <RadioButtonContainer id={name} type="radio" />
      <RidioButtonLabel for={name}>{label}</RidioButtonLabel>
      <Text opacity="0.7">{caption}</Text>
    </>
  );
}

export default RadioButton;

const RidioButtonLabel = styled.label`
`

const RadioButtonContainer = styled.input`
  background-color: red;
  :checked {
    background-color: red;
  }
  &:checked + ${RidioButtonLabel} {
    color: ${Colors.approve};
  }
`
