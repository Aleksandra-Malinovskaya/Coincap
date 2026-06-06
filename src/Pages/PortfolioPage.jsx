import React from "react";
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
const PortfolioPage = ({ open, handleClose, portfolioData }) => {
  const saved = localStorage.getItem("user_portfolio")
    ? JSON.parse(localStorage.getItem("user_portfolio"))
    : [];
  const savedd = [{ name: "bit", cost: 100, count: 1, result: 111 }];
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
                {savedd.map((save) => (
                  <TableRow
                    key={save.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right">{save.name}</TableCell>
                    <TableCell align="right">{save.cost}</TableCell>
                    <TableCell align="right">{save.count}</TableCell>
                    <TableCell align="right">{save.result} $</TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() =>
                          console.log("Удалить из портфеля:", save.id)
                        }
                      >
                        <CancelIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <h3 align="center">Итого:</h3>
        </Box>
      </Modal>
    </>
  );
};

export { PortfolioPage };
