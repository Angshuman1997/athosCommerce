import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  type SelectChangeEvent,
} from "@mui/material";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  value: string[];
  options: Option[];
  onChange: (value: string[]) => void;
}

const FilterDropdown = ({ label, value, options, onChange }: Props) => {
  const labelId = `${label.toLowerCase().replace(/\s+/g, "-")}-label`;

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value: eventValue },
    } = event;
    
    onChange(
      typeof eventValue === "string" ? eventValue.split(",") : eventValue
    );
  };

  const getRenderValue = (selectedValues: string[]) => {
    return selectedValues
      .map((val) => options.find((opt) => opt.value === val)?.label || val)
      .join(", ");
  };

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>

      <Select
        multiple
        labelId={labelId}
        value={value}
        label={label}
        renderValue={getRenderValue}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox size="small" checked={value.includes(option.value)} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
