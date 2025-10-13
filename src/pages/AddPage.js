import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';

function AddPage() {
  const navigate = useNavigate();
  const { addLecture } = useLectureStore();

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


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.professor) {
      alert('과목명과 교수님 이름은 필수 항목입니다.');
      return;
    }
    await addLecture(form);
    alert('강의가 성공적으로 추가되었습니다!');
    navigate('/list');
  };

  return React.createElement('div', null,
    React.createElement('h2', null, '새로운 강의 추가'),
    React.createElement('form', { onSubmit: handleSubmit },
      React.createElement('div', null,
        React.createElement('label', null, '과목명: '),
        React.createElement('input', {
          type: 'text',
          name: 'title',
          value: form.title,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '교수님: '),
        React.createElement('input', {
          type: 'text',
          name: 'prof',
          value: form.prof,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '요일: '),
        React.createElement('input', {
          type: 'text',
          name: 'day',
          value: form.day,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '시간: '),
        React.createElement('input', {
          type: 'text',
          name: 'startTime',
          value: form.startTime,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '장소: '),
        React.createElement('input', {
          type: 'text',
          name: 'place',
          value: form.place,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '학점: '),
        React.createElement('input', {
          type: 'integer',
          name: 'credits',
          value: form.credits,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '과제량: '),
        React.createElement('input', {
          type: 'integer',
          name: 'assignments',
          value: form.assignments,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '팀플: '),
        React.createElement('input', {
          type: 'integer',
          name: 'project',
          value: form.project,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '성적: '),
        React.createElement('input', {
          type: 'integer',
          name: 'grade',
          value: form.grade,
          onChange: handleChange
        })
      ),
      React.createElement('div', null,
        React.createElement('label', null, '영어비율: '),
        React.createElement('input', {
          type: 'integer',
          name: 'eng',
          value: form.eng,
          onChange: handleChange
        })
      ),
      React.createElement('button', {
        type: 'submit',
        style: { marginTop: '1rem' }
      }, '제출하기')
    )
  );
}

export default AddPage;