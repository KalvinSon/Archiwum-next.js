// ** React Imports
import { useState, Fragment } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

// ** Icons Imports
import Google from "mdi-material-ui/Google";
import Github from "mdi-material-ui/Github";
import Twitter from "mdi-material-ui/Twitter";
import Facebook from "mdi-material-ui/Facebook";
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Third Party Imports
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import SiteLogo from "../components/logo";

const defaultValues = {
  email: "",
  username: "",
  password: "",
  terms: false,
};

// ** Styled Components
const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const RegisterIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "38rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "30rem",
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  "& .MuiFormControlLabel-label": {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

const Register = () => {
  // ** States
  const [showPassword, setShowPassword] = useState(false);

  // ** Hooks
  const theme = useTheme();
  const { register } = useAuth();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const schema = yup.object().shape({
    password: yup.string().min(5).required(),
    username: yup.string().min(3).required(),
    email: yup.string().email().required(),
    terms: yup
      .bool()
      .oneOf([true], "You must accept the privacy policy & terms"),
  });

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, username, password } = data;
    register({ email, username, password }, (err) => {
      if (err.email) {
        setError("email", {
          type: "manual",
          message: err.email,
        });
      }
      if (err.username) {
        setError("username", {
          type: "manual",
          message: err.username,
        });
      }
    });
  };
  const imageSource =
    skin === "bordered"
      ? "auth-v2-register-illustration-bordered"
      : "auth-v2-register-illustration";

  return (
    <Box className="content-right">
      {!hidden ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RegisterIllustrationWrapper>
            <RegisterIllustration
              alt="register-illustration"
              src={`/images/pages/image1.png`}
            />
          </RegisterIllustrationWrapper>
        </Box>
      ) : null}
      <RightWrapper
        sx={
          skin === "bordered" && !hidden
            ? { borderLeft: `1px solid ${theme.palette.divider}` }
            : {}
        }
      >
        <Box
          sx={{
            p: 7,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "background.paper",
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SiteLogo />
              <Typography
                variant="h6"
                sx={{
                  ml: 2,
                  lineHeight: 1,
                  fontWeight: 700,
                  fontSize: "1.5rem !important",
                }}
              >
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant="h5">
                Otrzymaj gotówkę nawet w 24h !
              </TypographyStyled>
              <Typography variant="body2">
                Z nami zapewnisz swojej firmie płynność finansową. Wszystko w
                100% ONLINE !
              </Typography>
            </Box>
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label="Imię"
                      onChange={onChange}
                      placeholder="Jan"
                      error={Boolean(errors.username)}
                    />
                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.username.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label="Nazwisko"
                      onChange={onChange}
                      placeholder="Kowalski"
                      error={Boolean(errors.username)}
                    />
                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.username.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label="Numer Telefonu"
                      onChange={onChange}
                      placeholder="+48 123 456 789"
                      error={Boolean(errors.username)}
                    />
                  )}
                />
                {errors.username && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.username.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextField
                      autoFocus
                      value={value}
                      onBlur={onBlur}
                      label="Adres Email"
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder="klient@email.com"
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.email.message}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl fullWidth>
                <InputLabel
                  htmlFor="auth-login-v2-password"
                  error={Boolean(errors.password)}
                >
                  Hasło
                </InputLabel>
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <OutlinedInput
                      autoFocus
                      value={value}
                      label="Hasło"
                      onBlur={onBlur}
                      onChange={onChange}
                      id="auth-login-v2-password"
                      error={Boolean(errors.password)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  )}
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "error.main" }}>
                    {errors.password.message}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl sx={{ my: 0 }} error={Boolean(errors.terms)}>
                <Controller
                  name="terms"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <FormControlLabel
                        sx={{
                          ...(errors.terms ? { color: "error.main" } : null),
                          "& .MuiFormControlLabel-label": {
                            fontSize: "0.875rem",
                          },
                        }}
                        control={
                          <Checkbox
                            checked={value}
                            onChange={onChange}
                            sx={errors.terms ? { color: "error.main" } : null}
                          />
                        }
                        label={
                          <Fragment>
                            <Typography
                              variant="body2"
                              component="span"
                              sx={{ color: errors.terms ? "error.main" : "" }}
                            >
                              Akceptuje{" "}
                            </Typography>
                            <Link href="/" passHref>
                              <Typography
                                variant="body2"
                                component={MuiLink}
                                sx={{ color: "primary.main" }}
                                onClick={(e) => e.preventDefault()}
                              >
                                regulamin i politykę prywatności
                              </Typography>
                            </Link>
                          </Fragment>
                        }
                      />
                    );
                  }}
                />
                {errors.terms && (
                  <FormHelperText sx={{ mt: 0, color: "error.main" }}>
                    {errors.terms.message}
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 7 }}
              >
                Zarejestruj Konto
              </Button>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <Typography sx={{ mr: 2, color: "text.secondary" }}>
                  Już masz konto?
                </Typography>
                <Typography>
                  <Link passHref href="/login">
                    <Typography
                      component={MuiLink}
                      sx={{ color: "primary.main" }}
                    >
                      Zaloguj się
                    </Typography>
                  </Link>
                </Typography>
              </Box>
              <Divider
                sx={{ mt: 5, mb: 7.5, "& .MuiDivider-wrapper": { px: 4 } }}
              >
                lub użyj
              </Divider>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link href="/" passHref>
                  <IconButton component="a" onClick={(e) => e.preventDefault()}>
                    <Facebook sx={{ color: "#497ce2" }} />
                  </IconButton>
                </Link>
                <Link href="/" passHref>
                  <IconButton component="a" onClick={(e) => e.preventDefault()}>
                    <Twitter sx={{ color: "#1da1f2" }} />
                  </IconButton>
                </Link>
                <Link href="/" passHref>
                  <IconButton component="a" onClick={(e) => e.preventDefault()}>
                    <Github
                      sx={{
                        color: (theme) =>
                          theme.palette.mode === "light"
                            ? "#272727"
                            : theme.palette.grey[300],
                      }}
                    />
                  </IconButton>
                </Link>
                <Link href="/" passHref>
                  <IconButton component="a" onClick={(e) => e.preventDefault()}>
                    <Google sx={{ color: "#db4437" }} />
                  </IconButton>
                </Link>
              </Box>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};
Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
Register.guestGuard = true;

export default Register;
