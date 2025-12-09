import PropTypes from 'prop-types';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import MultiLanguageTabs from 'components/forms/MultiLanguageTabs';
import ImageDisplay from 'components/ImageDisplay';

export default function Review({ data }) {
  const [currentLang, setCurrentLang] = useState('en');

  const getTitle = () => {
    const map = { en: data.titleEn, ro: data.titleRo, ru: data.titleRu };
    return map[currentLang] || '-';
  };

  const getDescription = () => {
    const map = { en: data.descriptionEn, ro: data.descriptionRo, ru: data.descriptionRu };
    return map[currentLang] || '-';
  };

  const getMetaDescription = () => {
    const map = { en: data.metaDescriptionEn, ro: data.metaDescriptionRo, ru: data.metaDescriptionRu };
    return map[currentLang] || '-';
  };

  const getKeywords = () => {
    const map = { en: data.metaKeywordsEn, ro: data.metaKeywordsRo, ru: data.metaKeywordsRu };
    return map[currentLang] || '-';
  };

  const getFeatures = () => {
    const map = { en: data.featuresEn, ro: data.featuresRo, ru: data.featuresRu };
    const features = map[currentLang] || '';
    return features.split('\n').filter(f => f.trim() !== '');
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Review Service
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Title Key</Typography>
            <Typography variant="body1">{data.titleKey || '-'}</Typography>
          </Stack>
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Price</Typography>
            <Typography variant="body1">{data.price || '-'}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>Multilingual Content</Typography>
          <MultiLanguageTabs value={currentLang} onChange={(e, newValue) => setCurrentLang(newValue)} />
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Title ({currentLang.toUpperCase()})
            </Typography>
            <Typography variant="body1">{getTitle()}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Description ({currentLang.toUpperCase()})
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>{getDescription()}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">
              Features ({currentLang.toUpperCase()})
            </Typography>
            {getFeatures().length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {getFeatures().map((feature, index) => (
                  <Chip key={index} label={feature} size="small" sx={{ mb: 1 }} />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">No features</Typography>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>SEO ({currentLang.toUpperCase()})</Typography>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Meta Description</Typography>
            <Typography variant="body1">{getMetaDescription()}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Meta Keywords</Typography>
            <Typography variant="body1">{getKeywords()}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>Images</Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Hero Image</Typography>
            {data.heroImage ? (
              <Box sx={{ maxWidth: 200 }}>
                <ImageDisplay file={data.heroImage} />
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">No image</Typography>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">First Icon</Typography>
            {data.firstIconPath ? (
              <Box sx={{ maxWidth: 100 }}>
                <ImageDisplay file={data.firstIconPath} />
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">No icon</Typography>
            )}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" color="text.secondary">Second Icon</Typography>
            {data.secondIconPath ? (
              <Box sx={{ maxWidth: 100 }}>
                <ImageDisplay file={data.secondIconPath} />
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">No icon</Typography>
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
