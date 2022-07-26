import { 
    Grid,
    Typography
} from '@mui/material';


export default function ProfileHeader () {
    
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' p={3}  spacing={0} sx={{ position:'static', bottom:0, display:'flex', backgroundColor:'primary.main' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <Typography variant='h3' sx={{ color:'common.white', fontWeight:'bold' }}>
                    Profile
                </Typography>
            </Grid>
        </Grid>
    )
}