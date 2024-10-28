import React, { useState } from 'react';
import './CajaVirtual.css'; 
import { useNavigate } from 'react-router-dom';

const CajaVirtual = () => {
  const [openRows, setOpenRows] = useState({});
  const [searchText, setSearchText] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'nombre', order: 'asc' });
  const navigate = useNavigate();

  const toggleRow = (rowId) => {
    setOpenRows((prev) => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  const data = [
    {
      id: 1,
      nv: 1,
      nombre: 'Juan Alberto',
      apellido: 'Nuñez Rojas',
      rut: 202398634,
      correo: 'JuanA@examples',
      fecha: '12/08/24',
      hora: '12:34',
      metodo: 'efectivo',
      total: 10000,
      products: [
        ['Nigiri', 4, 12000],
        ['Maki', 6, 10000],
      ],
    },
    {
      id: 2,
      nv: 2,
      nombre: 'Maria Gomez',
      apellido: 'Sanchez',
      rut: 202398634,
      correo: 'Maria@examples',
      fecha: '12/08/24',
      hora: '12:34',
      metodo: 'efectivo',
      total: 6000,
      products: [
        ['Nigiri', 4, 12000],
        ['Maki', 6, 10000],
      ],
    },
    {
      id: 3,
      nv: 3,
      nombre: 'Pedro Lopez',
      apellido: 'Martinez',
      rut: 202398634,
      correo: 'Pedro@examples',
      fecha: '12/08/24',
      hora: '12:34',
      metodo: 'efectivo',
      total: 2500,
      products: [
        ['Nigiri', 4, 12000],
        ['Maki', 6, 10000],
      ],
    },
  ];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const cajaVirtual = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleSort = (key) => {
    let order = 'asc';
    if (sortConfig.key === key && sortConfig.order === 'asc') {
      order = 'desc';
    }
    setSortConfig({ key, order });
  };

  const filteredData = data.filter((row) => {
    const fullName = `${row.nombre} ${row.apellido}`.toLowerCase();
    return (
      fullName.includes(searchText.toLowerCase()) ||
      row.correo.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const sortedData = filteredData.sort((a, b) => {
    const aValue =
      sortConfig.key === 'fecha'
        ? new Date(a[sortConfig.key])
        : a[sortConfig.key];
    const bValue =
      sortConfig.key === 'fecha'
        ? new Date(b[sortConfig.key])
        : b[sortConfig.key];

    if (sortConfig.order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return (
    <div className="body-virtual">
      <div className="container">
        <h2>Caja Virtual</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o correo"
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
        <table className="table">
          <thead>
            <tr>
              <th
                onClick={() => handleSort('nv')}
                style={{ cursor: 'pointer' }}
              >
                Número de pedido
                {sortConfig.key === 'nv' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
              <th
                onClick={() => handleSort('nombre')}
                style={{ cursor: 'pointer' }}
              >
                Nombre Completo{' '}
                {sortConfig.key === 'nombre' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
              <th
                onClick={() => handleSort('apellido')}
                style={{ cursor: 'pointer' }}
              >
                Apellido Completo{' '}
                {sortConfig.key === 'apellido' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
              <th
                onClick={() => handleSort('rut')}
                style={{ cursor: 'pointer' }}
              >
                Rut{' '}
                {sortConfig.key === 'rut' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
              <th
                onClick={() => handleSort('correo')}
                style={{ cursor: 'pointer' }}
              >
                Correo{' '}
                {sortConfig.key === 'correo' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
              <th
                onClick={() => handleSort('fecha')}
                style={{ cursor: 'pointer' }}
              >
                Fecha{' '}
                {sortConfig.key === 'fecha' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
              <th
                onClick={() => handleSort('hora')}
                style={{ cursor: 'pointer' }}
              >
                Hora{' '}
                {sortConfig.key === 'hora' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
              <th
                onClick={() => handleSort('metodo')}
                style={{ cursor: 'pointer' }}
              >
                Método de pago{' '}
                {sortConfig.key === 'metodo' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
              <th
                onClick={() => handleSort('total')}
                style={{ cursor: 'pointer' }}
              >
                Total{' '}
                {sortConfig.key === 'total' &&
                  (sortConfig.order === 'asc' ? '▲' : '▼')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <React.Fragment key={row.id}>
                <tr>
                  <td>{row.nv}</td>
                  <td>{row.nombre}</td>
                  <td>{row.apellido}</td>
                  <td>{row.rut}</td>
                  <td>{row.correo}</td>
                  <td>{row.fecha}</td>
                  <td>{row.hora}</td>
                  <td>{row.metodo}</td>
                  <td>{row.total}</td>
                  <td>
                    <button
                      className="toggle-button"
                      onClick={() => toggleRow(row.id)}
                    >
                      {openRows[row.id] ? '▲' : '▼'}
                    </button>
                  </td>
                </tr>
                {openRows[row.id] && (
                  <tr>
                    <td colSpan="6">
                      <div>
                        <h4>Detalles del pedido</h4>
                        <table className="secondary-table">
                          <thead>
                            <tr>
                              <th>Sushi</th>
                              <th>Cantidad</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.products.map((product, index) => (
                              <tr key={index}>
                                <td>{product[0]}</td>
                                <td>{product[1]}</td>
                                <td>{product[2]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <footer>
          <p>© 2024 Fukusuke Sushi-Delivery – All Rights Reserved.</p>
          <button className="buttonVirtual" onClick={cajaVirtual}>
            Inicio de sesion
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CajaVirtual;
