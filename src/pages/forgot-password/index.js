// ** Next Imports
import Link from "next/link";

// ** MUI Components
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Icons Imports
import ChevronLeft from "mdi-material-ui/ChevronLeft";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Hooks
import { useSettings } from "src/@core/hooks/useSettings";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import SiteLogo from "../components/logo";

// Styled Components
const ForgotPasswordIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const ForgotPasswordIllustration = styled("img")(({ theme }) => ({
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

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme();
  const { settings } = useSettings();

  // ** Vars
  const { skin } = settings;
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const imageSource =
    skin === "bordered"
      ? "auth-v2-forgot-password-illustration-bordered"
      : "auth-v2-forgot-password-illustration";

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
          <ForgotPasswordIllustrationWrapper>
            <ForgotPasswordIllustration
              alt="forgot-password-illustration"
              src={`/images/pages/image1.png`}
            />
          </ForgotPasswordIllustrationWrapper>
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
                Zapomniałeś Hasła?
              </TypographyStyled>
              <Typography variant="body2">
                Wpisz swój adres Email, a wyślemy Ci instrukcje zresetowania
                hasła.
              </Typography>
            </Box>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                autoFocus
                type="email"
                label="Adres Email"
                sx={{ display: "flex", mb: 4 }}
              />
              <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{ mb: 5.25 }}
              >
                Wyślij link do resetu hasła
              </Button>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Link passHref href="/login">
                  <Typography
                    component={MuiLink}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "primary.main",
                      justifyContent: "center",
                    }}
                  >
                    <ChevronLeft sx={{ mr: 1.5, fontSize: "2rem" }} />
                    <span>Powrót do logowania</span>
                  </Typography>
                </Link>
              </Typography>
            </form>
          </BoxWrapper>
        </Box>
      </RightWrapper>
    </Box>
  );
};
ForgotPassword.guestGuard = true;
ForgotPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default ForgotPassword;
