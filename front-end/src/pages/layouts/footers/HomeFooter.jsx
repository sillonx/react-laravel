import { 
    Grid
} from '@mui/material'

export default function HomeHeader () {
    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' py={4} px={1} sx={{ position:'relative', right:0, left:0, bottom:0, backgroundColor:'primary.main' }}>
        </Grid>
    )
}