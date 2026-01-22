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
import Chip from '@mui/material/Chip';

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
  const [sorting, setSorting] = useState([{ id: 'orderIndex', desc: false }]);
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
        title={matchDownSM ? 'Gallery Media' : 'Gallery Media Management'}
        content={false}
        secondary={
          <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
            <Button variant="contained" onClick={() => navigate('/forms/gallery-media')}>
              Add New
            </Button>
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
                  <TableRow key={row.id}>
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
                                  navigate(`/forms/edit/gallery-media/${row.original._id || row.original.id}`);
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
            Are you sure you want to delete "{itemToDelete?.titleEn}"? This action cannot be undone.
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

export default function GalleryMediaSortingTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/api/gallery-media');
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.error('Failed to retrieve gallery media items');
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setData([]);
      } else {
        console.error('Error fetching gallery media items:', error);
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
      await axiosInstance.delete(`/api/gallery-media/${id}`);
      console.log('Gallery media item deleted successfully');
      setData((prevData) => prevData.filter((item) => (item._id || item.id) !== id));
    } catch (error) {
      console.error('Error deleting gallery media item:', error);
    }
  };

  const getCategoryLabel = (category) => {
    const categoryMap = {
      whitening: 'Albire',
      orthodontics: 'Ortodonție',
      restoration: 'Restaurări',
      implants: 'Implanturi',
      surgery: 'Chirurgie',
      general: 'General'
    };
    return categoryMap[category] || category;
  };

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: '_id',
        cell: ({ row }) => {
          const id = row.original._id || row.original.id;
          return id ? id.substring(0, 8) + '...' : '-';
        }
      },
      {
        header: 'Title (EN)',
        accessorKey: 'titleEn'
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: ({ row }) => getCategoryLabel(row.original.category)
      },
      {
        header: 'Media Type',
        accessorKey: 'mediaType',
        cell: ({ row }) => (
          <Chip
            label={row.original.mediaType === 'photo' ? 'Photo' : 'Video'}
            color={row.original.mediaType === 'photo' ? 'primary' : 'secondary'}
            size="small"
            variant="outlined"
          />
        )
      },
      {
        header: 'Status',
        accessorKey: 'isActive',
        cell: ({ row }) => (
          <Chip
            label={row.original.isActive ? 'Active' : 'Inactive'}
            color={row.original.isActive ? 'success' : 'error'}
            size="small"
          />
        )
      },
      {
        header: 'Preview',
        accessorKey: 'preview',
        enableSorting: false,
        cell: ({ row }) => {
          const item = row.original;
          if (item.mediaType === 'photo' && item.beforeImageUrl) {
            return (
              <Box
                component="img"
                src={item.beforeImageUrl}
                alt="Preview"
                sx={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 1 }}
              />
            );
          } else if (item.mediaType === 'video' && item.videoPosterUrl) {
            return (
              <Box
                component="img"
                src={item.videoPosterUrl}
                alt="Video Poster"
                sx={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 1 }}
              />
            );
          }
          return '-';
        }
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

GalleryMediaSortingTable.propTypes = { getValue: PropTypes.func };

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, onDelete: PropTypes.func };
