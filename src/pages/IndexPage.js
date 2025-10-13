import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import './IndexPage.css';

function IndexPage() {
  const { lectures, isLoading, error, fetchLectures } = useLectureStore();

  useEffect(() => {
    fetchLectures();
  }, [fetchLectures]);

  // 시간표의 시간대와 요일 정의 (로직은 동일)
  const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const days = ['월', '화', '수', '목', '금'];

  const findLecture = (day, time) => {
    return lectures.find(lecture => lecture.day === day && lecture.startTime === time);
  };

  if (isLoading) { return <div>로딩 중...</div>; }
  if (error) { return <div>에러: {error}</div>; }

  // React.createElement 대신 JSX 문법으로 화면을 구성합니다.
  return (
    <div>
      <h2>나의 시간표</h2>
      <Link to="/list">
        <button>강의 목록 관리</button>
      </Link>

      <table className="timetable">
        <thead>
          <tr>
            <th>시간</th>
            {/* JavaScript의 map 함수를 {} 안에 직접 사용 */}
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time}>
              <td className="time-label">{time}</td>
              {days.map(day => {
                const lecture = findLecture(day, time);
                return (
                  <td key={`${day}-${time}`} className={lecture ? 'lecture-cell' : ''}>
                    {/* 조건부 렌더링: lecture가 있으면 내용을 표시 */}
                    {lecture ? `${lecture.title} (${lecture.professor})` : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IndexPage;