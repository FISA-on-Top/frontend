import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import styled from 'styled-components';

const Nav2TableContainer = styled(TableContainer)`
  width: 1200px;
`;

function MyPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
  const [ipoData, setipoData] = useState(null);

    console.log(typeof selectedDate);

  const fetchData = async () => {
    //const apiUrl = '/api/orders/';
    const apiUrl = 'https://49c63d20-10d7-40ca-bf3a-0be4bf52acfa.mock.pstmn.io/api/orders/';
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];

      console.log(formattedDate);
      // URL의 쿼리 매개변수 생성
      const queryParams = new URLSearchParams(formattedDate);
      const response = await fetch(`${apiUrl}?${queryParams}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setipoData(data);
      })
      .catch(error=>{
        console.log(error);
        throw new Error('Failed to fetch data');
      });

     } catch (error) {
       console.error('Error fetching data:', error);
     }
  };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <h1>청약 신청 조회</h1>
            <DatePicker
                dateFormat="yyyy-MM-dd" 
                selected={selectedDate} 
                onChange={handleDateChange} />
            <button onClick={fetchData}>조회</button>
            <Nav2TableContainer>
                <Table>
                    <thead>
                        <tr>
                        <TableHeader>신청</TableHeader>
                        <TableHeader>(법인)구분</TableHeader>
                        <TableHeader>기업명</TableHeader>
                        <TableHeader>청약기일</TableHeader>
                        <TableHeader>환불일</TableHeader>
                        <TableHeader>확정발행가</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                    {ipoData && ipoData.data.ipoSummary ? (
                        Array.isArray(ipoData.data.ipoSummary) 
                        ? (
                            ipoData.data.ipoSummary.map((item) => (
                            <TableRow key={item.ipoId}>
                                <TableCell>
                                <Link to={`/nav2/sub1`}>신청</Link>
                                </TableCell>
                                <TableCell>{item.corpcls}</TableCell>
                                <TableCell>{item.corpName}</TableCell>
                                <TableCell>{item.sbd}</TableCell>
                                <TableCell>{item.refund}</TableCell>
                                <TableCell>{item.slprc}</TableCell>
                            </TableRow>
                            ))
                        )
                        : (
                            <TableRow key={ipoData.data.ipoSummary.ipoId}>
                                <TableCell>
                                <Link to={`/nav2/sub1`}>신청</Link>
                                </TableCell>
                                <TableCell>{ipoData.data.ipoSummary.corpcls}</TableCell>
                                <TableCell>{ipoData.data.ipoSummary.corpName}</TableCell>
                                <TableCell>{ipoData.data.ipoSummary.sbd}</TableCell>
                                <TableCell>{ipoData.data.ipoSummary.refund}</TableCell>
                                <TableCell>{ipoData.data.ipoSummary.slprc}</TableCell>
                            </TableRow>
                            )
                    )  : (
                            <TableRow>
                                <TableCell colSpan="12">기간을 설정해주세요.</TableCell>
                            </TableRow>
                    )}
                    </tbody>
                </Table>
            </Nav2TableContainer>
    </div>
  );

}

export default MyPage;