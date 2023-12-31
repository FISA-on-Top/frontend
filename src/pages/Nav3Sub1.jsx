import { React, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, SmallEmptyButton, SmallContainedButton } from '../styled/StyledContents';
import BASE_URL from '../config';
import { deposit } from '../state/stateForNav2';

function Nav3Sub1() {
    const [inputValue, setInputValue] = useState('');
    const [passwordCheck, setPasswordCheck] = useState(false);
    const [datas, setDatas] = useState('');
    const [checked, setChecked] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const fetchCancelOrder = async () => {
        try {
            const response = await fetch(`${BASE_URL}/orders/cancel`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'accountNum': location.state.userAccount,
                    'accountPw': inputValue,
                },
                body: JSON.stringify({
                    orderId: location.state.row.orderId,
                })
            });

            if (!response.ok) {
                throw new Error('Cancel Order Request failed');
            }

            const data = await response.json();

            if (data.resultCode !== '0000') {
                setPasswordCheck(false);
                alert(data.data);
                return;
            }

            setChecked(true);
            setPasswordCheck(true);
            setDatas(data.data);

            navigate('/nav3/sub2', {
                state: {
                    userAccount: location.state.userAccount,
                    row: location.state.row,
                    balance: data.data.balance
                }
            });

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const onReturnClick = () => {
        navigate(-1);
    }

    const onSubmitClick = () => {
        fetchCancelOrder();
    }

    return (
        <div>
            <ContainerDiv>
                <h1>청약 취소</h1>
                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>
                            청약계좌
                        </TitleDiv>
                        <TextDiv>
                            {location.state.userAccount}
                        </TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>
                            계좌 비밀번호
                        </TitleDiv>
                        <TextDiv>
                            <input
                                type="password"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </TextDiv>
                    </ContentsDiv>
                </WrapperDiv>

                <WrapperDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 번호</TitleDiv>
                        <TextDiv>{location.state.row.corpCode}</TextDiv>
                        <TitleDiv>청약 종목명</TitleDiv>
                        <TextDiv>{location.state.row.corpName}</TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 상태</TitleDiv>
                        <TextDiv>{location.state.row.status}</TextDiv>
                        <TitleDiv>청약 수량</TitleDiv>
                        <TextDiv>{location.state.row.orderAmount}</TextDiv>
                    </ContentsDiv>
                    <ContentsDiv>
                        <TitleDiv>청약 구분</TitleDiv>
                        <TextDiv>상장</TextDiv>
                        <TitleDiv>청약 증거금</TitleDiv>
                        <TextDiv>{location.state.row.deposit}</TextDiv>
                    </ContentsDiv>
                </WrapperDiv>

                <div>
                    <SmallEmptyButton onClick={onReturnClick}>이전</SmallEmptyButton>
                    <SmallContainedButton onClick={onSubmitClick}>실행</SmallContainedButton>
                </div>
            </ContainerDiv>

        </div>
    );
}

export default Nav3Sub1;
