import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useTable, usePagination, useSortBy, useFilters, useRowSelect } from "react-table";
import Pagination from './Pagination';
import "./TableMUI.scss"

const _ = require("lodash");

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#E2E5E9',
        color: '#1E2327',
        fontWeight: 'bold',
        // padding: '12px 16px'
        padding: 0,
        paddingBottom: 20,
        paddingTop: 20,
    },
    body: {
        fontSize: 14,
        // padding: '12px 16px'
        padding: 3,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        // '&:nth-of-type(odd)': {
        //     backgroundColor: theme.palette.action.hover,
        // },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function TableMUI({ columns, data: dataTable, pageSize: pageLimit, total, ...props }) {
    const [data, setData] = React.useState(React.useMemo(() => dataTable, []));
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    const [filterObject, setFilterObject] = useState({});
    const [columnFilter, setColumnFilter] = useState({});

    const classes = useStyles();
    const noPage = Math.ceil(total / pageLimit);

    const filterTypes = React.useMemo(
        () => ({
            /**
             * Default filter handler for default column
             * @param {*} rows selected rows
             * @param {*} id column id
             * @param {*} filterValue entered filter value
             */
            defaultColumnFilterHandler: (rows, id, filterValue) => {
                //update the filter value for column id
                let temp = _.cloneDeep(columnFilter);
                if (id) {
                    temp[id] = filterValue;
                }
                setColumnFilter(temp);
                gotoPage(0);
            },
        }),
        []
    )

    /**
     * Watch: column filter change => update into filter object
     */
    useEffect(() => {
        let temp = _.cloneDeep(filterObject);
        for (let prop in columnFilter) {
            //get filtered column and add to filter object
            temp[prop] = columnFilter[prop];
        }
        setFilterObject(temp);
    }, [columnFilter]);

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        gotoPage,
        page,
        state: { pageSize, pageIndex, sortBy },
    } = useTable({
        columns,
        data: dataTable,
        filterTypes,
        pageCount: noPage,
        autoResetPage: !skipPageReset,
        manualPagination: true,
        manualSortBy: true,
        manualFilters: true,
        initialState: {
            pageSize: pageLimit || 12,
            sortBy: [
                {
                    id: 'RECEIVEDDATE',
                    desc: true
                },
            ]
        },
    },
        useFilters,
        useSortBy,
        usePagination
    )


    // Listen for changes in pagination and use the state to fetch our new data
    React.useEffect(() => {
        props.fetchData({ pageIndex, pageSize, sortBy, filterObject });
    }, [props.fetchData, pageIndex, pageSize, sortBy, filterObject]);


    const handleChangePage = (event, newPage) => {
        gotoPage(newPage)
    }

    const handleChangeRowsPerPage = event => {
        // setPageSize(Number(event.target.value))
    }

    return (
        <>
            <TableContainer component={Paper} >
                <Table className={classes.table} aria-label="customized table" {...getTableProps()}>
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <StyledTableCell {...column.getHeaderProps({
                                        style: { width: column.width, height: column.height },
                                    })}  {...column.getHeaderProps(column.getSortByToggleProps())} align={column.align}>
                                        {column.render('Header')}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {page?.map((row, i) => {
                            prepareRow(row)
                            return (
                                <StyledTableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <StyledTableCell {...cell.getCellProps({ style: { width: cell.column.width, height: cell.column.height } })} align={cell.column.align} >
                                                {cell.render('Cell')}
                                            </StyledTableCell>
                                        )
                                    })}
                                </StyledTableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                onPageChange={gotoPage}
                pages={noPage}
                page={pageIndex}
                count={total}
                rowsPerPage={pageSize}
            />
            {/* <TablePagination
                colSpan={3}
                count={total}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
            /> */}


        </>
    );
}