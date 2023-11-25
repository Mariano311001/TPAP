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
import EditIcon from '@mui/icons-material/Edit';

// Define el componente funcional TablaListaTareas
function TablaListaTareas({ taskItems, onDeleteClick }) {
  // Define una clave para el almacenamiento local
  const STORAGE_KEY = 'selectedItems';

  // Estado para almacenar los elementos seleccionados
  const [selected, setSelected] = React.useState([]);

  // Estado para manejar la paginación
  const [page, setPage] = React.useState(0);

  // Estado para manejar la cantidad de filas por página
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Cargar elementos seleccionados del almacenamiento local al montar el componente
  useEffect(() => {
    // Obtiene los elementos seleccionados del almacenamiento local o un array vacío si no hay ninguno
    const storedSelected = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    // Establece los elementos seleccionados en el estado
    setSelected(storedSelected);
  }, []);

  // Función para cambiar la página actual cuando se cambia de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Función para cambiar la cantidad de filas por página cuando se selecciona una nueva cantidad
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Función para manejar el cambio del checkbox en una fila
  const handleCheckboxChange = (id) => {
    // Crea una copia del array de elementos seleccionados
    const updatedSelected = [...selected];
    // Obtiene el índice del elemento en el array
    const index = updatedSelected.indexOf(id);

    // Si el elemento ya está seleccionado, lo deselecciona
    if (index !== -1) {
      updatedSelected.splice(index, 1);
    } else {
      // Si el elemento no está seleccionado, lo selecciona
      updatedSelected.push(id);
    }

    // Actualiza el estado con los elementos seleccionados
    setSelected(updatedSelected);
    // Almacena los elementos seleccionados en el almacenamiento local
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSelected));
  };

  // Función para manejar el clic en el ícono de eliminación
  const handleDeleteClick = () => {
    onDeleteClick(selected);
    setSelected([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Función para verificar si un elemento está seleccionado
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Renderiza el componente de la TablaListaTareas
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="medium">
          {/* Cabecera de la TablaListaTareas */}
          <TableHead>
            <TableRow>
              <TableCell>
                {/* Checkbox para seleccionar/deseleccionar todos */}
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < taskItems.length}
                  checked={selected.length === taskItems.length}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected(taskItems.map((row) => row.id));
                    } else {
                      setSelected([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Tarea</TableCell>
              <TableCell>Comentario</TableCell>
            </TableRow>
          </TableHead>
          {/* Cuerpo de la TablaListaTareas */}
          <TableBody>
            {taskItems
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  selected={isSelected(row.id)}
                  onClick={() => handleCheckboxChange(row.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Checkbox en cada fila para seleccionar/deseleccionar */}
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row.id)}
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
      {/* Ícono de eliminación */}
      {selected.length > 0 && (
        <DeleteIcon
          color="error"
          style={{ cursor: 'pointer', marginTop: '10px' }}
          onClick={handleDeleteClick}
        />
      )}
      {/* Ícono para editar, nose si usarlo */}
      {/*selected.length > 0 && (
        <EditIcon
          color="primary"
          style={{ cursor: 'pointer', marginTop: '10px' }}
        />
      )*/}

      {/* Paginación de la TablaListaTareas */}
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

// Propiedades del componente
TablaListaTareas.propTypes = {
  taskItems: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

// Exporta el componente
export default TablaListaTareas;
