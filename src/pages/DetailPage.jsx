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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  if (!selectedLecture) {
    return null; 
  }

  return (
    <div>
      <h2>{selectedLecture.강의명}</h2>
      <p>
        <strong>교수님: </strong>
        {selectedLecture.교수님} 
      </p>
      <p>
        <strong>과제량: </strong>
        {selectedLecture.과제량}
      </p>
      <p>
        <strong>평점: </strong>
        {selectedLecture.평점}
      </p>
      <p>
        <strong>조별과제횟수: </strong>
        {selectedLecture.조별과제횟수}
      </p>
      <p>
        <strong>성적평가: </strong>
        {selectedLecture.성적평가}
      </p>
      <p>
        <strong>출석관리: </strong>
        {selectedLecture.출석관리}
      </p>
      <p>
        <strong>시험횟수: </strong>
        {selectedLecture.시험횟수}
      </p>
      <p>
         <strong>강의시간: </strong>
        {selectedLecture.강의시간.join(' / ')}
      </p>
      <p>
        <strong>이수구분: </strong>
        {selectedLecture.이수구분}
      </p>
      <p>
        <strong>학점: </strong>
        {selectedLecture.학점}
      </p>
      <p>
        <strong>영어비율: </strong>
        {selectedLecture.영어비율}%
      </p>
      <div style={{ marginTop: '1rem' }}>
        <Link to={`/edit/${selectedLecture.id}`}>
          <button>수정</button>
        </Link>
        <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>
          삭제
        </button>
      </div>
    </div>
  );
}

export default DetailPage;