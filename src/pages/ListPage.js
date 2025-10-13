import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './ListPage.css';

function ListPage() {
  const { lectures, isLoading, error, fetchLectures } = useLectureStore();
  const tableHeaders = ['과목명', '교수님', '요일', '시간', '장소', '학점', '상세보기'];

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
    <div>
      <h2>강의 목록</h2>
      <Link to="/add">
        <button>새 강의 추가하기</button>
      </Link>

      <table className="list-table">
        <thead>
          <tr>
            {tableHeaders.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lectures.map(lecture => (
            <tr key={lecture.id}>
              <td>{lecture.title}</td>
              <td>{lecture.professor}</td>
              <td>{lecture.day}</td>
              <td>{`${lecture.startTime} - ${lecture.endTime}`}</td>
              <td>{lecture.place}</td>
              <td>{lecture.credits}</td>
              <td>
                <Link to={`/detail/${lecture.id}`}>보기</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListPage;