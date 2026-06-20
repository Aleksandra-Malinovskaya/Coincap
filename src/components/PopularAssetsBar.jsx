import { Typography, Box } from "@mui/material";
const PopulaAssetsBar = ({ top3 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "#333",
          mb: 1,
          fontSize: "1.1rem",
        }}
      >
        Популярные криптовалюты:
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
        {top3.map((asset) => (
          <Box
            key={asset.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: "0.95rem",
                lineHeight: 1.2,
              }}
            >
              {asset.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: "0.85rem", color: "text.secondary" }}
            >
              ${parseFloat(asset.priceUsd).toFixed(2)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { PopulaAssetsBar };
