import { Box } from "@mui/material";
import logo from "../../assets/images/logo.png";

export default function Logo() {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        component="img"
        src={logo}
        alt="Store Logo"
        decoding="async"
        fetchPriority="high"
        loading="eager"
        width="160"
        height="50"
        sx={{
          width: {
            xs: "96px",
            sm: "128px",
            md: "160px",
          },
          height: "auto",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}
