/**
 * Accept a single row javascript array and return a table. 
 * @param {Array}: Example [ 
 *  { 
 *    "amb_invited": "19", 
 *    "amb_joined": "10", 
 *    "amb_enrolled": "14", 
 *    "inquiry_ref": "1", 
 *    "registration_ref": "12"
 *  } 
 * ]
 */
import React, { useState, useEffect } from 'react'
import classes from './AmbassadorPerformance.module.scss'

const AmbassadorPerformance = ({caption, data, className}) => {
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    setTableData(data)
  }, [data])

  return (
    <table className={`${className} ${classes.table}`}>
      <caption>{caption}</caption>
      <thead className={classes.table__head}>
        <tr>
          <th colSpan="3">Ambassadors</th>
          <th colSpan="2">Prospects</th>
        </tr>
        <tr>
          <th>Invited</th>
          <th>Joined</th>
          <th>Enrolled</th>
          <th>Inquiries</th>
          <th>Registrations</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, idx) => (
          <tr key={idx}>
            <td>{row.amb_invited}</td>
            <td>{row.amb_joined}</td>
            <td>{row.amb_enrolled}</td>
            <td>{row.inquiry_ref}</td>
            <td>{row.registration_ref}</td>
          </tr>
        ))}
      </tbody>
    </table>
)
}

export default AmbassadorPerformance
