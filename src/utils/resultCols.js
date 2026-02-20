import ActionsResults from "../components/GridTableUtils/ActionsResults";

export const resultColumns = [
    {
        field: 'category',
        headerName: 'Category',
        flex: 1
    },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1
    },
    {
        field: 'content',
        headerName: 'Content',
        flex: 2,
        renderCell: (params) => (
            <span style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
                width: "100%"
            }}>
                {params.value}
            </span>
        )
    },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'ACTIONS.',
        flex: 0.7,
        renderCell: (params)=>(<ActionsResults row={params.row} api={params.api}/>)
    },
];
