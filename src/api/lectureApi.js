import client from './client.js'; 

//oss-team

// 모든 강의 목록 가져오기 (GET /lecture)
export const getLectures = () => client.get('/oss-team');

// 새로운 강의 추가하기 (POST /lecture)
export const addLecture = (lectureData) => client.post('/oss-team', lectureData);

// 특정 강의 정보 가져오기 (GET /lecture/:id)
export const getLectureById = (id) => client.get(`/oss-team/${id}`);

// 강의 삭제하기 (DELETE /employee/:id) 
export const deleteLecture = (id) => client.delete(`/oss-team/${id}`);

// 강의 수정하기 (PUT /employee/:id) 
export const updateLecture = (id, lectureData) => client.put(`/oss-team/${id}`, lectureData);

//mylectures

// 나의 강의 목록 전체 조회 (GET /mylectures)
export const getMyLectures = () => client.get('/mylectures');

// 나의 강의 목록에 추가 (POST /mylectures)
export const addMyLecture = (lectureData) => client.post('/mylectures', lectureData);

// 나의 강의 목록에서 삭제 (DELETE /mylectures/:id)
export const deleteMyLecture = (id) => client.delete(`/mylectures/${id}`);