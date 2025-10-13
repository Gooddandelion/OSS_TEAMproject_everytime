import client from './client'; 

// 모든 강의 목록 가져오기 (GET /lecture)
export const getLectures = () => client.get('/lecture');

// 새로운 강의 추가하기 (POST /lecture)
export const addLecture = (lectureData) => client.post('/lecture', lectureData);

// 특정 강의 정보 가져오기 (GET /lecture/:id)
export const getLectureById = (id) => client.get(`/lecture/${id}`);

// 강의 삭제하기 (DELETE /employee/:id) 
export const deleteLecture = (id) => client.delete(`/lecture/${id}`);

// 강의 수정하기 (PUT /employee/:id) 
export const updateLecture = (id, lectureData) => client.put(`/lecture/${id}`, lectureData);