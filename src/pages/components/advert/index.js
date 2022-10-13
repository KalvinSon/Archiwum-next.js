const { default: styled } = require("@emotion/styled");
const { Box, Typography, Button } = require("@mui/material");
import Link from "next/link";

const GradientBox = styled(Box)`
  background: rgba(97, 73, 205, 1);
  background: linear-gradient(
    125deg,
    rgba(97, 73, 205, 1) 0%,
    rgba(231, 94, 140, 1) 100%
  );
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AdvertBlock = ({
  text = "Dowiedz sie wiecej o naszej usludze",
  buttonText = "Wiecej",
  sx = {},
  href = "http://fifth-factor.pl/",
}) => {
  return (
    <GradientBox
      sx={{
        p: "2.5rem 2rem",
        gap: "2rem",
        maxWidth: "20rem",
        ...sx,
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontWeight: 500,
          lineHeight: "22px",
          letterSpacing: ".1px",
          fontSize: "2rem",
          textAlign: "center",
        }}
        variant="h5"
      >
        {text}
      </Typography>
      <Link href={href} passHref>
        <Button
          sx={{
            mb: 2,
            color: "#6149cd",
            backgroundColor: "#FFF",
            px: "3rem",
            borderRadius: "1rem",
            ":hover": {
              color: "white",
            },
          }}
          variant="contained"
        >
          {buttonText}
        </Button>
      </Link>
    </GradientBox>
  );
};

export default AdvertBlock;
