import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './ListPage.css';

function ListPage() {
  const { lectures, myLectures, isLoading, error, fetchLectures, fetchMyLectures, addLectureToMyList, removeLectureFromMyList } = useLectureStore();

  const allTableHeaders = [
    { label: '강의명', className: 'col-title' },
    { label: '교수님', className: 'col-professor' },
    { label: '강의시간', className: 'col-time' },
    { label: '평점', className: 'col-rating' },
    { label: '학점', className: 'col-credit' },
    { label: '세부정보', className: 'col-actions' },
    { label: '추가', className: 'col-actions' },
  ];
  const myTableHeaders = [
    { label: '강의명', className: 'col-title' },
    { label: '교수님', className: 'col-professor' },
    { label: '강의시간', className: 'col-time' },
    { label: '학점', className: 'col-credit' },
    { label: '세부정보', className: 'col-actions' },
    { label: '삭제', className: 'col-actions' },
  ];

  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');



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

  const filteredLectures = lectures.filter(lecture =>
    lecture.강의명.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lecture.교수님.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div> {/* 최상위 div */}
      {/* 상단 검색/버튼 영역 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <h2 style={{ margin: 0 }}>강의 목록 관리</h2>

        <input
          type="text"
          value={inputValue}
          placeholder="강의명 또는 교수님으로 검색"
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            flexGrow: 1,
            minWidth: '250px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        />

        <button className="main-btn" onClick={() => setSearchTerm(inputValue)}>검색</button>

        <Link to="/add">
          <button className="main-btn">새 강의 등록하기</button>
        </Link>
      </div>

      {/* 테이블 영역 */}
      <div className="list-container">

        <div className="list-column">
          <h3>모든 강의 목록</h3>
          <table className="list-table">
            <thead>
              <tr>
                {allTableHeaders.map(header =>
                  <th key={header.label} className={header.className}>{header.label}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredLectures.map(lecture => (
                <tr key={lecture.id}>
                  <td className="col-title">{lecture.강의명}</td>
                  <td className="col-professor">{lecture.교수님}</td>
                  <td className="col-time">{Array.isArray(lecture.강의시간) ? lecture.강의시간.join(' / ') : lecture.강의시간}</td>
                  <td className="col-rating">{lecture.평점}</td>
                  <td className="col-credit">{lecture.학점}</td>
                  <td className="col-actions"><Link to={`/detail/${lecture.id}`}>보기</Link></td>
                  <td className="col-actions">
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
                {myTableHeaders.map(header =>
                  <th key={header.label} className={header.className}>{header.label}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {myLectures.length > 0 ? (
                myLectures.map(lecture => (
                  <tr key={lecture.id}>
                    <td className="col-title">{lecture.강의명}</td>
                    <td className="col-professor">{lecture.교수님}</td>
                    <td className="col-time">{Array.isArray(lecture.강의시간) ? lecture.강의시간.join(' / ') : lecture.강의시간}</td>
                    <td className="col-credit">{lecture.학점}</td>
                    <td className="col-actions"><Link to={`/detail/${lecture.id}`}>보기</Link></td>
                    <td className="col-actions">
                      <button className="table-btn" onClick={() => removeLectureFromMyList(lecture.id)}>삭제</button>
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