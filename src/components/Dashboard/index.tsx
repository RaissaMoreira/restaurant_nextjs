import {
  Box,
  Collapse,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./Dashboard.module.scss";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Fragment, useEffect, useState } from "react";
import { useFormStore, useStore } from "@component/store/store";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import api from "@component/services/api";
import { showToast } from "@component/modules/toast";
import { phoneMask } from "@component/utils/phoneMask";

export default function Dasboard() {
  const dataForm = useFormStore((s) => s.dataForm);
  const { deleteData } = useFormStore();
  const [open, setOpen] = useState<{ [key: number]: boolean }>({});
  const [status, setStatus] = useState([]);

  async function fetchApiStatus() {
    try {
      const response = await api.get(`/status`);
      setStatus(response.data);
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    fetchApiStatus();
  }, []);

  const toggleOpen = (index: number) => {
    setOpen((prevOpenStates) => ({
      ...prevOpenStates,
      [index]: !prevOpenStates[index],
    }));
  };

  const removeOrder = (index: number) => {
    deleteData(index);
    showToast({message: "Pedido excluído com sucesso!", status: "success"});
  }

  const position = (e: number) => {
    if (e || e === 0) {
      return e + 1;
    }
    return;
  };

  return (
    <TableContainer className="scrollbarStyles">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>id</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Retirada</TableCell>
            <TableCell>Pagamento</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataForm?.map((el, index) => (
            <Fragment key={index}>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell className="py-0">
                  <div onClick={() => toggleOpen(index)}>
                    <IoIosArrowDown />
                  </div>
                </TableCell>
                <TableCell className="py-0">{position(index)}</TableCell>
                <TableCell className="py-0">{el.name}</TableCell>
                <TableCell className="py-0">{el.deliveryType}</TableCell>
                <TableCell className="py-0">{el.paymentType}</TableCell>
                <TableCell className="py-3">
                  <div className="flex space-x-3 items-start lmd:justify-start justify-between">
                    <select className={`${styles.status}`} name="status">
                      {status?.map((el) => (
                        <option key={el?.id} value={el?.type}>{el?.type}</option>
                      ))}
                    </select>
                    <button
                      className="btnStyles py-1"
                      onClick={() => removeOrder(index)}
                    >
                      Cancelar
                    </button>
                  </div>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <div className="flex msm:flex-row flex-col msm:gap-10 msm:space-y-0 space-y-4 p-4">
                      <div>
                        <p className="font-semibold">Contato:</p>
                        <p>{phoneMask(el?.celular)}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Pedido:</p>
                        <div className="flex flex-col space-y-3">
                          {el?.order?.map((item, index) => (
                            <div key={index}>
                              <p>{`${item.quantity}x ${item.name}`}</p>
                              {item?.observations && (
                                <p>{`Observações: ${item.observations}`}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      {el?.cep && (
                        <div>
                          <p className="font-semibold">Endereço:</p>
                          <p>{`CEP - ${el?.cep}`}</p>
                          <p>{`${el?.city} - ${el?.state}`}</p>
                          <p>{`${el?.street}, ${el?.neighborhood}, ${el?.number}`}</p>
                        </div>
                      )}
                    </div>
                  </Collapse>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
