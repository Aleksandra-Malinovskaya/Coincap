import React, { useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../api";
import { PortfolioPage } from "../PortfolioPage";
import { Outlet } from "react-router-dom";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
    staleTime: 60000,
  });

  const allAssets = response?.data || [];
  const top3 = allAssets.slice(0, 3);

  const saved = localStorage.getItem("user_portfolio");
  let portfolio = saved ? JSON.parse(saved) : [];

  const { currentTotal, diff, diffPercent } = useMemo(() => {
    let currentTotal = 0;
    let initialTotal = 0;

    portfolio.forEach((item) => {
      const currentAsset = allAssets.find((a) => a.id === item.id);
      if (currentAsset) {
        const currentPrice = parseFloat(currentAsset.priceUsd);
        currentTotal += parseFloat(item.count) * currentPrice;
        initialTotal += parseFloat(item.count) * parseFloat(item.cost);
      }
    });

    const diff = currentTotal - initialTotal;
    const diffPercent = initialTotal > 0 ? (diff / initialTotal) * 100 : 0;

    return { currentTotal, diff, diffPercent };
  }, [portfolio, allAssets]);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "white",
          color: "black",
          boxShadow: 1,
          mb: 4,
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
          >
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
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", lineHeight: 1.2 }}
                >
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
          </Toolbar>
          <PortfolioPage
            open={isModalOpen}
            handleClose={() => setIsModalOpen(false)}
          />
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};

export { Header };
