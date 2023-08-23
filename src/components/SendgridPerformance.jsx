/**
 * Accept an array of objects like this: [{message_type: 'ambassador-invitation', delilvered: 5, opened: 3, clicked: 2}, ...]
 * and display in a table with the headings Message, Delivered, Opened, Clicked.
 */
import React, { useState, useEffect } from 'react'
import classes from './SendgridPerformance.module.scss'

const SendgridPerformance = ({ caption, data, className }) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setTableData(data)
  }, [data])

  return (
    <table className={`${className} ${classes.table}`}>
      <caption>{caption}</caption>
      <thead className={classes.table__head}>
        <tr>
          <th>Message</th>
          <th>Sent</th>
          <th>Delivered</th>
          <th>Opened</th>
          <th>Clicked</th>
        </tr>
      </thead>
      <tbody>
        {tableData && tableData.map((row) => (
          <tr key={row.message_type}>
            <td>{row.message_type}</td>
            <td>{row.sent}</td>
            <td>{row.delivered}</td>
            <td>{row.opened}</td>
            <td>{row.clicked}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SendgridPerformance
