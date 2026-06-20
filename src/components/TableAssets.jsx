import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { addAssetinPortfolio } from "../helpers/addAssentInPortfolio";
import { useNavigate } from "react-router-dom";
const TableAssets = ({ paginatedData }) => {
  const navigate = useNavigate();

  const formatNum = (val, decimals = 2) => {
    return parseFloat(val).toFixed(decimals);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ bgcolor: "#f5f5f5" }}>
            <TableCell>№</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">VWAP (24Hr)</TableCell>
            <TableCell align="right">Change (24Hr)</TableCell>
            <TableCell align="right">Market Cap</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((asset) => (
            <TableRow
              key={asset.id}
              hover
              onClick={() => navigate(`/coin/${asset.id}`)}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>{asset.rank}</TableCell>
              <TableCell>{asset.symbol}</TableCell>
              <TableCell>{asset.id}</TableCell>
              <TableCell align="right">
                {formatNum(asset.vwap24Hr, 2)}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  color:
                    asset.changePercent24Hr < 0 ? "error.main" : "success.main",
                }}
              >
                {formatNum(asset.changePercent24Hr, 2)}%
              </TableCell>
              <TableCell align="right">
                {formatNum(asset.marketCapUsd, 1)}
              </TableCell>
              <TableCell align="right">
                ${formatNum(asset.priceUsd, 2)}
              </TableCell>
              <TableCell align="center">
                <IconButton
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    addAssetinPortfolio(asset);
                  }}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { TableAssets };
