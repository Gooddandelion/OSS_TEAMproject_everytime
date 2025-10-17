import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './ListPage.css';

function ListPage() {
  const { lectures, myLectures, isLoading, error, fetchLectures, fetchMyLectures, addLectureToMyList, removeLectureFromMyList} = useLectureStore();
  
  const allTableHeaders = ['강의명', '교수님', '강의시간', '평점', '학점', '세부정보', '추가'];
  const myTableHeaders = ['강의명', '교수님', '강의시간', '학점', '세부정보', '삭제'];


  useEffect(() => {
    fetchLectures();
    fetchMyLectures();
  }, [fetchLectures, fetchMyLectures]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러: {error}</div>;
  }

  return (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>강의 목록 관리</h2>
      <Link to="/add">
        <button>새 강의 등록하기</button>
      </Link>
    </div>

    <div className="list-container">

      <div className="list-column">
        <h3>모든 강의 목록</h3>
        <table className="list-table">
          <thead>
            <tr>
              {allTableHeaders.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {lectures.map(lecture => (
              <tr key={lecture.id}>
                <td>{lecture.강의명}</td>
                <td>{lecture.교수님}</td>
                <td>{Array.isArray(lecture.강의시간) ? lecture.강의시간.join(' / ') : lecture.강의시간}</td>
                <td>{lecture.평점}</td>
                <td>{lecture.학점}</td>
                <td><Link to={`/detail/${lecture.id}`}>보기</Link></td>
                <td>
                  <button onClick={() => addLectureToMyList(lecture)}>추가</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="list-column">
        <h3>나의 수강 강의 목록</h3>
        <table className="list-table">
          <thead>
            <tr>
              {myTableHeaders.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {myLectures.length > 0 ? (
              myLectures.map(lecture => (
                <tr key={lecture.id}>
                  <td>{lecture.강의명}</td>
                  <td>{lecture.교수님}</td>
                  <td>{Array.isArray(lecture.강의시간) ? lecture.강의시간.join(' / ') : lecture.강의시간}</td>
                  <td>{lecture.학점}</td>
                  <td><Link to={`/detail/${lecture.id}`}>보기</Link></td>
                  <td>
                    <button onClick={() => removeLectureFromMyList(lecture.id)}>삭제</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={myTableHeaders.length}>추가된 강의가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default ListPage;