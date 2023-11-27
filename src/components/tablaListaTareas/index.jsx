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

  // Estado para almacenar las tareas completadas
  const [completedTasks, setCompletedTasks] = React.useState([]);

  //Material UI
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // useEffect para cargar las tareas completadas del localStorage
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

  // funcion de cambio de estado del checkbox al hacer clic en una tarea
  const handleCheckboxChange = (id) => {
    const updatedCompletedTasks = [...completedTasks];
    const index = updatedCompletedTasks.indexOf(id); //Si no esta seleccionado da -1

    if (index !== -1) {
      updatedCompletedTasks.splice(index, 1);
    } else {
      updatedCompletedTasks.push(id);
    }

    // se actualiza las tareas con los checkbox y se almacena en el localStorage
    setCompletedTasks(updatedCompletedTasks);
    localStorage.setItem(SELECTED_ITEMS, JSON.stringify(updatedCompletedTasks));
  };

  const handleDeleteClick = () => {
    onDeleteClick(completedTasks);
    setCompletedTasks([]);
    localStorage.removeItem(SELECTED_ITEMS);
  };

  // Función para verificar si una tarea esta completada
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
                  style={{ cursor: 'pointer', background: isTaskCompleted(row.id) ? '#64ff00' : 'white' }}
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
      {/* Icono eliminar */}
      {completedTasks.length > 0 && (
        <DeleteIcon
          color="error"
          style={{ cursor: 'pointer', marginTop: '10px' }}
          onClick={handleDeleteClick}
        />
      )}
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

export default TaskList;
