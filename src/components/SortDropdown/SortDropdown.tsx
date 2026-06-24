import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: Props) => {
  return (
    <FormControl size="small" fullWidth>
      <InputLabel>Sort By</InputLabel>

      <Select
        value={value || ""}
        label="Sort By"
        aria-label="Sort products"
        onChange={(e) => onChange(e.target.value)}
      >
        <MenuItem value="">Relevance</MenuItem>

        <MenuItem value="price-asc">Price Low to High</MenuItem>

        <MenuItem value="price-desc">Price High to Low</MenuItem>

        <MenuItem value="newest">Newest</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
