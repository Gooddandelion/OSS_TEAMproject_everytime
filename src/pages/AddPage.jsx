import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './AddPage.css';


function AddPage() {
    const navigate = useNavigate();
    const { addLecture } = useLectureStore();

    // 📝 prof -> professor, endTime 추가, select 기본값 설정
    const [form, setForm] = useState({
        강의명: '',
        교수님: '',
        과제량: '모름',
        평점: '',
        조별과제횟수: '모름',
        성적평가: '모름',
        출석관리: '모름',
        시험횟수: '',
        강의시간: '',
        이수구분: '',
        학점: '',
        BSM여부: '',
        설계학점: '',
        영어비율: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.강의명 || !form.교수님) {
            alert('과목명과 교수님 이름은 필수 항목입니다.');
            return;
        }

        const lectureTimeArray = form.강의시간.split(',').map(item => item.trim());

        const submissionData = {
            ...form,
            강의시간: lectureTimeArray,
        };

        await addLecture(submissionData);
        alert('강의가 성공적으로 추가되었습니다!');
        navigate('/list');
    };

    return (
        <div className="add-page">
            <h2>새로운 강의 추가</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>과목명: </label>
                    <input type="text" name="강의명" value={form.강의명} onChange={handleChange} />
                </div>
                <div>
                    <label>교수님: </label>
                    <input type="text" name="교수님" value={form.교수님} onChange={handleChange} />
                </div>
                <div>
                    <label>과제량: </label>
                    <select name="과제량" value={form.과제량} onChange={handleChange}>
                        <option value="많음">많음</option>
                        <option value="보통">보통</option>
                        <option value="없음">없음</option>
                        <option value="모름">모름</option>
                    </select>
                </div>
                <div>
                    <label>평점 </label>
                    <input type="number" name="평점" value={form.평점} onChange={handleChange} />
                </div>
                <div>
                    <label>조별과제횟수</label>
                    <select name="과제량" value={form.과제량} onChange={handleChange}>
                        <option value="많음">많음</option>
                        <option value="보통">보통</option>
                        <option value="없음">없음</option>
                        <option value="모름">모름</option>
                    </select>
                </div>
                <div>
                    <label>성적평가: </label>
                    <select name="성적평가" value={form.성적평가} onChange={handleChange}>
                        <option value="너그러움">너그러움</option>
                        <option value="보통">보통</option>
                        <option value="깐깐함">깐깐함</option>
                        <option value="모름">모름</option>
                    </select>
                </div>
                <div>
                    <label>출석관리: </label>
                    <select name="출석관리" value={form.출석관리} onChange={handleChange}>
                        <option value="전자출결">전자출결</option>
                        <option value="직접호명">직접호명</option> 
                        <option value="모름">모름</option>
                    </select>
                </div>
                <div>
                    <label>시험횟수: </label>
                    <input type="number" name="시험횟수" value={form.시험횟수} onChange={handleChange} />
                </div>
                <div>
                    <label>강의시간: </label>
                    <input type="text" name="강의시간" value={form.강의시간} onChange={handleChange} placeholder="예: 월요일,목요일,1교시" />
                </div>
                <div>
                    <label>이수구분: </label>
                    <input type="text" name="이수구분" value={form.이수구분} onChange={handleChange} />
                </div>
                <div>
                    <label>학점: </label>
                    <input type="number" name="학점" value={form.학점} onChange={handleChange} />
                </div>
                <div>
                    <label>BSM여부: </label>
                    <select name="출석관리" value={form.출석관리} onChange={handleChange}>
                        <option value="1">O</option>
                        <option value="0">X</option> 
                    </select>
                </div>
                <div>
                    <label>설계학점: </label>
                    <input type="number" name="설계학점" value={form.설계학점} onChange={handleChange} />
                </div>
                <div>
                    <label>영어비율(%): </label>
                    <input type="number" name="영어비율" value={form.영어비율} onChange={handleChange} />
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>새 강의 추가하기</button>
            </form >
        </div >
    );
}

export default AddPage;