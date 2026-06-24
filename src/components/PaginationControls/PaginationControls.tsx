import {
  Box,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls = ({
  page,
  totalPages,
  onPageChange,
}: Props) => {
  const loading = useAppSelector(
    (state) => state.products.loading
  );

  const [pageInput, setPageInput] = useState(
    page.toString()
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPageInput(page.toString());
  }, [page]);

  const handleSubmit = () => {
    if (loading) {
      return;
    }

    const value = Number(pageInput);

    if (Number.isNaN(value) || pageInput === "") {
      setPageInput(page.toString());
      return;
    }

    const nextPage = Math.min(
      Math.max(value, 1),
      totalPages
    );

    if (nextPage !== page) {
      onPageChange(nextPage);
    }
  };

  const handlePrevious = () => {
    if (loading || page <= 1) {
      return;
    }

    onPageChange(page - 1);
  };

  const handleNext = () => {
    if (
      loading ||
      page >= totalPages ||
      totalPages <= 1
    ) {
      return;
    }

    onPageChange(page + 1);
  };

  return (
    <Box
      component="nav"
      aria-label="Pagination Navigation"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        py: 2,
      }}
    >
      <Tooltip title="Previous Page">
        <span>
          <IconButton
            onClick={handlePrevious}
            disabled={loading || page <= 1}
            aria-label="Go to previous page"
            sx={{
              width: 32,
              height: 32,
              border: 1,
              borderColor: "divider",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              "&.Mui-disabled": {
                backgroundColor: "action.disabledBackground",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
          >
            <ChevronLeft fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>

      <TextField
        size="small"
        type="text"
        disabled={loading}
        value={pageInput}
        variant="outlined"
        aria-label={`Current page. Enter a page number between 1 and ${totalPages}`}
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            pattern: "[0-9]*",
            min: 1,
            max: totalPages,
          },
        }}
        sx={{
          width: 60,
          "& .MuiOutlinedInput-root": {
            height: 32,
            borderRadius: 2,
            backgroundColor: "#ffffff",
          },
          "& input": {
            textAlign: "center",
            padding: "4px 8px",
          },
        }}
        onChange={(e) =>
          setPageInput(
            e.target.value.replace(/\D/g, "")
          )
        }
        onBlur={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />

      <Tooltip title="Next Page">
        <span>
          <IconButton
            onClick={handleNext}
            disabled={
              loading ||
              page >= totalPages ||
              totalPages <= 1
            }
            aria-label="Go to next page"
            sx={{
              width: 32,
              height: 32,
              border: 1,
              borderColor: "divider",
              borderRadius: "50%",
              backgroundColor: "#ffffff",
              "&.Mui-disabled": {
                backgroundColor: "action.disabledBackground",
              },
              "&:focus-visible": {
                outline: "2px solid",
                outlineColor: "primary.main",
                outlineOffset: 2,
              },
            }}
          >
            <ChevronRight fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default PaginationControls;
