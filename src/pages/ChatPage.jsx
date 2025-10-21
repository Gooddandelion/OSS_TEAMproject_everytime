import React, { useState } from "react";

const days = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

const ChatPage = () => {
  const [mode, setMode] = useState("recommend");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [highlightedCells, setHighlightedCells] = useState({}); // { "월요일-1": "강의 (교수)" }

  const handleSend = async () => {
    if (!question.trim()) return alert("질문을 입력하세요.");
    setAnswer("⏳ 요청 중...");
    setHighlightedCells({});

    const endpoint = mode === "recommend" ? "/api/recommend" : "/api/compare";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setAnswer(data.answer || data.error || "응답 없음");

      if (mode === "recommend") {
        const newHighlights = {};
        const regex = new RegExp(`(${days.join("|")}).*?(\\d)교시`, "g");
        const matches = [...(data.answer?.matchAll(regex) || [])];

        const lectureMatch = data.answer?.match(/강의명\s*[:：]\s*([^\n,]+)/);
        const profMatch = data.answer?.match(/교수님\s*[:：]\s*([^\n,]+)/);
        const lecture = lectureMatch ? lectureMatch[1].trim() : "";
        const prof = profMatch ? profMatch[1].trim() : "";

        matches.forEach((m) => {
          const key = `${m[1]}-${m[2]}`;
          newHighlights[key] = `${lecture} ${prof}`;
        });

        setHighlightedCells(newHighlights);
      }
    } catch (err) {
      setAnswer("오류: " + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>한동대학교 강의 도우미</h1>

      <div style={styles.modeButtons}>
        <button
          onClick={() => setMode("recommend")}
          style={{ ...styles.modeButton, ...(mode === "recommend" ? styles.activeButton : {}) }}
        >
          수업 추천
        </button>
        <button
          onClick={() => setMode("compare")}
          style={{ ...styles.modeButton, ...(mode === "compare" ? styles.activeButton : {}) }}
        >
          수업 비교
        </button>
      </div>

      <textarea
        rows="4"
        placeholder={
          mode === "recommend"
            ? "예: 소프트웨어 입문 교수님이 누구야?"
            : "예: 소프트웨어 입문이랑 자료구조 비교해줘."
        }
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={styles.textarea}
      />
      <br />
      <button onClick={handleSend} style={styles.sendBtn}>
        보내기
      </button>

      <pre style={styles.answerBox}>{answer}</pre>

      {mode === "recommend" && (
        <div id="timetableContainer">
          <h2>📅 예상된 시간표</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>교시</th>
                {days.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(8)].map((_, i) => {
                const period = i + 1;
                return (
                  <tr key={period}>
                    <th>{period}교시</th>
                    {days.map((day) => {
                      const key = `${day}-${period}`;
                      return (
                        <td
                          key={key}
                          style={{
                            ...styles.td,
                            backgroundColor: highlightedCells[key] ? "#f91f15" : "transparent",
                            color: highlightedCells[key] ? "#fff" : "#000",
                            fontWeight: highlightedCells[key] ? "bold" : "normal",
                          }}
                        >
                          {highlightedCells[key] || ""}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ChatPage;

const styles = {
  container: { fontFamily: "Pretendard, sans-serif", backgroundColor: "#fcfcfc", color: "#292929", textAlign: "center", padding: "20px" },
  title: { color: "#f91f15", marginBottom: "20px" },
  modeButtons: { marginBottom: "20px" },
  modeButton: { background: "#292929", color: "#fcfcfc", border: "none", padding: "10px 20px", margin: "0 5px", borderRadius: "6px", cursor: "pointer" },
  activeButton: { background: "#f91f15" },
  textarea: { width: "80%", padding: "12px", borderRadius: "8px", border: "2px solid #292929" },
  sendBtn: { background: "#f91f15", color: "#fcfcfc", padding: "10px 25px", borderRadius: "6px", border: "none", cursor: "pointer" },
  answerBox: { width: "80%", margin: "20px auto", textAlign: "left", padding: "15px", background: "#fff", borderRadius: "10px", border: "1px solid #ddd", whiteSpace: "pre-wrap" },
  table: { width: "80%", margin: "30px auto", borderCollapse: "collapse" },
  td: { border: "1px solid #ddd", padding: "10px", textAlign: "center" },
};