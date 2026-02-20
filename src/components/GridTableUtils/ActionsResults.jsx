import { useEffect, useState } from "react";
import { Alert, Box, Button, Dialog, DialogContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteResult, updateResult } from "../../axios/axiosFunctions";

const defaultForm = {
    category: "",
    title: "",
    content: "",
}

const ActionsResults = ({row, api}) => {

    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("error");
    const [alertMsg, setAlertMsg] = useState("");
    const [alertOpen, setAlertOpen] = useState(false);
    const [form, setForm] = useState(defaultForm);

    const initForm = ()=>{
        setForm({
            category: row.category || "",
            title: row.title || "",
            content: row.content || "",
        });
    }

    useEffect(() => {
        initForm();
    }, [row]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleCloseDialogEdit = ()=>{
        setOpenDialogEdit(false);
    }

    const handleCloseDialogDelete = ()=>{
        setOpenDialogDelete(false);
    }

    const handleEdit = ()=>{
        initForm();
        setOpenDialogEdit(true);
    }

    const handleOpenDelete = ()=>{
        setOpenDialogDelete(true);
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const handleCancelEdit = ()=>{
        initForm();
        handleCloseDialogEdit();
    }

    const submitResult = async()=>{
        const data = {
            category: form.category,
            title: form.title,
            content: form.content,
        }

        const res = await updateResult(row.id, data);

        if(!res.result){
            setAlertMsg(res.msg || "Error updating result");
            setAlertSeverity("error");
            setAlertOpen(true);
            setTimeout(() => setAlertOpen(false), 2000);
            return;
        }
        api.updateRows([{id: row.id, category: form.category, title: form.title, content: form.content}]);
        handleCloseDialogEdit();
    }

    const handleDeleteResult = async()=>{
        const res = await deleteResult(row.id);
        if(!res){
            setAlertMsg("Error while deleting, please try later or contact an admin");
            setAlertSeverity("error");
            setAlertOpen(true);
            setTimeout(() => setAlertOpen(false), 2000);
            return;
        }
        api.updateRows([{ id: row.id, _action: "delete" }]);
        handleCloseDialogDelete();
    }

    return (
    <Box sx={{width: "100%", height: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
        <IconButton onClick={handleEdit}>
            <EditIcon sx={{color:"orange"}}/>
        </IconButton>
        <IconButton onClick={handleOpenDelete}>
            <DeleteIcon sx={{color:"red"}}/>
        </IconButton>
        <Dialog open={openDialogEdit} onClose={handleCloseDialogEdit} maxWidth="md" fullWidth>
            <DialogContent>
                <Typography variant="h5" color="primary">EDIT RESULT</Typography>
                <Grid container spacing={2} sx={{marginTop:"10px"}}>
                    <Grid size={6}>
                        <Typography variant="subtitle1">Category</Typography>
                        <TextField onChange={handleChange} onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} value={form.category} name="category" fullWidth/>
                    </Grid>
                    <Grid size={6}>
                        <Typography variant="subtitle1">Title</Typography>
                        <TextField onChange={handleChange} onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} value={form.title} name="title" fullWidth/>
                    </Grid>
                    <Grid size={12}>
                        <Typography variant="subtitle1">Content</Typography>
                        <TextField onChange={handleChange} onKeyDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} value={form.content} name="content" fullWidth multiline rows={8}/>
                    </Grid>
                    {
                        alertOpen &&
                        <Grid size={12}>
                            <Alert sx={{marginTop:"20px"}} severity={alertSeverity}>
                                {alertMsg}
                            </Alert>
                        </Grid>
                    }
                    <Grid size={12} sx={{display:"flex", justifyContent:"center"}}>
                        <Button variant="contained" onClick={submitResult}>SAVE</Button>
                        <Button variant="contained" onClick={handleCancelEdit} sx={{marginLeft:"20px"}}>CANCEL</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        <Dialog open={openDialogDelete} onClose={handleCloseDialogDelete}>
            <DialogContent>
                <Typography>Are you sure you want to DELETE this result?</Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{marginTop:"5px"}}>Category: {row.category}</Typography>
                {
                    alertOpen &&
                    <Grid size={12}>
                        <Alert sx={{marginTop:"20px"}} severity={alertSeverity}>
                            {alertMsg}
                        </Alert>
                    </Grid>
                }
                <Box sx={{display:"flex", justifyContent:"center", marginTop:"20px"}}>
                    <Button onClick={handleDeleteResult} variant="contained" color="error">DELETE</Button>
                    <Button variant="contained" onClick={handleCloseDialogDelete} sx={{marginLeft:"20px"}}>CANCEL</Button>
                </Box>
            </DialogContent>
        </Dialog>
    </Box>
    )
}

export default ActionsResults
