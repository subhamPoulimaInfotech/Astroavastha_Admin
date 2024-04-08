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

const createHeadCells = (jsonData) => {
  if (!jsonData || !jsonData.length) return [];

  const firstItem = jsonData[0];
  const filteredKeys = Object.keys(firstItem).filter(
    (key) => key !== "variants"
  ); // Exclude "variants" key
  const headCells = filteredKeys.map((key) => ({
    id: key,
    numeric: typeof firstItem.variants[0][key] === "number",
    disablePadding: false,
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
  }));
  //   const headCells = Object.keys(firstItem.variants[0]).map((key) => ({
  //     id: key,
  //     numeric: typeof firstItem.variants[0][key] === "number",
  //     disablePadding: false,
  //     label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize first letter
  //   }));

  return headCells;
};

// Function to create dynamic rows
const createRows = (jsonData) => {
  if (!jsonData || !jsonData.length) return [];

  return jsonData.map((item, index) => {
    const {
      _id,
      name,
      variants,
      bannerImage,
      certification,
      isActive,
      supplier,
    } = item;
    return {
      id: _id,
      name,
      bannerImage,
      certification,
      isActive,
      supplier,
      variants: variants.map((variant) => ({
        ...variant,
        id: variant._id,
      })),
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
              {headCell.label == "BannerImage" ? "Image" : headCell.label == "_id" ? '' : headCell.label}
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

export default function EnhancedTable({
  products,
  rowsPerPage,
  setRowsPerPage,
  page,
  setPage,
  totalProducts,
  totalPages,
  selectedProducts,
  setSelectedProducts,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  // const [selected, setSelected] = React.useState([]);
  // const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  // const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPage);
  const [open, setOpen] = React.useState({});

  // Creating dynamic headCells and rows
  const headCells = createHeadCells(products);
  const rows = createRows(products);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelectedProducts(newSelected);
      return;
    }
    setSelectedProducts([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedProducts.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedProducts, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedProducts.slice(1));
    } else if (selectedIndex === selectedProducts.length - 1) {
      newSelected = newSelected.concat(selectedProducts.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedProducts.slice(0, selectedIndex),
        selectedProducts.slice(selectedIndex + 1)
      );
    }
    setSelectedProducts(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selectedProducts.indexOf(id) !== -1;

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
              numSelected={selectedProducts.length}
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
                      {/* ============== */}
                      <TableCell>
                        <IconButton
                          aria-label='expand row'
                          size='small'
                          onClick={() =>
                            setOpen((prevOpen) => ({
                              ...prevOpen,
                              [row.id]: !prevOpen[row.id],
                            }))
                          }
                        >
                          {open[row.id] ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      {/* ============= */}
                      <TableCell padding='checkbox'>
                        <Checkbox
                          color='primary'
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='none'
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align='left'>
                        <img
                          src={row.bannerImage}
                          alt='row.bannerImage'
                          style={{ width: "3rem",borderRadius: '10px' }}
                        />
                      </TableCell>
                      <TableCell align='left'>{row.certification}</TableCell>
                      <TableCell align='left' style={{ color: row?.isActive ? "green" : 'red' }}>{row.isActive ? 'Active' : 'InActive'}</TableCell>
                      <TableCell align='left'>{row.supplier}</TableCell>
                      <TableCell>
                        <Link to={`/edit-product/${row.id}`}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Link to={`/add-translation-product/${row.id}`}>
                        <button>Add Multilingual Details</button>
                        </Link>
                      </TableCell>
                    </TableRow>
                    {/* // ====================== */}
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={open[row.id]}
                          timeout='auto'
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Typography
                              variant='h6'
                              gutterBottom
                              component='div'
                            >
                              Variants
                            </Typography>
                            <Table size='small' aria-label='purchases'>
                              <TableHead>
                                <TableRow>
                                  <TableCell align='left'>Price</TableCell>
                                  <TableCell align='left'>Setting</TableCell>
                                  <TableCell align='left'>Size</TableCell>
                                  <TableCell align='left'>Shape</TableCell>
                                  <TableCell align='left'>Quantity</TableCell>
                                  <TableCell align='left'>Status</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row?.variants?.map((variant) => (
                                  <TableRow key={variant.id}>
                                    <TableCell
                                      align='left'
                                      component='th'
                                      scope='row'
                                    >
                                      {variant?.price}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {variant.setting}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {variant.size}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {variant.shape}
                                    </TableCell>
                                    <TableCell align='left'>
                                      {variant.quantity}
                                    </TableCell>
                                    <TableCell align='left'>
                                      <Typography
                                        color={
                                          variant.quantity > 10
                                            ? "green"
                                            : variant?.quantity > 0
                                            ? "#edf50c"
                                            : "red"
                                        }
                                      >
                                        {variant.quantity > 10
                                          ? "In Stock"
                                          : variant?.quantity > 0
                                          ? "Less Products"
                                          : "Out of stock"}
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                  //   ======================
                );
              })}

              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={totalProducts}
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
