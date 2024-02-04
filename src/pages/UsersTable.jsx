/* eslint-disable react/prop-types */
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import DeleteModal from "../components/DeleteModal";
import UpdateUserModal from "../components/UpdateUserModal";
import { colums } from "../data/data";
import useData from "../store";
const UsersTable = ({ data }) => {
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPage = (event) => {
    setRowPerPage(+event.target.value);
    setPage(0);
  };

  const { deleteUsersAllPosts } = useData();
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#E6EEF4" }}>
              {colums.map((column, i) => (
                <TableCell
                  key={column.id}
                  sx={{ textAlign: i === 5 ? "center" : "" }}
                >
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                .map((row, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>
                        {row.first_name + " " + row.last_name}
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.username}</TableCell>
                      <TableCell>{row.role}</TableCell>
                      <TableCell
                        sx={{
                          width: "250px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <DeleteModal userId={row._id} />
                        <UpdateUserModal user={row} />
                        <Button
                          variant="outlined"
                          onClick={() => {
                            deleteUsersAllPosts(row._id);
                          }}
                        >
                          Enter
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        page={page}
        rowsPerPage={rowPerPage}
        component="div"
        count={data.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPage}
      ></TablePagination>
    </Paper>
  );
};

export default UsersTable;
