/* eslint-disable import/no-cycle */
import React, { useState, useEffect } from 'react';

import { Radio, RadioGroup, Typography, FormControl, FormControlLabel } from '@mui/material';

import { Data } from './page';

// ----------------------------------------------------------------------

interface Technician {
  id: string;
  firstName: string;
  lastName: string;
  description: string;
  cvImage: string;
}

interface SelectTechnicianListProps {
  allData: Data;
  setAllData: React.Dispatch<React.SetStateAction<Data>>;
}

const SelectTechnicianList: React.FC<SelectTechnicianListProps> = ({ allData, setAllData }) => {
  const [technicians, setTechnicians] = useState<Technician[]>([
    {
      id: '2',
      firstName: 'fn',
      lastName: 'ln',
      description: 'good',
      cvImage: '',
    },
  ]);
  const [value, setValue] = useState<string>(technicians.length > 0 ? technicians[0].id : '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setAllData({ ...allData, technician: +event.target.value });
  };

  const getTechnicians = (location: string, serviceId: string[], addons: string[]) => {
    // console.log('useEff')
    // Api.post('/getTechnicians', {
    //   location: location,
    //   serviceId: serviceId,
    //   addons: addons,
    // })
    //
    // GET request 1:
    // Parameter: up to you
    // Response: a list of technician in fomr of Technician
    // The list should be stored with setTechnicians()
  };

  useEffect(() => {
    getTechnicians(allData.location, allData.selectedServices, allData.selectedAddons);
    setAllData({
      ...allData,
      technician: technicians.length > 0 ? +technicians[0].id : 0,
    });
  }, [
    allData.location,
    allData.selectedServices,
    allData.selectedAddons,
    setAllData,
    technicians.length,
    allData,
    technicians,
  ]);

  return (
    <>
      <Typography variant="h2">Select technician</Typography>
      <FormControl component="fieldset">
        <RadioGroup aria-label="choose one" name="choose-one" value={value} onChange={handleChange}>
          {technicians.map((technician) => (
            <FormControlLabel
              key={technician.id}
              value={technician.id}
              control={<Radio />}
              label={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px dashed #aaa',
                    paddingBottom: '10px',
                    marginBottom: '10px',
                  }}
                >
                  <img
                    src={`data:image/jpeg;base64,${technician.cvImage}`}
                    alt="Technician Icon"
                    style={{
                      marginRight: '10px',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                    }}
                  />
                  <div>
                    <h4 style={{ margin: '0' }}>
                      {technician.firstName} {technician.lastName}
                    </h4>
                    <p style={{ margin: '0' }}>{technician.description}</p>
                  </div>
                </div>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default SelectTechnicianList;
