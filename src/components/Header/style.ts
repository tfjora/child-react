import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    container: {
        boxSizing: 'border-box',
        borderBottom: "1px solid lightgrey",
        height: '100%',
        width: '100%',
    },
    content: {
        padding: "32px",
        background: "#F2F3F5",
        width: '100%',
        height: "calc(100vh - 65px)",
        boxSizing: "border-box"
    },
    header: {
        display: 'grid',
        gridTemplateColumns: '5fr max-content',
    },
    headerWithoutTabs: {
        display: "flex",
        justifyContent: "flex-end",
    }
});
