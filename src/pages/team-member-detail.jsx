import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';

// project imports
import MainCard from 'components/MainCard';
import axiosInstance from 'api/axios-instance';
import runtimeConfig from 'config/runtime-config';

// icons
import { ArrowLeft } from 'iconsax-react';

export default function TeamMemberDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teamMember, setTeamMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamMember = async () => {
      try {
        const response = await axiosInstance.get(`/api/team-members/${id}`);
        if (response.status === 200) {
          setTeamMember(response.data);
        }
      } catch (err) {
        console.error('Error fetching team member:', err);
        setError('Failed to load team member details');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMember();
  }, [id]);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return runtimeConfig.API_URL + url;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !teamMember) {
    return (
      <MainCard>
        <Typography variant="h5" color="error">
          {error || 'Team member not found'}
        </Typography>
        <Button startIcon={<ArrowLeft />} onClick={() => navigate('/tables/team-sorting')} sx={{ mt: 2 }}>
          Back to Team List
        </Button>
      </MainCard>
    );
  }

  return (
    <MainCard
      title={
        <Stack direction="row" alignItems="center" spacing={2}>
          <Button
            startIcon={<ArrowLeft />}
            onClick={() => navigate('/tables/team-sorting')}
            variant="outlined"
            size="small"
          >
            Back
          </Button>
          <Typography variant="h4">Team Member Details</Typography>
        </Stack>
      }
    >
      <Grid container spacing={3}>
        {/* Profile Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Avatar
                src={getImageUrl(teamMember.imageUrl)}
                alt={teamMember.name}
                sx={{
                  width: 200,
                  height: 200,
                  margin: '0 auto',
                  mb: 2,
                  border: '4px solid',
                  borderColor: 'primary.main'
                }}
              />
              <Typography variant="h3" gutterBottom>
                {teamMember.name}
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                {teamMember.role}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Information Section */}
        <Grid item xs={12} md={8}>
          <Stack spacing={3}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Biography
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {teamMember.bio}
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Additional Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Display Order
                    </Typography>
                    <Typography variant="body1">{teamMember.orderIndex}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Date Added
                    </Typography>
                    <Typography variant="body1">
                      {new Date(teamMember.createdAt).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Licenses & Certifications Section */}
        {teamMember.certifications && teamMember.certifications.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Licenses & Certifications
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={3}>
                  {teamMember.certifications.map((certUrl, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Card
                        sx={{
                          height: '100%',
                          cursor: 'pointer',
                          transition: 'transform 0.2s',
                          '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: 6
                          }
                        }}
                        onClick={() => window.open(getImageUrl(certUrl), '_blank')}
                      >
                        <CardMedia
                          component="img"
                          height="250"
                          image={getImageUrl(certUrl)}
                          alt={`Certification ${index + 1}`}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent>
                          <Typography variant="body2" color="text.secondary" align="center">
                            Certificate {index + 1}
                          </Typography>
                          <Typography variant="caption" color="primary" align="center" display="block">
                            Click to view full size
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </MainCard>
  );
}
