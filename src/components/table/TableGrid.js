// import {DataGrid} from '@material-ui/data-grid'
import React, {
  useState
} from 'react'
import Paper from "@material-ui/core/Paper"
import { PagingState, IntegratedPaging,} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFixedColumns,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui'


// List component would eventually take care of displaying the information obtained from the API
const TableGrid = ({
    data
  }) => {
    const columns = [{
      name: 'id',
      title: 'S/N',
    }, {
      name: 'FirstName',
      title: 'First name',
    }, {
      name: 'LastName',
      title: 'Last name',
    }, {
      name: 'Gender',
      title: 'Gender',
    }, {
      name: 'Latitude',
      title: 'Latitude',
    }, {
      name: 'Longitude',
      title: 'Longitude',
    }, {
      name: 'CreditCardNumber',
      title: 'Card number',
    }, {
      name: 'Email',
      title: 'Email',
    }, {
      name: 'DomainName',
      title: 'Domain name',
    }, {
      name: 'PhoneNumber',
      title: 'Phone number',
    }, {
      name: 'MacAddress',
      title: 'Mac address',
    }, {
      name: 'URL',
      title: 'URL',
    }, {
      name: 'UserName',
      title: 'User name',
    }, {
      name: 'LastLogin',
      title: 'Last login',
    }, {
      name: 'PaymentMethod',
      title: 'Payment method',
    }]

    data.forEach((item, i) => {
      item.id = i + 1
    });

    const [tableColumnExtensions] = useState([{
      name: 'id',
      width: 80
    }, {
      name: 'FirstName',
      width: 100
    }, {
      name: 'LastName',
      width: 100
    }, {
      name: 'Gender',
      width: 130
    }, {
      name: 'Latitude',
      width: 130
    }, {
      name: 'Longitude',
      width: 130
    }, {
      name: 'CreditCardNumber',
      width: 145
    }, {
      name: 'Email',
      width: 130
    }, {
      name: 'DomainName',
      width: 145
    }, {
      name: 'PhoneNumber',
      width: 150
    }, {
      name: 'MacAddress',
      width: 145
    }, {
      name: 'URL',
      width: 130
    }, {
      name: 'UserName',
      width: 130
    }, {
      name: 'LastLogin',
      width: 130
    }, {
      name: 'PaymentMethod',
      width: 160
    }])

    const [leftColumns] = useState(["FirstName"])

    // Pagination
    const [PageSize, setPageSize] = useState(20)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSizes] = useState([5, 10, 15, 20, 25, 30])

    return ( < Item row = {
        data
      }
      columns = {
        columns
      }
      colext = {tableColumnExtensions}
      leftcol ={leftColumns}
      pageSize = {PageSize}
      setPageSize = {setPageSize}
      currentPage = {currentPage}
      setCurrentPage = {setCurrentPage}
      pageSizes = {pageSizes}
      />)
    }

    // Items component
    const Item = ({
        row,
        columns,
        colext,
        leftcol,
        pageSize,
        setPageSize,
        currentPage,
        setCurrentPage,
        pageSizes,

      }) => {
        return (
          // DataGrid method
          // < div style = {
          //   {
          //     height: 900,
          //     width: '100%'
          //   }
          // } >
          // <DataGrid rows={row} columns={columns} pageSize={pageSize}/>
          //
          // <
          // /div>

          <Paper>
            <Grid rows={row} columns={columns}>
              <PagingState currentPage={currentPage} onCurrentPageChange={setCurrentPage} pageSize={pageSize} onPageSizeChange={setPageSize}/>
              <IntegratedPaging />
              <Table columnExtensions={colext}/>
              <TableHeaderRow />
              <TableFixedColumns
                leftColumns={leftcol}
              />
              <PagingPanel pageSizes={pageSizes}/>
            </Grid>
          </Paper>
        )

        }

        export {
          TableGrid
        }
