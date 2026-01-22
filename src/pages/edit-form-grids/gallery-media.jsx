import Grid from '@mui/material/Grid';

import EditGalleryMediaPage from 'sections/forms/edit-forms/gallery-media';

export default function EditFormGalleryMedia() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={8} lg={9}>
        <EditGalleryMediaPage />
      </Grid>
    </Grid>
  );
}
