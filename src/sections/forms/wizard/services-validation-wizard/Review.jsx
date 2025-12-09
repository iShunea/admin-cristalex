import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

export default function Review({ data }) {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Review Service
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Title Key
            </Typography>
            <Typography variant="body1">
              {data.titleKey || '-'}
            </Typography>
          </Stack>
        </Grid>
        
        <Grid item xs={12}>
          <Divider />
        </Grid>
        
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Description Key
            </Typography>
            <Typography variant="body1">
              {data.descKey || '-'}
            </Typography>
          </Stack>
        </Grid>
        
        <Grid item xs={12}>
          <Divider />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Price
            </Typography>
            <Typography variant="body1">
              {data.price || '-'}
            </Typography>
          </Stack>
        </Grid>
        
        <Grid item xs={12}>
          <Divider />
        </Grid>
        
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Features
            </Typography>
            {data.features && data.features.length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {data.features.map((feature, index) => (
                  <Chip key={index} label={feature} size="small" sx={{ mb: 1 }} />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No features added
              </Typography>
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

Review.propTypes = {
  data: PropTypes.object
};
