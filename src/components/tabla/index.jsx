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

function Tabla({ registros }) {
  // Estado para almacenar los IDs de los elementos seleccionados
  const [selected, setSelected] = React.useState([]);
  
  // Estado para manejar la paginación
  const [page, setPage] = React.useState(0);
  
  // Estado para manejar la cantidad de filas por página
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Cambia la página actual cuando se cambia de página
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Cambia la cantidad de filas por página cuando se selecciona una nueva cantidad
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Maneja el cambio del checkbox en una fila
  const handleCheckboxChange = (event, id) => {
    if (event.target.checked) {
      // Agrega el ID a la lista de elementos seleccionados
      setSelected([...selected, id]);
    } else {
      // Elimina el ID de la lista de elementos seleccionados
      setSelected(selected.filter((selectedId) => selectedId !== id));
    }
  };

  // Maneja el clic en una fila para seleccionar/deseleccionar
  const handleRowClick = (id) => {
    if (selected.includes(id)) {
      // Si ya está seleccionado, lo deselecciona
      setSelected(selected.filter((selectedId) => selectedId !== id));
    } else {
      // Si no está seleccionado, lo selecciona
      setSelected([...selected, id]);
    }
  };

  // Verifica si un elemento está seleccionado
  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Renderiza el componente de la tabla
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer>
        <Table aria-labelledby="tableTitle" size="medium">
          {/* Cabecera de la tabla */}
          <TableHead>
            <TableRow>
              <TableCell>
                {/* Checkbox para seleccionar/deseleccionar todos */}
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < registros.length}
                  checked={selected.length === registros.length}
                  onChange={(event) => {
                    if (event.target.checked) {
                      // Selecciona todos los elementos
                      setSelected(registros.map((row) => row.id));
                    } else {
                      // Deselecciona todos los elementos
                      setSelected([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Tarea</TableCell>
              <TableCell>Comentario</TableCell>
            </TableRow>
          </TableHead>
          {/* Cuerpo de la tabla */}
          <TableBody>
            {registros
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  key={row.id}
                  selected={isSelected(row.id)}
                  onClick={() => handleRowClick(row.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Checkbox en cada fila para seleccionar/deseleccionar */}
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(row.id)}
                      onChange={(event) => handleCheckboxChange(event, row.id)}
                    />
                  </TableCell>
                  <TableCell>{row.tarea}</TableCell>
                  <TableCell>{row.comentario}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Paginación de la tabla */}
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
Tabla.propTypes = {
  registros: PropTypes.array.isRequired,
};

// Exporta el componente
export default Tabla;
