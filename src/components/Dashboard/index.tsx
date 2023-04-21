import {
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import styles from "./Dashboard.module.scss";
import { useState } from "react";
import { useFormStore } from "@component/store/store";

export default function Dasboard() {
  const [open, setOpen] = useState(false);
  const { dataForm } = useFormStore();
  
  console.log(dataForm)

  return (
    <TableContainer>
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
            <>
              <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <div onClick={() => setOpen(!open)}>X</div>
            </TableCell>
            <TableCell>{index}</TableCell>
            <TableCell>{el.name}</TableCell>
            <TableCell>{el.deliveryType}</TableCell>
            <TableCell>{el.paymentType}</TableCell>
            <TableCell>
              <div className="flex flex-col items-start justify-center">
              <select name="status">
                <option value="">status</option>
              </select>
              <button>Cancelar</button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <div>
                  <div>
                    <p>Pedido:</p>
                  </div>
                  <div>
                    <p>Endereço:</p>
                    <p>{`${el.city} - ${el.state}`}</p>
                    <p>{`${el.street}, ${el.neighborhood}, ${el.number}`}</p>
                  </div>
                </div>
              </Collapse>
            </TableCell>
          </TableRow>
            </>
          ))}
          {/* <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
            <TableCell>
              <div onClick={() => setOpen(!open)}>X</div>
            </TableCell>
            <TableCell>1</TableCell>
            <TableCell>Raissa Moreira</TableCell>
            <TableCell>Delivery</TableCell>
            <TableCell>Cartão</TableCell>
            <TableCell>
              <div className="flex flex-col items-start justify-center">
              <select name="status">
                <option value="">status</option>
              </select>
              <button>Cancelar</button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <div>
                  <div>Pedido:</div>
                  <div>Endereço:</div>
                </div>
              </Collapse>
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
