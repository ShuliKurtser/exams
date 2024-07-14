import SwapVertIcon from '@mui/icons-material/SwapVert';
import React, { useEffect, useState } from "react";
import { AddExam, GetExams } from '../utils/Exams';
import style from './css/AddExams.module.css';
// import { UpdateDate, GetRegistationDate } from "../utils/RegistationDate";
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { AddDueDate, UpdateDueDates, getAllDueDate } from "../utils/dueDate";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,
  Collapse, Paper, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import { Edit, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { filter } from 'lodash';

function Exams() {
  // const [exam, setExam] = useState({ subjects: '' });
  const [exams1, setExams1] = useState([]);
  // const [dates, setDates] = useState({});
  const [dueDate, setDueDate] = useState({});
  const [dueDates, setDueDates] = useState([]);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [filterExamId, setFilterExamId] = useState(null)
  const dueDateSchema = yup.object({
    subjects: yup.string('שדה חובה').required('שדה חובה'),
    dueDate1: yup.date('חובה לבחור תאריך').required('שדה חובה'),
    description: yup.string('שדה חובה').required('שדה חובה'),
    time: yup.string('שדה חובה').required('שדה חובה'),
    cost: yup.string('שדה חובה').required('שדה חובה'),
  });


  useEffect(() => {
    GetExams().then((data) => {
      setExams1(data);
    });
    getAllDueDate().then((res) => {
      setDueDates(res.data);
    });
  }, []);

  // useEffect(() => {
  //   GetRegistationDate().then((data) => {
  //     setDates(data);
  //   });
  // }, []);

  const onChageDueDate = (key, value) => {
    setDueDate({ ...dueDate, [key]: value });
  };

  const handleAddExam = () => {
    let index = dueDates.findIndex(ex => ex.idExamNavigation.subjects === dueDate.subjects
      && ex.dueDate1 === dueDate.dueDate1);

    if (index >= 0) {
      Swal.fire({
        title: 'הודעה',
        text: 'כבר קיים נושא בחינה בשם זה ובתאריך זה',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
      return;
    }

    dueDateSchema.validate(dueDate, { abortEarly: false })
      .then(valid => {
        AddExam({ subjects: dueDate.subjects })
          .then(response => {
            const newDueDate = { ...dueDate, idExam: response.idExam }
            AddDueDate(newDueDate)
              .then(res => {
                handleClose();
                setDueDates([...dueDates, res])
                Swal.fire({
                  title: 'הודעה',
                  text: 'הנושא נוסף בהצלחה :)',
                  icon: 'success',
                  confirmButtonText: 'אישור'
                });
              });
          })
          .catch(error => {
            console.error('שגיאה בפוסט:', error);
          });
      })
      .catch(err => {
        console.error('Validation errors:', err);
        let _errors = {};
        err.inner.forEach((error) => {
          _errors[error.path] = error.message;
        });
        setErrors(_errors);
      });
  };

  const handleEditExam = () => {
    // let index = exams1.findIndex(ex => ex.subjects === dueDate.subjects && dueDate.dueDate === dueDate.date);
    let index = dueDates.findIndex(ex => ex.idExamNavigation.subjects === dueDate.subjects
      && ex.dueDate1 === dueDate.dueDate1);

    if (index >= 0) {
      Swal.fire({
        title: 'הודעה',
        text: 'כבר קיים נושא בחינה בשם זה ובתאריך זה',
        icon: 'warning',
        confirmButtonText: 'אישור'
      });
      return;
    }

    dueDateSchema.validate({ ...dueDate, subjects: 'test' }, { abortEarly: false })
      .then(valid => {
        // let _dueDate = {...dueDate};
        // _dueDate.idExam = index;
        UpdateDueDates(dueDate.idDueDate, dueDate)
          .then(res => {
            handleClose();
            const updatedData = dueDates.map(dd => dd.idDueDate === res.idDueDate
              ? res
              : dd
            );
            console.log(updatedData);
            setDueDates(updatedData)
            Swal.fire({
              title: 'הודעה',
              text: 'הבחינה עודכנה בהצלחה :)',
              icon: 'success',
              confirmButtonText: 'אישור'
            });
          })
          .catch(error => {
            console.error('שגיאה בפוסט:', error);
          });
      })
      .catch(err => {
        console.error('Validation errors:', err);
        let _errors = {};
        err.inner.forEach((error) => {
          _errors[error.path] = error.message;
        });
        setErrors(_errors);
      });
  };


  const handleClose = () => {
    setOpen(false);
  }

  const handleClickAddExam = (isEdit, dueDate) => {
    setOpen(true);
    setDueDate(dueDate);
    setIsEdit(isEdit);
  }
  const [groupedData, setGroupedData] = useState([])

  const setSortGroupData = () => {
    const data = dueDates?.reduce((acc, currentItem) => {
      const subject = exams1.find(ex => ex.idExam === currentItem.idExam)?.subjects;
      if (subject) {
        if (!acc[subject]) {
          acc[subject] = [];
        }
        acc[subject].push(currentItem);
      }
      return acc;
    }, {});

    // Sort the grouped data by subject keys
    const sortedData = Object.keys(data || {}).sort()
      .reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

    setGroupedData(sortedData);
  }
  useEffect(() => {
    setSortGroupData()
  }, [dueDates, exams1]);

  useEffect(() => {
    debugger;
    if (filterExamId) {
      const filteredData = dueDates.reduce((acc, currentItem) => {
        const exam = exams1.find(ex => ex.idExam == currentItem.idExam);
        const subject = exam?.subject;
        const examId = exam?.idExam;
        // const subject = currentItem.idExamNavigation.subjects;
        // const examId = currentItem.idExamNavigation.examId;
        if (examId === filterExamId) {
          if (!acc[subject]) {
            acc[subject] = [];
          }
          acc[subject].push(currentItem);
        }
        return acc;
      }, {});
      setGroupedData(filteredData);
    } else {
      setSortGroupData()
    }
  }, [filterExamId]);

  useEffect(() => {
    debugger;
    if (filterExamId) {
      const filteredData = dueDates.reduce((acc, currentItem) => {
        const subject = currentItem.idExamNavigation.subjects;
        const examId = currentItem.idExamNavigation.idExam;
        if (examId === filterExamId) {
          if (!acc[subject]) {
            acc[subject] = [];
          }
          acc[subject].push(currentItem);
        }
        return acc;
      }, {});
      setGroupedData(filteredData);
    } else {
      setSortGroupData()
    }
  }, [filterExamId]);


  const sortArray = () => {
    let direction = 'ascending';
    if (sortConfig === 'ascending') {
      direction = 'descending';
    }
    setSortConfig(direction);

    const sortedData = Object.keys(groupedData)
      .sort((a, b) => {
        if (a < b) {
          return direction === 'ascending' ? -1 : 1;
        }
        if (a > b) {
          return direction === 'ascending' ? 1 : -1;
        }
        return 0;
      })
      .reduce((acc, key) => {
        acc[key] = groupedData[key];
        return acc;
      }, {});

    setGroupedData(sortedData);
  };


  const Row = ({ row }) => {
    const [open, setOpen] = useState(false);

    return (
      <React.Fragment>
        <TableRow>
          <TableCell align="center">{row.subject}</TableCell>
          <TableCell align="center" colSpan={3} />
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">תאריך בחינה</TableCell>
                      <TableCell align="center">מועד בחינה</TableCell>
                      <TableCell align="center">שעת בחינה</TableCell>
                      <TableCell align="center">מחיר בחינה</TableCell>
                      <TableCell align="center"> סטטוס</TableCell>
                      <TableCell align="center"> עריכה</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.dueDates.map((dueDate) => (
                      <TableRow key={dueDate.idDueDate}>
                        <TableCell align="center">

                          <span style={{ marginLeft: '10px' }}>{new Date(dueDate.dueDate1).toLocaleDateString()}</span>
                        </TableCell>
                        <TableCell align="center">{dueDate.description}</TableCell>
                        <TableCell align="center">{dueDate.time}</TableCell>
                        <TableCell align="center">{dueDate.cost}</TableCell>
                        <TableCell align="center">{dueDate.status ? "פעיל" : "לא פעיל"}</TableCell>
                        <TableCell align="center">
                          <IconButton onClick={() => handleClickAddExam(true, dueDate)}>
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <>
      <h1 className={style.h1}>עדכון סוגי בחינות</h1>

      <Button style={{ marginBottom: "20px" }} variant="contained" color="primary" onClick={() => handleClickAddExam(false, {})}>
        הוסף בחינה חדשה
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" style={{ textAlign: 'center' }}>
        <DialogTitle>{isEdit ? "עדכון בחינה" : "הוספת בחינה"}</DialogTitle>
        <DialogContent dividers>
          <TextField
            style={{

              textAlign: 'center',
              width: '40%',
              marginLeft: '20px',
              marginRight: '20px'
            }}

            inputProps={{
              sx: { textAlign: 'right' }
            }}
            InputLabelProps={{
              style: { textAlign: 'center', transformOrigin: 'top left' },
              shrink: true,
            }}
            name="description"
            type="text"
            label="מועד הבחינה"
            value={dueDate.description}
            onChange={(e) => onChageDueDate('description', e.target.value)}
            // fullWidth
            margin="normal"
            error={errors.description}
            helperText={errors.description}
          />
          {!isEdit ? (

            <TextField

              style={{
                textAlign: "center",
                width: '40%',
                marginLeft: '20px',
                marginRight: '20px'
              }}

              inputProps={{
                style: { textAlign: 'right' }
              }}
              InputLabelProps={{

                shrink: true,
              }}
              name="subjects"
              type="text"
              label="נושא בחינה"
              value={dueDate.subjects}
              onChange={(e) => onChageDueDate('subjects', e.target.value)}

              margin="normal"
              error={errors.subjects}
              helperText={errors.subjects}
            />
          ) : (
            <FormControl style={{ width: '40%', direction: 'rtl', marginRight: '20px', marginLeft: '20px' }} fullWidth margin="normal">
              <InputLabel style={{ transformOrigin: 'top right', right: 0, transform: 'translate(0, -20px) scale(1)', textAlign: 'right' }}

                id="idExam-label"></InputLabel>

              <Select style={{ textAlign: 'right' }}
                defaultValue={dueDate.idExam}
                onChange={(e) => onChageDueDate('idExam', e.target.value)}
              >
                <MenuItem style={{ justifyContent: 'flex-end' }} value={-1} disabled>
                  בחר בחינה
                </MenuItem>
                {exams1.map((exam) => (
                  <MenuItem style={{ justifyContent: 'flex-end' }} key={exam.idExam} value={exam.idExam}>
                    {exam.subjects}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <TextField
            style={{
              textAlign: "center",
              width: '40%',
              marginLeft: '20px',
              marginRight: '20px'
            }}
            name="time"
            type="text"
            label="שעה"
            value={dueDate.time}
            onChange={(e) => onChageDueDate('time', e.target.value)}
            // fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={errors.time}
            helperText={errors.time}


            inputProps={{
              sx: { textAlign: 'right' } // Aligns the text within the input to the left
            }}
          />
          <TextField
            style={{
              textAlign: "center",
              width: '40%',
              marginLeft: '20px',
              marginRight: '20px'
            }}
            name="dueDate1"
            type="date"
            label="תאריך הבחינה"
            value={dueDate.dueDate1}
            onChange={(e) => onChageDueDate('dueDate1', e.target.value)}
            // fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            error={errors.dueDate1}
            helperText={errors.dueDate1}
          />


          <FormControl style={{
            textAlign: "right",
            width: '40%',
            marginLeft: '20px',
            marginRight: '20px'
          }}
            variant="outlined"
            // fullWidth 
            margin="normal">
            <InputLabel id="status-select-label">סטטוס הבחינה</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              name="status"
              value={dueDate?.status === false || !isEdit ? 1 : 0}
              onChange={(e) => onChageDueDate('status', e.target.value == 0 ? true : e.target.value == 1 ? false : null)}
              label="סטטוס הבחינה"
            >
              <MenuItem style={{ justifyContent: 'flex-end' }} value={0}>פעיל</MenuItem>
              <MenuItem style={{ justifyContent: 'flex-end' }} value={1}>לא פעיל</MenuItem>
            </Select>
          </FormControl>

          <TextField style={{
            width: '40%',
            marginLeft: '20px',
            marginRight: '20px'
          }}
            inputProps={{
              sx: { textAlign: 'right' }
            }}
            name="cost"
            type="number"
            label="עלות הבחינה"
            value={dueDate.cost}
            onChange={(e) => onChageDueDate('cost', e.target.value)}
            // fullWidth
            margin="normal"
            error={errors.cost}
            helperText={errors.cost}

            InputLabelProps={{
              style: { textAlign: 'center', transformOrigin: 'top left' },
              shrink: true,
            }}
          />
        </DialogContent>


        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ביטול
          </Button>
          <Button onClick={isEdit ? handleEditExam : handleAddExam} color="primary">
            {isEdit ? "עדכון" : "הוספה"}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>

          <TableRow>
            <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}
              onClick={sortArray} >נושא בחינה
              <SwapVertIcon></SwapVertIcon>
            </TableCell>
            <TableCell >
              <FormControl style={{ width: '140px', direction: 'rtl' }} fullWidth margin="normal">
                <InputLabel id="idExam-label" style={{ transformOrigin: 'top right', right: 0, transform: 'translate(0, -20px) scale(1)', textAlign: 'right' }}>סנן לפי בחינה</InputLabel>
                <Select
                  labelId="idExam-label"
                  name="idExam"
                  onChange={(e) => setFilterExamId(e.target.value)}
                  value={filterExamId ?? -1}
                >
                  <MenuItem style={{ justifyContent: 'flex-end' }} value={-1} disabled>
                    בחר בחינה
                  </MenuItem>
                  {exams1.map((exam) => (
                    <MenuItem style={{ justifyContent: 'flex-end' }} key={exam.idExam} value={exam.idExam}>
                      {exam.subjects}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <button style={{ width: '100px', height: '40px' }}
                onClick={() => setFilterExamId(null)}>אפס סינון</button>
            </TableCell>
            <TableCell align="center" colSpan={2} />
          </TableRow>
          {/* </TableHead> */}
          <TableBody>
            {Object.keys(groupedData).map((subject) => (
              <Row key={subject} row={{ subject, dueDates: groupedData[subject] }} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <button >
        <Link className="Link" to="/ForOfficeUse">ניהול בחינות </Link>
      </button>
    </>

  );
}


export default Exams;


