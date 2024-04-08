import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProductTable from "../../components/ProductTable";
import { COLORS } from "../../constants/colors";
import SelectMultiple from "../../components/Select";
import { Downarrow } from "../../constants/icon";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useActivateProductsMutation,
  useDeactivateProductsMutation,
  useDeleteProductsMutation,
  useGetAllCategoriesQuery,
  useGetAllOriginQuery,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
} from "../../redux/api/productApi";
import EnhancedTable from "../../components/ProductTable";
import CustomButton from "../../components/Buttons/CustomButton";
import { Bin } from "../../constants/Image";
import { Lexend } from "../../constants/font";
import CustomSelect from "../../components/customSelect/CustomSelect";
import { ToastContainer, toast } from "react-toastify";

const ActionsCell = ({ params }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleDelete = () => {
    handleClose();
  };

  return (
    <div>
      <Box onClick={handleClick}>
        <MoreVertIcon />
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

const ProductManagement = () => {
  const token = useSelector((state) => state.auth.token);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: productsData,
    isLoading: productsIsLoading,
    refetch,
  } = useGetAllProductsQuery({
    page: page,
    limit: limit,
    token: token,
    categoryId: selectedCategory,
    sortOption: selectedSortOption,
    statusType: activeTab,
    origin: selectedOrigin,
    searchQuery: searchQuery
  });

  const { data: origins } = useGetAllOriginQuery({ token: token });

  const [deactivateProducts] = useDeactivateProductsMutation();
  const [deleteProducts] = useDeleteProductsMutation();
  const [activateProducts] = useActivateProductsMutation();

  useEffect(() => {
    refetch();
  }, [page, limit, selectedCategory, selectedSortOption, activeTab, selectedOrigin]);

  const { data: categories, isLoading: categoryIsLoading } =
    useGetAllCategoriesQuery({
      token: token,
    });

  const handleDeactivateClick = () => {
    deactivateProducts({ token: token, productIds: selectedProducts })
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Products Deactivated Successfully");
        refetch();
      })
      .catch((err) => {
        toast.error(err?.message || "Error In Deactivating the Products")
      });
  };

  const handleDeleteClick = () => {
    deleteProducts({ token: token, productIds: selectedProducts })
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Products Deleted Successfully");
        refetch();
      })
      .catch((err) => {
        toast.error(err?.message || "Error In Deleting Products")
      });
  }

  const handleActivateClick = () => {
    activateProducts({ token: token, productIds: selectedProducts })
      .unwrap()
      .then((res) => {
        toast.success(res?.message || "Products Activated Successfully");
        refetch();
      })
      .catch((err) => {
        toast.error(err?.message || "Error In Activating Products")
      });
  }

  const sortOptions = [
    { value: "all", label: "All" },
    { value: "newest", label: "Newest" },
    { value: "lessStock", label: "Less Stock" },
    { value: "highStock", label: "High Stock" },
  ];

  const categoryOptions = [
    { value: "all", label: "All" },
    { value: "rudrakshaBeads", label: "Rudraksha Beads" },
    { value: "rudrakshaBracelet", label: "Rudraksha Bracelet" },
    { value: "rudrakshaBeads1", label: "Rudraksha Beads1" },
    { value: "rudrakshaBracelet1", label: "Rudraksha Bracelet1" },
    { value: "rudrakshaBeads2", label: "Rudraksha Beads2" },
    { value: "rudrakshaBracelet2", label: "Rudraksha Bracelet2" },
  ];

  const originOptions = [
    { value: "all", label: "All" },
    { value: "origin1", label: "Origin 1" },
    { value: "origin2", label: "Origin 2" },
    { value: "origin3", label: "Origin 3" },
    { value: "origin4", label: "Origin 4" },
    { value: "origin5", label: "Origin 5" },
    { value: "origin6", label: "Origin 6" },
    { value: "origin7", label: "Origin 7" },
    { value: "origin8", label: "Origin 8" },
  ];

  const onSelect = (selectedOption) => {
    console.log("Selected option:", selectedOption);
  };
  const onCategorySelect = (selectedOption) => {
    console.log("Selected option:", selectedOption);
  };

  return (
    <Box bgcolor={COLORS.BgBlue}>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ToastContainer />
      <Typography m={3} fontSize={25} fontWeight={"700"}>
        Product Management
      </Typography>
      <Grid container mt={2} mb={2} pl={3} pr={3} sx={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid item xs={6} sx={{ display: 'flex', gap: '1rem' }}>
          <CustomButton text="All" activeTab={activeTab} tabName="all" setActiveTab={setActiveTab} />
          <CustomButton text="Active" activeTab={activeTab} tabName="active" setActiveTab={setActiveTab} />
          <CustomButton text="Inactive" activeTab={activeTab} tabName="inActive" setActiveTab={setActiveTab} />
          <CustomButton text="Out Of Stock" activeTab={activeTab} tabName="outOfStock" setActiveTab={setActiveTab} />
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex', gap: '1rem' }}>
          <Button style={{ backgroundColor: COLORS?.PrimaryBlue, color: COLORS?.PrimaryWhite }} onClick={handleDeactivateClick} >
            DeActivate
          </Button>
          <Button style={{ backgroundColor: COLORS?.PrimaryBlue, color: COLORS?.PrimaryWhite }} onClick={handleActivateClick} >
            Activate
          </Button>
        </Grid>
        <Grid item sx={{ display: 'flex', gap: '1rem' }}>
          <img onClick={handleDeleteClick}
            src={Bin} style={{ width: '1.8rem', cursor: 'pointer', height: '2.1rem' }} />
          <Link to='/add-product'>
            <Button
              style={{ backgroundColor: COLORS?.PrimaryBlue, fontWeight: '500', fontFamily: Lexend, textTransform: 'capitalize' }}
              variant='contained'
            >
              Add Product
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container p={2} bgcolor={COLORS?.PrimaryWhite} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography fontSize={23} fontWeight={700}>New Products</Typography>
        <Grid
          item
          xs={4}
          display={"flex"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Typography fontSize={20} fontWeight={600} mr={1}>
            Filters:{" "}
          </Typography>
          <CustomSelect
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            options={categories}
            placeholder="Categories"
          />
          <CustomSelect
            value={selectedOrigin}
            onChange={(event) => setSelectedOrigin(event.target.value)}
            options={origins}
            placeholder="Origin"
          />
        </Grid>
        <Grid
          item
          xs={3}
          display={"flex"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <Typography fontSize={20} fontWeight={600} mr={1}>
            Sort By:
          </Typography>
          <CustomSelect
            value={selectedSortOption}
            onChange={(event) => setSelectedSortOption(event.target.value)}
            options={sortOptions}
            placeholder="Select"
            name="sort"
          />
        </Grid>
      </Grid>
      {productsData?.products && (
        <EnhancedTable
          products={productsData?.products}
          rowsPerPage={limit}
          setRowsPerPage={setLimit}
          page={page}
          setPage={setPage}
          totalProducts={productsData?.totalProducts}
          totalPages={productsData?.totalPages}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      )}

      {/* <ProductTable rows={rows} columns={columns} page={page} limit={limit} /> */}
    </Box>
  );
};

export default ProductManagement;
