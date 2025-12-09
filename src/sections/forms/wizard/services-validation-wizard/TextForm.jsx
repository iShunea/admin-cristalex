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
  id: yup.string().required('Page ID is required'),
  title: yup.string().required('Title is required'),
  firstIconTitle: yup.string().required('Icon title is required'),
  firstIconDescription: yup.string().required('Icon description is required'),
  secondIconDescription: yup.string().required('Icon description is required'),
  secondIconTitle: yup.string().required('Icon title is required'),
  metaDescription: yup.string().required('Meta description is required'),
  metaKeywords: yup.string().required('Meta keywords is required'),
  imageTitle: yup.string().required('Principal image description is required'),
  imageTitleDescription: yup.string().required('Principal image description is required'),
  titleDescription: yup.string().required('Subheading is required')
});

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      id: data.id ?? '',
      title: data.title ?? '',
      metaDescription: data.metaDescription ?? '',
      metaKeywords: data.metaKeywords ?? '',
      firstIconTitle: data.firstIconTitle ?? '',
      firstIconDescription: data.firstIconDescription ?? '',
      secondIconTitle: data.secondIconTitle ?? '',
      secondIconDescription: data.secondIconDescription ?? '',
      imageTitle: data.imageTitle ?? '',
      imageTitleDescription: data.imageTitleDescription ?? '',
      titleDescription: data.titleDescription ?? ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setData({
        id: values.id,
        baseUrl: 'services',
        title: values.title,
        metaDescription: values.metaDescription,
        metaKeywords: values.metaKeywords,
        firstIconTitle: values.firstIconTitle,
        firstIconDescription: values.firstIconDescription,
        secondIconTitle: values.secondIconTitle,
        secondIconDescription: values.secondIconDescription,
        imageTitle: values.imageTitle,
        imageTitleDescription: values.imageTitleDescription,
        titleDescription: values.titleDescription,
        ...data
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

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Text Information on page
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
              <InputLabel>Page ID</InputLabel>
              <TextField
                id="id"
                name="id"
                placeholder="Page ID *"
                value={formik.values.id}
                onChange={formik.handleChange}
                error={formik.touched.id && Boolean(formik.errors.id)}
                helperText={formik.touched.id && formik.errors.id}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta description</InputLabel>
              <TextField
                id="metaDescription"
                name="metaDescription"
                placeholder="Meta description *"
                multiline
                value={formik.values.metaDescription}
                onChange={formik.handleChange}
                error={formik.touched.metaDescription && Boolean(formik.errors.metaDescription)}
                helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta keywords</InputLabel>
              <TextField
                id="metaKeywords"
                name="metaKeywords"
                placeholder="Meta keywords *"
                multiline
                value={formik.values.metaKeywords}
                onChange={formik.handleChange}
                error={formik.touched.metaKeywords && Boolean(formik.errors.metaKeywords)}
                helperText={formik.touched.metaKeywords && formik.errors.metaKeywords}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Title of the page</InputLabel>
              <TextField
                id="title"
                name="title"
                placeholder="Title of the page *"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Subheading</InputLabel>
              <TextField
                id="titleDescription"
                name="titleDescription"
                multiline
                minRows={2}
                placeholder="Subheading *"
                value={formik.values.titleDescription}
                onChange={formik.handleChange}
                error={formik.touched.titleDescription && Boolean(formik.errors.titleDescription)}
                helperText={formik.touched.titleDescription && formik.errors.titleDescription}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>First icon title</InputLabel>
              <TextField
                id="firstIconTitle"
                name="firstIconTitle"
                placeholder="First icon title *"
                value={formik.values.firstIconTitle}
                onChange={formik.handleChange}
                error={formik.touched.firstIconTitle && Boolean(formik.errors.firstIconTitle)}
                helperText={formik.touched.firstIconTitle && formik.errors.firstIconTitle}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>First icon description</InputLabel>
              <TextField
                id="firstIconDescription"
                name="firstIconDescription"
                placeholder="First icon description *"
                multiline
                minRows={2}
                value={formik.values.firstIconDescription}
                onChange={formik.handleChange}
                error={formik.touched.firstIconDescription && Boolean(formik.errors.firstIconDescription)}
                helperText={formik.touched.firstIconDescription && formik.errors.firstIconDescription}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Second icon title</InputLabel>
              <TextField
                id="secondIconTitle"
                name="secondIconTitle"
                placeholder="Second icon title *"
                value={formik.values.secondIconTitle}
                onChange={formik.handleChange}
                error={formik.touched.secondIconTitle && Boolean(formik.errors.secondIconTitle)}
                helperText={formik.touched.secondIconTitle && formik.errors.secondIconTitle}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Second icon description</InputLabel>
              <TextField
                id="secondIconDescription"
                name="secondIconDescription"
                placeholder="Second icon description *"
                multiline
                minRows={2}
                value={formik.values.secondIconDescription}
                onChange={formik.handleChange}
                error={formik.touched.secondIconDescription && Boolean(formik.errors.secondIconDescription)}
                helperText={formik.touched.secondIconDescription && formik.errors.secondIconDescription}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Principal image title</InputLabel>
              <TextField
                id="imageTitle"
                name="imageTitle"
                placeholder="Principal image title *"
                value={formik.values.imageTitle}
                onChange={formik.handleChange}
                error={formik.touched.imageTitle && Boolean(formik.errors.imageTitle)}
                helperText={formik.touched.imageTitle && formik.errors.imageTitle}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Main image description</InputLabel>
              <TextField
                id="imageTitleDescription"
                name="imageTitleDescription"
                placeholder="Main image description *"
                value={formik.values.imageTitleDescription}
                onChange={formik.handleChange}
                error={formik.touched.imageTitleDescription && Boolean(formik.errors.imageTitleDescription)}
                helperText={formik.touched.imageTitleDescription && formik.errors.imageTitleDescription}
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
