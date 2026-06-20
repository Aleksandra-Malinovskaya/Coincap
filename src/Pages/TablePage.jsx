import { Pagination, Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../api/api";
import { useState } from "react";
import { TableAssets } from "../components/TableAssets";

const TablePage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: response,
    isPending,
    error,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
    staleTime: 60000,
  });
  const assetsMas = response?.data || [];
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = assetsMas?.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  if (isPending)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Ошибка при загрузке данных: {error.message}</div>;

  return (
    <Box>
      <TableAssets paginatedData={paginatedData} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(assetsMas.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export { TablePage };
