import React, { useEffect, useState } from 'react'
import DataTableRow from '../components/DataTableRow';

const Home = () => {

    const [datos, setDatos] = useState([]);
    const [search, setSearch] = useState("")
    const [page, setPage] = useState(0)

    const url = 'https://api.koibanx.com/stores';

    const peticion = async () => {
        console.log(url)
        const response = await fetch(url)
            .catch(error => console.error(error));
        setDatos(response.data);
    }

    const buscar = async (e) => {
        e.preventDefault();
        console.log(`${url}?q={}&filter=${search}`)
        const response = await fetch(`${url}?q={}&filter=${search}`)
            .catch(error => console.error(error));
        setDatos(response.data)
        setPage(0)
    }

    const ordenar = async () =>{{
        console.log(`${url}?q=&h={"$orderby": {"Comercios": 1, "Cuit": 1}}`)
        const orderData = await fetch(`${url}?q=&h={"$orderby": {"Comercios": 1, "Cuit": 1}}`)
            .catch(error => console.error(error));
        setDatos(orderData.data);
    }}

    useEffect(() => {
        peticion();
    }, [])

    const pagination = () => {
        return datos.slice(page, page + 10)
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
        console.log("Busqueda " + e.target.value)
    }

    const activos = (datos) => {
        let resultado = datos.filter(element => element.activo === true)
        setDatos(resultado);
    }

    const noActivos = (datos) => {
        let resultado = datos.filter(element => element.activo === false)
        setDatos(resultado);
    }

    const nextPage = () => {
        setPage(page + 10);
    }

    const prevPage = () => {
        if(page > 0){
            setPage(page - 10);
        }
    }
    
  return (
    <div className=''>
        <div className='row'>
            <form onSubmit={buscar}>
                <input type="text" value={search} placeholder='Busqueda por ID, CUIT o Comercio' onChange={handleChange} className="form-control"/>
                <button type='submit' className="btn btn-primary mt-2">Enviar</button>
            </form>
        </div>
        <div className='mt-5'>
            <button onClick={activos} className='btn btn-success me-1'>Activos</button>
            <button onClick={noActivos} className='btn btn-danger'>No activos</button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Comercio</th>
                        <th>CUIT</th>
                        <th>Concepto 1</th>
                        <th>Concepto 2</th>
                        <th>Concepto 3</th>
                        <th>Concepto 4</th>
                        <th>Concepto 5</th>
                        <th>Concepto 6</th>
                        <th>Balance actual</th>
                        <th>Activo</th>
                        <th>Ultima venta</th>
                    </tr>
                </thead>
                <tbody>
                    {pagination() ? pagination().map( element => <DataTableRow key={element.id} element={el}/> ) : <tr><td>Sin datos</td></tr>}
                </tbody>
            </table>
            <div className='mt-5'>
                <button onClick={prevPage} className="btn btn-primary me-1">Anterior</button>
                <button onClick={nextPage} className="btn btn-primary">Siguiente</button>
            </div>
            <div>
                <button onClick={ordenar} className="btn btn-success mt-4">Ordenar</button>
            </div>
        </div>
    </div>
  )
}

export default Home