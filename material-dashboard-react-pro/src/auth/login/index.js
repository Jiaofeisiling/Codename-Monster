/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CircularProgress, InputAdornment } from "@mui/material";
import Switch from "@mui/material/Switch";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import AuthService from "services/auth-service";
import { AuthContext } from "context";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";

import bgImage from "assets/images/illustrations/illustration-reset.jpg";

function Login() {
  const authContext = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
    credentialsError: "",
  });

  useEffect(() => {
    // 用户修改输入时，自动清除错误提示
    if (inputs.email) setErrors((prev) => ({ ...prev, emailError: "" }));
    if (inputs.password) setErrors((prev) => ({ ...prev, passwordError: "" }));
  }, [inputs]);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setErrors({ emailError: "", passwordError: "", credentialsError: "" });

    const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email.trim() || !inputs.email.match(mailFormat)) {
      setErrors((prev) => ({ ...prev, emailError: "Invalid email format" }));
      return;
    }
    if (inputs.password.trim().length < 6) {
      setErrors((prev) => ({ ...prev, passwordError: "Password must be at least 6 characters" }));
      return;
    }

    const myData = {
      data: {
        type: "token",
        attributes: { email: inputs.email, password: inputs.password },
      },
    };

    try {
      setLoading(true);
      const response = await AuthService.login(myData);
      authContext.login(response.access_token, response.refresh_token);
    } catch (res) {
      const errorMessage = res.message || res.errors?.[0]?.detail || "Login failed";
      setErrors((prev) => ({ ...prev, credentialsError: errorMessage }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <IllustrationLayout
      title="Sign In"
      description="Enter your email and password to sign in"
      illustration={bgImage}
    >
      <MDBox component="form" role="form" method="POST" onSubmit={submitHandler}>
        <MDBox mb={2}>
          <MDInput
            type="email"
            label="Email"
            fullWidth
            name="email"
            value={inputs.email}
            onChange={changeHandler}
            error={Boolean(errors.emailError)}
            helperText={errors.emailError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </MDBox>
        <MDBox mb={2}>
          <MDInput
            type="password"
            label="Password"
            fullWidth
            name="password"
            value={inputs.password}
            onChange={changeHandler}
            error={Boolean(errors.passwordError)}
            helperText={errors.passwordError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </MDBox>
        <MDBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <MDTypography
            variant="button"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={handleSetRememberMe}
          >
            &nbsp;&nbsp;Remember me
          </MDTypography>
        </MDBox>

        {errors.credentialsError && (
          <MDBox mt={2} textAlign="center">
            <MDTypography variant="caption" color="error" fontWeight="bold">
              {errors.credentialsError}
            </MDTypography>
          </MDBox>
        )}

        <MDBox mt={4} mb={1}>
          <MDButton variant="gradient" color="info" size="large" fullWidth type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
          </MDButton>
        </MDBox>

        <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            Forgot your password? Reset it{" "}
            <MDTypography
              component={Link}
              to="/auth/forgot-password"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              here
            </MDTypography>
          </MDTypography>
        </MDBox>

        <MDBox mt={3} textAlign="center">
          <MDTypography variant="button" color="text">
            Don&apos;t have an account?{" "}
            <MDTypography
              component={Link}
              to="/auth/register"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default Login;

