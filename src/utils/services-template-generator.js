import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const generateServiceTemplate = (format = 'json') => {
  const templateData = {
    id: '',
    title: '',
    metaDescription: '',
    metaKeywords: '',
    titleDescription: '',
    firstIconTitle: '',
    firstIconDescription: '',
    secondIconTitle: '',
    secondIconDescription: '',
    imageTitle: '',
    imageTitleDescription: ''
  };
  
  if (format === 'excel') {
    const worksheet = XLSX.utils.json_to_sheet([templateData]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Service Template');
    
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    saveAs(blob, 'service-template.xlsx');
  } else if (format === 'json') {
    const jsonStr = JSON.stringify(templateData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    saveAs(blob, 'service-template.json');
  } else if (format === 'markdown') {
    let markdown = '# Service Template\n\n';
    markdown += '## id\n\n\n';
    markdown += '## title\n\n\n';
    markdown += '## metaDescription\n\n\n';
    markdown += '## metaKeywords\n\n\n';
    markdown += '## titleDescription\n\n\n';
    markdown += '## firstIconTitle\n\n\n';
    markdown += '## firstIconDescription\n\n\n';
    markdown += '## secondIconTitle\n\n\n';
    markdown += '## secondIconDescription\n\n\n';
    markdown += '## imageTitle\n\n\n';
    markdown += '## imageTitleDescription\n\n\n';
    const blob = new Blob([markdown], { type: 'text/markdown' });
    saveAs(blob, 'service-template.md');
  }
};
