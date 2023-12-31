import React, { useState } from 'react';
import { ContainerDiv, WrapperDiv, ContentsDiv, TitleDiv, TextDiv, NavContainedButton } from '../styled/StyledContents';
import { useLocation, useNavigate } from 'react-router';
import BASE_URL from '../config';

function MyPageMod() {
    const navigater = useNavigate();
    const location = useLocation();
    const [datas, setDatas] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [email, setEmail] = useState('');
    const [userPw, setUserPw] = useState('');

    const fetchMod = async () => {
        const apiUrl = `${BASE_URL}/userinfo/modify`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'userId': localStorage.getItem('userId')
                },
                body: JSON.stringify({
                    "email": email,
                    "phoneNum": phoneNum,
                    "userPw": userPw
                })
            });

            if (!response.ok) {
                throw new Error('User Info Modify Request failed');
            }

            const data = await response.json();

            if (data.resultCode !== '0000') {
                alert(data.data);
                return;
            }

            setDatas(data.data);

            if (data.resultCode === '0000') {
                navigater(-1);
            }

        } catch (error) {
            console.error('Error:', error);
            alert("잠시 후 다시 시도해 주세요");
        }
    };

    const validateEmail = (email) => {
        let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phone) => {
        let regex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
        return regex.test(phone);
    };

    const onModClick = () => {
        if (!validatePhoneNumber(phoneNum)) {
            alert('전화번호 형식이 잘못되었습니다. xxx-xxxx-xxxx 형식으로 입력해주세요.');
            return;
        }

        if (!validateEmail(email)) {
            alert('이메일 주소가 올바르지 않습니다.');
            return;
        }

        fetchMod();
    }

    return (
        <ContainerDiv>
            <h1>My Page</h1>
            <WrapperDiv>
                <ContentsDiv>
                    <TitleDiv>이름</TitleDiv>
                    <TextDiv>{location.state.userName}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>ID</TitleDiv>
                    <TextDiv>{location.state.userId}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>생년월일</TitleDiv>
                    <TextDiv>{location.state.birth}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>핸드폰</TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={phoneNum}
                            onChange={(e) => setPhoneNum(e.target.value)}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>Email</TitleDiv>
                    <TextDiv>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>계좌 번호</TitleDiv>
                    <TextDiv>{location.state.accountNum}</TextDiv>
                </ContentsDiv>
                <ContentsDiv>
                    <TitleDiv>비밀 번호</TitleDiv>
                    <TextDiv>
                        <input
                            type="password"
                            value={userPw}
                            onChange={(e) => setUserPw(e.target.value)}
                        />
                    </TextDiv>
                </ContentsDiv>
            </WrapperDiv>
            <div>
                <NavContainedButton onClick={onModClick}>수정하기</NavContainedButton>
            </div>
        </ContainerDiv>
    );
}

export default MyPageMod;
