import React from 'react'
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#E2E6E9',
        color: '#1E2327',
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

export default function HeaderTable({ title, align = 'left', ...props }) {
    return (
        <StyledTableCell align={align} {...props}>{title}</StyledTableCell>
    )
}
