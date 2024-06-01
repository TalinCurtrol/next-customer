'use client';

import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import OrderTableRow from './order-table-row';
import Label from '../../components/label/label';
import {
  useTable,
  TableNoData,
  getComparator,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../components/table';

// ----------------------------------------------------------------------

const ORDER_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
];

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...ORDER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'serviceName', label: 'Service', width: 116 },
  { id: 'createdAt', label: 'Date', width: 140 },
  { id: 'technician', label: 'Technician', width: 120 },
  { id: 'location', label: 'Location', width: 116 },
  { id: 'subTotal', label: 'Price', width: 110 },
  { id: 'status', label: 'Status', width: 110 },
  { id: '', width: 50 },
];

const defaultFilters = {
  name: '',
  status: 'all',
  startDate: null,
  endDate: null,
};

interface Order {
  id: number;
  status: string;
  location: string;
  technician: string;
  createdAt: string;
  serviceName: string;
  subTotal: number; // it means total price, base service plus add-ons
  imageUrl: string;
}

// ----------------------------------------------------------------------

export default function OrderListView() {
  const table = useTable({ defaultOrderBy: 'id', defaultDense: true });

  const [tableData, setTableData] = useState<Order[]>([
    {
      id: 1,
      status: 'completed',
      location: '1 George St, NSW',
      technician: 'Paul Quinn',
      createdAt: '12:00 2024/01/01',
      serviceName: 'nail care',
      subTotal: 99,
      imageUrl: 'assets/image/1651590390248.png',
    },
    {
      id: 2,
      status: 'pending',
      location: '1 George St, NSW',
      technician: 'Diana Hunt',
      createdAt: '12:00 2024/01/04',
      serviceName: 'nail care',
      subTotal: 89,
      imageUrl: 'assets/image/1651590390248.png',
    },
    {
      id: 3,
      status: 'cancelled',
      location: '1 George St, NSW',
      technician: 'Aspen Reyes',
      createdAt: '12:00 2024/01/06',
      serviceName: 'nail care',
      subTotal: 159,
      imageUrl: 'assets/image/1651590390248.png',
    },
    {
      id: 4,
      status: 'refunded',
      location: '1 George St, NSW',
      technician: 'David J',
      createdAt: '12:00 2024/01/02',
      serviceName: 'nail care',
      subTotal: 59,
      imageUrl: 'assets/image/1651590390248.png',
    },
    {
      id: 5,
      status: 'completed',
      location: '1 George St, NSW',
      technician: 'Paul Quinn',
      createdAt: '12:00 2024/01/01',
      serviceName: 'nail care',
      subTotal: 99,
      imageUrl: 'assets/image/1651590390248.png',
    },
    {
      id: 6,
      status: 'pending',
      location: '1 George St, NSW',
      technician: 'Diana Hunt',
      createdAt: '12:00 2024/01/04',
      serviceName: 'nail care',
      subTotal: 89,
      imageUrl: 'assets/image/1651590390248.png',
    },
    {
      id: 7,
      status: 'cancelled',
      location: '1 George St, NSW',
      technician: 'Aspen Reyes',
      createdAt: '12:00 2024/01/06',
      serviceName: 'nail care',
      subTotal: 159,
      imageUrl: 'assets/image/1651590390248.png',
    },
    {
      id: 8,
      status: 'refunded',
      location: '1 George St, NSW',
      technician: 'David J',
      createdAt: '12:00 2024/01/02',
      serviceName: 'nail care',
      subTotal: 59,
      imageUrl: 'assets/image/1651590390248.png',
    },
  ]);

  const [filters, setFilters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  // const denseHeight = table.dense ? 56 : 56 + 20;

  const notFound = !dataFiltered.length || !dataFiltered.length;

  const handleFilters = useCallback(
    (name: any, value: any) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleFilterStatus = useCallback(
    (event: any, newValue: any) => {
      handleFilters('status', newValue);
    },
    [handleFilters]
  );

  useEffect(() => {
    // GET request 1:
    // Parameter: customer's id
    // Response: a list of orders in form of Order
    // This list should be sotred with setTableData()
  }, []);

  return (
    <>
      <Typography variant="h2" textAlign="center">
        My orders
      </Typography>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Card>
          <Tabs
            value={filters.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
            }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="end"
                value={tab.value}
                label={tab.label}
                sx={{
                  textTransform: 'unset',
                  fontSize: '17px',
                  fontFamily: 'Roboto',
                  fontWeight: 'bold',
                }}
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
                    }
                    color={
                      (tab.value === 'completed' && 'success') ||
                      (tab.value === 'pending' && 'warning') ||
                      (tab.value === 'cancelled' && 'error') ||
                      'default'
                    }
                  >
                    {['completed', 'pending', 'cancelled', 'refunded'].includes(tab.value)
                      ? tableData.filter((user) => user.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <TableContainer
            sx={{
              position: 'relative',
              overflow: 'auto',
            }}
          >
            {/* <Scrollbar> */}
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row: any) => row.id)
                  )
                }
              />

              <TableBody sx={{}}>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row: any, index: any) => (
                    <OrderTableRow key={index} row={row} selected={undefined} />
                  ))}

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
            {/* </Scrollbar> */}
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            //
            dense={table.dense}
            // onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: any;
  comparator: any;
  filters: any;
}) {
  const { status } = filters;

  const stabilizedThis = inputData.map((el: any, index: any) => [el, index]);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el: any) => el[0]);

  if (status !== 'all') {
    inputData = inputData.filter((order: any) => order.status === status);
  }

  return inputData;
}
