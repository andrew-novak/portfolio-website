import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const RadioGroupForm = ({ radios, currentValue, onChange }) => {
  return (
    <FormControl>
      <FormLabel id="button-behaviour-radio-label">Behaviour</FormLabel>
      <RadioGroup
        row
        aria-labelledby="button-behaviour-radio-label"
        name="row-radio-buttons-group"
        value={currentValue}
      >
        {radios &&
          radios.map(({ label, value }, index) => (
            <FormControlLabel
              key={index}
              label={label}
              value={value}
              control={<Radio />}
              onClick={() => onChange(value)}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupForm;
