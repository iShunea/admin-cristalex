import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton';
import MultiLanguageTabs from 'components/forms/MultiLanguageTabs';
import CharacterCounter from 'components/seo/CharacterCounter';
import ServiceImporter from 'components/services/ServiceImporter';
import ServiceTemplateDownloader from 'components/services/ServiceTemplateDownloader';

const validationSchema = yup.object({
  titleKey: yup.string().required('Title Key is required'),
  price: yup.string().required('Price is required'),
  titleEn: yup.string().required('English title is required'),
  titleRo: yup.string().required('Romanian title is required'),
  titleRu: yup.string().required('Russian title is required'),
  descriptionEn: yup.string().required('English description is required'),
  descriptionRo: yup.string().required('Romanian description is required'),
  descriptionRu: yup.string().required('Russian description is required'),
  metaDescriptionEn: yup.string().max(160, 'Max 160 characters').required('English meta description is required'),
  metaDescriptionRo: yup.string().max(160, 'Max 160 characters').required('Romanian meta description is required'),
  metaDescriptionRu: yup.string().max(160, 'Max 160 characters').required('Russian meta description is required'),
  metaKeywordsEn: yup.string().required('English keywords are required'),
  metaKeywordsRo: yup.string().required('Romanian keywords are required'),
  metaKeywordsRu: yup.string().required('Russian keywords are required'),
  featuresEn: yup.string(),
  featuresRo: yup.string(),
  featuresRu: yup.string()
});

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const [currentLang, setCurrentLang] = useState('en');

  const formik = useFormik({
    initialValues: {
      titleKey: data.titleKey ?? '',
      price: data.price ?? '',
      titleEn: data.titleEn ?? '',
      titleRo: data.titleRo ?? '',
      titleRu: data.titleRu ?? '',
      descriptionEn: data.descriptionEn ?? '',
      descriptionRo: data.descriptionRo ?? '',
      descriptionRu: data.descriptionRu ?? '',
      metaDescriptionEn: data.metaDescriptionEn ?? '',
      metaDescriptionRo: data.metaDescriptionRo ?? '',
      metaDescriptionRu: data.metaDescriptionRu ?? '',
      metaKeywordsEn: data.metaKeywordsEn ?? '',
      metaKeywordsRo: data.metaKeywordsRo ?? '',
      metaKeywordsRu: data.metaKeywordsRu ?? '',
      featuresEn: data.featuresEn ?? '',
      featuresRo: data.featuresRo ?? '',
      featuresRu: data.featuresRu ?? ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        ...values
      });
      handleNext();
    }
  });

  const handleImport = (importedData) => {
    setData({
      ...data,
      ...importedData
    });
  };

  const getTitleField = () => {
    const fieldMap = { en: 'titleEn', ro: 'titleRo', ru: 'titleRu' };
    return fieldMap[currentLang];
  };

  const getDescField = () => {
    const fieldMap = { en: 'descriptionEn', ro: 'descriptionRo', ru: 'descriptionRu' };
    return fieldMap[currentLang];
  };

  const getMetaDescField = () => {
    const fieldMap = { en: 'metaDescriptionEn', ro: 'metaDescriptionRo', ru: 'metaDescriptionRu' };
    return fieldMap[currentLang];
  };

  const getKeywordsField = () => {
    const fieldMap = { en: 'metaKeywordsEn', ro: 'metaKeywordsRo', ru: 'metaKeywordsRu' };
    return fieldMap[currentLang];
  };

  const getFeaturesField = () => {
    const fieldMap = { en: 'featuresEn', ro: 'featuresRo', ru: 'featuresRu' };
    return fieldMap[currentLang];
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Service Information
      </Typography>
      
      <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Import / Export Templates
        </Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap">
          <ServiceTemplateDownloader />
          <ServiceImporter onImport={handleImport} />
        </Stack>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Title Key (URL slug) *</InputLabel>
              <TextField
                id="titleKey"
                name="titleKey"
                placeholder="e.g., implantologie, ortodontie"
                value={formik.values.titleKey}
                onChange={formik.handleChange}
                error={formik.touched.titleKey && Boolean(formik.errors.titleKey)}
                helperText={formik.touched.titleKey && formik.errors.titleKey}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Price *</InputLabel>
              <TextField
                id="price"
                name="price"
                placeholder="e.g., 500 MDL, de la 1000 MDL"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Multilingual Content
            </Typography>
            <MultiLanguageTabs value={currentLang} onChange={(e, newValue) => setCurrentLang(newValue)} />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Service Title ({currentLang.toUpperCase()}) *</InputLabel>
              <TextField
                id={getTitleField()}
                name={getTitleField()}
                placeholder="Service title"
                value={formik.values[getTitleField()]}
                onChange={formik.handleChange}
                error={formik.touched[getTitleField()] && Boolean(formik.errors[getTitleField()])}
                helperText={formik.touched[getTitleField()] && formik.errors[getTitleField()]}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Service Description ({currentLang.toUpperCase()}) *</InputLabel>
              <TextField
                id={getDescField()}
                name={getDescField()}
                placeholder="Full description of the service"
                multiline
                minRows={4}
                value={formik.values[getDescField()]}
                onChange={formik.handleChange}
                error={formik.touched[getDescField()] && Boolean(formik.errors[getDescField()])}
                helperText={formik.touched[getDescField()] && formik.errors[getDescField()]}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Features ({currentLang.toUpperCase()}) - one per line</InputLabel>
              <TextField
                id={getFeaturesField()}
                name={getFeaturesField()}
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                multiline
                minRows={3}
                value={formik.values[getFeaturesField()]}
                onChange={formik.handleChange}
                error={formik.touched[getFeaturesField()] && Boolean(formik.errors[getFeaturesField()])}
                helperText="Enter each feature on a new line"
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              SEO ({currentLang.toUpperCase()})
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta Description ({currentLang.toUpperCase()}) *</InputLabel>
              <TextField
                id={getMetaDescField()}
                name={getMetaDescField()}
                placeholder="Meta description for search engines (max 160 chars)"
                multiline
                minRows={2}
                value={formik.values[getMetaDescField()]}
                onChange={formik.handleChange}
                error={formik.touched[getMetaDescField()] && Boolean(formik.errors[getMetaDescField()])}
                helperText={formik.touched[getMetaDescField()] && formik.errors[getMetaDescField()]}
                fullWidth
                autoComplete="off"
              />
              <CharacterCounter value={formik.values[getMetaDescField()]} maxLength={160} />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta Keywords ({currentLang.toUpperCase()}) *</InputLabel>
              <TextField
                id={getKeywordsField()}
                name={getKeywordsField()}
                placeholder="keyword1, keyword2, keyword3"
                value={formik.values[getKeywordsField()]}
                onChange={formik.handleChange}
                error={formik.touched[getKeywordsField()] && Boolean(formik.errors[getKeywordsField()])}
                helperText={formik.touched[getKeywordsField()] && formik.errors[getKeywordsField()]}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

TextForm.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.func,
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func
};
