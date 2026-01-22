// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import ImageDisplay from 'components/ImageDisplay';

// ==============================|| VALIDATION WIZARD - REVIEW  ||============================== //

export default function Review({ data }) {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Name
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.name}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Role / Specialization
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.role}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Bio / Description
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.bio}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Display Order
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.orderIndex}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Photo
            </Typography>
            <ImageDisplay file={data.imageUrl} />
          </Stack>
        </Grid>

        {data.certifications && data.certifications.length > 0 && (
          <Grid item xs={12}>
            <Stack spacing={2}>
              <Typography variant="h6" gutterBottom>
                Licenses & Certifications ({data.certifications.length})
              </Typography>
              <Grid container spacing={2}>
                {data.certifications.map((cert, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ height: '100%' }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={cert.preview}
                        alt={cert.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="body2" noWrap title={cert.name}>
                          {cert.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
}
