import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { PaginationStyled } from './TableMUI.styled'

const useStyles = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
        background: 'rgb(249, 249, 249)',
        border: 'none',
        marginTop: '26px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
}))

const TablePaginationActions = props => {
    const classes = useStyles()
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0)
    }

    const handleBackButtonClick = event => {
        onChangePage(event, page - 1)
    }

    const handleNextButtonClick = event => {
        onChangePage(event, page + 1)
    }

    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <div className={classes.root}>
            <span style={{ fontSize: 14, fontWeight: '400' }}>
                Displaying of {page + 1} - {count} of {count} items
            </span>
            <PaginationStyled count={props.count} variant="outlined" onChange={props.onChangePage} />
        </div>
    )
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
}

export default TablePaginationActions
