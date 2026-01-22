import { useState } from 'react';

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
import { CircularProgress } from '@mui/material';
import axiosInstance from 'api/axios-instance';
// import { InputLabel, Switch } from '@mui/material';

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

export default function AddTeamMember() {
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

      if (data.imageUrl && data.imageUrl instanceof File) {
        formData.append('image', data.imageUrl);
      }

      // Add certification images
      if (data.certifications && data.certifications.length > 0) {
        data.certifications.forEach((cert) => {
          if (cert.file instanceof File) {
            formData.append('certifications', cert.file);
          }
        });
      }

      formData.append('name', data.name || '');
      formData.append('role', data.role || '');
      formData.append('bio', data.bio || '');
      formData.append('orderIndex', data.orderIndex !== undefined ? data.orderIndex : 0);

      const response = await axiosInstance.post('/api/team-members', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('response:', response.statusText);
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Something went wrong!';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
      handleNext();
      setData({});
    }
  };

  return (
    <MainCard title="Add Team Member">
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
                  You successfully added a new page!
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
