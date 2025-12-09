import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
// import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';

// third-party
import { getCoreRowModel, getSortedRowModel, flexRender, useReactTable } from '@tanstack/react-table';

// project import
// import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { HeaderSort, SelectColumnSorting } from 'components/third-party/react-table';
import axiosInstance from 'api/axios-instance';
import { useNavigate } from 'react-router-dom';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [sorting, setSorting] = useState([{ id: 'id', desc: false }]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      title={matchDownSM ? 'Services' : 'Services Table'}
      content={false}
      secondary={
        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
          <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />
          {/* <CSVExport {...{ data: table.getSortedRowModel().rows.map((d) => d.original), headers, filename: 'sorting.csv' }} /> */}
        </Stack>
      }
    >
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                      Object.assign(header.column.columnDef.meta, {
                        className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                      });
                    }

                    return (
                      <TableCell
                        key={header.id}
                        {...header.column.columnDef.meta}
                        onClick={header.column.getToggleSortingHandler()}
                        {...(header.column.getCanSort() &&
                          header.column.columnDef.meta === undefined && {
                            className: 'cursor-pointer prevent-select'
                          })}
                      >
                        {header.isPlaceholder ? null : (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                            {header.column.getCanSort() && <HeaderSort column={header.column} />}
                          </Stack>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => navigate(`/forms/edit/services/${row.original.id}`)} // Handle row click navigation
                  style={{ cursor: 'pointer' }} // Make the row look clickable
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - SORTING ||============================== //

export default function SortingTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrieveServices = await axiosInstance.get('/api/admin/services/list');
        if (retrieveServices.status === 200) {
          setData(retrieveServices.data);
        } else {
          console.error('Failed to retrieve services');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      // {
      //   header: 'Department',
      //   accessorKey: 'department'
      // },
      {
        header: 'Page Name',
        accessorKey: 'title'
      },
      {
        header: 'Page ID',
        accessorKey: 'id'
      }
    ],
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ReactTable {...{ data, columns }} />;
}

SortingTable.propTypes = { getValue: PropTypes.func };

SortingTable.propTypes = { getValue: PropTypes.func };

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array };
