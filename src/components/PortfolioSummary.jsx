import { Typography, Box, IconButton } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
const PortfolioSummary = ({
  setIsModalOpen,
  currentTotal,
  diff,
  diffPercent,
}) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
      <IconButton
        onClick={() => setIsModalOpen(true)}
        color="inherit"
        sx={{ p: 0 }}
      >
        <BusinessCenterIcon sx={{ fontSize: 45 }} />
      </IconButton>

      <Box
        onClick={() => setIsModalOpen(true)}
        sx={{ cursor: "pointer", textAlign: "right" }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
          {currentTotal.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })}{" "}
          USD
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: diff >= 0 ? "green" : "red", fontWeight: 500 }}
        >
          {diff >= 0 ? "+" : ""}
          {diff.toFixed(2)} ({diffPercent.toFixed(2)} %)
        </Typography>
      </Box>
    </Box>
  );
};

export { PortfolioSummary };
