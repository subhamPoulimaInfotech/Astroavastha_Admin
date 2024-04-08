import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import Editor from "../../components/Editor";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Rudraksha } from "../../constants/Image";
import SelectMultiple from "../../components/Select";
import VariantTable from "../../components/VariantTable";
import { COLORS } from "../../constants/colors";
import { useEditProductMutation, useGetAllCategoriesQuery, useGetProductDetailsQuery } from "../../redux/api/productApi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUploadImageMutation } from "../../redux/api/imageApi";
import axios from "axios";
import { BASE_URL } from "../../constants/constants.config";
import { ToastContainer, toast } from "react-toastify";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const EditProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [variantImages, setVariantImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { productId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [product, setProduct] = useState(null);
  const [editableCell, setEditableCell] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [editProduct] = useEditProductMutation();
  const { data: categories, isLoading: categoryIsLoading } =
    useGetAllCategoriesQuery({
      token: token,
    });

  useEffect(() => {
    if (categories) {
      categories.forEach((el, index) => {
        if (el?.value == product?.category) {
          setSelectedCategory(el)
        }
      })
    }
  }, [product])

  const { data, isLoading } = useGetProductDetailsQuery({
    productId: productId,
    token: token,
  });


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const newBannerImage = event.target.files[0];
    setProduct(prevProduct => ({
      ...prevProduct,
      bannerImage: URL.createObjectURL(newBannerImage)
    }));
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    axios.post(`${BASE_URL}/api/admin/uploadImage`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        handleChange("bannerImage", res?.data?.result?.variants[0]);
        setIsSubmitting(false);
      })
      .catch(err => {
        toast.error(err?.message || "Error uploading Image")
        setIsSubmitting(false);
      })
  };
  const handleVariantFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      axios.post(`${BASE_URL}/api/admin/uploadImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          let updatedVariants = product?.variants;
          updatedVariants?.forEach((variant, i) => {
            variant?.images?.forEach((image, j) => {
              if (j === index) {
                updatedVariants[i].images[j] = res?.data?.result?.variants[0];
              }
            });
          });
          handleChange("variants", updatedVariants);
          setIsSubmitting(false);
        })
        .catch(err => {
          toast.error(err?.message || "Error Uploading image");
          setIsSubmitting(false);
        })
    }
    if (file) {
      setProduct(prevProduct => {
        const updatedVariants = [...prevProduct.variants]; // Create a copy of variants array
        const updatedVariant = { ...updatedVariants[0] }; // Create a copy of the variant object at the specified index
        const updatedImages = [...updatedVariant.images]; // Create a copy of the images array in the variant
        updatedImages[index] = URL.createObjectURL(file); // Update the image URL at the specified index
        setVariantImages(prevVariantImages => {
          const newVariantImages = [...prevVariantImages];
          newVariantImages[index] = file;
          return newVariantImages;
        });
        updatedVariant.images = updatedImages; // Update the images array in the copied variant object
        updatedVariants[0] = updatedVariant; // Update the variant object in the copied variants array
        return { ...prevProduct, variants: updatedVariants }; // Return a new product object with the updated variants
      });
    }
  }

  const handleUpdateProduct = () => {
    setIsSubmitting(true);
    editProduct({ token, productId, updatedProductData: product })
      .unwrap()
      .then(res => {
        toast.success(res?.message || "Edited Successfully");
      })
      .catch(err => {
        toast.error(err?.message || "Please add all required fields")
      })
    setIsSubmitting(false)
  }

  useEffect(() => {
    let myData = data;
    setProduct(myData);
  }, [data, isLoading]);

  useEffect(() => {
    console.log("🚀 ~ useEffect ~ data:", product)
  }, [product])

  const handleChange = (fieldName, newValue) => {
    setProduct({
      ...product,
      [fieldName]: newValue
    });
  };

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (product) {
      const columnNames = Object.keys(product.variants[0]);
      // const filteredColumnNames = columnNames.filter(name => name !== '_id' && name !== 'images');
      const columns = columnNames.map((columnName) => ({
        field: columnName,
        headerName: columnName.charAt(0).toUpperCase() + columnName.slice(1), // Capitalize the first letter
        editable: true,
        headerClassName: 'super-app-theme--header',
      }));
      const rows = product.variants.map((item, index) => ({
        ...item,
        // id: item._id
      }));
      setColumns(columns);
      setRows(rows);
    }
  }, [product]);

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };


  const handleCellClick = (rowId, field) => {
    console.log("🚀 ~ handleCellClick ~ rowId:", rowId)
    setEditableCell({ rowId, field });
  };

  const handleInputChange = (event, rowId, field) => {
    const updatedRows = rows.map((row) => {
      if (row._id === rowId) {
        return { ...row, [field]: event.target.value };
      }
      return row;
    });
    setRows(updatedRows);
    setProduct({
      ...product,
      variants: updatedRows
    });
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9); // Generate a random string of 9 characters
  };

  // Function to add a new variant
  const addVariant = () => {
    const newRow = {};
    columns.forEach(column => {
      if (column.field == 'type') {
        newRow[column.field] = selectedCategory?.label;
      }
      newRow[column.field] = '';
    });
    newRow._id = generateRandomId(); // Add a random ID to the new row

    console.log("🚀 ~ addVariant ~ newRow:", newRow)
    // Append the new row to the existing rows
    setRows(prevRows => [...prevRows, newRow]);
  };
  const Loader = () => {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  };


  if (!product) {
    <Typography>Loading...........</Typography>;
  }

  return (
    <Box padding={5}>
      <ToastContainer />
      {
        isSubmitting &&
        <div className="container">
          {/* Your component content here */}
          {isSubmitting && <Loader />}
          <style jsx>{`
        .container {
          position: relative;
          min-height: 100vh;
        }
        .loader-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* Adjust the shadow color as needed */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .loader {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </div>
      }
      <Link to={'/product-management'} style={{ textDecoration: 'none' }} >
        <Box
          mb={2}
          display={"flex"}
          justifyContent={"space-between"}
          width={"18rem"}
          alignItems={"center"}
        >
          <FontAwesomeIcon size={"xl"} icon={faArrowLeftLong} color={COLORS?.GreyButtonText} />
          <Typography fontSize={22} style={{ fontStyle: "normal", color: COLORS?.GreyButtonText }}>
            Back To Previous screen
          </Typography>
        </Box>
      </Link>
      <Typography fontSize={20} fontWeight={"700"}>
        Edit Product - {product?.name}
      </Typography>
      <Grid container mt={2} alignItems={"center"} >
        <Grid item xs={5}>
          <Typography mb={1} fontSize={18} fontWeight={"600"}>
            Product Photos
          </Typography>
          <Box display={'flex'} justifyContent={'center'} >
            <img
              src={product?.bannerImage}
              // src={selectedFile ? URL.createObjectURL(selectedFile) : product?.bannerImage}
              alt='rudraksha'
              style={{ width: "70%", borderRadius: '10px' }}
            />
            <label style={{ cursor: "pointer", position: 'absolute', right: '40rem' }} >
              <FontAwesomeIcon icon={faCloudArrowUp} />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </Box>
          <Box display={"flex"} mt={2} justifyContent={"space-around"} style={{ height: "90px" }}>
            {product?.variants[0]?.images?.map((el, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '10px', width: '100px', height: '100%' }}>
                <img src={el} alt='rudraksha' style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: '5px' }} />
                <label htmlFor={`fileInput-${index}`} style={{ cursor: "pointer", position: 'absolute', top: '5px', right: '5px' }}>
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </label>
                <input
                  id={`fileInput-${index}`}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => handleVariantFileChange(event, index)}
                />
              </div>
            ))}
          </Box>

          {/* <Box display={"flex"} mt={2} justifyContent={"space-around"}>
            {product?.variants[0]?.images?.map((el, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block', marginRight: '0px' }}>
                <img src={el} alt='rudraksha' style={{ width: "100%", borderRadius: '5px' }} />
                <label htmlFor={`fileInput-${index}`} style={{ cursor: "pointer", position: 'absolute', top: '5px', right: '45px' }}>
                  <FontAwesomeIcon icon={faCloudArrowUp} />
                </label>
                <input
                  id={`fileInput-${index}`}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => handleVariantFileChange(event, index)}
                />
              </div>
            ))}
          </Box> */}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Typography mb={1} fontSize={18} fontWeight={"600"}>
            Product Name and Information
          </Typography>
          <Box
            width={"90%"}
            style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
            p={3}
            height={"82%"}
            borderRadius={2}
          >
            <Box mb={2} alignItems={"center"}>
              <Typography
                mb={1}
                fontSize={16}
                fontWeight={"500"}
                textAlign={"initial"}
              >
                Product Name
              </Typography>
              <TextField
                onChange={(event) => handleChange('name', event.target.value)}
                value={product?.name}
                style={{ width: "95%" }}
                id='outlined-basic'
                // label='Outlined'
                variant='outlined'
              />
            </Box>

            <Box mb={2} alignItems={"center"}>
              <Typography
                mb={1}
                fontSize={16}
                fontWeight={"500"}
                textAlign={"initial"}
              >
                Product ID
              </Typography>
              <TextField
                value={product?._id}
                style={{ width: "95%" }}
                id='outlined-basic'
                label=''
                variant='outlined'
              />
            </Box>

            <Box mb={2} alignItems={"center"}>
              <Typography
                mb={1}
                fontSize={16}
                fontWeight={"500"}
                textAlign={"initial"}
              >
                Product Status
              </Typography>
              <Select
                style={{ width: '95%' }}
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={product?.isActive ? true : false}
                label='Product Status'
                onChange={(event) => handleChange('isActive', event.target.value)}
              >
                <MenuItem value={true}>
                  Active
                </MenuItem>
                <MenuItem value={false}>
                  InActive
                </MenuItem>
              </Select>
              {/* <TextField
                onChange={(text) => handleChange('name', text)}
                value={product?.isActive ? "Active" : "InActive"}
                style={{ width: "95%" }}
                id='outlined-basic'
                label=''
                variant='outlined'
              /> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box mt={4} mb={8}>
        <Typography mb={2} fontSize={22} fontWeight={"600"}>
          Product Description
        </Typography>
        <Editor placeholder={"Write something..."} description={product?.description}
          // setDescription={(newDescription) => handleChange('description', newDescription)}
          setDescription={(newValue) => {

            //    setProduct({
            //   ...product,
            //   description: newValue
            // })
          }
          }
        />
      </Box>
      <Grid mt={3} container>
        <Grid item xs={4}>
          <Typography fontSize={22} fontWeight={"700"} mb={2}>
            Product Specification
          </Typography>
          <Box mb={2} alignItems={"center"}>
            <Typography
              mb={1}
              fontSize={16}
              fontWeight={"500"}
              textAlign={"initial"}
            >
              Origin{" "}
            </Typography>
            <TextField
              onChange={(event) => handleChange('origin', event.target.value)}
              value={product?.origin}
              style={{ width: "95%" }}
              id='outlined-basic'
              // label='Outlined'
              variant='outlined'
            />
          </Box>
          <Box mb={2} alignItems={"center"}>
            <Typography
              mb={1}
              fontSize={16}
              fontWeight={"500"}
              textAlign={"initial"}
            >
              Lab Certificate{" "}
            </Typography>
            <TextField
              onChange={(event) => handleChange('certification', event.target.value)}
              value={product?.certification}
              style={{ width: "95%" }}
              id='outlined-basic'
              // label='Outlined'
              variant='outlined'
            />
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <Typography fontSize={22} fontWeight={"700"} mb={2}>
            Product Category
          </Typography>
          <Box mb={1} display={"flex"} justifyContent={"space-around"}>
            <Typography fontSize={17} fontWeight={"500"}>
              All Categories
            </Typography>
            <Typography fontSize={17} fontWeight={"500"}>
              Most Used
            </Typography>
          </Box>
          <Box
            textAlign={"center"}
            sx={{
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add box shadow
              padding: "20px", // Add padding for better visualization
              border: "1px solid black",
              // height: "10rem",
              overflowY: "scroll",
            }}
          >
            {categories && categories?.length > 0 && categories.map((el, index) => (
              <Box
                display={"flex"}
                justifyContent={"left"}
                alignItems={"center"}
              >
                <Checkbox
                  size='small'
                  sx={{
                    color: COLORS?.PrimaryBlue,
                    "&.Mui-checked": {
                      color: COLORS?.PrimaryBlue,
                    },
                  }}
                  {...label}
                  checked={el?.value == product?.category}
                // defaultChecked
                />
                <Typography>{el?.label}</Typography>
              </Box>
            ))}
            <Button
              size='small'
              style={{
                backgroundColor: COLORS?.PrimaryBlue,
                paddingLeft: "40px",
                paddingRight: "40px",
                marginTop: "15px",
              }}
              variant='contained'
            >
              <Typography>
                Add new
              </Typography>
            </Button>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Box>
        {
          rows && columns &&
          <>
            <div style={{ marginTop: '40px' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%', margin: '20px 0', padding: '10px' }}>
                <thead>
                  <tr>
                    {columns.map((column) => (
                      column.field === '_id' || column.field === 'images' ? null : (
                        <th key={column.field} style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: COLORS?.PrimaryBlue, color: COLORS?.PrimaryWhite }}>{column.headerName}</th>
                      )
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      {columns.map((column) => (
                        column.field === '_id' || column.field === 'images' ? null : column.field == "type" ?

                          <td key={`${row._id}-${column.field}`} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                            <span>{selectedCategory?.label}</span>
                          </td>
                          :
                          column.field == "setting" ?
                            <td key={`${row._id}-${column.field}`} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                              <select onChange={(event) => handleInputChange(event, row._id, column.field)} value={row[column.field]} >
                                <option value="looseBead">Loose Bead</option>
                                <option value="silverCap">Silver Cap</option>
                                <option value="goldCap">Gold Cap</option>
                              </select>
                            </td>
                            :
                            column.field == "shape" ?
                              <td key={`${row._id}-${column.field}`} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                <select onChange={(event) => handleInputChange(event, row._id, column.field)} value={row[column.field]} >
                                  <option value="Oval/Round">Oval/Round</option>
                                  <option value="Oval">Oval</option>
                                  <option value="Round">Round</option>
                                </select>
                              </td>
                              :
                              (
                                <td key={`${row._id}-${column.field}`} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>
                                  {editableCell?.rowId === row._id && editableCell?.field === column.field ? (
                                    <input
                                    style={{ width: '5rem', minWidth: '10px' }}
                                      type="text"
                                      value={row[column.field]}
                                      onChange={(event) => handleInputChange(event, row._id, column.field)}
                                      onBlur={() => setEditableCell(null)}
                                    />
                                  ) : (
                                    <span onClick={() => handleCellClick(row._id, column.field)}>{row[column.field] ? row[column.field] : `Add ${column.field}`}</span>
                                  )}
                                </td>
                              )
                      ))}
                    </tr>
                  ))}
                  {/* Additional row for adding new variant */}
                  {/* <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                      <button style={{ padding: '7px', backgroundColor: COLORS?.PrimaryBlue, color: COLORS?.PrimaryWhite, marginTop: '20px', borderRadius: '5px' }} onClick={addVariant}>Add New Variant</button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </>
        }
      </Box>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <Button onClick={handleUpdateProduct} style={{ backgroundColor: COLORS?.PrimaryBlue, marginTop: '30px', color: COLORS?.PrimaryWhite }}>Save Details</Button>
      </div>
      <ToastContainer />
    </Box>
  );
};

export default EditProduct;
