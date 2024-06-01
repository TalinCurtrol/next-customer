import * as React from 'react';
import parse from 'autosuggest-highlight/parse';
import { Map, Marker, APIProvider } from '@vis.gl/react-google-maps';
import { setKey, setRegion, fromLatLng, fromAddress, setLocationType } from 'react-geocode';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { debounce } from '@mui/material/utils';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button, Container } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { Data } from './page';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GOOGLE_MAPS_API_KEY = 'AIzaSyCys2fKmj6p1ihjar-ABq7dl5D1HfiFpbE';
setKey(GOOGLE_MAPS_API_KEY);
setRegion('au');
setLocationType('ROOFTOP');

const autocompleteService: { current: google.maps.places.AutocompleteService | null } = {
  current: null,
};

interface PlacePrediction {
  description: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings: { offset: number; length: number }[];
  };
}

export function LocationComponent({
  setAllData,
  allData,
}: {
  setAllData: React.Dispatch<React.SetStateAction<Data>>;
  allData: Data;
}) {
  const [value, setValue] = React.useState<string | PlacePrediction>(
    '930 Landavo Drive, Escondido, CA, USA'
  );
  const [inputValue, setInputValue] = React.useState<string>('');
  const [options, setOptions] = React.useState<(string | PlacePrediction)[]>([]);
  const [coordinates, setCoordinates] = React.useState<Coordinates | null>(null);
  const [zoom, setZoom] = React.useState<number>(5);

  const findAddress = (lat: number, lng: number) => {
    fromLatLng(lat, lng).then(({ results }) => {
      setValue(results[0].formatted_address);
      setAllData({ ...allData, location: results[0].formatted_address });

      setInputValue('');
    });
  };

  React.useEffect(() => {
    const findLatAndLng = () => {
      if (typeof value === 'string') {
        fromAddress(value).then(
          (response) => {
            setCoordinates(response.results[0].geometry.location);
            if (zoom !== 15) {
              setZoom(15);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      } else if (value) {
        fromAddress(value.description).then(
          (response) => {
            setCoordinates(response.results[0].geometry.location);
            if (zoom !== 15) {
              setZoom(15);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      }
    };

    findLatAndLng();
  }, [value, zoom]);

  const fetch = React.useMemo(
    () =>
      debounce(
        (request: { input: string }, callback: (results: PlacePrediction[] | null) => void) => {
          autocompleteService.current?.getPlacePredictions(request, callback);
        },
        400
      ),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions: (string | PlacePrediction)[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  const handleLocationButtonOnClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(setCoords);
    }
  };

  const setCoords = (position: GeolocationPosition) => {
    findAddress(position.coords.latitude, position.coords.longitude);
    if (zoom !== 15) {
      setZoom(15);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2">Location</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          id="google-map-demo"
          sx={{ width: 500, mb: 2, mt: 2 }}
          getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
          filterOptions={(x) => x}
          options={options}
          autoComplete
          includeInputInList
          filterSelectedOptions
          value={value}
          noOptionsText="No locations"
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            if (newValue !== null) {
              setValue(newValue);
              setAllData({
                ...allData,
                location: typeof newValue === 'string' ? newValue : newValue.description,
              });
            }
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => <TextField {...params} label="Add a location" fullWidth />}
          renderOption={(props, option) => {
            const isString = (opt: any): opt is string => typeof opt === 'string';
            const isPlacePrediction = (opt: any): opt is PlacePrediction => !isString(opt);

            if (isString(option)) {
              return <li {...props}>{option}</li>;
            }
            if (isPlacePrediction(option)) {
              const matches = option.structured_formatting.main_text_matched_substrings || [];

              const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match) => [match.offset, match.offset + match.length])
              );

              return (
                <li {...props}>
                  <Grid container alignItems="center">
                    <Grid item sx={{ display: 'flex', width: 44 }}>
                      <LocationOnIcon sx={{ color: 'text.secondary' }} />
                    </Grid>
                    <Grid
                      item
                      sx={{
                        width: 'calc(100% - 44px)',
                        wordWrap: 'break-word',
                      }}
                    >
                      {parts.map((part, index) => (
                        <Box
                          key={index}
                          component="span"
                          sx={{
                            fontWeight: part.highlight ? 'bold' : 'regular',
                          }}
                        >
                          {part.text}
                        </Box>
                      ))}
                      <Typography variant="body2" color="text.secondary">
                        {option.structured_formatting.secondary_text}
                      </Typography>
                    </Grid>
                  </Grid>
                </li>
              );
            }
            return null;
          }}
        />
        <Button
          size="large"
          type="button"
          variant="contained"
          sx={{ ml: 2 }}
          onClick={handleLocationButtonOnClick}
        >
          Current location
        </Button>
      </Box>
      <APIProvider
        apiKey={GOOGLE_MAPS_API_KEY}
        libraries={['places']}
        onLoad={() => {
          if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
          }
        }}
      >
        <Map
          style={{ width: '100%', height: 500 }}
          defaultCenter={{
            lat: 22.54992,
            lng: 0,
          }}
          defaultZoom={5}
          center={coordinates}
          zoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI
        >
          <Marker position={coordinates} />
        </Map>
      </APIProvider>
    </Container>
  );
}
