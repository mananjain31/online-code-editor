import { Delete } from "@mui/icons-material";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import React from "react";

const SavedCodesTable = ({ rows, openCode, deleteCode }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleDelete = (ev, savedCode) => {
        ev.stopPropagation();
        deleteCode(savedCode);
    };

    return (
        <>
            <TableContainer component={Paper} sx={{ maxHeight: 410 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: "bolder" }}>
                                File Name
                            </TableCell>
                            <TableCell
                                align="right"
                                style={{ fontWeight: "bolder" }}
                            >
                                Language
                            </TableCell>
                            <TableCell
                                align="right"
                                style={{ fontWeight: "bolder" }}
                            ></TableCell>
                            <TableCell
                                align="right"
                                style={{ fontWeight: "bolder" }}
                            >
                                Updated at
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map(row => (
                                <TableRow
                                    key={row._id}
                                    hover
                                    sx={{ cursor: "pointer" }}
                                    onClick={() => openCode(row)}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.fileName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.selectedLanguage}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            onClick={ev =>
                                                handleDelete(ev, row)
                                            }
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        {new Date(
                                            row.updatedAt
                                        ).toLocaleString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <footer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component={Paper}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </footer>
        </>
    );
};

export default SavedCodesTable;
