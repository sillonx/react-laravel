import { 
    Grid,
    Typography
} from '@mui/material';


export default function PrivacyPolicyHeader () {
    
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' p={3}  spacing={0} sx={{ position:'static', bottom:0, display:'flex', backgroundColor:'primary.main' }}>
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} justifyContent='flex-start' alignItems='center' sx={{ display:'flex' }}>
            </Grid>

            <Grid item xs={10} sm={10} md={10} lg={10} xl={10} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <Typography variant='h3' sx={{ color:'common.white', fontWeight:'bold' }}>
                    Privacy Policy
                </Typography>
            </Grid>
            
            <Grid item xs={1} sm={1} md={1} lg={1} xl={1} justifyContent='flex-end' alignItems='center' sx={{ display:'flex' }}>
            </Grid>
        </Grid>
    )
}