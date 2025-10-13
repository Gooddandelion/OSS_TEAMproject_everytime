import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './IndexPage.css';

function IndexPage() {
  const { lectures, isLoading, error, fetchLectures } = useLectureStore();

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  // 시간표의 시간대와 요일 정의
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const days = ['월', '화', '수', '목', '금'];

  // 특정 요일과 시간에 해당하는 강의를 찾는 함수
  const findLecture = (day, time) => {
    return lectures.find(lecture => lecture.day === day && lecture.startTime === time);
  };

  if (isLoading) { return React.createElement('div', null, '로딩 중...'); }
  if (error) { return React.createElement('div', null, `에러: ${error}`); }

  return React.createElement('div', null,
    React.createElement('h2', null, '나의 시간표'),
    React.createElement(Link, { to: '/list' }, React.createElement('button', null, '강의 목록 관리')),
    // className을 'timetable'로 지정합니다.
    React.createElement('table', { className: 'timetable' },
      React.createElement('thead', null,
        React.createElement('tr', null,
          React.createElement('th', null, '시간'),
          ...days.map(day => React.createElement('th', { key: day }, day))
        )
      ),
      React.createElement('tbody', null,
        ...timeSlots.map(time =>
          React.createElement('tr', { key: time },
            React.createElement('td', { className: 'time-label' }, time),
            ...days.map(day => {
              const lecture = findLecture(day, time);
              return React.createElement('td', {
                key: `${day}-${time}`,
                // 강의가 있으면 'lecture-cell' 클래스를 추가합니다.
                className: lecture ? 'lecture-cell' : ''
              },
                lecture ? `${lecture.title} (${lecture.prof})` : ''
              );
            })
          )
        )
      )
    )
  );
}

export default IndexPage;