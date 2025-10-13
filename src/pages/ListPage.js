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
    return React.createElement('div', null, '로딩 중...');
  }

  if (error) {
    return React.createElement('div', null, `에러: ${error}`);
  }

  return React.createElement('div', null,
    React.createElement('h2', null, '강의 목록'),
    React.createElement(Link, { to: '/add' },
      React.createElement('button', null, '새 강의 추가하기')
    ),
    // className을 'list-table'로 지정합니다.
    React.createElement('table', { className: 'list-table' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          ...tableHeaders.map(header => React.createElement('th', { key: header }, header))
        )
      ),
      React.createElement('tbody', null,
        ...lectures.map(lecture =>
          React.createElement('tr', { key: lecture.id },
            React.createElement('td', null, lecture.title),
            React.createElement('td', null, lecture.prof),
            React.createElement('td', null, lecture.day),
            React.createElement('td', null, lecture.startTime),
            React.createElement('td', null, lecture.place),
            React.createElement('td', null, lecture.credits),
            React.createElement('td', null,
              React.createElement(Link, { to: `/detail/${lecture.id}` }, '보기')
            )
          )
        )
      )
    )
  );
}

export default ListPage;