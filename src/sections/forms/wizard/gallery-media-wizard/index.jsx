import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { useFormik } from 'formik';
import * as yup from 'yup';

import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import MultiLanguageTabs from 'components/forms/MultiLanguageTabs';
import DragDropFileUpload from 'components/DragDropFileUpload';
import axiosInstance from 'api/axios-instance';

const validationSchema = yup.object({
  titleEn: yup.string().required('English title is required'),
  titleRo: yup.string().required('Romanian title is required'),
  titleRu: yup.string().required('Russian title is required'),
  descriptionEn: yup.string().required('English description is required'),
  descriptionRo: yup.string().required('Romanian description is required'),
  descriptionRu: yup.string().required('Russian description is required'),
  mediaType: yup.string().oneOf(['photo', 'video'], 'Invalid media type').required('Media type is required'),
  category: yup.string().required('Category is required'),
  seoDescriptionEn: yup.string().max(160, 'Max 160 characters'),
  seoDescriptionRo: yup.string().max(160, 'Max 160 characters'),
  seoDescriptionRu: yup.string().max(160, 'Max 160 characters'),
  orderIndex: yup.number().min(0, 'Must be positive')
});

export default function AddGalleryMediaPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });

  const formik = useFormik({
    initialValues: {
      titleEn: '',
      titleRo: '',
      titleRu: '',
      descriptionEn: '',
      descriptionRo: '',
      descriptionRu: '',
      category: '',
      mediaType: 'photo',
      beforeImage: null,
      afterImage: null,
      video: null,
      videoPoster: null,
      seoDescriptionEn: '',
      seoDescriptionRo: '',
      seoDescriptionRu: '',
      seoKeywordsEn: '',
      seoKeywordsRo: '',
      seoKeywordsRu: '',
      orderIndex: 0,
      isActive: true
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const formData = new FormData();

        // Text fields
        formData.append('titleEn', values.titleEn);
        formData.append('titleRo', values.titleRo);
        formData.append('titleRu', values.titleRu);
        formData.append('descriptionEn', values.descriptionEn);
        formData.append('descriptionRo', values.descriptionRo);
        formData.append('descriptionRu', values.descriptionRu);
        formData.append('category', values.category);
        formData.append('mediaType', values.mediaType);
        formData.append('seoDescriptionEn', values.seoDescriptionEn || '');
        formData.append('seoDescriptionRo', values.seoDescriptionRo || '');
        formData.append('seoDescriptionRu', values.seoDescriptionRu || '');
        formData.append('seoKeywordsEn', values.seoKeywordsEn || '');
        formData.append('seoKeywordsRo', values.seoKeywordsRo || '');
        formData.append('seoKeywordsRu', values.seoKeywordsRu || '');
        formData.append('orderIndex', values.orderIndex);
        formData.append('isActive', values.isActive);

        // Files - photo type
        if (values.mediaType === 'photo') {
          if (values.beforeImage instanceof File) {
            formData.append('beforeImage', values.beforeImage);
          }
          if (values.afterImage instanceof File) {
            formData.append('afterImage', values.afterImage);
          }
        }

        // Files - video type
        if (values.mediaType === 'video') {
          if (values.video instanceof File) {
            formData.append('video', values.video);
          }
          if (values.videoPoster instanceof File) {
            formData.append('videoPoster', values.videoPoster);
          }
        }

        const response = await axiosInstance.post('/api/gallery-media', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log('Response:', response);
        setSubmitResult({ success: true, message: 'Gallery media item created successfully!' });
        formik.resetForm();
      } catch (error) {
        console.error('Error:', error);
        const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Something went wrong!';
        setSubmitResult({ success: false, message: errorMsg });
      } finally {
        setIsLoading(false);
      }
    }
  });

  const getTitleField = () => {
    const fieldMap = { en: 'titleEn', ro: 'titleRo', ru: 'titleRu' };
    return fieldMap[currentLang];
  };

  const getDescField = () => {
    const fieldMap = { en: 'descriptionEn', ro: 'descriptionRo', ru: 'descriptionRu' };
    return fieldMap[currentLang];
  };

  const getSeoDescField = () => {
    const fieldMap = { en: 'seoDescriptionEn', ro: 'seoDescriptionRo', ru: 'seoDescriptionRu' };
    return fieldMap[currentLang];
  };

  const getSeoKeywordsField = () => {
    const fieldMap = { en: 'seoKeywordsEn', ro: 'seoKeywordsRo', ru: 'seoKeywordsRu' };
    return fieldMap[currentLang];
  };

  if (submitResult.message) {
    return (
      <MainCard title="Add Gallery Media">
        <Stack alignItems="center" spacing={2} sx={{ py: 3 }}>
          <Typography variant="h5" color={submitResult.success ? 'success.main' : 'error.main'}>
            {submitResult.message}
          </Typography>
          <AnimateButton>
            <Button
              variant="contained"
              onClick={() => setSubmitResult({ success: false, message: '' })}
            >
              Add Another
            </Button>
          </AnimateButton>
        </Stack>
      </MainCard>
    );
  }

  return (
    <MainCard title="Add Gallery Media">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Media Type Selection */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Media Type
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel>Media Type *</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="mediaType"
                  name="mediaType"
                  value={formik.values.mediaType}
                  onChange={formik.handleChange}
                  error={formik.touched.mediaType && Boolean(formik.errors.mediaType)}
                >
                  <MenuItem value="photo">Photo (Before/After)</MenuItem>
                  <MenuItem value="video">Video</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel>Category *</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="category"
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  <MenuItem value="whitening">Albire</MenuItem>
                  <MenuItem value="orthodontics">Ortodonție</MenuItem>
                  <MenuItem value="restoration">Restaurări</MenuItem>
                  <MenuItem value="implants">Implanturi</MenuItem>
                  <MenuItem value="surgery">Chirurgie</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Content Information */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Content Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <MultiLanguageTabs value={currentLang} onChange={(e, newValue) => setCurrentLang(newValue)} />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Title ({currentLang.toUpperCase()}) *</InputLabel>
              <TextField
                id={getTitleField()}
                name={getTitleField()}
                placeholder="e.g., Professional Teeth Whitening"
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
              <InputLabel>Description ({currentLang.toUpperCase()}) *</InputLabel>
              <TextField
                id={getDescField()}
                name={getDescField()}
                placeholder="Description of the transformation or procedure"
                value={formik.values[getDescField()]}
                onChange={formik.handleChange}
                error={formik.touched[getDescField()] && Boolean(formik.errors[getDescField()])}
                helperText={formik.touched[getDescField()] && formik.errors[getDescField()]}
                fullWidth
                multiline
                rows={3}
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Media Upload - Photos */}
          {formik.values.mediaType === 'photo' && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Upload Images
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Before Image *</InputLabel>
                  <DragDropFileUpload
                    file={formik.values.beforeImage}
                    setFieldValue={(field, value) => formik.setFieldValue(field, value)}
                    error={formik.touched.beforeImage && formik.errors.beforeImage}
                    helperText={formik.touched.beforeImage && formik.errors.beforeImage}
                    fieldName="beforeImage"
                    accept="image/jpeg,image/png,image/webp"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>After Image *</InputLabel>
                  <DragDropFileUpload
                    file={formik.values.afterImage}
                    setFieldValue={(field, value) => formik.setFieldValue(field, value)}
                    error={formik.touched.afterImage && formik.errors.afterImage}
                    helperText={formik.touched.afterImage && formik.errors.afterImage}
                    fieldName="afterImage"
                    accept="image/jpeg,image/png,image/webp"
                  />
                </Stack>
              </Grid>
            </>
          )}

          {/* Media Upload - Video */}
          {formik.values.mediaType === 'video' && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Upload Video
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Video File *</InputLabel>
                  <DragDropFileUpload
                    file={formik.values.video}
                    setFieldValue={(field, value) => formik.setFieldValue(field, value)}
                    error={formik.touched.video && formik.errors.video}
                    helperText={formik.touched.video && formik.errors.video}
                    fieldName="video"
                    accept="video/mp4,video/webm"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <InputLabel>Video Poster Image</InputLabel>
                  <DragDropFileUpload
                    file={formik.values.videoPoster}
                    setFieldValue={(field, value) => formik.setFieldValue(field, value)}
                    error={formik.touched.videoPoster && formik.errors.videoPoster}
                    helperText={formik.touched.videoPoster && formik.errors.videoPoster}
                    fieldName="videoPoster"
                    accept="image/jpeg,image/png,image/webp"
                  />
                </Stack>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* SEO Settings */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              SEO Settings
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>SEO Description ({currentLang.toUpperCase()}) (Max 160 characters)</InputLabel>
              <TextField
                id={getSeoDescField()}
                name={getSeoDescField()}
                placeholder="SEO-friendly description for search engines"
                value={formik.values[getSeoDescField()]}
                onChange={formik.handleChange}
                error={formik.touched[getSeoDescField()] && Boolean(formik.errors[getSeoDescField()])}
                helperText={
                  (formik.touched[getSeoDescField()] && formik.errors[getSeoDescField()]) ||
                  `${formik.values[getSeoDescField()].length}/160`
                }
                fullWidth
                multiline
                rows={2}
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>SEO Keywords ({currentLang.toUpperCase()}) (Comma-separated)</InputLabel>
              <TextField
                id={getSeoKeywordsField()}
                name={getSeoKeywordsField()}
                placeholder="e.g., teeth whitening, dental care, smile makeover"
                value={formik.values[getSeoKeywordsField()]}
                onChange={formik.handleChange}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Display Settings */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Display Settings
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel>Order Index</InputLabel>
              <TextField
                id="orderIndex"
                name="orderIndex"
                type="number"
                placeholder="0"
                value={formik.values.orderIndex}
                onChange={formik.handleChange}
                error={formik.touched.orderIndex && Boolean(formik.errors.orderIndex)}
                helperText={formik.touched.orderIndex && formik.errors.orderIndex}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    id="isActive"
                    name="isActive"
                    checked={formik.values.isActive}
                    onChange={formik.handleChange}
                  />
                }
                label="Active"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <AnimateButton>
                <Button variant="outlined" onClick={() => formik.resetForm()}>
                  Reset
                </Button>
              </AnimateButton>
              <AnimateButton>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                  startIcon={isLoading && <CircularProgress size={20} />}
                >
                  {isLoading ? 'Creating...' : 'Create Gallery Media'}
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}
