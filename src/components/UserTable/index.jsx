import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Collapse } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment/moment";

const createHeadCells = (jsonData) => {
    if (!jsonData || !jsonData.length) return [];

    const firstItem = jsonData[0];
    const filteredKeys = Object.keys(firstItem).filter(
        (key) => key !== "_id"
    );
    const headCells = filteredKeys.map((key) => ({
        id: key,
        disablePadding: false,
        label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
    }));
    return headCells;
};

// Function to create dynamic rows
const createRows = (jsonData) => {
    if (!jsonData || !jsonData.length) return [];
    return jsonData.map((item, index) => {
        const {
            _id,
            name,
            phoneNo,
            gender,
            placeOfBirth,
            email,
            image,
            maritalStatus,
            occupation,
            isActive
        } = item;
        return {
            _id,
            name,
            phoneNo,
            gender,
            placeOfBirth,
            email,
            image,
            maritalStatus,
            occupation,
            isActive
        };
    });
};

// // Creating dynamic headCells and rows
// const headCells = createHeadCells(jsonData);
// const rows = createRows(jsonData);

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {
        headCells,
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding='checkbox'>
                    <Checkbox
                        color='primary'
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            "aria-label": "select all desserts",
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label == '_id' ? '' : headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component='span' sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant='h6'
                    id='tableTitle'
                    component='div'
                >
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title='Delete'>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title='Filter list'>
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default function UserTable({
    users,
    rowsPerPage,
    setRowsPerPage,
    page,
    setPage,
    totalUsers,
    totalPages,
    selectedUsers,
    setSelectedUsers,
}) {
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    // const [selected, setSelected] = React.useState([]);
    // const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    // const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPage);
    const [open, setOpen] = React.useState({});

    // Creating dynamic headCells and rows
    const headCells = createHeadCells(users);
    const rows = createRows(users);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelectedUsers(newSelected);
            return;
        }
        setSelectedUsers([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selectedUsers.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedUsers, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedUsers.slice(1));
        } else if (selectedIndex === selectedUsers.length - 1) {
            newSelected = newSelected.concat(selectedUsers.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedUsers.slice(0, selectedIndex),
                selectedUsers.slice(selectedIndex + 1)
            );
        }
        setSelectedUsers(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selectedUsers.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [order, orderBy, page, rowsPerPage]
    );

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby='tableTitle'
                        // size={dense ? "small" : "medium"}
                        size={"small"}
                    >
                        <EnhancedTableHead
                            headCells={headCells}
                            numSelected={selectedUsers.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody >
                            {rows.map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <React.Fragment key={row?.id}>
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role='checkbox'
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: "pointer" }}
                                        >
                                            <TableCell padding='checkbox'>
                                                <Checkbox
                                                    color='primary'
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        "aria-labelledby": labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align='left'>{row.phoneNo}</TableCell>
                                            <TableCell align='left'>{String(row.isActive)}</TableCell>
                                            <TableCell align='left'> {moment(row?.dateOfBirth).format('YYYY-MM-DD')}</TableCell>
                                            <TableCell align='left'>{row?.gender}</TableCell>
                                            <TableCell
                                                align='left'
                                                component='th'
                                                id={labelId}
                                                scope='row'
                                                padding='none'
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align='left'>{row.placeOfBirth}</TableCell>
                                            <TableCell align='left'>{row.email}</TableCell>

                                            <TableCell align='left'>
                                                <img
                                                    src={row.image}
                                                    alt='row.bannerImage'
                                                    style={{ width: "3rem", height: '3rem', borderRadius: '50px' }}
                                                />
                                            </TableCell>
                                            <TableCell align='left'>{row.maritalStatus}</TableCell>
                                            <TableCell align='left'>{row.occupation}</TableCell>
                                            <TableCell>
                                                <Link to={`/edit-product/${row.id}`}>
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component='div'
                    count={totalUsers}
                    rowsPerPage={rowsPerPage}
                    page={page - 1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label='Dense padding'
      /> */}
        </Box>
    );
}
