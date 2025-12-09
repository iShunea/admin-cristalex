import * as XLSX from 'xlsx';

export const parseExcelService = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length > 0) {
          const service = jsonData[0];
          resolve(service);
        } else {
          reject(new Error('Excel file is empty'));
        }
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

export const parseJSONService = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        resolve(jsonData);
      } catch (error) {
        reject(new Error('Invalid JSON format'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const parseMarkdownService = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const markdown = e.target.result;
        const service = {};
        
        const lines = markdown.split('\n');
        let currentField = null;
        let currentValue = '';
        
        lines.forEach(line => {
          const fieldMatch = line.match(/^##\s+(.+)$/);
          if (fieldMatch) {
            if (currentField) {
              service[currentField] = currentValue.trim();
            }
            currentField = fieldMatch[1].trim();
            currentValue = '';
          } else if (currentField && line.trim()) {
            currentValue += line + '\n';
          }
        });
        
        if (currentField) {
          service[currentField] = currentValue.trim();
        }
        
        resolve(service);
      } catch (error) {
        reject(new Error('Failed to parse Markdown'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};
