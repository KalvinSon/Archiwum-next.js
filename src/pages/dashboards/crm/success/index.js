const {
	Grid,
	Card,
	CardHeader,
	CardContent,
	Typography,
} = require("@mui/material");

const ApplicationSuccess = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Card>
					<CardHeader title="Poprawnie złożono wniosek !" />

					<CardContent>
						<Typography variant="body">
							Decyzja o przyznaniu faktoringu będzie dostępna w terminie do 48
							godzin. Prosimy o śledzenie powiadomień oraz komunikatów
							mailowych.
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default ApplicationSuccess;
