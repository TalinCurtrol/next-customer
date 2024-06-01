/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';

import { Box, Grid, Button, Typography } from '@mui/material';
// with date-fns v3.x

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Data } from './page';

// ----------------------------------------------------------------------

interface SelectavailableTimeListProps {
  allData: Data;
  setAllData: React.Dispatch<React.SetStateAction<Data>>;
}

const SelectavailableTimeList: React.FC<SelectavailableTimeListProps> = ({
  allData,
  setAllData,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [notAvailableTimes, setNotAvailableTimes] = useState<[number, number][]>([]);
  const [selectedTime, setSelectedTime] = useState<[number, number] | null>(null);

  const allHours: [number, number][] = [];
  let i_c = 8;
  while (i_c <= 22) {
    allHours.push([i_c, 0]);
    allHours.push([i_c, 30]);
    i_c += 1;
  }

  function calculateTotalDuration(selectedServices: { durations: number }[]) {
    let totalDuration = 0;
    selectedServices.forEach((service) => {
      totalDuration += service.durations;
    });
    return totalDuration;
  }

  const totalDuration = calculateTotalDuration(allData.selectedServices);

  const getTimeNotAvaliable = (technicianId: string, selectedDate: Date, totalDuration: number) => {
    console.log('getTimeNotAvaliable');
    console.log(selectedDate);
    // Api.post('/getTimeNotAvaliable', {
    //   technicianId,
    //   date: selectedDate.toString(),
    //   duration: totalDuration,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     setNotAvailableTimes(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // (optional) GET request 1:
    // Parameter: may be { technicianId, date: selectedDate.toString(), duration: totalDuration,}
    // Response: A list, every object in this list is [number,number], the first number means hour, the second means minutes(0 or 30).
    // This list should be stored with setNotAvailableTimes()
  };

  useEffect(() => {
    getTimeNotAvaliable(allData.technician.toString(), selectedDate, totalDuration);
  }, [allData.technician, selectedDate, totalDuration]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null); // Reset selected time when date changes
      getTimeNotAvaliable(allData.technician.toString(), date, totalDuration);
      console.log(notAvailableTimes);
    }
  };

  const handleTimeSelect = (time: [number, number]) => {
    setSelectedTime(time);
    const newDate = new Date(selectedDate);
    newDate.setHours(time[0]);
    newDate.setMinutes(time[1]);
    newDate.setSeconds(0);
    setAllData({ ...allData, time: newDate.toLocaleDateString() });
    console.log({ ...allData, time: newDate });
  };

  const curried = (arr: [number, number]) => (element: [number, number]) => {
    if (Array.isArray(element)) {
      if (element.length === arr.length) {
        return element.every((v, i) => v === arr[i]);
      }
    }
    return false;
  };

  return (
    <>
      <Typography variant="h2">Select availableTime</Typography>
      <br />
      <Typography variant="h3">Total Duration : {totalDuration} mins</Typography>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(date) => handleDateChange(date)}
          />
        </Grid>
        <Grid item xs={6}>
          <Box border={1} borderRadius={4} p={2}>
            {allHours.map((time) => {
              const curried1 = curried(time);
              return (
                <Button
                  key={`${time[0]}-${time[1]}`}
                  onClick={() => handleTimeSelect(time)}
                  variant={
                    selectedTime && selectedTime[0] === time[0] && selectedTime[1] === time[1]
                      ? 'contained'
                      : 'outlined'
                  } // Change variant based on selected status
                  sx={{
                    mr: 1,
                    mb: 1,
                    background: notAvailableTimes.find(curried1) ? 'lightgrey' : undefined,
                    color: notAvailableTimes.find(curried1) ? 'white' : undefined,
                    border: notAvailableTimes.find(curried1) ? 'none' : undefined,
                  }}
                  disabled={!!notAvailableTimes.find(curried1)}
                >
                  {`${time[0] < 10 ? `0${time[0]}` : time[0]}:${time[1] === 0 ? '00' : '30'}`}
                </Button>
              );
            })}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SelectavailableTimeList;
