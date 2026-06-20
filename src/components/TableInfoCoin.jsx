import { Table, TableBody, TableCell, TableRow } from "@mui/material";
const TableInfoCoin = ({ asset }) => {
  const formatNum = (val, dec = 2) =>
    parseFloat(val).toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });
  return (
    <Table sx={{ mb: 4 }}>
      <TableBody>
        <TableRow sx={{ bgcolor: "#fafafa" }}>
          <TableCell sx={{ fontWeight: "bold" }}>Информация</TableCell>
          <TableCell align="right" sx={{ fontWeight: "bold" }}>
            Данные о валюте
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Цена</TableCell>
          <TableCell align="right">{formatNum(asset.priceUsd)} $</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Доступное предложение для торговли</TableCell>
          <TableCell align="right">
            {formatNum(asset.supply / 1000000, 1)} млн
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Общее кол-во выпущенных активов</TableCell>
          <TableCell align="right">
            {formatNum(asset.maxSupply / 1000000, 1)} млн
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Объем торгов за последние 24 часа</TableCell>
          <TableCell align="right">
            {formatNum(asset.volumeUsd24Hr / 1000000000, 1)} млрд
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Процентное изменения цены за последние 24 часа</TableCell>
          <TableCell
            align="right"
            sx={{
              color:
                asset.changePercent24Hr < 0 ? "error.main" : "success.main",
            }}
          >
            {formatNum(asset.changePercent24Hr)} %
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Сайт</TableCell>
          <TableCell align="right">{asset.explorer}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export { TableInfoCoin };
