import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function FirstComponent() {
    const handleDateChange = (date) => {
      console.log(date);
    };
  
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={handleDateChange} />
      </LocalizationProvider>
    );
  }