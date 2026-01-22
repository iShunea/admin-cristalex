import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import { Edit2, Trash } from 'iconsax-react';

import { getCoreRowModel, getSortedRowModel, flexRender, useReactTable } from '@tanstack/react-table';

import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { HeaderSort, SelectColumnSorting } from 'components/third-party/react-table';
import axiosInstance from 'api/axios-instance';
import { useNavigate } from 'react-router-dom';

function ReactTable({ columns, data, onDelete }) {
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [sorting, setSorting] = useState([{ id: 'id', desc: false }]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
      key: columns.columnDef.accessorKey
    })
  );

  const handleDeleteClick = (e, item) => {
    e.stopPropagation();
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      await onDelete(itemToDelete._id || itemToDelete.id);
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <>
      <MainCard
        title={matchDownSM ? 'Team' : 'Team Table'}
        content={false}
        secondary={
          <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
            <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />
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
                    hover
                    onClick={() => navigate(`/team/${row.original._id || row.original.id}`)}
                    sx={{ cursor: 'pointer' }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {cell.column.id === 'actions' ? (
                          <Stack direction="row" spacing={1}>
                            <Tooltip title="Edit">
                              <IconButton
                                color="primary"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/forms/edit/team/${row.original._id || row.original.id}`);
                                }}
                              >
                                <Edit2 size={18} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                color="error"
                                size="small"
                                onClick={(e) => handleDeleteClick(e, row.original)}
                              >
                                <Trash size={18} />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ScrollX>
      </MainCard>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default function SortingTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const retrieveTeam = await axiosInstance.get('/api/team-members');
      if (retrieveTeam.status === 200) {
        setData(retrieveTeam.data);
      } else {
        console.error('Failed to retrieve team');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setData([]);
      } else {
        console.error('Error fetching team:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/team-members/${id}`);
      console.log('Team member deleted successfully');
      setData((prevData) => prevData.filter((item) => (item._id || item.id) !== id));
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name'
      },
      {
        header: 'Role',
        accessorKey: 'role'
      },
      {
        header: 'Order',
        accessorKey: 'orderIndex'
      },
      {
        header: 'Actions',
        id: 'actions',
        enableSorting: false,
        cell: () => null
      }
    ],
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ReactTable data={data} columns={columns} onDelete={handleDelete} />;
}

SortingTable.propTypes = { getValue: PropTypes.func };

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, onDelete: PropTypes.func };
