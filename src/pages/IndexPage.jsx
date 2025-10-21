import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useLectureStore from '../store/lectureStore';
import { getRandomQuote } from '../api/quoteAPI';
import profileImg from '../data/image.jpg';
import myInfo from '../data/my_information.json';
import './IndexPage.css';

function IndexPage() {
  const { myLectures, isLoading, error, fetchMyLectures } = useLectureStore();
  const [quote, setQuote] = useState({ content: '명언을 불러오는 중...', author: '' });

  useEffect(() => { fetchMyLectures(); }, [fetchMyLectures]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await getRandomQuote();
        setQuote({ content: response.data.content, author: response.data.author });
      } catch {
        setQuote({ content: '명언을 불러오는 데 실패했습니다.', author: '' });
      }
    };
    fetchQuote();
  }, []);

  const timeSlots = ['1교시','2교시','3교시','4교시','5교시','6교시','7교시','8교시','9교시'];
  const days = ['월요일','화요일','수요일','목요일','금요일'];

  const findLecture = (day, time) =>
    myLectures.find(lecture => Array.isArray(lecture.강의시간) &&
      lecture.강의시간.includes(day) && lecture.강의시간.includes(time));

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="index-page">
      {/* 상단 버튼 + 명언 */}
      <div className="top-bar">
        <h2>HangongMate</h2>
        <div className="button-group">
          <Link to="/list"><button className="main-btn">강의 목록 관리</button></Link>
          <Link to="/graduate"><button className="main-btn">졸업 진행도</button></Link>
          <Link to="/chat"><button className="main-btn">강의 도우미(Chat)</button></Link>
        </div>
        <div className="quote-widget">
          <p>"{quote.content}"</p>
          <strong>- {quote.author} -</strong>
        </div>
      </div>

      {/* 왼쪽: 프로필, 오른쪽: 시간표 */}
      <div className="content-container">
        <div className="profile-section">
          <img src={profileImg} alt="프로필" className="profile-img" />
          <h3>{myInfo[0].이름}</h3>
          <p><strong>학년:</strong> {myInfo[0].학년}</p>
          <p><strong>학기수:</strong> {myInfo[0].학기수}</p>
          <p><strong>평균학점:</strong> {myInfo[0].평균학점}</p>
          <p><strong>전공평균학점:</strong> {myInfo[0].전공평균학점}</p>
          <p><strong>전공:</strong> {myInfo[0].전공}</p>
        </div>

        <div className="right-section">
          <table className="timetable">
            <thead>
              <tr>
                <th>시간</th>
                {days.map(day => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>
                  <td className="time-label">{time}</td>
                  {days.map(day => {
                    const lecture = findLecture(day, time);
                    return <td key={`${day}-${time}`} className={lecture ? 'lecture-cell' : ''}>
                      {lecture ? `${lecture.강의명} (${lecture.교수님})` : ''}
                    </td>
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
