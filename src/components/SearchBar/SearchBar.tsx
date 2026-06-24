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
      size="small"
      placeholder="Search products..."
      aria-label="Search products"
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      sx={{
        width: "100%",
        maxWidth: "20rem",
      }}
      slotProps={{
        input: {
          "aria-label": "Search products",
          sx: {
            backgroundColor: "#ffffff",
            borderRadius: "0.2rem",
            "& input": {
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
            },
          },
        },
      }}
    />
  );
};

export default SearchBar;
