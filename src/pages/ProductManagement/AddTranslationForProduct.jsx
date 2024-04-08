import { Box, Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Editor from '../../components/Editor'
import { COLORS } from '../../constants/colors'
import { Link, useParams } from 'react-router-dom'
import { useAddTranslationForProductMutation, useGetTranslationsForProductQuery } from '../../redux/api/productApi'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'

const AddTranslationForProduct = () => {
    const { productId } = useParams();
    const token = useSelector((state) => state.auth.token);

    const [productDetails, setProductDetails] = useState({
        name: "",
        language: "",
        description: ""
    });

    const [addTranslationForProduct] = useAddTranslationForProductMutation();
    const { data: translations } = useGetTranslationsForProductQuery({ token, productId });


    useEffect(() => {
        if (productDetails?.language && translations) {
            const currentTranslation = translations.find(translation => translation.language === productDetails.language);
            if (currentTranslation) {
                handleChange('name', currentTranslation.name)
                handleChange('description', currentTranslation.description)
            }else{
                handleChange('name', "")
                handleChange('description', "")
            }
        }
        console.log(productDetails);
    }, [productDetails?.language]);


    // const handleChange = (fieldName, newValue) => {
    //     // console.log('......',fieldName, newValue);
    //     setProductDetails({
    //         ...productDetails,
    //         [fieldName]: newValue
    //     });
    // };

    const handleChange = (fieldName, newValue) => {
        setProductDetails(prevProductDetails => ({
            ...prevProductDetails,
            [fieldName]: newValue
        }));
    };
    

    const handleAddTranslation = () => {
        addTranslationForProduct({ token, productData: productDetails, productId })
            .unwrap()
            .then(res => {
                console.log("🚀 ~ handleAddTranslation ~ res:", res)
            })
            .catch(err => {
                console.log("🚀 ~ handleAddTranslation ~ err:", err)
            })
    }

    return (
        <Box ml={3} mt={4} >
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
            <Grid container mt={5} >
                <Grid item xs={3} ></Grid>
                <Grid item xs={6} >
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
                                value={productDetails?.name}
                                style={{ width: "95%" }}
                                id='outlined-basic'
                                // label='Product Name'
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
                                value={productId}
                                style={{ width: "95%" }}
                                id='outlined-basic'
                                label='Product Id'
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
                                Language
                            </Typography>
                            <Select
                                style={{ width: '95%' }}
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={productDetails?.language}
                                label='Language'
                                onChange={(event) => handleChange('language', event.target.value)}
                            >
                                <MenuItem value={'bn'}>
                                    Bengali
                                </MenuItem>
                                <MenuItem value={'hi'}>
                                    Hindi
                                </MenuItem>
                            </Select>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box mt={4} mb={10}>
                <Typography mb={2} fontSize={22} fontWeight={"600"}>
                    Product Description
                </Typography>
                <Editor placeholder={"Write something..."}
                    description={productDetails?.description}
                    setDescription={(newDescription) => handleChange('description', newDescription)}
                />
            </Box>
            <div style={{ display: 'grid', placeItems: 'center', margin: '50px' }}>
                <Button
                    onClick={handleAddTranslation}
                    style={{ backgroundColor: COLORS?.PrimaryBlue, marginTop: '30px', color: COLORS?.PrimaryWhite, cursor: 'pointer' }}>Save Details</Button>
            </div>
        </Box>
    )
}

export default AddTranslationForProduct