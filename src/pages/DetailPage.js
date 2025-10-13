import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedLecture, isLoading, error, fetchLectureById, deleteLecture } = useLectureStore();

  useEffect(() => {
    if (id) {
      fetchLectureById(id);
    }
  }, [id, fetchLectureById]);
  
  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      await deleteLecture(id);
      alert('삭제되었습니다.');
      navigate('/list');
    }
  };

  // 구현 과정
  if (isLoading) {
    return React.createElement('div', null, '로딩 중...');
  }

  if (error) {
    return React.createElement('div', null, `에러: ${error}`);
  }

  if (!selectedLecture) {
    return null;
  }

  return React.createElement('div', null,
    React.createElement('h2', null, selectedLecture.title),
    React.createElement('p', null,
      React.createElement('strong', null, '교수님: '),
      selectedLecture.prof
    ),
    React.createElement('p', null,
      React.createElement('strong', null, '요일: '),
      selectedLecture.day
    ),
    React.createElement('p', null,
      React.createElement('strong', null, '시간: '),
      selectedLecture.startTime
    ),
    React.createElement('p', null,
      React.createElement('strong', null, '장소: '),
      selectedLecture.place
    ),
    React.createElement('p', null,
      React.createElement('strong', null, '학점: '),
      selectedLecture.credits
    ),
    React.createElement('p', null,
      React.createElement('strong', null, '과제량: '),
      selectedLecture.assignments
    ),
    React.createElement('p', null,
      React.createElement('strong', null, '팀플: '),
      selectedLecture.project
    ),
    React.createElement('p', null,
      React.createElement('strong', null, '성적: '),
      selectedLecture.grade
    ),
    React.createElement('p', null,
      React.createElement('strong', null, '영어비율: '),
      selectedLecture.eng
    ),
    React.createElement('div', { style: { marginTop: '1rem' } },
      React.createElement(Link, { to: `/edit/${selectedLecture.id}` },
        React.createElement('button', null, '수정')
      ),
      React.createElement('button', { onClick: handleDelete, style: { marginLeft: '0.5rem' } }, '삭제')
    )
  );
}

export default DetailPage;