import React, { useEffect, useState } from "react";

const StatusClaimTable = (props) => {
    const [statusClass, setStatusClass] = useState("");
    useEffect(() => {
        switch (props.status) {
            case 'APPROVE':
                return setStatusClass('approved');
            case 'PENDING':
                return setStatusClass('pending');
            case 'REJECTED':
                return setStatusClass('rejected');
        }
    }, [props.status])
    return (
        <div className='claim-layout-status'>
            <div className={`claim-status ${statusClass}`}></div>
            <div className={`claim-status-text ${statusClass}`}>{props.status}</div>
        </div>
    );
};

export default StatusClaimTable;
