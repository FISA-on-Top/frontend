import React, { useState } from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, NavContainedButton } from '../styled/StyledContents';
import { useNavigate } from 'react-router';
import { useResetRecoilState } from 'recoil';
import { userIdInfo, userLoggedIn } from '../state/state';
import BASE_URL from '../config';

function MyPageWithdraw() {
    const navigate = useNavigate();
    const isUserLoggedIn = useResetRecoilState(userIdInfo);
    const setUserId = useResetRecoilState(userLoggedIn);
    const [datas, setDatas] = useState('');
    const [formData, setFormData] = useState({
        birth: '',
        userId: '',
        userName: '',
        userPw: ''
    });

    const fetchWithdraw = async () => {
        const apiUrl = `${BASE_URL}/userinfo/withdrawal`;

        try {
            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'userId': localStorage.getItem('userId')
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Withdrawal request failed');
            }

            const data = await response.json();

            if (data.resultCode !== '0000') {
                alert(data.data);
                return;
            }

            if (data.resultCode === '0000' && data.data.status === 'withdrawal') {
                setUserId();
                isUserLoggedIn();
                navigate('/login');
            } else {
                setDatas(data.data);
            }

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    }

    const onWithdrawClick = () => {
        fetchWithdraw();
    }

    return (
        <ContainerDiv>
            <h1>My Page</h1>
            <h3>탈퇴 확인</h3>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>생년월일</TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={formData.birth}
                            onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>ID</TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>이름</TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={formData.userName}
                            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>PW</TitleDiv>
                    <TextDiv>
                        <input
                            type="password"
                            value={formData.userPw}
                            onChange={(e) => setFormData({ ...formData, userPw: e.target.value })}
                        />
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <div>
                <NavContainedButton onClick={onWithdrawClick}>탈퇴하기</NavContainedButton>
            </div>
        </ContainerDiv>
    );
}

export default MyPageWithdraw;
