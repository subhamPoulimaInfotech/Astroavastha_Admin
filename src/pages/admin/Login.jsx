import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import {
  BottomLeaf,
  BottomStone,
  Logo,
  SunIcon,
  TopLeaf,
} from "../../constants/Image";
import { orangeyellow_linearBG } from "../../constants/colors";
import Email from "../../components/customInputFeilds/Email";
import Password from "../../components/customInputFeilds/password";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {
  useLoginMutation,
  useVerifyOtpMutation,
} from "../../redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
import OTPInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const mobileRegex = /^\d{10}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const emailOrMobileValidation = Yup.string().test(
  "is-email-or-mobile",
  "Please enter 10 digits mobile number",
  (value) => emailRegex.test(value) || mobileRegex.test(value)
);

const validationSchema = Yup.object({
  mobile: emailOrMobileValidation.required("Mobile number is required"),
  // password: Yup.string()
  //   .matches(passwordRegex, "Please enter a valid password")
  //   .required("Password is required"),
});

export default function Login() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState(false);
  const [login] = useLoginMutation();
  const [verifyOtp, { isLoading: verifyOtpLoading }] = useVerifyOtpMutation();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = (loginData) => {
    console.log("🚀 ~ handleLogin ~ loginData:", loginData);
    login(loginData)
      .unwrap()
      .then((res) => {
        setOtpSent(true);
        console.log("🚀 ~ handleLogin ~ res:", res);
        setUserId(res?.userId);
      })
      .catch((err) => {
        console.log("🚀 ~ handleLogin ~ err:", err);
      });
  };

  const handleVerifyOtp = () => {
    verifyOtp({
      userId: userId,
      otp: otp,
    })
      .unwrap()
      .then((res) => {
        console.log("🚀 ~ .then ~ res:", res);
        dispatch(setUser({ user: res?.user, token: res?.token }));
        navigate('/');
      })
      .catch((err) => {
        console.log("🚀 ~ handleVerifyOtp ~ err:", err);
      });
  };

  const [inputStyle, setInputStyle] = useState({
    backgroundColor: "transparent",
    width: "3rem", // Default width
    height: "3rem", // Default height
    marginRight: "1rem",
    fontSize: "1.3rem",
    color: "white",
    border: "1px solid white",
    boxShadow: 'none', // Removes any shadow
    outlineColor: 'white', // Removes the default focus outline
    outlineWidth: "2px"
  });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 321) {
        setInputStyle((prevStyle) => ({
          ...prevStyle,
          width: '2.5rem',
          height: '2.5rem',
        }));
      } else {
        setInputStyle((prevStyle) => ({
          ...prevStyle,
          width: '3rem',
          height: '3rem',
        }));
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the style based on current window size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.up('1400')]: {
          mt: "3rem",
        },
        maxWidth: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          width: "20%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "3rem",
          mt: 5,
        }}
      >
        <Box
          component='img'
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: {
              sm: "145px",
              md: "160px",
              lg: "200px",
            },
          }}
          src={SunIcon}
          alt='Sun Icon'
        />
        <Box
          component='img'
          sx={{
            width: "100%",
            height: "auto",
            [theme.breakpoints.up('1400')]: {
              maxWidth: "250px",
            },
            maxWidth: {
              sm: "400px",
              md: "400px",
              lg: "500px",
            },
          }}
          src={BottomLeaf}
          alt='Bottom Leaf'
        />
      </Box>

      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "70%",
            md: "70%",
            lg: "70%",
          },
          height: "auto",
          padding: {
            xs: "1rem",
            sm: "0px",
            md: "0px",
            lg: "0px",
          },
          display: "flex",
          boxSizing: "border-box",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          component='img'
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: {
              xs: "130px",
              sm: "150px",
              md: "170px",
              lg: "200px",
            },
            alignSelf: "flex-start",
            mb: "1.5rem",
            mt: {
              md: otpSent ? '0rem' : '-2rem',
              lg: otpSent ? '0rem' : '-5rem',
            },
          }}
          src={Logo}
          alt='Logo'
        />
        <Formik
          initialValues={{ mobile: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.setSubmitting(false);
            // window.location.reload();
            handleLogin({
              phoneNo: values?.mobile,
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: {
                    xs: "350px",
                    sm: "300px",
                    md: "400px",
                    lg: "600px",
                  },
                  [theme.breakpoints.up('1400')]: {
                    maxWidth: "700px",
                    padding: "50px"
                  },
                  padding: {
                    xs: "20px",
                    sm: "20px 40px",
                    md: "30px 50px",
                    lg: "30px 50px",
                  },
                  display: "flex",
                  justifyContent: "center",
                  alignSelf: "center",
                  flexDirection: "column",
                  background: orangeyellow_linearBG,
                  borderRadius: {
                    xs: 2,
                    sm: 5,
                    md: 5,
                    lg: 5,                    
                  },
                }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: {
                      xs: "1.3rem",
                      sm: "1.3rem",
                      md: "1.3rem",
                      lg: "1.5rem",                    
                    },
                    [theme.breakpoints.up('1400')]: {
                      fontSize: "1.9rem",
                    },
                    pb: "10px",
                  }}
                >
                  Welcome Back!
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "1.3rem",
                    pb: "10px",
                    mb: "1rem",
                    [theme.breakpoints.up('1400')]: {
                      fontSize: "1.9rem",
                    },
                  }}
                >
                  Login
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "1rem",
                    pb: "10px",
                    [theme.breakpoints.up('1400')]: {
                      fontSize: "1.38rem",
                    },
                    mb: "0.5rem",
                  }}
                >
                  Please enter your mobile number
                </Typography>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    flexDirection: "column",
                  }}
                >
                  <Email name='mobile' />
                  {/* <Password name='password' /> */}
                </div>
                {/* <Typography
                  sx={{
                    color: "black",
                    fontFamily: "Lexend, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "bold",
                    width: "100%",
                    textAlign: "right",
                    pt: "10px",
                  }}
                >
                  Forgot Password?
                </Typography> */}
                {otpSent && (
                  <Box>
                    <Typography
                      sx={{
                        color: "white",
                        fontFamily: "Lexend, sans-serif",
                        fontSize: "1rem",
                        pb: "10px",
                        [theme.breakpoints.up('1400')]: {
                          fontSize: "1.38rem",
                        },
                      }}
                    >
                      Please enter OTP
                    </Typography>
                    <OTPInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={4}
                      renderSeparator={<span> </span>}
                      renderInput={(props) => <input {...props} />}
                      containerStyle={{ marginTop: "10px"}}
                      inputStyle={inputStyle}
                    />
                  </Box>
                )}
                {!otpSent ? (
                  <Button
                    variant='contained'
                    type='submit'
                    disabled={isSubmitting}
                    sx={{
                      mt: 5,
                      height: "50px",
                      color: "white",
                      backgroundColor: "black",
                      [theme.breakpoints.up('1400')]: {
                        fontSize: "1.2rem",
                      },
                      "&:hover": {
                        bgcolor: "black",
                      },
                    }}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    onClick={handleVerifyOtp}
                    sx={{
                      mt: 5,
                      height: "50px",
                      color: "white",
                      backgroundColor: "black",
                      [theme.breakpoints.up('1400')]: {
                        fontSize: "1.2rem",
                      },
                      "&:hover": {
                        bgcolor: "black",
                      },
                    }}
                  >
                    Verify Otp
                  </Button>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
          width: {
            lg: "20%",
          },
          flexDirection: "column",
          height: "100%",
          placeItems: "flex-end",
          mt: {
            md: "-1.5rem",
            lg: "-1rem",
          },
        }}
      >
        <Box
          component='img'
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: {
              xs: "0px",
              sm: "130px",
              md: "170px",
              lg: "195px",
            },
          }}
          src={TopLeaf}
          alt='Top Leaf'
        />
        <Box
          component='img'
          sx={{
            width: "100%",
            height: "auto",
            maxWidth: {
              sm: "70px",
              md: "110px",
              lg: "140px",
            },
          }}
          src={BottomStone}
          alt='Bottom Stone'
        />
      </Box>
    </Box>
  );
}
