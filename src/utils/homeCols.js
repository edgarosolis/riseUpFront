import { Button, Typography } from "@mui/material";
import ActionsUsers from "../components/GridTableUtils/ActionsUsers";

const Status360Cell = ({ row, onShowReviewers }) => {
    if (!row.has360) {
        return <Typography variant="body2" color="text.secondary">No</Typography>;
    }
    return (
        <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => onShowReviewers(row.id)}
        >
            Show Reviewers
        </Button>
    );
};

export const getHomeColumns = (onShowReviewers) => [
    {
        field: 'firstName',
        headerName: 'First Name',
        flex: 1
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        flex: 1
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1
    },
    {
        field: 'has360',
        headerName: '360',
        flex: 0.5,
        renderCell: (params) => (
            <Status360Cell row={params.row} onShowReviewers={onShowReviewers} />
        )
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'ACTIONS.',
        flex: 1,
        renderCell: (params) => (<ActionsUsers row={params.row} api={params.api} />)
    },
];
