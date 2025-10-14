import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './ListPage.css';

function ListPage() {
  const { lectures, isLoading, error, fetchLectures } = useLectureStore();
  const tableHeaders = ['강의명', '교수님', '강의시간', '평점', '학점', '이수구분', '세부정보'];

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
              <td>{lecture.강의명}</td>
              <td>{lecture.교수님}</td>
              <td>{lecture.강의시간}</td>
              <td>{lecture.평점}</td>
              <td>{lecture.학점}</td>
              <td>{lecture.이수구분}</td>
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