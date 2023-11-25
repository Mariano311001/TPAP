import React from 'react';
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

function TablaListaTareas({ registros, onDeleteClick }) {
  // Estado para almacenar los elementos seleccionados
  const [selected, setSelected] = React.useState([]);
  
  // Estado para manejar la paginación
  const [page, setPage] = React.useState(0);
  
  // Estado para manejar la cantidad de filas por página
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    if (selected.includes(id)) {
      // Si ya está seleccionado, lo deselecciona
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      // Si no está seleccionado, lo selecciona
      setSelected([...selected, id]);
    }
  };

  // Función para manejar el clic en el ícono de eliminación
  const handleDeleteClick = () => {
    // Llama a la función onDeleteClick con los IDs de los elementos seleccionados
    onDeleteClick(selected);
    // Limpia la lista de elementos seleccionados
    setSelected([]);
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
                  indeterminate={selected.length > 0 && selected.length < registros.length}
                  checked={selected.length === registros.length}
                  onChange={(event) => {
                    if (event.target.checked) {
                      setSelected(registros.map((row) => row.id));
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
            {registros
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
                  <TableCell>{row.tarea}</TableCell>
                  <TableCell>{row.comentario}</TableCell>
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
      {selected.length > 0 && (
        <EditIcon
          color="primary"
          style={{ cursor: 'pointer', marginTop: '10px' }}
          //onClick={handleDeleteClick}
        />
      )}
      
      {/* Paginación de la TablaListaTareas */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={registros.length}
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
  registros: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

// Exporta el componente
export default TablaListaTareas;
