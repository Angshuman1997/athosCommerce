import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
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
  return (
    <FormControl size="small" fullWidth>
      <InputLabel>{label}</InputLabel>

      <Select
        multiple
        value={value}
        label={label}
        renderValue={(selected) => selected.join(", ")}
        onChange={(e) =>
          onChange(
            typeof e.target.value === "string"
              ? e.target.value.split(",")
              : e.target.value,
          )
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={value.includes(option.value)} />

            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;
