import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { queryClient } from "../main";

const PortfolioPage = ({ open, handleClose }) => {
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    if (open) {
      const saved = localStorage.getItem("user_portfolio");
      setPortfolio(saved ? JSON.parse(saved) : []);
    }
  }, [open]);
  const totalSum = portfolio.reduce((acc, item) => acc + (item.result || 0), 0);

  const removeAsset = (id) => {
    const updated = portfolio.filter((item) => item.id !== id);
    setPortfolio(updated);
    localStorage.setItem("user_portfolio", JSON.stringify(updated));
    queryClient.invalidateQueries();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "85%",
    height: "50vh",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    outline: "none",
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="portfolio-modal-title"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.500",
            }}
          >
            <CancelIcon />
          </IconButton>
          <h2 align="center">Портфель</h2>
          <TableContainer
            component={Paper}
            sx={{ flexGrow: 1, overflowY: "auto" }}
          >
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="portfolio table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">Название</TableCell>
                  <TableCell align="right">Цена</TableCell>
                  <TableCell align="right">Кол-во</TableCell>
                  <TableCell align="right">Итого</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio.map((save) => (
                  <TableRow
                    key={save.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{save.id}</TableCell>
                    <TableCell align="right">{save.cost}</TableCell>
                    <TableCell align="right">{save.count}</TableCell>
                    <TableCell align="right">{save.result} $</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => removeAsset(save.id)}>
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h3 align="center">Итого: {totalSum.toFixed(2)}</h3>
        </Box>
      </Modal>
    </>
  );
};

export { PortfolioPage };
