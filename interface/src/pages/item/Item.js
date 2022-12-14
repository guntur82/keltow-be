import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import LoadingBar from '../../helpers/LoadingBar';
import { Link } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';
import { deleteItem, getItem, historyItem } from '../../axios/itemAxios';
import { getListItemWarna } from '../../axios/warnaAxios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Item = () => {
  const API_img = 'http://localhost:3000/uploads/';
  const [item, setItem] = useState([]);
  const [listWarna, setListWarna] = useState([]);
  const [history, setHistory] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sorting, setSorting] = useState({
    data: '',
  });

  useEffect(() => {
    getListItemWarna((result) => setListWarna(result));
    historyItem((result) => setHistory(result));
    getItem((result) => setItem(result));
  }, []);
  const deleteHandler = (id) => {
    deleteItem(id);
  };
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#bfd1ec',
      color: theme.palette.common.black,
      fontSize: 20,
      fontStyle: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Navbar></Navbar>
      <h3 className="mb-3 text-center">Item</h3>

      <div className="row my-3 text-center">
        <div className="col-9 mx-auto">
          <div className="w-100 text-center my-3">
            <div className="row justify-content-end">
              <div className="col-2">
                <Link to="/item/create" className="btn btn-sm btn-primary my-2">
                  <span className="me-2">
                    <FiPlusSquare></FiPlusSquare>
                  </span>
                  Tambah Item
                </Link>
              </div>
            </div>
            <select
              className="form-select"
              style={{ width: 'auto' }}
              onChange={(e) => setSorting({ ...sorting, data: e.target.value })}
            >
              <option value="">Item</option>
              <option value="history">History Penambahan Item</option>
            </select>
          </div>
          <div className="w-100">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell align="center">No.</StyledTableCell>
                    <StyledTableCell align="center">Nama</StyledTableCell>
                    <StyledTableCell align="center">Harga</StyledTableCell>
                    <StyledTableCell align="center">Deksripsi</StyledTableCell>
                    <StyledTableCell align="center">Tanggal</StyledTableCell>
                    <StyledTableCell align="center">Stok</StyledTableCell>
                    <StyledTableCell align="center">Penjual</StyledTableCell>
                    <StyledTableCell align="center">Brand</StyledTableCell>
                    <StyledTableCell align="center">Warna</StyledTableCell>
                    <StyledTableCell align="center">Gambar</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {sorting.data ? (
                    history.length > 0 ? (
                      history
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((historys, key) => {
                          const { id, jumlah, tanggal } = historys;
                          return (
                            <StyledTableRow key={id}>
                              <StyledTableCell>{key + 1}</StyledTableCell>
                              <StyledTableCell>
                                {historys.user.name}
                              </StyledTableCell>
                              <StyledTableCell>
                                {historys.item.name}
                              </StyledTableCell>
                              <StyledTableCell>
                                {historys.jumlah}
                              </StyledTableCell>
                              <StyledTableCell>
                                {historys.tanggal}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })
                    ) : (
                      <LoadingBar />
                    )
                  ) : item.length > 0 ? (
                    item
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((items, key) => {
                        console.log(items);
                        const {
                          id,
                          name,
                          harga,
                          gambar,
                          deskripsi,
                          tanggal,
                          stok,
                          userId,
                          brandId,
                        } = items;
                        console.log(items);
                        return (
                          <StyledTableRow key={id}>
                            <StyledTableCell>
                              {key + 1 + page * 5}
                            </StyledTableCell>
                            <StyledTableCell>{name}</StyledTableCell>
                            <StyledTableCell>
                              Rp.
                              {new Intl.NumberFormat('de-DE', {
                                prefix: 'Rp',
                                centsLimit: 0,
                                thousandsSeparator: '.',
                              }).format(harga)}
                            </StyledTableCell>
                            <StyledTableCell>{deskripsi}</StyledTableCell>
                            <StyledTableCell>{tanggal}</StyledTableCell>
                            <StyledTableCell>{stok}</StyledTableCell>
                            <StyledTableCell>
                              {userId ? items.user.name : ' - '}
                            </StyledTableCell>
                            <StyledTableCell>
                              {brandId ? items.brand.nama : ' - '}
                            </StyledTableCell>
                            <StyledTableCell>
                              {/* {listWarna.map((data, i) => {
                            const { itemId } = data;
                            if (id === itemId) {
                              return (
                                <div className="pallete" key={i}>
                                  <div className="kotak">
                                    <div
                                      className="box"
                                      style={{
                                        backgroundColor: data.warna.nama_warna,
                                        borderColor: "black",
                                      }}
                                    >
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          })} */}
                              {/* <Stack direction="row" spacing={1} maxRow="3"> */}
                              <Box sx={{ width: '100%' }}>
                                <Grid
                                  sx={{ flexGrow: 2 }}
                                  container
                                  spacing={1}
                                  px={2}
                                >
                                  {listWarna.map((data, i) => {
                                    const { itemId } = data;
                                    if (id === itemId) {
                                      return (
                                        <Chip
                                          label={data.warna.nama_warna}
                                          variant="outlined"
                                          style={{
                                            // backgroundColor: data.warna.nama_warna,
                                            borderColor: 'black',
                                          }}
                                        ></Chip>
                                        // <option>
                                        //   <p>{data.warna.nama_warna}</p>
                                        // </option>
                                      );
                                    }
                                  })}
                                </Grid>
                              </Box>
                              {/* </Stack> */}
                              {/* <select>
                              {listWarna.map((data, i) => {
                                const { itemId } = data;
                                // <option>
                                //   <p>{data.warna.nama_warna}</p>
                                // </option>
                              })}
                            </select> */}
                            </StyledTableCell>
                            <StyledTableCell>
                              <img
                                alt="gambar"
                                src={gambar ? API_img + gambar : ''}
                                className="img-thumbnail"
                                width={gambar ? '100' : 0}
                                height={gambar ? '100' : 0}
                              />
                            </StyledTableCell>
                            <StyledTableCell>
                              <div
                                style={{
                                  paddingRight: '10px',
                                  paddingBottom: '10px',
                                }}
                              >
                                <Link
                                  to={`/item/edit/${id}`}
                                  className="btn btn-sm btn-primary"
                                  style={{ width: '100px' }}
                                >
                                  Edit
                                </Link>
                              </div>
                              <div
                                style={{
                                  paddingRight: '10px',
                                  paddingBottom: '10px',
                                }}
                              >
                                <Link
                                  to={`/item/add/${id}`}
                                  className="btn btn-sm btn-success"
                                  style={{ width: '100px' }}
                                >
                                  Tambah
                                </Link>
                              </div>
                              <div
                                style={{
                                  paddingRight: '10px',
                                  paddingBottom: '10px',
                                }}
                              >
                                <button
                                  onClick={() => deleteHandler(+id)}
                                  className="btn btn-sm btn-danger"
                                  style={{ width: '100px' }}
                                >
                                  Delete
                                </button>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })
                  ) : (
                    <LoadingBar />
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={item.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
