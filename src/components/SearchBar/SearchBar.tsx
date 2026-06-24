import { TextField } from "@mui/material";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <TextField
      fullWidth
      placeholder="Search products..."
      aria-label="Search products"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      slotProps={{
        input: {
          "aria-label": "Search products",
        },
      }}
    />
  );
};

export default SearchBar;