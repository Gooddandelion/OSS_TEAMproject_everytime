import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedLecture, fetchLectureById, updateLecture } = useLectureStore();
  const [form, setForm] = useState({
    title: '',
    prof: '',
    day: '',
    place: '',
    credits: '',
    assignments: '',
    project: '',
    grade: '',
    eng: '',
    startTime: ''
  });

  useEffect(() => {
    fetchLectureById(id);
  }, [id, fetchLectureById]);


  useEffect(() => {
    if (selectedLecture) {
      setForm({
        title: selectedLecture.title,
        prof: selectedLecture.prof,
        day: selectedLecture.day,
        place: selectedLecture.place,
        credits: selectedLecture.credits,
        assignments: selectedLecture.assignments,
        project: selectedLecture.project,
        grade: selectedLecture.grade,
        eng: selectedLecture.eng,
        startTime: selectedLecture.startTime
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
    navigate(`/detail/${id}`); // 수정 후 상세 페이지로 이동
  };

  // return
  return React.createElement('div', null,
    React.createElement('h2', null, '강의 정보 수정'),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('div', null,
        React.createElement('label', null, '과목명: '),
        React.createElement('input', {
          type: 'text', name: 'title', value: form.title, onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '교수님: '),
        React.createElement('input', {
          type: 'text', name: 'prof', value: form.prof, onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '요일: '),
        React.createElement('input', {
          type: 'text', name: 'day', value: form.date, onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '시간: '),
        React.createElement('input', {
          type: 'text', name: 'startTime', value: form.startTime, onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '장소: '),
        React.createElement('input', {
          type: 'text', name: 'place', value: form.place, onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '학점: '),
        React.createElement('input', {
          type: 'integer', name: 'credits', value: form.credits, onChange: handleChange
        })
      ),React.createElement('div', null,
        React.createElement('label', null, '과제량: '),
        React.createElement('input', {
          type: 'integer', name: 'assignments', value: form.assignments, onChange: handleChange
        })
      ),React.createElement('div', null,
        React.createElement('label', null, '팀플: '),
        React.createElement('input', {
          type: 'integer', name: 'project', value: form.project, onChange: handleChange
        })
      ),React.createElement('div', null,
        React.createElement('label', null, '성적: '),
        React.createElement('input', {
          type: 'integer', name: 'grade', value: form.grade, onChange: handleChange
        })
      ),React.createElement('div', null,
        React.createElement('label', null, '영어 비율: '),
        React.createElement('input', {
          type: 'integer', name: 'eng', value: form.eng, onChange: handleChange
        })
      ),
      React.createElement('button', { type: 'submit', style: { marginTop: '1rem' } }, '수정 완료')
    )
  );
}

export default EditPage;