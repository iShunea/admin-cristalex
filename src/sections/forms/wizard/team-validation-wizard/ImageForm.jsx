import PropTypes from 'prop-types';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import DragDropFileUpload from 'components/DragDropFileUpload';

const validationSchema = yup.object({
  imageUrl: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  certifications: yup.array().of(
    yup.object().shape({
      file: yup.mixed().required(),
      name: yup.string()
    })
  )
});

// ==============================|| VALIDATION WIZARD - TEXT  ||============================== //

export default function ImageForm({ data, setData, handleNext, handleBack, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      imageUrl: data.imageUrl ?? null,
      certifications: data.certifications ?? []
    },
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        imageUrl: values.imageUrl,
        certifications: values.certifications
      });
      handleNext();
    }
  });

  const handleAddCertification = (file) => {
    if (file && file.type.startsWith('image/')) {
      const newCert = {
        file: file,
        name: file.name,
        preview: URL.createObjectURL(file)
      };
      formik.setFieldValue('certifications', [...formik.values.certifications, newCert]);
    }
  };

  const handleRemoveCertification = (index) => {
    const updated = formik.values.certifications.filter((_, i) => i !== index);
    formik.setFieldValue('certifications', updated);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Team Member Photo & Certifications
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <InputLabel>Member Photo *</InputLabel>
              <DragDropFileUpload formik={formik} name="imageUrl" />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={2}>
              <InputLabel>Licenses & Certifications (Optional)</InputLabel>
              <Box
                sx={{
                  border: '2px dashed #aaa',
                  borderRadius: 1,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  '&:hover': { borderColor: 'primary.main', bgcolor: 'action.hover' }
                }}
              >
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="certification-upload"
                  type="file"
                  multiple
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      Array.from(e.target.files).forEach(file => {
                        handleAddCertification(file);
                      });
                      e.target.value = '';
                    }
                  }}
                />
                <label htmlFor="certification-upload">
                  <Stack spacing={1} alignItems="center" sx={{ cursor: 'pointer' }}>
                    <Typography variant="body1" color="primary">
                      Click to upload licenses or certifications
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      You can select multiple files at once
                    </Typography>
                  </Stack>
                </label>
              </Box>

              {/* Certification Cards */}
              {formik.values.certifications.length > 0 && (
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  {formik.values.certifications.map((cert, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card sx={{ position: 'relative', height: '100%' }}>
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
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleRemoveCertification(index)}
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'error.light', color: 'white' }
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
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

ImageForm.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.func,
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func
};
