import React, { useState, useMemo } from "react";
import { AppBar, Toolbar, Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../api/api";
import { PortfolioPage } from "../components/PortfolioPage";
import { Outlet } from "react-router-dom";
import { PopulaAssetsBar } from "../components/PopularAssetsBar";
import { PortfolioSummary } from "../components/PortfolioSummary";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: response } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
    staleTime: 60000,
  });

  const { data: portfolio = [] } = useQuery({
    queryKey: ["user_portfolio"],
    queryFn: () => {
      const saved = localStorage.getItem("user_portfolio");
      return saved ? JSON.parse(saved) : [];
    },
  });
  const allAssets = response?.data || [];
  const top3 = allAssets.slice(0, 3);

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
            <PopulaAssetsBar top3={top3} />

            <PortfolioSummary
              setIsModalOpen={setIsModalOpen}
              currentTotal={currentTotal}
              diff={diff}
              diffPercent={diffPercent}
            />
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
