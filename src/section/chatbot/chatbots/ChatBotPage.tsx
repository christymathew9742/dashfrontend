"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  TextField,
  TablePagination,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from "@/redux/store";
import { getBotSelector } from "@/redux/reducers/chatBot/selectors";
import { getPendingSelector } from "@/redux/reducers/chatBot/selectors";
import { deleteBotRequest, fetchBotRequest, postFetchBotRequest, updateBotRequest } from "@/redux/reducers/chatBot/actions";
import { constantsText } from "@/constant/constant";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Loader from "@/component/Loader/Loader";
import Link from "next/link";
import { useSearchParams,useRouter, usePathname } from 'next/navigation';
import { toast } from "react-toastify";

const {
  BOT:{
    CREATE_CHAT:{
      TITLE,
      STATUS,
      DATE,
      ACTION,
    }
  },
} = constantsText;

const Skeleton = styled("div")<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2),
  boxShadow: theme.shadows[1],
}));

const ChatBot = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title');
  const dispatch = useDispatch<AppDispatch>();
  const pendingStatus = useSelector(getPendingSelector)
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const currentPath = usePathname()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const botData = useSelector(getBotSelector); 
  const isPending = useSelector(getPendingSelector);

  useEffect(() => {
    dispatch(fetchBotRequest());
  }, [dispatch]);

  const handleDelete = async (id: any,title:string) => {
    try {
      await dispatch(deleteBotRequest(id));
      if(!pendingStatus?.pending) {
        setTimeout(() => {
          dispatch(fetchBotRequest());
        }, 500);
        toast.success(`${title} deleted successfully`);
      }
    } catch (error) {
      console.log('error',error)
      toast.error(`Error in ChatBot deleted`);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(botData.data.map((row: any) => row.id));
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxClick = (id: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const filteredRows = botData.data?.filter((row: any) =>
    row.title.toLowerCase().includes(search.toLowerCase())
  ) || [];

  useEffect(()=>{
    if(title) {
      toast.success(`${title} || "Chatbot"} saved successfully`);
    }
  },[title])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Skeleton height={100}>
          <Link
            // href={"/chatbot-details"}
            href={`/chatbot-details?botNum=${botData?.data?.length+1}`}
          >
            <Button variant="contained" color="primary">
              Add New Chatbot
            </Button>
          </Link>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
          />
          <Button variant="outlined" color="secondary">
            Go Back
          </Button>
        </Skeleton>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ boxShadow: theme.shadows[3] }}>
          <Table sx={{ minWidth: 650 }} aria-label="chatbot table">
            <TableHead>
              <TableRow>
                <TableCell align="center" padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < filteredRows?.length}
                    checked={filteredRows?.length > 0 && selected.length === filteredRows?.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell align="center">{TITLE}</TableCell>
                <TableCell align="center">{DATE}</TableCell>
                <TableCell align="center">{STATUS}</TableCell>
                <TableCell align="center">{ACTION}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows && filteredRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              ) : (
                (filteredRows || []) 
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    const formattedDate = new Date(row?.updatedAt).toISOString().split("T")[0];
                    return (
                      <TableRow key={row.id}>
                        <TableCell align="center" padding="checkbox">
                          <Checkbox
                            checked={selected.includes(row.id)}
                            onChange={() => handleCheckboxClick(row.id)}
                          />
                        </TableCell>
                        <TableCell align="center">{row?.title}</TableCell>
                        <TableCell align="center">{formattedDate}</TableCell>
                        <TableCell align="center">{row?.status ? 'Enabled' : 'Disabled'}</TableCell>
                        <TableCell align="center">
                          <Link
                            // href={`/chatbot-details?chatbot=${row?._id}`}
                            href={`/order?botId=${row?._id}`}
                          >
                            <IconButton>
                              <EditNoteIcon sx={{color:'#108310'}} />
                            </IconButton>
                          </Link>
                          <IconButton onClick={() => handleDelete(row._id,row?.title)}>
                            <DeleteIcon sx={{color:'#c61919'}} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>
  );
};

export default ChatBot;





