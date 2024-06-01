/* eslint-disable react/jsx-no-bind */
import React from 'react';

import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Box, Button, Typography } from '@mui/material';

import Label from '../../components/label/label';
import { fCurrency } from '../../utils/format-number';
import { fDate, fTime } from '../../utils/format-time';
import Iconify from '../../components/iconify/iconify';

export default function OrderTableRow({ row, selected }: { row: any; selected: any }) {
  const {
    id,
    status,
    location,
    technician,
    createdAt,
    serviceName,
    lastName,
    firstName,
    surcharge,
    imageUrl,
  } = row;

  const [addOnsDisplay, setAddOnsDisplay] = React.useState(false);

  function handleViewOnClick() {
    setAddOnsDisplay(!addOnsDisplay);
  }

  const [addOns, setAddOns] = React.useState([
    {
      id: 1,
      serviceId: 1,
      name: 'facial',
      price: 29.9,
    },
    {
      id: 2,
      serviceId: 1,
      name: 'nail care',
      price: 19.9,
    },
    {
      id: 3,
      serviceId: 2,
      name: 'massage',
      price: 49.9,
    },
    {
      id: 4,
      serviceId: 2,
      name: 'nail care',
      price: 29.9,
    },
  ]);

  const renderPrimary = (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox" />

        <TableCell>
          <Avatar
            alt={serviceName}
            src={imageUrl}
            sx={{ mr: 2, float: 'left' }}
            variant="rounded"
          />

          {/* <ListItemText
            primary={serviceName}
            primaryTypographyProps={{ typography: 'body1' }}
          /> */}
          <Typography variant="body1">{serviceName}</Typography>
        </TableCell>

        <TableCell>
          {/* <ListItemText
            primary={fDate(createdAt)}
            secondary={fTime(createdAt)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          /> */}
          <Typography variant="body2">{fDate(createdAt)}</Typography>
          <Typography variant="caption" sx={{ mt: 0.5 }}>
            {fTime(createdAt)}
          </Typography>
        </TableCell>

        <TableCell>
          {/* <ListItemText
            primary={technician}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          /> */}
          <Typography variant="body2">{`${technician}`}</Typography>
        </TableCell>

        <TableCell>
          {/* <ListItemText
            primary={location}
            primaryTypographyProps={{ typography: 'body2' }}
          /> */}
          <Typography variant="body2">{location}</Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body2">{fCurrency(surcharge)}</Typography>
        </TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'completed' && 'success') ||
              (status === 'pending' && 'warning') ||
              (status === 'cancelled' && 'error') ||
              'default'
            }
          >
            <Typography variant="body2">{status}</Typography>
          </Label>
        </TableCell>

        <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Button
            onClick={handleViewOnClick}
            sx={{
              color: 'inherit',
              '&:hover': {
                background: 'none',
              },
            }}
          >
            <Iconify
              icon="ic:baseline-rate-review"
              // color="#e2a2a2"
            />
            <Typography variant="caption" textTransform="none">
              View
            </Typography>
          </Button>
          {status === 'completed' && (
            <Button
              onClick={() => {
                window.location.href = `/rating?id=${id}`;
              }}
              sx={{
                color: 'inherit',
                '&:hover': {
                  background: 'none',
                },
              }}
            >
              <Iconify
                icon="ic:baseline-rate-review"
                // color="#e2a2a2"
              />
              <Typography variant="caption" textTransform="none">
                Rate
              </Typography>
            </Button>
          )}
        </TableCell>
      </TableRow>
      <TableRow sx={addOnsDisplay ? {} : { display: 'none' }}>
        <TableCell />
        <TableCell sx={{ textAlign: 'center' }}>
          <Typography variant="h6">Add-ons:</Typography>
        </TableCell>

        <TableCell sx={{}}>
          {addOns.filter(({ serviceId }) => serviceId === id).length === 0 ? (
            <Typography variant="body1">None</Typography>
          ) : (
            addOns
              .filter(({ serviceId }) => serviceId === id)
              .map((addOn, index) => (
                <Box display="flex" sx={{ alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ mr: 2 }} noWrap>
                    {addOn.name}
                  </Typography>
                  ${addOn.price}
                </Box>
              ))
          )}
        </TableCell>
        <TableCell />
        <TableCell colSpan={2} sx={{}} />
        <TableCell colSpan={2} sx={{}} />
      </TableRow>
    </>
  );

  return renderPrimary;
}
