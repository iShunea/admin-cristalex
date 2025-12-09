import { saveAs } from 'file-saver';

export const generateServiceTemplate = (format = 'json') => {
  const templateData = {
    titleKey: '',
    descKey: '',
    price: '',
    features: []
  };
  
  if (format === 'json') {
    const jsonStr = JSON.stringify(templateData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    saveAs(blob, 'service-template.json');
  } else if (format === 'markdown') {
    let markdown = '# Service Template\n\n';
    markdown += '## titleKey\n\n\n';
    markdown += '## descKey\n\n\n';
    markdown += '## price\n\n\n';
    markdown += '## features\n\nFeature 1\nFeature 2\nFeature 3\n';
    const blob = new Blob([markdown], { type: 'text/markdown' });
    saveAs(blob, 'service-template.md');
  }
};
