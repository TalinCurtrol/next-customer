/* eslint-disable import/no-cycle */

'use client';

import * as React from 'react';

import Container from '@mui/material/Container';
import { Box, Step, Button, Stepper, StepLabel } from '@mui/material';

import AddonList from './add-on';
import { PaymentForm } from './Payment';
import ServiceList from './service-list';
import StripePayment from './StripePayment';
import SelectavailableTimeList from './select-time';
import SelectTechnicianList from './select-technicain';
import { LocationComponent } from './LocationComponent';

const steps = [
  'Select location',
  'Select service',
  'Select add-on',
  'Select technician',
  'Select time',
  'Review order',
];

export interface Data {
  location: string;
  selectedServices: any[];
  selectedAddons: any[];
  technician: number;
  time: string;
}

export function Booking() {
  const [allData, setAllData] = React.useState<Data>({
    location: '930 Landavo Drive, Escondido, CA, USA',
    selectedServices: [],
    selectedAddons: [],
    technician: 0,
    time: '',
  });

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <LocationComponent setAllData={setAllData} allData={allData} />;
      case 1:
        return <ServiceList setAllData={setAllData} allData={allData} />;
      case 2:
        return <AddonList setAllData={setAllData} allData={allData} />;
      case 3:
        return <SelectTechnicianList setAllData={setAllData} allData={allData} />;
      case 4:
        return <SelectavailableTimeList setAllData={setAllData} allData={allData} />;
      case 5:
        return <PaymentForm allData={allData} setAllData={setAllData} />;
      case 6:
        return <StripePayment allData={allData} />; // I don't know if it useful to you
      default:
        throw new Error('Unknown step');
    }
  }

  const [activeStep, setActiveStep] = React.useState<number>(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    console.log(`current data=${JSON.stringify(allData)}`);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <React.Suspense fallback={null}>
      <Container maxWidth="lg">
        <Stepper activeStep={activeStep} sx={{ pb: 5 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 2,
            justifyContent: 'space-between',
          }}
        >
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>

          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Container>
    </React.Suspense>
  );
}

export default Booking;
