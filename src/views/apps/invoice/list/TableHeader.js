// ** Next Import
import Link from "next/link";

// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

const TableHeader = (props) => {
  // ** Props
  const {
    value,
    selectedRows,
    handleFilter,
    href = "/apps/invoice/add",
    text = "Nowy Wniosek",
    removeButton = true,
  } = props;

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {!removeButton && (
        <Link href={href} passHref>
          <Button sx={{ mb: 2 }} variant="contained">
            {text}
          </Button>
        </Link>
      )}
      
    </Box>
  );
};

export default TableHeader;
