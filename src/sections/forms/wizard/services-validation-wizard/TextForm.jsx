import PropTypes from 'prop-types';
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
import ServiceImporter from 'components/services/ServiceImporter';
import ServiceTemplateDownloader from 'components/services/ServiceTemplateDownloader';

const validationSchema = yup.object({
  titleKey: yup.string().required('Title Key is required'),
  descKey: yup.string().required('Description Key is required'),
  price: yup.string().required('Price is required'),
  features: yup.string()
});

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      titleKey: data.titleKey ?? '',
      descKey: data.descKey ?? '',
      price: data.price ?? '',
      features: data.features ?? ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const featuresArray = values.features 
        ? values.features.split('\n').filter(f => f.trim() !== '')
        : [];
      
      setData({
        ...data,
        titleKey: values.titleKey,
        descKey: values.descKey,
        price: values.price,
        features: featuresArray
      });
      handleNext();
    }
  });

  const handleImport = (importedData) => {
    const processedData = { ...importedData };
    if (Array.isArray(importedData.features)) {
      processedData.features = importedData.features.join('\n');
    }
    setData({
      ...data,
      ...processedData
    });
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
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Title Key *</InputLabel>
              <TextField
                id="titleKey"
                name="titleKey"
                placeholder="e.g., implantologie, ortodontie, estetica-dentara"
                value={formik.values.titleKey}
                onChange={formik.handleChange}
                error={formik.touched.titleKey && Boolean(formik.errors.titleKey)}
                helperText={formik.touched.titleKey && formik.errors.titleKey}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Description Key *</InputLabel>
              <TextField
                id="descKey"
                name="descKey"
                placeholder="Service description key"
                multiline
                minRows={2}
                value={formik.values.descKey}
                onChange={formik.handleChange}
                error={formik.touched.descKey && Boolean(formik.errors.descKey)}
                helperText={formik.touched.descKey && formik.errors.descKey}
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
            <Stack spacing={1}>
              <InputLabel>Features (one per line)</InputLabel>
              <TextField
                id="features"
                name="features"
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                multiline
                minRows={4}
                value={formik.values.features}
                onChange={formik.handleChange}
                error={formik.touched.features && Boolean(formik.errors.features)}
                helperText={formik.touched.features && formik.errors.features || "Enter each feature on a new line"}
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
