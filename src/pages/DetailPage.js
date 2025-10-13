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

  const renderLevelLabel = (level) => {
    const numLevel = parseInt(level, 10);
    switch (numLevel) {
      case 1:
        return '많음';
      case 0:
        return '보통';
      case -1:
        return '적음';
      default:
        return '정보 없음';
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  if (!selectedLecture) {
    return null; // 데이터가 아직 없으면 아무것도 렌더링하지 않음
  }

  return (
    <div>
      <h2>{selectedLecture.title}</h2>
      <p>
        <strong>교수님: </strong>
        {selectedLecture.professor} {/* prof -> professor로 수정 */}
      </p>
      <p>
        <strong>요일: </strong>
        {selectedLecture.day}
      </p>
      <p>
        <strong>시간: </strong>
        {/* startTime과 endTime을 함께 표시하도록 개선 */}
        {`${selectedLecture.startTime} - ${selectedLecture.endTime}`}
      </p>
      <p>
        <strong>장소: </strong>
        {selectedLecture.place}
      </p>
      <p>
        <strong>학점: </strong>
        {selectedLecture.credits}
      </p>
      <p>
        <strong>과제량: </strong>
        {renderLevelLabel(selectedLecture.assignments)}
      </p>
      <p>
        <strong>팀플: </strong>
        {renderLevelLabel(selectedLecture.project)}
      </p>
      <p>
        <strong>성적: </strong>
        {renderLevelLabel(selectedLecture.grade)}
      </p>
      <p>
        <strong>영어비율: </strong>
        {selectedLecture.eng}%
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