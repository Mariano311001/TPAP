import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

function TaskList({ taskItems, onDeleteClick }) {
  const SELECTED_ITEMS = 'selectedItems';

  const [completedTasks, setCompletedTasks] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    const storedSelected = JSON.parse(localStorage.getItem(SELECTED_ITEMS)) || [];
    setCompletedTasks(storedSelected);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxChange = (id) => {
    const updatedCompletedTasks = [...completedTasks];
    const index = updatedCompletedTasks.indexOf(id);

    if (index !== -1) {
      updatedCompletedTasks.splice(index, 1);
    } else {
      updatedCompletedTasks.push(id);
    }

    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem(SELECTED_ITEMS, JSON.stringify(updatedCompletedTasks));
  };

  const handleDeleteClick = () => {
    onDeleteClick(completedTasks);
    setCompletedTasks([]);
    localStorage.removeItem(SELECTED_ITEMS);
  };

  const isTaskCompleted = (id) => completedTasks.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="medium">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Tarea</TableCell>
              <TableCell>Comentario</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleCheckboxChange(row.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isTaskCompleted(row.id)}
                      onChange={() => handleCheckboxChange(row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.taskName}</TableCell>
                  <TableCell>{row.comment}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteIcon
        color="error"
        style={{ cursor: 'pointer', marginTop: '10px' }}
        onClick={handleDeleteClick}
      />
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={taskItems.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

TaskList.propTypes = {
  taskItems: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default TaskList;
