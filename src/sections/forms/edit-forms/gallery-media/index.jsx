import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
import returnImageObject from 'api/fetchData';

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

export default function EditGalleryMediaPage() {
  const location = useLocation();
  const idPage = location.pathname.split('/').splice(-1).toString();

  const [currentLang, setCurrentLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });
  const [initialData, setInitialData] = useState(null);

  const formik = useFormik({
    initialValues: {
      titleEn: initialData?.titleEn || '',
      titleRo: initialData?.titleRo || '',
      titleRu: initialData?.titleRu || '',
      descriptionEn: initialData?.descriptionEn || '',
      descriptionRo: initialData?.descriptionRo || '',
      descriptionRu: initialData?.descriptionRu || '',
      category: initialData?.category || '',
      mediaType: initialData?.mediaType || 'photo',
      beforeImage: null,
      afterImage: null,
      video: null,
      videoPoster: null,
      seoDescriptionEn: initialData?.seoDescriptionEn || '',
      seoDescriptionRo: initialData?.seoDescriptionRo || '',
      seoDescriptionRu: initialData?.seoDescriptionRu || '',
      seoKeywordsEn: initialData?.seoKeywordsEn || '',
      seoKeywordsRo: initialData?.seoKeywordsRo || '',
      seoKeywordsRu: initialData?.seoKeywordsRu || '',
      orderIndex: initialData?.orderIndex || 0,
      isActive: initialData?.isActive ?? true
    },
    enableReinitialize: true,
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

        const response = await axiosInstance.put(`/api/gallery-media/${idPage}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log('Response:', response);
        setSubmitResult({ success: true, message: 'Gallery media item updated successfully!' });
      } catch (error) {
        console.error('Error:', error);
        const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Something went wrong!';
        setSubmitResult({ success: false, message: errorMsg });
      } finally {
        setIsLoading(false);
      }
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const response = await axiosInstance.get(`/api/gallery-media/${idPage}`);

        if (response.status === 200) {
          const data = response.data;
          console.log('Fetched data:', data);

          // Load existing images based on media type
          let beforeImg = null;
          let afterImg = null;
          let videoFile = null;
          let posterImg = null;

          if (data.mediaType === 'photo') {
            beforeImg = data.beforeImageUrl ? await returnImageObject(data.beforeImageUrl) : null;
            afterImg = data.afterImageUrl ? await returnImageObject(data.afterImageUrl) : null;
          } else if (data.mediaType === 'video') {
            videoFile = data.videoUrl ? await returnImageObject(data.videoUrl) : null;
            posterImg = data.videoPosterUrl ? await returnImageObject(data.videoPosterUrl) : null;
          }

          setInitialData(data);

          // Set form values including files
          formik.setValues({
            titleEn: data.titleEn || '',
            titleRo: data.titleRo || '',
            titleRu: data.titleRu || '',
            descriptionEn: data.descriptionEn || '',
            descriptionRo: data.descriptionRo || '',
            descriptionRu: data.descriptionRu || '',
            category: data.category || '',
            mediaType: data.mediaType || 'photo',
            seoDescriptionEn: data.seoDescriptionEn || '',
            seoDescriptionRo: data.seoDescriptionRo || '',
            seoDescriptionRu: data.seoDescriptionRu || '',
            seoKeywordsEn: data.seoKeywordsEn || '',
            seoKeywordsRo: data.seoKeywordsRo || '',
            seoKeywordsRu: data.seoKeywordsRu || '',
            orderIndex: data.orderIndex || 0,
            isActive: data.isActive ?? true,
            beforeImage: beforeImg,
            afterImage: afterImg,
            video: videoFile,
            videoPoster: posterImg
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setSubmitResult({ success: false, message: 'Failed to load data' });
      } finally {
        setIsFetching(false);
      }
    };

    if (idPage) {
      fetchData();
    }
  }, [idPage]);

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

  if (isFetching) {
    return (
      <MainCard title="Edit Gallery Media">
        <Stack alignItems="center" justifyContent="center" sx={{ py: 5 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading data...</Typography>
        </Stack>
      </MainCard>
    );
  }

  if (submitResult.message) {
    return (
      <MainCard title="Edit Gallery Media">
        <Stack alignItems="center" spacing={2} sx={{ py: 3 }}>
          <Typography variant="h5" color={submitResult.success ? 'success.main' : 'error.main'}>
            {submitResult.message}
          </Typography>
          <AnimateButton>
            <Button
              variant="contained"
              onClick={() => setSubmitResult({ success: false, message: '' })}
            >
              Continue Editing
            </Button>
          </AnimateButton>
        </Stack>
      </MainCard>
    );
  }

  return (
    <MainCard title="Edit Gallery Media">
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

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Before Image</InputLabel>
                  <DragDropFileUpload
                    formik={formik}
                    name="beforeImage"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>After Image</InputLabel>
                  <DragDropFileUpload
                    formik={formik}
                    name="afterImage"
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

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Video File</InputLabel>
                  <DragDropFileUpload
                    formik={formik}
                    name="video"
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <InputLabel>Video Poster Image</InputLabel>
                  <DragDropFileUpload
                    formik={formik}
                    name="videoPoster"
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

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Status</InputLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isActive}
                    onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
                    name="isActive"
                  />
                }
                label={formik.values.isActive ? 'Active' : 'Inactive'}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                  sx={{ my: 3, ml: 1 }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                      Saving...
                    </>
                  ) : (
                    'Update Gallery Media'
                  )}
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}
