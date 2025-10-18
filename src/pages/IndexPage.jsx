import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import { getRandomQuote } from '../api/quoteAPI';
import './IndexPage.css';

function IndexPage() {
  const { myLectures, isLoading, error, fetchMyLectures } = useLectureStore();
  const [quote, setQuote] = useState({ content: '명언을 불러오는 중...', author: '' });

  useEffect(() => {
    fetchMyLectures();
  }, [fetchMyLectures]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await getRandomQuote();
        setQuote({
          content: response.data.content,
          author: response.data.author,
        });
      } catch (err) {
        setQuote({ content: '명언을 불러오는 데 실패했습니다.', author: '' });
      }
    };

    fetchQuote();
  }, []);

  const timeSlots = ['1교시', '2교시', '3교시', '4교시', '5교시', '6교시', '7교시', '8교시', '9교시'];
  const days = ['월요일', '화요일', '수요일', '목요일', '금요일'];

  const findLecture = (day, time) => {
    return myLectures.find(lecture => 
      Array.isArray(lecture.강의시간) && 
      lecture.강의시간.includes(day) && 
      lecture.강의시간.includes(time)
    ); 
  };

  if (isLoading) { return <div>로딩 중...</div>; }
  if (error) { return <div>에러: {error}</div>; }

  const buttonStyle = {
    margin: '10px',
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold'
  };

  return (
    <div>
      <h2>나의 시간표</h2>
      <Link to="/list">
        <button>강의 목록 관리</button>
      </Link>

      <Link to="/graduate">
        <button>졸업 진행도</button>
      </Link>

      <Link to="/chat">
          <button style={{ ...buttonStyle, backgroundColor: '#f91f15', color: '#fff' }}>
            강의 도우미(Chat)
          </button>
      </Link>

      <div className="quote-widget">
          <p>"{quote.content}"</p>
          <strong>- {quote.author} -</strong>
      </div>

      <table className="timetable">
        <thead>
          <tr>
            <th>시간</th>
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
                    {lecture ? `${lecture.강의명} (${lecture.교수님})` : ''}
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