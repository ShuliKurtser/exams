import { TableCell, TableRow } from "@mui/material"
import { useState } from "react"
import PdfLinkView from "./ViewPdf"
import { updateUserRelief } from "../utils/ReliefUser"
import Swal from 'sweetalert2';

const ReliefForOfficePopUpRow = (props) => {

    const { examsRow, setReliefsUsers, reliefsUsers, index, onChangeRelief } = props
    const [status, setStatus] = useState(examsRow.reliefStatus)

    const handleSaveRelief = () => {
        const updatedRelief = { ...examsRow, reliefStatus: status }
        updateUserRelief(examsRow.idReliefUser, updatedRelief)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    toast: true,
                    title: 'Success',
                    text: 'הפרטים  עודכנו בהצלחה',
                    width: '300px',
                    position: 'top-start',
                    timer: 2000,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'swal2-popup-high-zindex'
                    }
                });
                onChangeRelief(examsRow.idUser, updatedRelief, index)
            })
            .catch(error => {
                console.error('שגיאה בפוסט:', error);

            });
    }
    return <TableRow key={examsRow.idUser}>
        <TableCell>
            <button onClick={handleSaveRelief}>שמור</button>
        </TableCell>
        <TableCell style={{ textAlign: "center" }}>{examsRow.reliefFile != "" && examsRow.reliefFile != null
            && <PdfLinkView index={examsRow.idUser} pdfRef={examsRow.reliefFile}></PdfLinkView>}</TableCell>
        <TableCell>
            <select style={{ textAlign: "center" }}
                value={
                    status === null
                        ? 2
                        : status
                            ? 0
                            : 1
                }
                onChange={(e) =>
                    setStatus(e.target.value == 0
                        ? true : e.target.value == 1
                            ? false : null)}
            >
                <option value={2}>ממתין לאישור</option>
                <option value={0}>מאושר</option>
                <option value={1}>נדחה</option>
            </select>

        </TableCell>
        <TableCell style={{ textAlign: "center" }}>{examsRow.idReliefReasonsNavigation.reasons}</TableCell>

        <TableCell style={{ textAlign: "center", backgroundColor: 'transparent', textDecoration: 'none' }} component="th" scope="row">
            {examsRow.idReliefTypesNavigation.reliefTypes}
        </TableCell>


    </TableRow>

}
export default ReliefForOfficePopUpRow