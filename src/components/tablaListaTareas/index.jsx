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
  const LOCAL_STORAGE_KEY = 'selectedItems';

  // Estado para almacenar las tareas completadas
  const [selectedTasks, setSelectedTasks] = React.useState([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // carga las tareas completadas con los checkboxs del localStorage
  useEffect(() => {
    const storedSelected = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []; //Si es nulo, usa un array vacio
    setSelectedTasks(storedSelected);
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
    const updatedSelectedTasks = [...selectedTasks];
    const index = updatedSelectedTasks.indexOf(id);

    if (index !== -1) {
      updatedSelectedTasks.splice(index, 1);
    } else {
      updatedSelectedTasks.push(id);
    }

    // se actualiza las tareas con los checkbox y se almacena en el localStorage
    setSelectedTasks(updatedSelectedTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedSelectedTasks));
  };

  const handleDeleteClick = () => {
    onDeleteClick(selectedTasks);
    setSelectedTasks([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  // Funcion para verificar si una tarea esta completada
  const isTaskCompleted = (id) => selectedTasks.indexOf(id) !== -1;

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
      {/* Icono eliminar */}
      {selectedTasks.length > 0 && (
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
