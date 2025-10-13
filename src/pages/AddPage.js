import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';

function AddPage() {
  const navigate = useNavigate();
  const { addLecture } = useLectureStore();

  // 📝 prof -> professor, endTime 추가, select 기본값 설정
  const [form, setForm] = useState({
    title: '',
    professor: '',
    day: '',
    startTime: '',
    endTime: '', // endTime 추가
    place: '',
    credits: 3,
    assignments: 0, // 기본값을 '보통'으로 설정
    project: -1,     // 기본값을 '없음'으로 설정
    grade: 0,        // 기본값을 '보통'으로 설정
    eng: 0,
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
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <label>교수님: </label>
          {/* 🐛 BUG FIX: prof -> professor로 수정 */}
          <input type="text" name="professor" value={form.professor} onChange={handleChange} />
        </div>
        <div>
          <label>요일: </label>
          <input type="text" name="day" value={form.day} onChange={handleChange} />
        </div>
        <div>
          <label>시작 시간: </label>
          <input type="text" name="startTime" value={form.startTime} onChange={handleChange} />
        </div>
        <div>
          <label>종료 시간: </label>
          {/* ✨ 개선: endTime 입력 필드 추가 */}
          <input type="text" name="endTime" value={form.endTime} onChange={handleChange} />
        </div>
        <div>
          <label>장소: </label>
          <input type="text" name="place" value={form.place} onChange={handleChange} />
        </div>
        <div>
          <label>학점: </label>
          <input type="number" name="credits" value={form.credits} onChange={handleChange} />
        </div>
        <div>
          <label>과제량: </label>
          <select name="assignments" value={form.assignments} onChange={handleChange}>
            <option value="1">많음</option>
            <option value="0">보통</option>
            <option value="-1">적음</option>
          </select>
        </div>
        <div>
          <label>팀플: </label>
          <select name="project" value={form.project} onChange={handleChange}>
            <option value="1">있음</option>
            <option value="-1">없음</option>
          </select>
        </div>
        <div>
          <label>성적: </label>
          <select name="grade" value={form.grade} onChange={handleChange}>
            <option value="1">후하게 줌</option>
            <option value="0">보통</option>
            <option value="-1">깐깐함</option>
          </select>
        </div>
        <div>
          <label>영어 비율(%): </label>
          <input type="number" name="eng" value={form.eng} onChange={handleChange} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>제출하기</button>
      </form>
    </div>
  );
}

export default AddPage;