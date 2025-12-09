import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton';
import MultiLanguageTabs from 'components/forms/MultiLanguageTabs';
import GooglePreview from 'components/seo/GooglePreview';
import CharacterCounter from 'components/seo/CharacterCounter';
import ArticleImporter from 'components/blog/ArticleImporter';
import TemplateDownloader from 'components/blog/TemplateDownloader';
import { generateBlogUrl } from 'utils/url-helpers';

const validationSchema = yup.object({
  id: yup.string().required('Page ID is required'),
  label: yup.string().required('Label is required'),
  titleImagePath: yup.string(),
  titleImageAltTextEn: yup.string(),
  titleImageAltTextRo: yup.string(),
  titleImageAltTextRu: yup.string(),
  blogTitleEn: yup.string().required('English title is required'),
  blogTitleRo: yup.string().required('Romanian title is required'),
  blogTitleRu: yup.string().required('Russian title is required'),
  blogIntroEn: yup.string().required('English intro is required'),
  blogIntroRo: yup.string().required('Romanian intro is required'),
  blogIntroRu: yup.string().required('Russian intro is required'),
  firstSubheadingTitleEn: yup.string(),
  firstSubheadingTitleRo: yup.string(),
  firstSubheadingTitleRu: yup.string(),
  firstSubheadingTextEn: yup.string(),
  firstSubheadingTextRo: yup.string(),
  firstSubheadingTextRu: yup.string(),
  secondSubheadingTitleEn: yup.string(),
  secondSubheadingTitleRo: yup.string(),
  secondSubheadingTitleRu: yup.string(),
  secondSubheadingTextEn: yup.string(),
  secondSubheadingTextRo: yup.string(),
  secondSubheadingTextRu: yup.string(),
  thirdSubheadingTitleEn: yup.string(),
  thirdSubheadingTitleRo: yup.string(),
  thirdSubheadingTitleRu: yup.string(),
  thirdSubheadingTextEn: yup.string(),
  thirdSubheadingTextRo: yup.string(),
  thirdSubheadingTextRu: yup.string(),
  conclusionEn: yup.string(),
  conclusionRo: yup.string(),
  conclusionRu: yup.string(),
  metaDescriptionEn: yup.string().max(160, 'Meta description should be max 160 characters').required('English meta description is required'),
  metaDescriptionRo: yup.string().max(160, 'Meta description should be max 160 characters').required('Romanian meta description is required'),
  metaDescriptionRu: yup.string().max(160, 'Meta description should be max 160 characters').required('Russian meta description is required'),
  metaKeywordsEn: yup.string().required('English keywords are required'),
  metaKeywordsRo: yup.string().required('Romanian keywords are required'),
  metaKeywordsRu: yup.string().required('Russian keywords are required')
});

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const [currentLang, setCurrentLang] = useState('en');

  const formik = useFormik({
    initialValues: {
      id: data.id ?? '',
      publishingDate: data.publishingDate ?? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }),
      label: data.label ?? '',
      titleImagePath: data.titleImagePath ?? '',
      titleImageAltTextEn: data.titleImageAltTextEn ?? '',
      titleImageAltTextRo: data.titleImageAltTextRo ?? '',
      titleImageAltTextRu: data.titleImageAltTextRu ?? '',
      blogTitleEn: data.blogTitleEn ?? '',
      blogTitleRo: data.blogTitleRo ?? '',
      blogTitleRu: data.blogTitleRu ?? '',
      blogIntroEn: data.blogIntroEn ?? '',
      blogIntroRo: data.blogIntroRo ?? '',
      blogIntroRu: data.blogIntroRu ?? '',
      firstSubheadingTitleEn: data.firstSubheadingTitleEn ?? '',
      firstSubheadingTitleRo: data.firstSubheadingTitleRo ?? '',
      firstSubheadingTitleRu: data.firstSubheadingTitleRu ?? '',
      firstSubheadingTextEn: data.firstSubheadingTextEn ?? '',
      firstSubheadingTextRo: data.firstSubheadingTextRo ?? '',
      firstSubheadingTextRu: data.firstSubheadingTextRu ?? '',
      secondSubheadingTitleEn: data.secondSubheadingTitleEn ?? '',
      secondSubheadingTitleRo: data.secondSubheadingTitleRo ?? '',
      secondSubheadingTitleRu: data.secondSubheadingTitleRu ?? '',
      secondSubheadingTextEn: data.secondSubheadingTextEn ?? '',
      secondSubheadingTextRo: data.secondSubheadingTextRo ?? '',
      secondSubheadingTextRu: data.secondSubheadingTextRu ?? '',
      thirdSubheadingTitleEn: data.thirdSubheadingTitleEn ?? '',
      thirdSubheadingTitleRo: data.thirdSubheadingTitleRo ?? '',
      thirdSubheadingTitleRu: data.thirdSubheadingTitleRu ?? '',
      thirdSubheadingTextEn: data.thirdSubheadingTextEn ?? '',
      thirdSubheadingTextRo: data.thirdSubheadingTextRo ?? '',
      thirdSubheadingTextRu: data.thirdSubheadingTextRu ?? '',
      conclusionEn: data.conclusionEn ?? '',
      conclusionRo: data.conclusionRo ?? '',
      conclusionRu: data.conclusionRu ?? '',
      metaDescriptionEn: data.metaDescriptionEn ?? '',
      metaDescriptionRo: data.metaDescriptionRo ?? '',
      metaDescriptionRu: data.metaDescriptionRu ?? '',
      metaKeywordsEn: data.metaKeywordsEn ?? '',
      metaKeywordsRo: data.metaKeywordsRo ?? '',
      metaKeywordsRu: data.metaKeywordsRu ?? ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        ...values,
        blogTitle: values.blogTitleEn,
        metaDescription: values.metaDescriptionEn,
        metaKeywords: values.metaKeywordsEn,
        baseUrl: 'blogs'
      });
      handleNext();
    }
  });

  // Auto-generate Blog URL from English title (only if ID is empty)
  useEffect(() => {
    if (formik.values.blogTitleEn && !formik.values.id) {
      const blogUrl = generateBlogUrl(formik.values.blogTitleEn);
      if (blogUrl) {
        formik.setFieldValue('id', blogUrl);
      }
    }
  }, [formik.values.blogTitleEn]);

  const handleImport = (importedData) => {
    Object.keys(importedData).forEach(key => {
      if (formik.values.hasOwnProperty(key)) {
        formik.setFieldValue(key, importedData[key]);
      }
    });
  };

  const handleLangChange = (event, newValue) => {
    setCurrentLang(newValue);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Blog Article - Multi-Language Content
      </Typography>

      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TemplateDownloader />
        <ArticleImporter onImport={handleImport} />
      </Box>

      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>Global Fields</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Page URL</InputLabel>
              <TextField
                id="id"
                name="id"
                placeholder="Blog/your-article-title"
                value={formik.values.id}
                onChange={formik.handleChange}
                error={formik.touched.id && Boolean(formik.errors.id)}
                helperText={formik.touched.id && formik.errors.id ? formik.errors.id : 'URL format: Blog/title-slug'}
                fullWidth
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Label</InputLabel>
              <TextField
                id="label"
                name="label"
                placeholder="Category or tag"
                value={formik.values.label}
                onChange={formik.handleChange}
                error={formik.touched.label && Boolean(formik.errors.label)}
                helperText={formik.touched.label && formik.errors.label}
                fullWidth
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Title Image Path</InputLabel>
              <TextField
                id="titleImagePath"
                name="titleImagePath"
                placeholder="/images/blog/article.jpg"
                value={formik.values.titleImagePath}
                onChange={formik.handleChange}
                fullWidth
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Multi-Language Content</Typography>
            <MultiLanguageTabs value={currentLang} onChange={handleLangChange} />
          </Grid>

          {currentLang === 'en' && (
            <>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Title Image Alt Text (EN)</InputLabel>
                  <TextField
                    name="titleImageAltTextEn"
                    value={formik.values.titleImageAltTextEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Blog Title (EN) *</InputLabel>
                  <TextField
                    name="blogTitleEn"
                    multiline
                    value={formik.values.blogTitleEn}
                    onChange={formik.handleChange}
                    error={formik.touched.blogTitleEn && Boolean(formik.errors.blogTitleEn)}
                    helperText={formik.touched.blogTitleEn && formik.errors.blogTitleEn}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Blog Intro (EN) *</InputLabel>
                  <TextField
                    name="blogIntroEn"
                    multiline
                    rows={3}
                    value={formik.values.blogIntroEn}
                    onChange={formik.handleChange}
                    error={formik.touched.blogIntroEn && Boolean(formik.errors.blogIntroEn)}
                    helperText={formik.touched.blogIntroEn && formik.errors.blogIntroEn}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>First Subheading Title (EN)</InputLabel>
                  <TextField
                    name="firstSubheadingTitleEn"
                    value={formik.values.firstSubheadingTitleEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>First Subheading Text (EN)</InputLabel>
                  <TextField
                    name="firstSubheadingTextEn"
                    multiline
                    rows={3}
                    value={formik.values.firstSubheadingTextEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Second Subheading Title (EN)</InputLabel>
                  <TextField
                    name="secondSubheadingTitleEn"
                    value={formik.values.secondSubheadingTitleEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Second Subheading Text (EN)</InputLabel>
                  <TextField
                    name="secondSubheadingTextEn"
                    multiline
                    rows={3}
                    value={formik.values.secondSubheadingTextEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Third Subheading Title (EN)</InputLabel>
                  <TextField
                    name="thirdSubheadingTitleEn"
                    value={formik.values.thirdSubheadingTitleEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Third Subheading Text (EN)</InputLabel>
                  <TextField
                    name="thirdSubheadingTextEn"
                    multiline
                    rows={3}
                    value={formik.values.thirdSubheadingTextEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Conclusion (EN)</InputLabel>
                  <TextField
                    name="conclusionEn"
                    multiline
                    rows={3}
                    value={formik.values.conclusionEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Meta Description (EN) * (Max 160 chars)</InputLabel>
                  <TextField
                    name="metaDescriptionEn"
                    multiline
                    rows={2}
                    value={formik.values.metaDescriptionEn}
                    onChange={formik.handleChange}
                    error={formik.touched.metaDescriptionEn && Boolean(formik.errors.metaDescriptionEn)}
                    helperText={formik.touched.metaDescriptionEn && formik.errors.metaDescriptionEn}
                    fullWidth
                  />
                  <CharacterCounter 
                    current={formik.values.metaDescriptionEn.length} 
                    max={160}
                    showProgress={true}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Meta Keywords (EN) *</InputLabel>
                  <TextField
                    name="metaKeywordsEn"
                    value={formik.values.metaKeywordsEn}
                    onChange={formik.handleChange}
                    error={formik.touched.metaKeywordsEn && Boolean(formik.errors.metaKeywordsEn)}
                    helperText={formik.touched.metaKeywordsEn && formik.errors.metaKeywordsEn}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <GooglePreview 
                  title={formik.values.blogTitleEn}
                  description={formik.values.metaDescriptionEn}
                  url={`https://cristalexdent.md/${formik.values.id || 'Blog/your-article-url'}`}
                />
              </Grid>
            </>
          )}

          {currentLang === 'ro' && (
            <>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Title Image Alt Text (RO)</InputLabel>
                  <TextField
                    name="titleImageAltTextRo"
                    value={formik.values.titleImageAltTextRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Blog Title (RO) *</InputLabel>
                  <TextField
                    name="blogTitleRo"
                    multiline
                    value={formik.values.blogTitleRo}
                    onChange={formik.handleChange}
                    error={formik.touched.blogTitleRo && Boolean(formik.errors.blogTitleRo)}
                    helperText={formik.touched.blogTitleRo && formik.errors.blogTitleRo}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Blog Intro (RO) *</InputLabel>
                  <TextField
                    name="blogIntroRo"
                    multiline
                    rows={3}
                    value={formik.values.blogIntroRo}
                    onChange={formik.handleChange}
                    error={formik.touched.blogIntroRo && Boolean(formik.errors.blogIntroRo)}
                    helperText={formik.touched.blogIntroRo && formik.errors.blogIntroRo}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>First Subheading Title (RO)</InputLabel>
                  <TextField
                    name="firstSubheadingTitleRo"
                    value={formik.values.firstSubheadingTitleRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>First Subheading Text (RO)</InputLabel>
                  <TextField
                    name="firstSubheadingTextRo"
                    multiline
                    rows={3}
                    value={formik.values.firstSubheadingTextRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Second Subheading Title (RO)</InputLabel>
                  <TextField
                    name="secondSubheadingTitleRo"
                    value={formik.values.secondSubheadingTitleRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Second Subheading Text (RO)</InputLabel>
                  <TextField
                    name="secondSubheadingTextRo"
                    multiline
                    rows={3}
                    value={formik.values.secondSubheadingTextRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Third Subheading Title (RO)</InputLabel>
                  <TextField
                    name="thirdSubheadingTitleRo"
                    value={formik.values.thirdSubheadingTitleRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Third Subheading Text (RO)</InputLabel>
                  <TextField
                    name="thirdSubheadingTextRo"
                    multiline
                    rows={3}
                    value={formik.values.thirdSubheadingTextRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Conclusion (RO)</InputLabel>
                  <TextField
                    name="conclusionRo"
                    multiline
                    rows={3}
                    value={formik.values.conclusionRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Meta Description (RO) * (Max 160 chars)</InputLabel>
                  <TextField
                    name="metaDescriptionRo"
                    multiline
                    rows={2}
                    value={formik.values.metaDescriptionRo}
                    onChange={formik.handleChange}
                    error={formik.touched.metaDescriptionRo && Boolean(formik.errors.metaDescriptionRo)}
                    helperText={formik.touched.metaDescriptionRo && formik.errors.metaDescriptionRo}
                    fullWidth
                  />
                  <CharacterCounter 
                    current={formik.values.metaDescriptionRo.length} 
                    max={160}
                    showProgress={true}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Meta Keywords (RO) *</InputLabel>
                  <TextField
                    name="metaKeywordsRo"
                    value={formik.values.metaKeywordsRo}
                    onChange={formik.handleChange}
                    error={formik.touched.metaKeywordsRo && Boolean(formik.errors.metaKeywordsRo)}
                    helperText={formik.touched.metaKeywordsRo && formik.errors.metaKeywordsRo}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <GooglePreview 
                  title={formik.values.blogTitleRo}
                  description={formik.values.metaDescriptionRo}
                  url={`https://cristalexdent.md/${formik.values.id || 'Blog/your-article-url'}`}
                />
              </Grid>
            </>
          )}

          {currentLang === 'ru' && (
            <>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Title Image Alt Text (RU)</InputLabel>
                  <TextField
                    name="titleImageAltTextRu"
                    value={formik.values.titleImageAltTextRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Blog Title (RU) *</InputLabel>
                  <TextField
                    name="blogTitleRu"
                    multiline
                    value={formik.values.blogTitleRu}
                    onChange={formik.handleChange}
                    error={formik.touched.blogTitleRu && Boolean(formik.errors.blogTitleRu)}
                    helperText={formik.touched.blogTitleRu && formik.errors.blogTitleRu}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Blog Intro (RU) *</InputLabel>
                  <TextField
                    name="blogIntroRu"
                    multiline
                    rows={3}
                    value={formik.values.blogIntroRu}
                    onChange={formik.handleChange}
                    error={formik.touched.blogIntroRu && Boolean(formik.errors.blogIntroRu)}
                    helperText={formik.touched.blogIntroRu && formik.errors.blogIntroRu}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>First Subheading Title (RU)</InputLabel>
                  <TextField
                    name="firstSubheadingTitleRu"
                    value={formik.values.firstSubheadingTitleRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>First Subheading Text (RU)</InputLabel>
                  <TextField
                    name="firstSubheadingTextRu"
                    multiline
                    rows={3}
                    value={formik.values.firstSubheadingTextRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Second Subheading Title (RU)</InputLabel>
                  <TextField
                    name="secondSubheadingTitleRu"
                    value={formik.values.secondSubheadingTitleRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Second Subheading Text (RU)</InputLabel>
                  <TextField
                    name="secondSubheadingTextRu"
                    multiline
                    rows={3}
                    value={formik.values.secondSubheadingTextRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Third Subheading Title (RU)</InputLabel>
                  <TextField
                    name="thirdSubheadingTitleRu"
                    value={formik.values.thirdSubheadingTitleRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Third Subheading Text (RU)</InputLabel>
                  <TextField
                    name="thirdSubheadingTextRu"
                    multiline
                    rows={3}
                    value={formik.values.thirdSubheadingTextRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Conclusion (RU)</InputLabel>
                  <TextField
                    name="conclusionRu"
                    multiline
                    rows={3}
                    value={formik.values.conclusionRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Meta Description (RU) * (Max 160 chars)</InputLabel>
                  <TextField
                    name="metaDescriptionRu"
                    multiline
                    rows={2}
                    value={formik.values.metaDescriptionRu}
                    onChange={formik.handleChange}
                    error={formik.touched.metaDescriptionRu && Boolean(formik.errors.metaDescriptionRu)}
                    helperText={formik.touched.metaDescriptionRu && formik.errors.metaDescriptionRu}
                    fullWidth
                  />
                  <CharacterCounter 
                    current={formik.values.metaDescriptionRu.length} 
                    max={160}
                    showProgress={true}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Meta Keywords (RU) *</InputLabel>
                  <TextField
                    name="metaKeywordsRu"
                    value={formik.values.metaKeywordsRu}
                    onChange={formik.handleChange}
                    error={formik.touched.metaKeywordsRu && Boolean(formik.errors.metaKeywordsRu)}
                    helperText={formik.touched.metaKeywordsRu && formik.errors.metaKeywordsRu}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <GooglePreview 
                  title={formik.values.blogTitleRu}
                  description={formik.values.metaDescriptionRu}
                  url={`https://cristalexdent.md/${formik.values.id || 'Blog/your-article-url'}`}
                />
              </Grid>
            </>
          )}

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
