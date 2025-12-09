import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import UploadIcon from '@mui/icons-material/Upload';

import { parseJSONService, parseMarkdownService } from 'utils/services-parsers';

const ServiceImporter = ({ onImport }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null);
    setSuccess(false);

    try {
      let serviceData;
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (fileExtension === 'json') {
        serviceData = await parseJSONService(file);
      } else if (fileExtension === 'md') {
        serviceData = await parseMarkdownService(file);
      } else {
        throw new Error('Unsupported file format. Please use .json or .md files.');
      }

      onImport(serviceData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    }

    event.target.value = '';
  };

  return (
    <Box sx={{ mb: 3 }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.md"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      
      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        onClick={() => fileInputRef.current?.click()}
        sx={{ mb: 2 }}
      >
        Import from File
      </Button>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" onClose={() => setSuccess(false)} sx={{ mb: 2 }}>
          Service data imported successfully! All fields have been populated.
        </Alert>
      )}

      <Typography variant="caption" color="text.secondary" display="block">
        Supported formats: JSON (.json), Markdown (.md)
      </Typography>
    </Box>
  );
};

ServiceImporter.propTypes = {
  onImport: PropTypes.func.isRequired
};

export default ServiceImporter;
