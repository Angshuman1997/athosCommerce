import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

interface Props {
  brand?: string;
  color?: string;
  onRemoveBrand: () => void;
  onRemoveColor: () => void;
  onClearAll: () => void;
}

const FilterChips = ({
  brand,
  color,
  onRemoveBrand,
  onRemoveColor,
  onClearAll,
}: Props) => {
  const hasFilters = brand || color;

  if (!hasFilters) {
    return null;
  }

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {brand && <Chip label={`Brand: ${brand}`} onDelete={onRemoveBrand} />}

      {color && <Chip label={`Color: ${color}`} onDelete={onRemoveColor} />}

      <Button
        size="small"
        color="inherit"
        onClick={onClearAll}
        sx={{
          fontWeight: 700,
          color: "text.primary",
          "&:hover": {
            backgroundColor: "action.hover",
          },
        }}
      >
        Clear All
      </Button>
    </Box>
  );
};

export default FilterChips;
