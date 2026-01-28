import ActionsUsers from "../components/GridTableUtils/ActionsUsers";

export const homeColumns = [
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
        field: 'actions',
        type: 'actions',
        headerName: 'ACTIONS.',
        flex: 1,
        renderCell: (params)=>(<ActionsUsers row={params.row} api={params.api}/>)
    },
];