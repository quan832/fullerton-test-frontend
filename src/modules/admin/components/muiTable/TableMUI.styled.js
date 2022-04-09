import styled, { css } from 'styled-components';
import Pagination from '@material-ui/lab/Pagination';

export const PaginationStyled = styled(Pagination)`
    .Mui-selected{
        background-color: #fff!important;
        color: #1E86FF;
        font-weight: 600;
    }
    .MuiPaginationItem-root {
        background: #FFFFFF;
        margin: 0 6px !important;
    }
`;
