import Grid from '@mui/material/Grid';

import AddGalleryMediaPage from 'sections/forms/wizard/gallery-media-wizard';

export default function FormGalleryMedia() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={8} lg={9}>
        <AddGalleryMediaPage />
      </Grid>
    </Grid>
  );
}
