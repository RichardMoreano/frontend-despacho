import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "./Modal";
import { FormCierreDespacho } from "./FormCierreDespacho";

export const TableDespachos = () => {
  const sampleDespachos = [
    {
      idDespacho: "1",
      idCompra: "4",
      direccionCompra: "Calle Falsa 123",
      fechaDespacho: "2026-05-04",
      patenteCamion: "AB-1234",
      entregado: true,
      intento: 1
    },
    {
      idDespacho: "2",
      idCompra: "2",
      direccionCompra: "Av. Siempre Viva 742",
      fechaDespacho: "2026-05-06",
      patenteCamion: "CD-5678",
      entregado: false,
      intento: 2
    },
    {
      idDespacho: "3",
      idCompra: "5",
      direccionCompra: "Paseo del Prado 45",
      fechaDespacho: "2026-05-07",
      patenteCamion: "EF-9012",
      entregado: false,
      intento: 1
    }
  ];

  const [despachos, setDespachos] = useState(sampleDespachos);

  const despacho = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_API_DESPACHOS}/api/v1/despachos`, {
          headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        .then((response) => {
          setDespachos(response.data);
        });
    } catch (error) {
      setDespachos(sampleDespachos);
    }
  };
  // Llamada a la función para obtener los datos cuando el componente se monta
  useEffect(() => {
    despacho();
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [despachoSeleccionado, setDespachoSeleccionado] = useState(null);

  const handleAbrirModal = (despacho) => {
    setDespachoSeleccionado(despacho);
    setOpenModal(true);
  };

  return (
    <>
      <section className="grid text-center grid-cols-12 mb-8">
        <div className="col-span-12 flex justify-center">
          <div className="col-span-10 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-white h-full overflow-hidden">
            <table className="table-fixed">
              <thead>
                <tr className="py-10">
                  <th className="pr-10">Orden de despacho</th>
                  <th className="pr-10">Orden de compra</th>
                  <th className="pr-10">Dirección de entrega</th>
                  <th className="pr-10">Fecha despacho</th>
                  <th className="pr-10">Patente Camión</th>
                  <th className="pr-10">Entregado</th>
                  <th className="pr-10">Intentos de entrega</th>
                </tr>
              </thead>
              <tbody>
                {despachos.map((despacho) => (
                  <tr key={despacho.idDespacho}>
                    <td className="pr-10 py-10 items-center">{despacho.idDespacho}</td>
                    <td className="pr-10 py-10  items-center">{despacho.idCompra}</td>
                    <td className="pr-10 py-10  items-center">{despacho.direccionCompra}</td>
                    <td className="pr-10 py-10  items-center">{despacho.fechaDespacho}</td>
                    <td className="pr-10 py-10  items-center">{despacho.patenteCamion}</td>
                    <td className="pr-10 py-10  items-center">
                      {despacho.entregado ? "Despacho entregado" : "Despacho pendiente"}
                    </td>
                    <td className="pr-10 py-10  items-center">{despacho.intento}</td>
                    <td>
                      <button
                        onClick={() => handleAbrirModal(despacho)}
                        className="py-1 bg-orange-200 px-8 rounded-xl shadow-md hover:bg-orange-300/70 transition-all duration-300 "
                      >
                        Cerrar despacho
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <Modal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      >
        {despachoSeleccionado && (
          <FormCierreDespacho
            despacho={despachoSeleccionado}
            onClose={() => {
              setOpenModal(false);
              despacho();
            }}
          />
        )}
      </Modal>
    </>
  );
};

export default TableDespachos;
