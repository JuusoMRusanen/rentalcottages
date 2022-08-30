import React, { useEffect, useState } from "react";
import { Box, Pagination, useMediaQuery, useTheme } from "@mui/material";

export default function CottagesPagination({ cottagesPerPage, totalCottages, paginate, currentPage }) {
  const theme = useTheme();

  const [page, setPage] = useState(currentPage);
  const [size, setSize] = useState("");
  const [hide, setHide] = useState(false);
  const pageCount = Math.ceil(totalCottages / cottagesPerPage);

  const matches = useMediaQuery('(min-width:420px)');
  const matches2 = useMediaQuery('(max-width:300px)');

  const handleChange = (event, value) => {
    setPage(value);
    paginate(value);
    window.scrollTo({
      top:0,
      left:0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {

    setPage(currentPage);
    
    if(matches) {
      setSize("large");
      setHide(false);
    }
    else {
      setSize("");
      setHide(false);
    }

    if(matches2) {
      setSize("small");
      setHide(true);
    }
    else {
      setSize("");
      setHide(false);
    }

  }, [currentPage, matches, matches2, size]);

  return(
    <Box style={theme.paginationBox}>
      <Pagination count={pageCount} size={size} onChange={handleChange} page={page} color="primary" variant="outlined" shape="rounded" hidePrevButton={hide} hideNextButton={hide} />
    </Box>
  )
}