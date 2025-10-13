import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedLecture, fetchLectureById, updateLecture } = useLectureStore();

  // 📝 prof -> professor로, endTime 추가
  const [form, setForm] = useState({
    title: '',
    professor: '',
    day: '',
    place: '',
    credits: 0,
    assignments: 0,
    project: 0,
    grade: 0,
    eng: 0,
    startTime: '',
    endTime: '', // endTime 추가
  });

  useEffect(() => {
    if (id) {
      fetchLectureById(id);
    }
  }, [id, fetchLectureById]);

  useEffect(() => {
    if (selectedLecture) {
      setForm({
        title: selectedLecture.title || '',
        professor: selectedLecture.professor || '', // prof -> professor
        day: selectedLecture.day || '',
        place: selectedLecture.place || '',
        credits: selectedLecture.credits || 0,
        assignments: selectedLecture.assignments || 0,
        project: selectedLecture.project || 0,
        grade: selectedLecture.grade || 0,
        eng: selectedLecture.eng || 0,
        startTime: selectedLecture.startTime || '',
        endTime: selectedLecture.endTime || '', // endTime 추가
      });
    }
  }, [selectedLecture]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateLecture(id, form);
    alert('수정되었습니다.');
    navigate(`/detail/${id}`);
  };

  return (
    <div>
      <h2>강의 정보 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>과목명: </label>
          <input type="text" name="title" value={form.title} onChange={handleChange} />
        </div>
        <div>
          <label>교수님: </label>
          <input type="text" name="professor" value={form.professor} onChange={handleChange} />
        </div>
        <div>
          <label>요일: </label>
          {/* 🐛 BUG FIX: value를 form.date -> form.day로 수정 */}
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
        <button type="submit" style={{ marginTop: '1rem' }}>수정 완료</button>
      </form>
    </div>
  );
}

export default EditPage;