import React, { useEffect, useState } from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, SmallContainedButton, Button } from '../styled/StyledContents';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { calendarDate, ipoList, selectedIpo, accountNumber, commissionPrice, phoneNumber, orderAmount, deposit } from '../state/stateForNav2.js';
import BASE_URL from '../config';

function Nav2Sub2() {
    const navigate = useNavigate();
    const location = useLocation();
    const [contractData, setContractData] = useState('');
    const accountNum = useRecoilValue(accountNumber);//계좌번호 
    const commission = useRecoilValue(commissionPrice);  //수수료 -> 고정값 2000
    const phoneNum = useRecoilValue(phoneNumber);//연락처
    const selectedAmount = useRecoilValue(orderAmount); // 청약 수량
    const selectedDeposit = useRecoilValue(deposit); //청약증거금
    const ipoId = useRecoilValue(selectedIpo);

    const resetCalendarDate = useResetRecoilState(calendarDate);
    const resetIpoList = useResetRecoilState(ipoList);
    const resetSelectedIpo = useResetRecoilState(selectedIpo);
    const resetAccountNumber = useResetRecoilState(accountNumber);
    const resetCommissionPrice = useResetRecoilState(commissionPrice);
    const resetPhoneNumber = useResetRecoilState(phoneNumber);
    const resetOrderAmount = useResetRecoilState(orderAmount);
    const resetDeposit = useResetRecoilState(deposit);
    const resetList = [
        resetCalendarDate, resetIpoList, resetSelectedIpo, resetAccountNumber,
        resetCommissionPrice, resetPhoneNumber, resetOrderAmount, resetDeposit
    ];

    const onConfirmClick = () => {
        resetList.forEach(resetFunction => resetFunction());
        navigate('/nav2');
    }

    useEffect(() => {
        const blockNavigation = (event) => {
            // popstate 이벤트 발생 시 (뒤로 가기 동작 시)
            alert("뒤로간다!");
            event.preventDefault();
            return "Are you sure you want to leave this page?";
        };

        // popstate 이벤트 리스너 추가
        window.addEventListener('popstate', blockNavigation);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('popstate', blockNavigation);
        };
    }, [location]); // location의 변화를 감지하기 위해 종속성 배열에 추가합니다.

    useEffect(() => {
        const fetchEvents = async () => {
            const now = new Date();

            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');  // 월은 0부터 시작하므로 +1
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const requestDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
            const deposit = parseFloat(selectedDeposit.replace(/,/g, ''));

            // REST API의 URL
            const apiUrl = `${BASE_URL}/orders/approval`;
            // localStorage에서 userId 정보를 가져옵니다.
            const userId = localStorage.getItem('userId');

            if (userId) {
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'userId': userId
                        },
                        body: JSON.stringify({
                            "ipoId": ipoId,   //ipo id
                            "orderAmount": selectedAmount,    // 청약한 주식 수 
                            "phoneNum": phoneNum,
                            "orderDate": requestDateTime,    // 청약신청한 날짜
                            "deposit": deposit //청약증거금                             
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Orders Approval Request failed');
                    }

                    const contractJson = await response.json();

                    if (contractJson.resultCode !== '0000') {
                        alert(contractJson.data);
                        return;
                    }

                    if (contractJson.resultCode === "0000") {
                        setContractData(contractJson.data);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert("잠시 후 다시 시도해 주세요");
                }
            }
            else {
                alert("로그아웃 상태입니다")
            }

        };
        fetchEvents();
    }, []);


    return (
        <ContainerDiv>
            <h1>계약확인</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>청약계좌번호</TitleDiv>
                    <TextDiv>
                        {accountNum ? accountNum : ""}
                    </TextDiv>
                    <TitleDiv>청약아이디</TitleDiv>
                    <TextDiv>
                        {contractData && contractData.userName ? contractData.userName : ""}
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>청약종목명</TitleDiv>
                    <TextDiv>
                        {contractData && contractData.corpName ? contractData.corpName : ""}
                    </TextDiv>
                    <TitleDiv>청약구분</TitleDiv>
                    <TextDiv>
                        상장
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>청약주수</TitleDiv>
                    <TextDiv>
                        {contractData && contractData.orderAmount ? contractData.orderAmount : ""}
                    </TextDiv>
                    <TitleDiv>공모가(확정발행가)</TitleDiv>
                    <TextDiv>
                        {contractData && contractData.slprc ? contractData.slprc : ""}
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>청약수수료</TitleDiv>
                    <TextDiv>
                        {commission ? commission : ""}
                    </TextDiv>
                    <TitleDiv>청약증거금</TitleDiv>
                    <TextDiv>
                        {contractData && contractData.deposit ? contractData.deposit : ""}
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>연락처</TitleDiv>
                    <TextDiv>
                        {contractData && phoneNum ? phoneNum : ""}
                    </TextDiv>
                    <TitleDiv>환불계좌</TitleDiv>
                    <TextDiv>
                        {accountNum ? accountNum : ""}
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>환불일</TitleDiv>
                    <TextDiv>
                        {contractData && contractData.refund ? contractData.refund : ""}
                    </TextDiv>
                    <TitleDiv>납입일</TitleDiv>
                    <TextDiv>
                        {contractData && contractData.pymd ? contractData.pymd : ""}
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <Button style={{'width' : '20%'}} onClick={onConfirmClick}>확인</Button>
        </ContainerDiv>
    );
}

export default Nav2Sub2;