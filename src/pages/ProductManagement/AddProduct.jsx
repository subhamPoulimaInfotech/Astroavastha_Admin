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
import { faArrowLeftLong, faCloudArrowUp, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { Rudraksha, selectImage } from "../../constants/Image";
import SelectMultiple from "../../components/Select";
import VariantTable from "../../components/VariantTable";
import { COLORS } from "../../constants/colors";
import { useAddCategoryMutation, useAddProductMutation, useEditProductMutation, useGetAllCategoriesQuery, useGetAllOriginQuery, useGetProductDetailsQuery, useSaveProductDraftMutation } from "../../redux/api/productApi";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUploadImageMutation } from "../../redux/api/imageApi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from "../../constants/constants.config";
import CustomSelect from "../../components/customSelect/CustomSelect";
import { v4 as uuidv4 } from 'uuid';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddProduct = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [variantImages, setVariantImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [newCategoryName, setNewCategoryName] = useState('');
  const token = useSelector((state) => state.auth.token);
  const [product, setProduct] = useState({
    bannerImage: "",
    category: null,
    certification: "",
    description: "",
    isActive: false,
    name: "",
    origin: "",
    supplierId: "65d5d3a42776d9fef6e367a8",
    variants: [{
      type: "",
      images: [
        "",
        ""
      ],
      shape: "",
      size: "",
      price: '',
      setting: "",
      metalWeight: '',
      quantity: '',
      weightOfGem: '',
      dimensionOfGem: '',
      perCaratPrice: '',
      looseGemsCost: '',
      certificateCost: '',
      labDetails: '',
      noOfBeads: '',
      beadsSize: '',
      color: '',
      material: ''
      // _id: ""
    }],
    // _id: ""
  });
  // =========================================
  const localStorageKey = 'draftProducts';
  const [saveProductDraft] = useSaveProductDraftMutation();

  useEffect(() => {
    // const storedDrafts = localStorage.getItem(localStorageKey);
    // if (storedDrafts) {
    //   setDraftProducts(JSON.parse(storedDrafts));
    // }
    // const handleBeforeUnload = (event) => {
    //   event.preventDefault();
    //   localStorage.setItem(localStorageKey, JSON.stringify(product));
    // };
    const addDraftProduct = (event) => {
      event.preventDefault();
      saveProductDraft({ token, draftData: product })
        .unwrap()
        .then(res => {

        })
        .catch(err => {

        })
    };
    window.addEventListener('beforeunload', addDraftProduct);
    return () => {
      window.removeEventListener('beforeunload', addDraftProduct);
    };
  }, [product]);

  // =========================================

  // useEffect(() => {
  //   if (selectedCategory?.label === "GemStones") {
  //     // Define the fields for Gemstones variants
  //     const gemstoneFields = {
  //       type: "",
  //       images: [],
  //       shape: "",
  //       size: "",
  //       price: '',
  //       quantity: '',
  //       weightOfGem: "",
  //       dimensionOfGem: "",
  //       perCaratPrice: 0,
  //       looseGemsCost: 0,
  //       certificateCost: 0,
  //       setting: "",
  //       metalWeight: "",
  //       _id: ""
  //     };
  //     console.log('====================================');
  //     console.log(product.variants);
  //     console.log('====================================');
  //     const updatedVariants = product.variants.map(variant => ({
  //       // ...variant.images,
  //       ...gemstoneFields,
  //       type: selectedCategory?.label,
  //       images: variant?.images || gemstoneFields.images,
  //       shape: variant.shape || gemstoneFields.shape,
  //       size: variant.size || gemstoneFields.size,
  //       price: variant.price || gemstoneFields.price,
  //       quantity: variant.quantity || gemstoneFields.quantity
  //     }));
  //     console.log("🚀 ~ updatedVariants ~ updatedVariants:", updatedVariants)

  //     // Update the product state
  //     setProduct(prevProduct => ({
  //       ...prevProduct,
  //       variants: updatedVariants
  //     }));
  //   } else if (selectedCategory?.label === "Rudraksha") {
  //     console.log('..............');
  //     const rudrakshaFields = {
  //       type: "",
  //       images: ['', ''],
  //       shape: "",
  //       size: "",
  //       price: '',
  //       setting: "",
  //       metalWeight: '',
  //       quantity: '',
  //       _id: ""
  //     };

  //     const updatedVariants = product.variants.map(variant => ({
  //       ...rudrakshaFields,
  //       // ...variant, 
  //     }));

  //     setProduct(prevProduct => ({
  //       ...prevProduct,
  //       variants: updatedVariants
  //     }));
  //   }
  // }, [selectedCategory]);

  // type
  // images
  // shape
  // price
  // quantity
  // weightOfGem
  // dimensionOfGem
  // perCaratPrice
  // looseGemsCost
  // certificateCost

  const [editableCell, setEditableCell] = useState(null);
  const [productOrigins, setProductOrigins] = useState([]);
  const [newOrigin, setNewOrigin] = useState();

  const [addProduct] = useAddProductMutation();
  const { data: categories, isLoading: categoryIsLoading, refetch: refetchCategories } =
    useGetAllCategoriesQuery({
      token: token,
    });
  const [addCategory] = useAddCategoryMutation();
  const { data: origins } = useGetAllOriginQuery({ token: token });

  useEffect(() => {
    if (origins) {
      setProductOrigins(origins);
    }
  }, [origins])

  useEffect(() => {
    if (categories) {
      categories.forEach((el, index) => {
        if (el?.value == product?.category) {
          setSelectedCategory(el)
        }
      })
    }
  }, [product])
  useEffect(() => {
    setProduct(prevProduct => ({
      ...prevProduct,
      variants: prevProduct.variants.map(variant => ({
        ...variant,
        type: selectedCategory?.label // Update type to selected category label
      }))
    }));
  }, [selectedCategory]);
  useEffect(() => {
    if (product) {
      const columnNames = Object.keys(product.variants[0]);
      const columns = columnNames.map((columnName) => ({
        field: columnName,
        headerName: columnName.charAt(0).toUpperCase() + columnName.slice(1), // Capitalize the first letter
        editable: true,
        headerClassName: 'super-app-theme--header',
      }));
      const rows = product.variants.map((item, index) => ({
        ...item,
      }));
      setColumns(columns);
      setRows(rows);
    }
  }, [product]);


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
        toast.error(err)
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
          toast.error(err)
          setIsSubmitting(false);
        })
    }
    if (file) {
      setProduct(prevProduct => {
        const updatedVariants = [...prevProduct.variants];
        const updatedVariant = { ...updatedVariants[0] };
        const updatedImages = [...updatedVariant.images];
        updatedImages[index] = URL.createObjectURL(file);
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
  const handleChange = (fieldName, newValue) => {
    setProduct({
      ...product,
      [fieldName]: newValue
    });
  };


  const handleCellClick = (rowId, field) => {
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
      if (column?.field == 'type') {
        newRow[column.field] = selectedCategory?.label;
      } else {
        newRow[column.field] = '';
      }
    });
    newRow._id = generateRandomId(); // Add a random ID to the new row

    console.log("🚀 ~ addVariant ~ newRow:", newRow)
    // Append the new row to the existing rows
    setRows(prevRows => [...prevRows, newRow]);
  };

  const handleAddProduct = () => {
    // toast.success("hiii")
    setIsSubmitting(true);
    const { _id, variants, ...productWithoutId } = product;
    const variantsWithoutId = variants.map(({ _id, ...variant }) => variant);
    const newProduct = { ...productWithoutId, variants: variantsWithoutId };
    addProduct({ token, productData: newProduct })
      .unwrap()
      .then(res => {
        toast.success(res?.message || "Product Added Successfully");
        setIsSubmitting(false);
      })
      .catch(err => {
        toast.error(err?.message || "Enter All Required fields");
        setIsSubmitting(false);
      })
  }

  const handleAddCategory = () => {
    addCategory({ token, categoryData: { name: newCategoryName, description: '' } })
      .unwrap()
      .then(res => {
        toast.success(res?.message || "Category Added Successfully")
        setNewCategoryName('')
        refetchCategories();
      })
      .catch(err => {
        toast.error(err?.message || "Error adding Category")
      })
  }

  const addOrigin = () => {
    setProductOrigins([...productOrigins, {
      value: newOrigin,
      label: newOrigin
    }])
    setNewOrigin('');
  }

  const addImageToAllVariants = () => {
    const updatedProduct = { ...product };
    updatedProduct.variants.forEach(variant => {
      variant.images.push("");
    });
    setProduct(updatedProduct);
  };

  const Loader = () => {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  };
  if (product) {
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
      <Grid container >
        <Grid item xs={6} >
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
        </Grid>
        <Grid item xs={6} >
          <Link to={'/saved-drafts'} >
            <button>Drafts</button>
          </Link>
        </Grid>
      </Grid>
      <Typography fontSize={22} fontWeight={"700"}>
        Add Product
      </Typography>
      <Grid container mt={2} alignItems={"center"} >
        <Grid item xs={5}>
          <Typography mb={1} fontSize={18} fontWeight={"600"}>
            Product Photos
          </Typography>
          <Box display={'flex'} justifyContent={'center'} >
            <label htmlFor="mainFileInput" style={{ cursor: "pointer", display: 'flex', justifyContent: 'center' }}>
              <img
                src={selectedFile ? URL.createObjectURL(selectedFile) : selectImage}
                alt='rudraksha'
                style={{ width: "90%", borderRadius: '10px' }}
              />
              <input
                id="mainFileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
          </Box>
          <Box display={"flex"} mt={2} justifyContent={"space-around"}>
            {product?.variants[0]?.images?.map((el, index) => (
              <label htmlFor={`variantFileInput-${index}`} style={{ cursor: "pointer", display: 'flex', justifyContent: 'center' }}>
                <img src={variantImages[index] ? URL.createObjectURL(variantImages[index]) : selectImage} alt='rudraksha' style={{ width: "90%", borderRadius: '5px' }} />
                <input
                  id={`variantFileInput-${index}`}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(event) => handleVariantFileChange(event, index)}
                />
              </label>
            ))}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => addImageToAllVariants()} >
              <FontAwesomeIcon size="2xl" icon={faSquarePlus} />
            </div>
          </Box>
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
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box mt={4} mb={8}>
        <Typography mb={2} fontSize={22} fontWeight={"600"}>
          Product Description
        </Typography>
        <Editor placeholder={"Write something..."} description={product?.description} setDescription={(newDescription) => handleChange('description', newDescription)} />
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
            <CustomSelect
              style={{ width: '100%' }}
              value={product?.origin}
              onChange={(event) => handleChange('origin', event.target.value)}
              options={productOrigins}
              placeholder="Origin"
            />
            <Box display={'flex'} alignItems={'center'} mt={2} >
              <input
                value={newOrigin}
                onChange={(event) => setNewOrigin(event.target.value)}
                style={{ width: "95%", height: '25px', paddingLeft: '10px' }} // Adjust height as needed
              />
              <button
                onClick={addOrigin}
                style={{ padding: '7px', backgroundColor: COLORS?.PrimaryBlue, color: COLORS?.PrimaryWhite, cursor: 'pointer', height: '30px' }}
              >
                Add
              </button>
            </Box>
            {/* <TextField
              onChange={(event) => handleChange('origin', event.target.value)}
              value={product?.origin}
              style={{ width: "95%" }}
              id='outlined-basic'
              // label='Outlined'
              variant='outlined'
            /> */}
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
        <Grid item xs={4}>
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
                  onChange={() => handleChange('category', el.value)} // Pass el.value as the new value
                // defaultChecked
                />
                <Typography>{el?.label}</Typography>
              </Box>
            ))}
            <Box display={'flex'} alignItems={'center'} mt={2} >
              <input
                value={newCategoryName}
                onChange={(event) => setNewCategoryName(event.target.value)}
                style={{ width: "95%", height: '25px', paddingLeft: '10px' }} // Adjust height as needed
              />
              <button
                onClick={handleAddCategory}
                style={{ padding: '7px', backgroundColor: COLORS?.PrimaryBlue, color: COLORS?.PrimaryWhite, cursor: 'pointer', height: '30px' }}
              >
                Add
              </button>
            </Box>

            {/* <Button
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
            </Button> */}
          </Box>

        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <div style={{
        width: '70rem', overflowX: 'scroll', scrollbarWidth: 'thin', /* Firefox */
        scrollbarColor: '#888 #f1f1f1'
      }}   >
        {
          columns &&
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
                  {rows && rows.map((row) => (
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
                                <option value="">Choose Setting</option>
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
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                      <button style={{ padding: '7px', backgroundColor: COLORS?.PrimaryBlue, color: COLORS?.PrimaryWhite, marginTop: '20px', borderRadius: '5px', cursor: 'pointer' }} onClick={addVariant}>Add New Variant</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>

        }
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <Button onClick={handleAddProduct} style={{ backgroundColor: COLORS?.PrimaryBlue, marginTop: '30px', color: COLORS?.PrimaryWhite, cursor: 'pointer' }}>Save Details</Button>
      </div>
    </Box>
  );
};

export default AddProduct;
