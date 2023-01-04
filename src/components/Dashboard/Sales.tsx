import React, { useState } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function Sales() {
    const [rows,set_row]=useState<any>(
        [
          // { id: 1, name: 'Snow', expiry: 'Jon'},
         
        ]
      );
    
       //  datagrid
       const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
          field: 'date',
          headerName: 'Date',
          width: 90,
          editable: false,
        },
        {
          field: 'bank',
          headerName: 'Bank',
          width: 70,
          editable: false,
        },
        {
          field: 'amount',
          headerName: 'Amount(RM)',
          type: 'number',
          width: 100,
          editable: false,
        },
        {
          field: 'package',
          headerName: 'Package',
          width: 250,
          editable: false,
        },
        {
          field: 'channel',
          headerName: 'Channel',
          width: 70,
          editable: false,
        },
       
      ];
    
      return (
        <div className='flex-1 flex flex-col bg-slate-300'>
            <div className='flex-1 '>
						Sales
            </div>
            <div className='h-96'>
            <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  disableSelectionOnClick
                  experimentalFeatures={{ newEditingApi: true }}
                  
            />
            </div>
        </div>
      )
}

export default Sales