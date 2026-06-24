import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: Props) => {
  return (
    <FormControl size="small" fullWidth variant="outlined">
      <InputLabel id="sort-by-select-label">Sort By</InputLabel>

      <Select
        labelId="sort-by-select-label"
        id="sort-by-select"
        value={value || "relevance"}
        label="Sort By"
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          root: {
            "aria-label": "Sort products list layout",
            "aria-required": "false",
          },
        }}
      >
        <MenuItem 
          value="relevance" 
          aria-label="Sort by Relevance (default)"
        >
          Relevance
        </MenuItem>

        <MenuItem 
          value="price-asc" 
          aria-label="Sort by Price: Low to High"
        >
          Price Low to High
        </MenuItem>

        <MenuItem 
          value="price-desc" 
          aria-label="Sort by Price: High to Low"
        >
          Price High to Low
        </MenuItem>

        <MenuItem 
          value="newest" 
          aria-label="Sort by Newest arrivals"
        >
          Newest
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
