import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Review from './Review';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import TextForm from './TextForm';
import ImageForm from './ImageForm';
import axiosInstance from 'api/axios-instance';
import { CircularProgress } from '@mui/material';

// step options
const steps = ['Add Text', 'Add Images', 'Review Page'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, data, setData) => {
  switch (step) {
    case 0:
      return <TextForm handleNext={handleNext} setErrorIndex={setErrorIndex} data={data} setData={setData} />;
    case 1:
      return <ImageForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} data={data} setData={setData} />;
    case 2:
      return <Review data={data} />;
    default:
      throw new Error('Unknown step');
  }
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

function checkPreviousState(prevState) {
  if (prevState) {
    return prevState;
  }
  return {};
}

export default function EditServicePage() {
  const idPage = useLocation().pathname.split('/').splice(-1).toString();
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(checkPreviousState);
  const [errorIndex, setErrorIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const formData = new FormData();
      
      if (data.imageLabelSrc && data.imageLabelSrc instanceof File) {
        formData.append('imageLabelSrc', data.imageLabelSrc);
      }
      if (data.firstIconPath && data.firstIconPath instanceof File) {
        formData.append('firstIconPath', data.firstIconPath);
      }
      if (data.secondIconPath && data.secondIconPath instanceof File) {
        formData.append('secondIconPath', data.secondIconPath);
      }
      if (data.imageTitlePath && data.imageTitlePath instanceof File) {
        formData.append('imageTitlePath', data.imageTitlePath);
      }
      
      formData.append('id', data.id || '');
      formData.append('title', data.title || '');
      formData.append('metaDescription', data.metaDescription || '');
      formData.append('metaKeywords', data.metaKeywords || '');
      formData.append('firstIconTitle', data.firstIconTitle || '');
      formData.append('firstIconDescription', data.firstIconDescription || '');
      formData.append('secondIconTitle', data.secondIconTitle || '');
      formData.append('secondIconDescription', data.secondIconDescription || '');
      formData.append('imageTitle', data.imageTitle || '');
      formData.append('imageTitleDescription', data.imageTitleDescription || '');
      formData.append('titleDescription', data.titleDescription || '');
      
      const response = await axiosInstance.put('/api/services/' + idPage, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('response:', response);
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Something went wrong!';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
      handleNext();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrieveArticles = await axiosInstance.get('/api/services/' + idPage);
        if (retrieveArticles.status === 200) {
          console.log(retrieveArticles);
          setData(retrieveArticles.data);
        } else {
          console.error('Failed to retrieve service page');
        }
      } catch (error) {
        console.error('Error fetching service page:', error);
      }
    };

    fetchData();
  }, [idPage]);

  return (
    <MainCard title="Edit service page">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => {
          const labelProps = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            {!errorMessage ? (
              <>
                <Typography variant="h5" gutterBottom>
                  You successfully edited a new page!
                </Typography>
              </>
            ) : (
              <Typography variant="h6" color="error" gutterBottom>
                {errorMessage}
              </Typography>
            )}
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setActiveStep(0);
                  }}
                  sx={{ my: 3, ml: 1 }}
                >
                  Back to wizard
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, data, setData)}
            {activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ my: 3, ml: 1 }}
                    disabled={isLoading} // Button remains clickable
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} /> {/* Spinner added here */}
                        Loading...
                      </>
                    ) : activeStep === steps.length - 1 ? (
                      'Submit'
                    ) : (
                      'Next'
                    )}
                  </Button>
                </AnimateButton>
              </Stack>
            )}
          </>
        )}
      </>
    </MainCard>
  );
}
