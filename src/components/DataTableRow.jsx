import React from 'react'

const DataTableRow = ({el}) => {

  let {ID, comercio, CUIT, concepto1, concepto2, concepto3, concepto4, concepto5, concepto6, balanceActual, activo, ultimaVenta} = el;

  return (
    <tr>
      <td>{ID}</td>
      <td>{comercio}</td>
      <td>{CUIT}</td>
      <td>{concepto1}</td>
      <td>{concepto2}</td>
      <td>{concepto3}</td>
      <td>{concepto4}</td>
      <td>{concepto5}</td>
      <td>{concepto6}</td>
      <td>{balanceActual}</td>
      <td>{activo}</td>
      <td>{ultimaVenta}</td>
    </tr>
  )
}

export default DataTableRow