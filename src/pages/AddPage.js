import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';

function AddPage() {
    const navigate = useNavigate();
    const { addLecture } = useLectureStore();

    // 📝 prof -> professor, endTime 추가, select 기본값 설정
    const [form, setForm] = useState({
        강의명: '',
        교수님: '',
        과제량: '',
        평점: '',
        조별과제횟수: '',
        성적평가: '',
        출석관리: '',
        시험횟수: '',
        강의시간: '',
        이수구분: '',
        학점: '',
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
        // 🐛 BUG FIX: prof -> professor로 수정
        if (!form.title || !form.professor) {
            alert('과목명과 교수님 이름은 필수 항목입니다.');
            return;
        }
        await addLecture(form);
        alert('강의가 성공적으로 추가되었습니다!');
        navigate('/list');
    };

    return (
        <div>
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
                        <option value="1">많음</option>
                        <option value="0">보통</option>
                        <option value="-1">적음</option>
                    </select>
                </div>
                <div>
                    <label>평점 </label>
                    <input type="number" name="평점" value={form.평점} onChange={handleChange} />
                </div>
                <div>
                    <label>조별과제횟수</label>
                    <select name="과제량" value={form.과제량} onChange={handleChange}>
                        <option value="1">많음</option>
                        <option value="0">보통</option>
                        <option value="-1">없음</option>
                    </select>
                </div>
                <div>
                    <label>성적평가: </label>
                    <select name="성적평가" value={form.성적평가} onChange={handleChange}>
                        <option value="1">너그러움</option>
                        <option value="0">보통</option>
                        <option value="-1">깐깐함</option>
                    </select>
                </div>
                <div>
                    <label>출석관리: </label>
                    <select name="assignments" value={form.assignments} onChange={handleChange}>
                        <option value="1">전자출결</option>
                        <option value="-1">직접호명</option>
                    </select>
                </div>
                <div>
                    <label>시험횟수: </label>
                    <input type="number" name="시험횟수" value={form.시험횟수} onChange={handleChange} />
                </div>
                <div>
                    <label>강의시간: </label>
                    <input type="text" name="강의시간" value={form.강의시간} onChange={handleChange} />
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
                    <label>영어비율(%): </label>
                    <input type="number" name="영어비율" value={form.영어비율} onChange={handleChange} />
                </div>
                <button type="submit" style={{ marginTop: '1rem' }}>제출하기</button>
            </form >
        </div >
    );
}

export default AddPage;