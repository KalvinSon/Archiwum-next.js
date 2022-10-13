// ** React Imports
import { useState } from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";

// ** Icons Imports
import Close from "mdi-material-ui/Close";

const ImgStyled = styled("img")(({ theme }) => ({
	width: 120,
	height: 120,
	marginRight: theme.spacing(5),
	borderRadius: theme.shape.borderRadius,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
	[theme.breakpoints.down("sm")]: {
		width: "100%",
		textAlign: "center",
	},
}));

const ResetButtonStyled = styled(Button)(({ theme }) => ({
	marginLeft: theme.spacing(4),
	[theme.breakpoints.down("sm")]: {
		width: "100%",
		marginLeft: 0,
		textAlign: "center",
		marginTop: theme.spacing(4),
	},
}));

const TabAccount = () => {
	// ** State
	const [openAlert, setOpenAlert] = useState(true);
	const [imgSrc, setImgSrc] = useState("/images/avatars/1.png");

	const onChange = (file) => {
		const reader = new FileReader();
		const { files } = file.target;
		if (files && files.length !== 0) {
			reader.onload = () => setImgSrc(reader.result);
			reader.readAsDataURL(files[0]);
		}
	};

	return (
		<CardContent>
			<form>
				<Grid container spacing={6}>
					<Grid item xs={12} sx={{ my: 5 }}>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<ImgStyled src={imgSrc} alt="Profile Pic" />
							<Box>
								<ButtonStyled
									component="label"
									variant="contained"
									htmlFor="account-settings-upload-image"
								>
									Zmień Zdjęcie Profilowe
									<input
										hidden
										type="file"
										onChange={onChange}
										accept="image/png, image/jpeg"
										id="account-settings-upload-image"
									/>
								</ButtonStyled>
								<ResetButtonStyled
									color="error"
									variant="outlined"
									onClick={() => setImgSrc("/images/avatars/1.png")}
								>
									Usuń Zdjęcie
								</ResetButtonStyled>
								<Typography sx={{ mt: 4 }} component="p" variant="caption">
									Dozwolone formy to: PNG or JPEG. Maksymalny dopuszczalny
									rozmiar to 5mb.
								</Typography>
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Imię"
							placeholder="Imię"
							defaultValue="Jan"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Nazwisko"
							placeholder="Nazwisko"
							defaultValue="Kowalski"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							type="email"
							label="Adres Email"
							placeholder="Adres Email"
							defaultValue="klient@fifth-factor.pl"
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Numer Telefonu"
							placeholder="Numer Telefonu"
							defaultValue="+48 730 799 488"
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Numer Pesel"
							placeholder="Numer Pesel"
							defaultValue="89051100321"
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							fullWidth
							label="Numer Dowodu"
							placeholder="Numer Dowodu"
							defaultValue="CHA123321"
						/>
					</Grid>

					{openAlert ? (
						<Grid item xs={12}>
							<Alert
								severity="warning"
								sx={{ "& a": { fontWeight: 400 } }}
								action={
									<IconButton
										size="small"
										color="inherit"
										aria-label="close"
										onClick={() => setOpenAlert(false)}
									>
										<Close fontSize="inherit" />
									</IconButton>
								}
							>
								<AlertTitle sx={{ mb: ".15rem" }}>
									Twój adres email nie został zweryfikowany. Sprawdź skrzynkę
									odbiorczą i potwierdź adres email.
								</AlertTitle>
								<Link href="/" onClick={(e) => e.preventDefault()}>
									Ponów wysyłkę
								</Link>
							</Alert>
						</Grid>
					) : null}

					<Grid item xs={12}>
						<Button variant="contained" sx={{ mr: 4 }}>
							Zapisz zmiany
						</Button>
					</Grid>
				</Grid>
			</form>
		</CardContent>
	);
};

export default TabAccount;
