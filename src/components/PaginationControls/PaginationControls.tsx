import { Box, Pagination } from "@mui/material";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({ page, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 3,
      }}
    >
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
        onChange={(_, value) => onPageChange(value)}
      />
    </Box>
  );
};

export default PaginationControls;
