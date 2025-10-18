import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import useLectureStore from "../store/lectureStore";
import lectureData from "../data/my_lecture.json";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./GraduatePage.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function GraduatePage() {
  const { myLectures: storeLectures, isLoading, error, fetchMyLectures } = useLectureStore();
  const [myLectures, setMyLectures] = useState([]);

  useEffect(() => {
    fetchMyLectures();
  }, [fetchMyLectures]);

  useEffect(() => {
    setMyLectures([...storeLectures, ...lectureData]);
  }, [storeLectures]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  // === 1. 필수과목 ===
  const mandatorySubjects = [
    "데이타구조", "운영체제", "컴퓨터구조", "공학설계입문",
    "오픈소스 스튜디오", "AI 개론", "캡스톤디자인 1", "캡스톤 디자인 2"
  ];
  const completedMandatory = mandatorySubjects.filter(sub =>
    myLectures.some(lec => lec.강의명 === sub)
  );
  const missingMandatory = mandatorySubjects.filter(sub =>
    !myLectures.some(lec => lec.강의명 === sub)
  );

  // === 2. 선택과목 ===
  const electiveSubjects = [
    "알고리듬분석", "프로그래밍언어론", "데이터베이스", "컴퓨터네트워크", "소프트웨어 공학"
  ];
  const completedElective = electiveSubjects.filter(sub =>
    myLectures.some(lec => lec.강의명 === sub)
  );
  const missingElective = electiveSubjects.filter(sub =>
    !myLectures.some(lec => lec.강의명 === sub)
  );

    // === 3. BSM / 설계 / 영어 ===
    const bsmLectures = myLectures.filter(lec => lec.BSM여부 && lec.BSM여부 > 0);
    const designLectures = myLectures.filter(lec => lec.설계학점 && lec.설계학점 > 0);
    const englishLectures = myLectures.filter(lec => lec.영어비율 && lec.영어비율 > 0 && lec.이수구분 === "전공선택");

    // 학점 합산
    const bsmCredits = bsmLectures.reduce((sum, lec) => sum + (Number(lec.학점) || 0), 0);
    const designCredits = designLectures.reduce((sum, lec) => sum + (Number(lec.학점) || 0), 0);
    const englishCredits = englishLectures.reduce((sum, lec) => sum + (Number(lec.학점) || 0), 0);


  // === 4. 총 전공학점 ===
  const majorLectures = myLectures.filter(lec => lec.이수구분 === "전공선택");
  const totalCredits = majorLectures.reduce((sum, lec) => sum + (Number(lec.학점) || 0), 0);

  const requiredCredits = 60; // 전공선택 기준
  const creditProgress = Math.min((totalCredits / requiredCredits) * 100, 100);

  // === 5. 차트 데이터 ===
  const data = {
    labels: ["필수과목", "선택과목", "BSM", "설계학점", "영어", "총 전공학점"],
    datasets: [
      {
        label: "전공 졸업 진행도 (%)",
        data: [
          completedMandatory.length / mandatorySubjects.length * 100,
          Math.min(completedElective.length / 2, 1) * 100,
          Math.min(bsmCredits / 18, 1) * 100,
          Math.min(designCredits / 12, 1) * 100,
          Math.min(englishCredits / 21, 1) * 100,
          creditProgress
        ],
        backgroundColor: ["#f91f15", "#f9a115", "#a115f9", "#15f97f", "#f9e115", "#15f9f2"]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: true, text: "졸업 진행도 (%)" } },
    scales: { y: { min: 0, max: 100, ticks: { stepSize: 10 } } }
  };

  return (
    <div className="graduate-container">
      <h2>전공 졸업 진행도</h2>
  
      {/* 필수과목 */}
      <div className="graduate-progress">
        <strong>필수과목:</strong> 
        <span className="completed">{completedMandatory.join(", ") || "없음"}</span> <br />
        <span className="missing">미수강: {missingMandatory.join(", ") || "없음"}</span>
      </div>
  
      {/* 선택과목 */}
      <div className="graduate-progress">
        <strong>선택과목(택2):</strong> 
        <span className="completed">{completedElective.join(", ") || "없음"}</span> <br />
        <span className="missing">미수강: {missingElective.join(", ") || "없음"}</span>
      </div>
  
      {/* BSM / 설계 / 영어 / 총 학점 */}
      <div className="graduate-progress">
        <div>BSM 학점: {bsmCredits} / 18 ({bsmLectures.map(l => l.강의명).join(", ") || "없음"})</div>
        <div>설계학점: {designCredits} / 12 ({designLectures.map(l => l.강의명).join(", ") || "없음"})</div>
        <div>영어: {englishCredits} / 21 ({englishLectures.map(l => l.강의명).join(", ") || "없음"})</div>
        <div>총 전공학점: {totalCredits} / {requiredCredits}</div>
      </div>
  
      <div className="graduate-chart">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default GraduatePage;
