import XLSX from 'xlsx';
import get from 'lodash/get';

export const importStudentExcel = re => new Promise((resolve, reject) => {
  const files = re;
  let result = [];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      data.splice(0, 2);
      result = data.map((item) => {
        if (item[0] === undefined || item[1] === undefined || item[2] === undefined) {
          return null;
        }
        return {
          code: item[0],
          star: item[1],
          message: item[2],
        };
      })
        .filter(item => !!item);
      resolve(result);
    } catch (ex) {
      reject(ex);
    }
  };
  reader.readAsBinaryString(files[0]);
});



export const importAttendanceExcel = re => new Promise((resolve, reject) => {
  const files = re;
  let result = [];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      data.splice(0, 2);
      result = data.map((item) => {
        if (item[0] === undefined || item[1] === undefined || item[2] === undefined || item[3] === undefined) {
          return null;
        }
        return {
          code: item[0],
          leaver: item[1],
          absent: item[2],
          late: item[3],
        };
      })
        .filter(item => !!item);
      resolve(result);
    } catch (ex) {
      reject(ex);
    }
  };
  reader.readAsBinaryString(files[0]);
});

export const importExcel = re => new Promise((resolve, reject) => {
  const files = re;
  let result = [];
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      data.splice(0, 2);
      result = data.map((item) => {
        if (item[0] === undefined || item[1] === undefined || item[2] === undefined) {
          return null;
        }
        return {
          code: item[0],
          realname: item[1],
          phone: item[2],
        };
      })
        .filter(item => !!item);
      resolve(result);
    } catch (ex) {
      reject(ex);
    }
  };
  reader.readAsBinaryString(files[0]);
});
