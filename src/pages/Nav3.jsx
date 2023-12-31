import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledDatePicker } from '../styled/StyledDatePicker.jsx';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, SmallContainedButton } from '../styled/StyledContents';
import { TableContainer, Table, TableHeader, TableRow, TableCell } from '../styled/StyledTable.jsx';
import BASE_URL from '../config';

function Nav3() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const [userAccount, setUserAccount] = useState('');
    const [urlDate, setUrlDate] = useState(new Date().toISOString().split('T')[0]);
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders/account`, {
                    method: 'GET',
                    headers: { 'userId': userId }
                });

                if (!response.ok) {
                    throw new Error('Orders Account Request failed');
                }

                const data = await response.json();

                if (data.resultCode !== '0000') {
                    alert(data.data);
                    return;
                }

                setUserAccount(data.data.accountNum);
            } catch (error) {
                console.error('Error:', error);
                alert("잠시 후 다시 시도해 주세요\n" + error);
            }
        };

        fetchAccount();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/orders/list?date=${urlDate}`, {
                method: 'GET',
                headers: {
                    'userId': userId
                }
            });

            if (!response.ok) {
                throw new Error('Orders ?Date Request failed');
            }

            const datas = await response.json();

            if (datas.resultCode !== '0000') {
                alert(datas.data);
                return;
            }

            setData(datas.data);
        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    };

    const handleDateChange = (date) => {
        const parseDate = date.toISOString().split('T')[0];
        setUrlDate(parseDate);
        setSelectedDate(date);
    };

    const handleButtonClick = (row) => {
        navigate('/nav3/sub1', {
            state: {
                userAccount: userAccount,
                row: row
            }
        });
    };

    const onInquiryClick = () => {
        fetchData();
    }

    return (
        <div>
            <ContainerDiv>
                <h1>청약 결과 조회</h1>

                <WrapperDiv style={{ 'flex-direction': 'row' }}>
                    <ContentsDiv>
                        <TitleDiv>계좌 설정</TitleDiv>
                        <TextDiv>
                            {userAccount}
                        </TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>조회 기간</TitleDiv>
                        <StyledDatePicker
                            dateFormat="yyyy-MM-dd"
                            selected={selectedDate}
                            onChange={handleDateChange} />

                    </ContentsDiv>
                </WrapperDiv>
                <SmallContainedButton onClick={onInquiryClick}>조회</SmallContainedButton>
            </ContainerDiv>

            <TableContainer>
                <Table>
                    <thead>
                        <tr>
                            <TableHeader>선택</TableHeader>
                            <TableHeader>분류</TableHeader>
                            <TableHeader>기업명</TableHeader>
                            <TableHeader>청약종목번호</TableHeader>
                            <TableHeader>청약기간</TableHeader>
                            <TableHeader>환불일</TableHeader>
                            <TableHeader>청약증거금</TableHeader>
                        </tr>
                    </thead>

                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <SmallContainedButton onClick={() => handleButtonClick(row)}>취소하기</SmallContainedButton>
                                    </TableCell>
                                    <TableCell>{row.corpCls}</TableCell>
                                    <TableCell>{row.corpName}</TableCell>
                                    <TableCell>{row.corpCode}</TableCell>
                                    <TableCell>{row.sbd} ~ {(new Date(row.sbd).getDate() + 1)}</TableCell>
                                    <TableCell>{row.refund}</TableCell>
                                    <TableCell>{row.deposit}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7}>결과가 없습니다.</TableCell>
                            </TableRow>
                        )}
                    </tbody>

                </Table>
            </TableContainer>

        </div>
    );
}

export default Nav3;
